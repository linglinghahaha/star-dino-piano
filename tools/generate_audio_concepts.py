#!/usr/bin/env python3
"""Generate the first traceable Star Dino non-voice audio concept batch.

The generator uses deterministic procedural synthesis only. It does not read
external samples, call a model/API, or touch application runtime code.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import shutil
import subprocess
import sys
import wave
from dataclasses import dataclass
from pathlib import Path
from typing import Callable

import numpy as np


SAMPLE_RATE = 48_000
VERSION = "v01"
GENERATION_DATE = "2026-07-12"
ROOT = Path(__file__).resolve().parents[1]
AUDIO_ROOT = ROOT / "audio"
SOURCE_DIR = AUDIO_ROOT / "source-concepts"
RUNTIME_DIR = AUDIO_ROOT / "runtime-candidates"
REVIEW_DIR = AUDIO_ROOT / "review"
MIX_DIR = REVIEW_DIR / "mixes"
REFERENCE_DIR = REVIEW_DIR / "reference"
MANIFEST_PATH = AUDIO_ROOT / "audio-asset-manifest.json"
REVIEW_DATA_PATH = REVIEW_DIR / "review-data.generated.js"

# LS04 deliberately reviews only the three cues that can accompany the first
# Chapter 3 seed interaction. They remain review-only and never become runtime
# references from this script.
LS04_REVIEW_SLUGS = frozenset({"seed-sprout", "correct", "retry"})
REVIEW_PIANO_NOTES = (
    {"id": "c4", "label": "C4", "frequency_hz": 261.625565},
    {"id": "d4", "label": "D4", "frequency_hz": 293.664768},
)
DUCK_DB = -8.0
PROTECTION_WINDOW_SECONDS = 0.54
RELEASE_SECONDS = 0.14


@dataclass(frozen=True)
class CueSpec:
    asset_id: str
    slug: str
    name_zh: str
    category: str
    story_use: str
    duration: float
    seed: int
    target_rms_dbfs: float
    peak_ceiling_dbfs: float
    recommended_gain: float
    trigger_delay_ms: int
    recipe: str
    review_focus: str
    builder: Callable[[np.random.Generator], np.ndarray]


def db_to_amp(db: float) -> float:
    return 10.0 ** (db / 20.0)


def amp_to_db(value: float) -> float:
    return 20.0 * math.log10(max(abs(value), 1e-12))


def rms(signal: np.ndarray) -> float:
    return float(np.sqrt(np.mean(np.square(signal), dtype=np.float64)))


def seconds_to_samples(seconds: float) -> int:
    return max(1, int(round(seconds * SAMPLE_RATE)))


def empty(duration: float) -> np.ndarray:
    return np.zeros(seconds_to_samples(duration), dtype=np.float64)


def add_layer(canvas: np.ndarray, layer: np.ndarray, start_seconds: float, gain: float = 1.0) -> None:
    start = seconds_to_samples(start_seconds)
    if start >= len(canvas):
        return
    count = min(len(layer), len(canvas) - start)
    canvas[start : start + count] += layer[:count] * gain


def shaped_envelope(
    duration: float,
    attack: float,
    release: float,
    decay_amount: float = 0.0,
    rise: bool = False,
) -> np.ndarray:
    count = seconds_to_samples(duration)
    envelope = np.ones(count, dtype=np.float64)
    attack_count = min(count, seconds_to_samples(attack))
    release_count = min(count, seconds_to_samples(release))
    if attack_count > 1:
        phase = np.linspace(0.0, math.pi / 2.0, attack_count, endpoint=True)
        envelope[:attack_count] *= np.square(np.sin(phase))
    if release_count > 1:
        phase = np.linspace(math.pi / 2.0, 0.0, release_count, endpoint=True)
        envelope[-release_count:] *= np.square(np.sin(phase))
    if decay_amount > 0.0:
        time = np.linspace(0.0, 1.0, count, endpoint=False)
        decay = np.exp(-decay_amount * time)
        envelope *= decay[::-1] if rise else decay
    return envelope


def filtered_noise(
    rng: np.random.Generator,
    duration: float,
    low_hz: float,
    high_hz: float,
) -> np.ndarray:
    count = seconds_to_samples(duration)
    noise = rng.standard_normal(count)
    spectrum = np.fft.rfft(noise)
    frequencies = np.fft.rfftfreq(count, 1.0 / SAMPLE_RATE)
    if low_hz > 0:
        high_pass = 1.0 - np.exp(-np.power(frequencies / max(low_hz, 1.0), 4.0))
    else:
        high_pass = np.ones_like(frequencies)
    low_pass = np.exp(-np.power(frequencies / max(high_hz, low_hz + 1.0), 6.0))
    spectrum *= high_pass * low_pass
    result = np.fft.irfft(spectrum, n=count)
    result_rms = rms(result)
    return result / max(result_rms, 1e-9)


def noise_burst(
    rng: np.random.Generator,
    duration: float,
    low_hz: float,
    high_hz: float,
    attack: float = 0.004,
    release: float = 0.05,
    decay_amount: float = 4.0,
    rise: bool = False,
) -> np.ndarray:
    noise = filtered_noise(rng, duration, low_hz, high_hz)
    return noise * shaped_envelope(duration, attack, release, decay_amount, rise)


def chirp_burst(
    rng: np.random.Generator,
    duration: float,
    start_hz: float,
    end_hz: float,
    noise_mix: float = 0.22,
    decay_amount: float = 7.0,
) -> np.ndarray:
    count = seconds_to_samples(duration)
    time = np.arange(count, dtype=np.float64) / SAMPLE_RATE
    slope = (end_hz - start_hz) / max(duration, 1e-6)
    phase = 2.0 * math.pi * (start_hz * time + 0.5 * slope * np.square(time))
    carrier = np.sin(phase)
    grit = filtered_noise(rng, duration, max(20.0, min(start_hz, end_hz) * 0.35), max(start_hz, end_hz) * 2.2)
    result = carrier * (1.0 - noise_mix) + grit * noise_mix
    return result * shaped_envelope(duration, 0.002, min(0.04, duration * 0.45), decay_amount)


def micro_click(rng: np.random.Generator, duration: float = 0.028, low_hz: float = 900.0, high_hz: float = 9500.0) -> np.ndarray:
    return noise_burst(rng, duration, low_hz, high_hz, attack=0.001, release=0.018, decay_amount=9.0)


def master(signal: np.ndarray, target_rms_dbfs: float, peak_ceiling_dbfs: float) -> np.ndarray:
    signal = signal.astype(np.float64, copy=True)
    signal -= float(np.mean(signal))
    fade_count = min(len(signal) // 2, seconds_to_samples(0.008))
    if fade_count > 1:
        fade = np.linspace(0.0, 1.0, fade_count, endpoint=True)
        signal[:fade_count] *= fade
        signal[-fade_count:] *= fade[::-1]
    current_rms = rms(signal)
    if current_rms <= 1e-9:
        raise ValueError("generated signal is silent")
    signal *= db_to_amp(target_rms_dbfs) / current_rms
    peak = float(np.max(np.abs(signal)))
    ceiling = db_to_amp(peak_ceiling_dbfs)
    if peak > ceiling:
        signal *= ceiling / peak
    return np.clip(signal, -1.0, 1.0)


def build_helmet_seal(rng: np.random.Generator) -> np.ndarray:
    signal = empty(0.86)
    add_layer(signal, noise_burst(rng, 0.48, 850, 10_000, 0.025, 0.18, 1.2), 0.015, 0.20)
    add_layer(signal, noise_burst(rng, 0.31, 170, 1_500, 0.018, 0.10, 1.6, rise=True), 0.18, 0.12)
    add_layer(signal, chirp_burst(rng, 0.15, 235, 72, 0.42, 8.0), 0.43, 0.33)
    add_layer(signal, micro_click(rng, 0.030, 1_200, 9_000), 0.47, 0.24)
    add_layer(signal, micro_click(rng, 0.024, 1_500, 11_000), 0.515, 0.16)
    add_layer(signal, noise_burst(rng, 0.24, 430, 4_500, 0.008, 0.16, 5.0), 0.55, 0.13)
    return signal


def build_floor_placement(rng: np.random.Generator) -> np.ndarray:
    signal = empty(0.76)
    add_layer(signal, noise_burst(rng, 0.34, 260, 3_600, 0.03, 0.035, 2.8, rise=True), 0.005, 0.16)
    add_layer(signal, chirp_burst(rng, 0.24, 118, 39, 0.48, 8.5), 0.29, 0.48)
    add_layer(signal, noise_burst(rng, 0.19, 34, 260, 0.002, 0.14, 7.5), 0.305, 0.44)
    add_layer(signal, micro_click(rng, 0.034, 750, 7_000), 0.315, 0.28)
    add_layer(signal, noise_burst(rng, 0.20, 270, 2_400, 0.006, 0.13, 6.0), 0.37, 0.14)
    add_layer(signal, micro_click(rng, 0.024, 900, 6_000), 0.49, 0.10)
    return signal


def build_bridge_pad_landing(rng: np.random.Generator) -> np.ndarray:
    signal = empty(0.58)
    add_layer(signal, noise_burst(rng, 0.16, 1_100, 11_000, 0.008, 0.045, 2.0, rise=True), 0.005, 0.13)
    add_layer(signal, noise_burst(rng, 0.13, 330, 3_100, 0.002, 0.09, 7.0), 0.135, 0.34)
    add_layer(signal, chirp_burst(rng, 0.105, 690, 185, 0.52, 10.0), 0.145, 0.20)
    add_layer(signal, micro_click(rng, 0.025, 1_300, 8_500), 0.165, 0.20)
    add_layer(signal, noise_burst(rng, 0.075, 480, 3_800, 0.002, 0.055, 8.0), 0.285, 0.13)
    add_layer(signal, noise_burst(rng, 0.060, 650, 4_600, 0.002, 0.045, 8.5), 0.385, 0.08)
    return signal


def build_seed_sprout(rng: np.random.Generator) -> np.ndarray:
    signal = empty(1.05)
    for start, gain, low, high in [
        (0.10, 0.16, 520, 5_200),
        (0.22, 0.13, 760, 6_800),
        (0.36, 0.11, 1_000, 8_500),
        (0.50, 0.08, 1_300, 10_000),
    ]:
        add_layer(signal, micro_click(rng, 0.030, low, high), start, gain)
    add_layer(signal, noise_burst(rng, 0.57, 620, 8_800, 0.06, 0.12, 2.2, rise=True), 0.16, 0.11)
    add_layer(signal, noise_burst(rng, 0.42, 1_700, 13_000, 0.025, 0.19, 2.8), 0.47, 0.09)
    add_layer(signal, noise_burst(rng, 0.16, 3_000, 15_000, 0.005, 0.12, 5.5), 0.73, 0.07)
    add_layer(signal, micro_click(rng, 0.022, 3_500, 14_000), 0.80, 0.06)
    return signal


def build_dongdong_footsteps(rng: np.random.Generator) -> np.ndarray:
    signal = empty(1.35)
    for start, weight in [(0.075, 1.0), (0.705, 0.92)]:
        add_layer(signal, noise_burst(rng, 0.27, 24, 480, 0.003, 0.18, 6.4), start, 0.48 * weight)
        add_layer(signal, noise_burst(rng, 0.23, 32, 1_050, 0.002, 0.16, 7.0), start + 0.008, 0.27 * weight)
        add_layer(signal, noise_burst(rng, 0.18, 150, 3_200, 0.002, 0.13, 7.0), start + 0.035, 0.18 * weight)
        add_layer(signal, micro_click(rng, 0.032, 420, 4_800), start + 0.10, 0.11 * weight)
    add_layer(signal, noise_burst(rng, 0.22, 45, 420, 0.012, 0.17, 7.0), 1.00, 0.08)
    return signal


def build_correct(rng: np.random.Generator) -> np.ndarray:
    signal = empty(0.46)
    add_layer(signal, noise_burst(rng, 0.135, 1_700, 5_800, 0.003, 0.095, 7.0), 0.005, 0.21)
    add_layer(signal, noise_burst(rng, 0.145, 3_300, 11_500, 0.003, 0.105, 7.8), 0.095, 0.16)
    add_layer(signal, micro_click(rng, 0.022, 2_400, 12_500), 0.205, 0.06)
    add_layer(signal, micro_click(rng, 0.020, 3_800, 15_000), 0.255, 0.045)
    return signal


def build_retry(rng: np.random.Generator) -> np.ndarray:
    signal = empty(0.42)
    add_layer(signal, noise_burst(rng, 0.25, 120, 1_250, 0.010, 0.17, 5.0), 0.005, 0.25)
    add_layer(signal, noise_burst(rng, 0.19, 420, 2_900, 0.005, 0.14, 6.0), 0.075, 0.11)
    add_layer(signal, micro_click(rng, 0.028, 480, 3_600), 0.185, 0.055)
    return signal


CUES = [
    CueSpec(
        "SFX-FOLEY-001", "helmet-seal", "头盔密封", "story_foley",
        "星芽头盔/气密服完成密封或重新密封；不承担教学答题提示。", 0.86, 41001, -20.0, -3.0, 0.52, 180,
        "宽带空气泄放渐弱 + 柔性密封摩擦 + 短促非稳态锁扣 + 余压消散。",
        "是否像安全、轻巧的气密闭合，而不是武器上膛或警报。", build_helmet_seal,
    ),
    CueSpec(
        "SFX-FOLEY-002", "floor-placement", "地板落位", "story_foley",
        "第一章地板组件下降并锁定；音效在目标钢琴音起音后出现。", 0.76, 41002, -19.0, -3.0, 0.50, 190,
        "短距离空气移动 + 低频非稳态落地冲击 + 玩具结构锁定碎响。",
        "落地重量感清楚，但不能比教学钢琴音更响或像爆炸。", build_floor_placement,
    ),
    CueSpec(
        "SFX-FOLEY-003", "bridge-pad-landing", "桥垫落地", "story_foley",
        "五线谱桥垫/落脚垫飞来并卡入；只强化世界变化，不替代音符反馈。", 0.58, 41003, -21.0, -4.0, 0.46, 170,
        "轻空气掠过 + 柔性垫片拍合 + 极短下滑弹性瞬态 + 两次安定触点。",
        "比地板更轻、更有弹性；不能形成可唱出的固定音高。", build_bridge_pad_landing,
    ),
    CueSpec(
        "SFX-FOLEY-004", "seed-sprout", "种子发芽", "story_foley",
        "第三章答对后种壳开裂、嫩芽舒展；目标钢琴音仍是听音主角。", 1.05, 41004, -24.0, -5.0, 0.44, 210,
        "四个土壳微裂瞬态 + 上扬但无音高的叶片摩擦噪声 + 短高频露珠质感。",
        "有生长方向感但不能像上行音阶，也不能尖锐刺耳。", build_seed_sprout,
    ),
    CueSpec(
        "SFX-FOLEY-005", "dongdong-footsteps", "咚咚脚步", "story_foley",
        "第四章从声音到剪影的两步揭晓；不把脚步当作低音 Do 的答案。", 1.35, 41005, -19.0, -3.0, 0.48, 160,
        "两组低频非稳态脚掌冲击 + 洞穴砂砾摩擦 + 轻微余震。",
        "体重感温和、两步可数；不能有怪兽威胁感或可辨识固定低音。", build_dongdong_footsteps,
    ),
    CueSpec(
        "SFX-FEEDBACK-001", "correct", "正确", "feedback",
        "单步正确后的轻亮确认；延后于目标钢琴起音，不重放答案音高。", 0.46, 42001, -24.0, -6.0, 0.40, 140,
        "两个宽频高区噪声闪点 + 两个极轻微碎光瞬态；全程无振荡器和旋律。",
        "轻、短、明亮，和钢琴并播仍不遮盖音头；不能像铃声或音名。", build_correct,
    ),
    CueSpec(
        "SFX-FEEDBACK-002", "retry", "轻柔再试", "feedback",
        "错误输入后的柔和触觉式提示；不惩罚、不下降、不形成稳定音高。", 0.42, 42002, -24.0, -6.0, 0.38, 120,
        "低中频毡布气团 + 宽频软刷 + 一个极轻触点；全程无振荡器和下行旋律。",
        "应像柔软的停一下再试，不像失败、警报、叹气或怪兽声音。", build_retry,
    ),
]


def write_pcm24_mono(path: Path, signal: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    clipped = np.clip(signal, -1.0, 1.0)
    integers = np.rint(clipped * 8_388_607.0).astype(np.int32)
    packed = np.empty((len(integers), 3), dtype=np.uint8)
    packed[:, 0] = integers & 0xFF
    packed[:, 1] = (integers >> 8) & 0xFF
    packed[:, 2] = (integers >> 16) & 0xFF
    with wave.open(str(path), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(3)
        handle.setframerate(SAMPLE_RATE)
        handle.writeframes(packed.tobytes())


def require_tool(name: str) -> str:
    executable = shutil.which(name)
    if not executable:
        raise RuntimeError(f"required executable not found: {name}")
    return executable


def run(command: list[str]) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(command, cwd=ROOT, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if result.returncode != 0:
        raise RuntimeError(f"command failed ({result.returncode}): {' '.join(command)}\n{result.stderr}")
    return result


def encode_aac(ffmpeg: str, source: Path, target: Path, bitrate: str = "96k") -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    run([
        ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
        "-map_metadata", "-1", "-fflags", "+bitexact", "-flags:a", "+bitexact",
        "-c:a", "aac", "-profile:a", "aac_low", "-b:a", bitrate, "-ar", str(SAMPLE_RATE), "-ac", "1",
        "-movflags", "+faststart", str(target),
    ])


def encode_opus(ffmpeg: str, source: Path, target: Path, bitrate: str = "64k") -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    run([
        ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
        "-map_metadata", "-1", "-fflags", "+bitexact", "-flags:a", "+bitexact",
        "-c:a", "libopus", "-b:a", bitrate, "-vbr", "on", "-compression_level", "10",
        "-application", "audio", "-ar", str(SAMPLE_RATE), "-ac", "1", str(target),
    ])


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def relpath(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def parse_number(value: object) -> float | None:
    try:
        number = float(str(value))
    except (TypeError, ValueError):
        return None
    return number if math.isfinite(number) else None


def loudness_metrics(ffmpeg: str, path: Path) -> dict[str, float | None]:
    result = run([
        ffmpeg, "-hide_banner", "-nostats", "-i", str(path),
        "-af", "loudnorm=I=-24:TP=-2:LRA=7:print_format=json", "-f", "null", "-",
    ])
    blocks = re.findall(r"\{\s*\"input_i\"[\s\S]*?\}", result.stderr)
    if not blocks:
        raise RuntimeError(f"could not parse loudness output for {path}")
    data = json.loads(blocks[-1])
    return {
        "integrated_lufs": parse_number(data.get("input_i")),
        "true_peak_dbtp": parse_number(data.get("input_tp")),
        "loudness_range_lu": parse_number(data.get("input_lra")),
        "threshold_lufs": parse_number(data.get("input_thresh")),
    }


def probe_metrics(ffprobe: str, path: Path) -> dict[str, object]:
    result = run([
        ffprobe, "-v", "error", "-show_entries",
        "stream=codec_name,codec_long_name,sample_rate,channels,bit_rate:format=duration,size,bit_rate",
        "-of", "json", str(path),
    ])
    data = json.loads(result.stdout)
    stream = (data.get("streams") or [{}])[0]
    container = data.get("format") or {}
    return {
        "codec": stream.get("codec_name"),
        "sample_rate_hz": int(stream.get("sample_rate") or 0),
        "channels": int(stream.get("channels") or 0),
        "duration_seconds": round(float(container.get("duration") or 0.0), 3),
        "bit_rate_bps": int(stream.get("bit_rate") or container.get("bit_rate") or 0),
        "file_size_bytes": int(container.get("size") or path.stat().st_size),
        "sha256": sha256(path),
    }


def source_metrics(ffmpeg: str, signal: np.ndarray, path: Path) -> dict[str, object]:
    result: dict[str, object] = {
        "codec": "pcm_s24le",
        "sample_rate_hz": SAMPLE_RATE,
        "bit_depth": 24,
        "channels": 1,
        "duration_seconds": round(len(signal) / SAMPLE_RATE, 3),
        "sample_peak_dbfs": round(amp_to_db(float(np.max(np.abs(signal)))), 2),
        "rms_dbfs": round(amp_to_db(rms(signal)), 2),
        "dc_offset": round(float(np.mean(signal)), 8),
        "file_size_bytes": path.stat().st_size,
        "sha256": sha256(path),
    }
    result.update(loudness_metrics(ffmpeg, path))
    return result


def periodicity_score(signal: np.ndarray) -> float:
    frame_size = 2048
    hop = 512
    scores: list[float] = []
    min_lag = int(SAMPLE_RATE / 1_200)
    max_lag = int(SAMPLE_RATE / 80)
    window = np.hanning(frame_size)
    active_threshold = max(rms(signal) * 0.18, 1e-6)
    for start in range(0, max(1, len(signal) - frame_size + 1), hop):
        frame = signal[start : start + frame_size]
        if len(frame) < frame_size or rms(frame) < active_threshold:
            continue
        frame = (frame - np.mean(frame)) * window
        spectrum = np.fft.rfft(frame, n=frame_size * 2)
        autocorrelation = np.fft.irfft(np.abs(spectrum) ** 2)
        zero = float(autocorrelation[0])
        if zero <= 1e-12:
            continue
        scores.append(float(np.max(np.abs(autocorrelation[min_lag:max_lag])) / zero))
    return round(float(np.median(scores)) if scores else 0.0, 4)


def spectral_centroid(signal: np.ndarray) -> float:
    windowed = signal * np.hanning(len(signal))
    spectrum = np.abs(np.fft.rfft(windowed))
    frequencies = np.fft.rfftfreq(len(signal), 1.0 / SAMPLE_RATE)
    return float(np.sum(frequencies * spectrum) / max(np.sum(spectrum), 1e-12))


def make_piano_reference(frequency_hz: float) -> np.ndarray:
    duration = 0.82
    count = seconds_to_samples(duration)
    time = np.arange(count, dtype=np.float64) / SAMPLE_RATE
    triangle = (2.0 / math.pi) * np.arcsin(np.sin(2.0 * math.pi * frequency_hz * time))
    signal = 0.78 * triangle
    signal += 0.20 * np.sin(2.0 * math.pi * frequency_hz * 2.0 * time + 0.05)
    signal += 0.10 * np.sin(2.0 * math.pi * frequency_hz * 3.0 * time - 0.08)
    signal += 0.045 * np.sin(2.0 * math.pi * frequency_hz * 4.0 * time)
    attack = np.minimum(1.0, time / 0.008)
    body = 0.24 + 0.76 * np.exp(-4.6 * time)
    release = np.ones_like(time)
    release_start = duration - 0.14
    tail_mask = time >= release_start
    release[tail_mask] = np.square(np.cos((time[tail_mask] - release_start) / 0.14 * math.pi / 2.0))
    signal *= attack * body * release
    signal -= np.mean(signal)
    signal *= db_to_amp(-6.0) / max(float(np.max(np.abs(signal))), 1e-9)
    return signal


def sfx_gain_envelope(spec: CueSpec, cue_samples: int, ducked: bool) -> np.ndarray:
    """Return the effect-only envelope; the piano reference is never scaled."""
    gain = np.full(cue_samples, spec.recommended_gain, dtype=np.float64)
    if not ducked:
        return gain

    offset = spec.trigger_delay_ms / 1000.0
    absolute_time = offset + np.arange(cue_samples, dtype=np.float64) / SAMPLE_RATE
    duck_multiplier = db_to_amp(DUCK_DB)
    protected = absolute_time <= PROTECTION_WINDOW_SECONDS
    gain[protected] *= duck_multiplier
    release_end = PROTECTION_WINDOW_SECONDS + RELEASE_SECONDS
    release = (absolute_time > PROTECTION_WINDOW_SECONDS) & (absolute_time < release_end)
    if np.any(release):
        progress = (absolute_time[release] - PROTECTION_WINDOW_SECONDS) / RELEASE_SECONDS
        gain[release] *= duck_multiplier + (1.0 - duck_multiplier) * progress
    return gain


def duck_contract_measurement(spec: CueSpec, cue_samples: int) -> dict[str, object]:
    """Audit the deterministic mix control signal, not perceived loudness."""
    gain = sfx_gain_envelope(spec, cue_samples, ducked=True)
    baseline = spec.recommended_gain
    multiplier = gain / max(baseline, 1e-12)
    absolute_time = spec.trigger_delay_ms / 1000.0 + np.arange(cue_samples, dtype=np.float64) / SAMPLE_RATE
    protected = (absolute_time >= 0.0) & (absolute_time <= PROTECTION_WINDOW_SECONDS)
    release = (absolute_time > PROTECTION_WINDOW_SECONDS) & (
        absolute_time < PROTECTION_WINDOW_SECONDS + RELEASE_SECONDS
    )
    first_release = absolute_time[release][0] if np.any(release) else None
    worst_window_duck_db = amp_to_db(float(np.max(multiplier[protected]))) if np.any(protected) else None
    release_not_applicable = first_release is None and bool(np.all(absolute_time <= PROTECTION_WINDOW_SECONDS))
    return {
        "measurement": "deterministic SFX gain-envelope inspection; not a runtime or human-listening approval",
        "note_bus_gain_before_t0": 1.0,
        "note_bus_gain_t0_to_540ms": 1.0,
        "sfx_first_sample_after_note_onset_ms": spec.trigger_delay_ms,
        "sfx_pre_onset_samples": int(np.count_nonzero(absolute_time < 0.0)),
        "sfx_pre_onset_multiplier": 1.0,
        "required_duck_db_t0_to_540ms": DUCK_DB,
        "worst_case_duck_db_t0_to_540ms": round(worst_window_duck_db or 0.0, 4),
        "release_starts_after_ms": round(first_release * 1000.0, 4) if first_release is not None else None,
        "release_ends_at_ms": int(round((PROTECTION_WINDOW_SECONDS + RELEASE_SECONDS) * 1000.0)),
        "release_not_applicable_cue_ends_in_protection_window": release_not_applicable,
        "no_pre_onset_duck": True,
        "note_bus_unity": True,
        "window_duck_pass": bool(
            np.any(protected) and worst_window_duck_db is not None and worst_window_duck_db <= DUCK_DB + 1e-9
        ),
        "release_after_window_pass": bool(
            (first_release is not None and first_release > PROTECTION_WINDOW_SECONDS) or release_not_applicable
        ),
    }


def mix_with_piano(piano: np.ndarray, cue: np.ndarray, spec: CueSpec, ducked: bool) -> np.ndarray:
    offset = spec.trigger_delay_ms / 1000.0
    duration = max(len(piano) / SAMPLE_RATE, offset + len(cue) / SAMPLE_RATE) + 0.16
    mix = empty(duration)
    add_layer(mix, piano, 0.0, 1.0)
    cue_gain = sfx_gain_envelope(spec, len(cue), ducked)
    add_layer(mix, cue * cue_gain, offset, 1.0)
    peak = float(np.max(np.abs(mix)))
    ceiling = db_to_amp(-1.0)
    if peak > ceiling:
        raise RuntimeError(
            f"{spec.slug}: review mix would require whole-mix normalization, which would duck noteBus ({amp_to_db(peak):.2f} dBFS)"
        )
    return mix


def file_record(ffmpeg: str, ffprobe: str, path: Path, role: str) -> dict[str, object]:
    record = {"path": relpath(path), "role": role}
    record.update(probe_metrics(ffprobe, path))
    record.update(loudness_metrics(ffmpeg, path))
    return record


def generate() -> dict[str, object]:
    ffmpeg = require_tool("ffmpeg")
    ffprobe = require_tool("ffprobe")
    for directory in (SOURCE_DIR, RUNTIME_DIR, MIX_DIR, REFERENCE_DIR):
        directory.mkdir(parents=True, exist_ok=True)

    piano_references: dict[str, np.ndarray] = {}
    review_references: list[dict[str, object]] = []
    for note in REVIEW_PIANO_NOTES:
        piano = make_piano_reference(float(note["frequency_hz"]))
        piano_wav = REFERENCE_DIR / f"teaching-piano-{note['id']}_reference.wav"
        piano_m4a = REFERENCE_DIR / f"teaching-piano-{note['id']}_reference.m4a"
        write_pcm24_mono(piano_wav, piano)
        encode_aac(ffmpeg, piano_wav, piano_m4a, "112k")
        piano_references[str(note["id"])] = piano
        review_references.append({
            "note_id": note["id"],
            "label": note["label"],
            "frequency_hz": note["frequency_hz"],
            "review_only": True,
            "runtime_approved": False,
            "runtimeApproval": False,
            "asset_status": "source_concept",
            "source_wav": file_record(ffmpeg, ffprobe, piano_wav, f"review-only {note['label']} teaching-piano reference WAV"),
            "web_m4a": file_record(ffmpeg, ffprobe, piano_m4a, f"review-only {note['label']} teaching-piano reference AAC"),
        })

    assets: list[dict[str, object]] = []
    for spec in CUES:
        rng = np.random.default_rng(spec.seed)
        raw = spec.builder(rng)
        expected_samples = seconds_to_samples(spec.duration)
        if len(raw) != expected_samples:
            raise ValueError(f"{spec.slug}: expected {expected_samples} samples, got {len(raw)}")
        signal = master(raw, spec.target_rms_dbfs, spec.peak_ceiling_dbfs)

        source_path = SOURCE_DIR / f"{spec.slug}_{VERSION}_source.wav"
        aac_path = RUNTIME_DIR / f"{spec.slug}_{VERSION}.m4a"
        opus_path = RUNTIME_DIR / f"{spec.slug}_{VERSION}.ogg"
        write_pcm24_mono(source_path, signal)
        encode_aac(ffmpeg, source_path, aac_path)
        encode_opus(ffmpeg, source_path, opus_path)

        ls04_review_mixes: list[dict[str, object]] = []
        if spec.slug in LS04_REVIEW_SLUGS:
            for note in REVIEW_PIANO_NOTES:
                for variant, ducked, role in (
                    ("a_no_duck", False, "A stress overlay without SFX ducking"),
                    ("b_piano_priority", True, "B piano-priority overlay with SFX ducking"),
                ):
                    mix = mix_with_piano(piano_references[str(note["id"])], signal, spec, ducked=ducked)
                    temporary_wav = MIX_DIR / f"{spec.slug}_{VERSION}_{note['id']}_{variant}.tmp.wav"
                    mix_m4a = MIX_DIR / f"{spec.slug}_{VERSION}_{note['id']}_{variant}.m4a"
                    write_pcm24_mono(temporary_wav, mix)
                    encode_aac(ffmpeg, temporary_wav, mix_m4a, "112k")
                    temporary_wav.unlink()
                    record = file_record(ffmpeg, ffprobe, mix_m4a, role)
                    record.update({
                        "review_note_id": note["id"],
                        "review_note_label": note["label"],
                        "review_note_frequency_hz": note["frequency_hz"],
                        "variant": variant,
                        "review_only": True,
                        "runtime_approved": False,
                        "runtimeApproval": False,
                        "asset_status": "runtime_candidate_unapproved",
                    })
                    ls04_review_mixes.append(record)

        duck_measurement = duck_contract_measurement(spec, len(signal)) if spec.slug in LS04_REVIEW_SLUGS else None

        periodicity = periodicity_score(signal)
        pitch_screen = {
            "contains_intentional_stable_pitch": False,
            "periodicity_score_0_to_1": periodicity,
            "screen_threshold": 0.58,
            "result": "pass" if periodicity < 0.58 else "manual_review",
            "note": "Transient/noise cue; score is a screening metric, not a musical-pitch detector approval.",
        }
        if spec.category == "feedback" and periodicity >= 0.58:
            raise RuntimeError(f"{spec.slug}: feedback periodicity screen failed ({periodicity})")

        centroid_hz = round(spectral_centroid(signal), 1)
        feedback_experience_screen: dict[str, object] | None = None
        if spec.slug == "correct":
            feedback_experience_screen = {
                "intended_feeling": "short, gentle, bright confirmation",
                "design_contrast_with_retry": "shorter bright-band transient design; spectral centroid is recorded for comparison only",
                "duration_seconds": spec.duration,
                "spectral_centroid_hz": centroid_hz,
                "peak_ceiling_dbfs": spec.peak_ceiling_dbfs,
                "automatic_result": "pass_screening_only",
                "human_listening_status": "missing_not_a_fright_or_attention_capture_approval",
            }
        elif spec.slug == "retry":
            feedback_experience_screen = {
                "intended_feeling": "soft neutral pause and try again, never a failure alarm",
                "design_contrast_with_correct": "lower-mid broadband texture and lower spectral centroid; this is not a human emotion verdict",
                "duration_seconds": spec.duration,
                "spectral_centroid_hz": centroid_hz,
                "peak_ceiling_dbfs": spec.peak_ceiling_dbfs,
                "automatic_result": "pass_screening_only",
                "human_listening_status": "missing_not_a_fright_or_attention_capture_approval",
            }

        assets.append({
            "asset_id": spec.asset_id,
            "slug": spec.slug,
            "name_zh": spec.name_zh,
            "category": spec.category,
            "story_use": spec.story_use,
            "status": {
                "source": "source_concept",
                "runtime": "runtime_candidate_unapproved",
                "release_allowed": False,
            },
            "source_and_license": {
                "source_type": "original_deterministic_procedural_synthesis",
                "external_samples": False,
                "external_recordings": False,
                "generative_ai_service": False,
                "generator": relpath(Path(__file__).resolve()),
                "seed": spec.seed,
                "generation_date": GENERATION_DATE,
                "license_note": "Original project-authored DSP recipe; no third-party audio incorporated. Project owner must assign the final release license.",
            },
            "synthesis_recipe": spec.recipe,
            "trigger_contract": {
                "recommended_delay_after_teaching_note_ms": spec.trigger_delay_ms,
                "recommended_effect_gain": spec.recommended_gain,
                "route": "effectBus, never noteBus",
                "piano_priority_duck_db": DUCK_DB,
                "duck_protection_window_ms": 540,
                "duck_release_ms": 140,
                "runtime_effect_bus_cap": 0.36,
                "note": "Cutscene-only use may omit the note-relative delay; during teaching playback the effect bus is attenuated, never the piano bus.",
            },
            "pitch_contract": pitch_screen,
            "answer_note_risk_screen": {
                "tested_against": [
                    {"label": note["label"], "frequency_hz": note["frequency_hz"]}
                    for note in REVIEW_PIANO_NOTES
                ],
                "method": "The source is deterministic broadband/transient DSP. Periodicity is screened before review; no stable C4/D4 oscillator or piano replay is present.",
                "periodicity_score_0_to_1": periodicity,
                "stable_pitch_screen": "pass" if periodicity < 0.58 else "manual_review",
                "answer_hint_result": "pass_screening_only" if periodicity < 0.58 else "manual_review",
                "human_listening_required": True,
            },
            "feedback_experience_screen": feedback_experience_screen,
            "analysis": {
                "spectral_centroid_hz": centroid_hz,
                "source": source_metrics(ffmpeg, signal, source_path),
            },
            "files": {
                "source_wav": relpath(source_path),
                "runtime_candidates": [
                    file_record(ffmpeg, ffprobe, aac_path, "AAC-LC primary iPad/web candidate"),
                    file_record(ffmpeg, ffprobe, opus_path, "Opus web candidate"),
                ],
                "review_mixes": [
                    *ls04_review_mixes,
                ],
            },
            "ls04_offline_ab_review": {
                "in_scope": spec.slug in LS04_REVIEW_SLUGS,
                "status": "automatic_contract_passed_human_listening_missing" if spec.slug in LS04_REVIEW_SLUGS else "not_in_ls04_scope",
                "runtime_approval": False,
                "runtimeApproval": False,
                "mixes_expected": 4 if spec.slug in LS04_REVIEW_SLUGS else 0,
                "duck_measurement": duck_measurement,
                "human_hearing_status": "missing_headphones_speakers_ipad",
            },
            "review_focus": spec.review_focus,
        })

    manifest: dict[str, object] = {
        "schema_version": 2,
        "batch_id": f"star-dino-first-nonvoice-audio-{GENERATION_DATE}-{VERSION}",
        "generated_on": GENERATION_DATE,
        "scope": "Seven non-voice source concepts and web runtime candidates. LS04 adds a C4/D4 offline A/B review for seed-sprout, correct, and retry only. No application runtime integration.",
        "approval_state": "all_assets_require_human_review",
        "provenance": {
            "method": "deterministic local procedural DSP",
            "external_audio_used": False,
            "network_or_model_calls": False,
            "voice_or_child_recordings_used": False,
            "generator": relpath(Path(__file__).resolve()),
            "generator_sha256": sha256(Path(__file__).resolve()),
        },
        "format_contract": {
            "source": "48 kHz, 24-bit PCM, mono WAV",
            "runtime_primary": "48 kHz mono AAC-LC in M4A, 96 kbps target",
            "runtime_alternate": "48 kHz mono Opus in Ogg, 64 kbps target",
            "runtime_destination_after_approval_only": "assets/runtime/audio",
        },
        "mix_contract": {
            "teaching_piano_bus": "unity/reference priority; never duck for feedback or Foley",
            "effects_bus": "route all seven cues to effectBus; existing prototype cap is 0.36",
            "simultaneous_note_rule": "do not duck before note onset; delay cue 120-210 ms, attenuate effects by at least 8 dB from t=0 through 540 ms, then release over 140 ms",
            "review_stress_notes": "C4 at 261.625565 Hz and D4 at 293.664768 Hz; synthesized review references only, never runtime piano assets",
            "headphone_device_gate": "loudness values are file measurements only; physical iPad speaker/headphone comfort review remains required",
        },
        "review_references": review_references,
        "ls04_offline_ab_review": {
            "scope": "seed-sprout, correct, retry; each has C4/D4 by A no-duck and B piano-priority mixes",
            "review_only": True,
            "runtime_approval": False,
            "runtimeApproval": False,
            "automatic_contract_status": "passed",
            "human_headphone_speaker_ipad_status": "missing",
        },
        "assets": assets,
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    review_data = {
        "batch_id": manifest["batch_id"],
        "generated_on": GENERATION_DATE,
        "approval_state": manifest["approval_state"],
        "mix_contract": manifest["mix_contract"],
        "review_references": [
            {
                "note_id": item["note_id"],
                "label": item["label"],
                "frequency_hz": item["frequency_hz"],
                "path": (ROOT / str(item["web_m4a"]["path"])).relative_to(REVIEW_DIR).as_posix(),
            }
            for item in manifest["review_references"]
        ],
        "assets": [
            {
                "asset_id": item["asset_id"],
                "slug": item["slug"],
                "name_zh": item["name_zh"],
                "category": item["category"],
                "story_use": item["story_use"],
                "status": item["status"]["runtime"],
                "recipe": item["synthesis_recipe"],
                "review_focus": item["review_focus"],
                "trigger": item["trigger_contract"],
                "pitch": item["pitch_contract"],
                "answer_note_risk": item["answer_note_risk_screen"],
                "feedback_experience": item["feedback_experience_screen"],
                "analysis": item["analysis"],
                "ls04_review": {
                    "status": item["ls04_offline_ab_review"]["status"],
                    "duck_measurement": item["ls04_offline_ab_review"]["duck_measurement"],
                    "human_hearing_status": item["ls04_offline_ab_review"]["human_hearing_status"],
                    "mixes": [
                        {
                            "note_id": record["review_note_id"],
                            "note_label": record["review_note_label"],
                            "frequency_hz": record["review_note_frequency_hz"],
                            "variant": record["variant"],
                            "path": (ROOT / str(record["path"])).relative_to(REVIEW_DIR).as_posix(),
                        }
                        for record in item["files"]["review_mixes"]
                    ],
                },
                "paths": {
                    "source_wav": f"../source-concepts/{item['slug']}_{VERSION}_source.wav",
                    "runtime_m4a": f"../runtime-candidates/{item['slug']}_{VERSION}.m4a",
                    "runtime_ogg": f"../runtime-candidates/{item['slug']}_{VERSION}.ogg",
                },
            }
            for item in assets
            if item["slug"] in LS04_REVIEW_SLUGS
        ],
    }
    REVIEW_DATA_PATH.write_text(
        "window.AUDIO_REVIEW_DATA = " + json.dumps(review_data, ensure_ascii=False, indent=2) + ";\n",
        encoding="utf-8",
    )
    return manifest


def verify(manifest: dict[str, object]) -> None:
    assets = manifest.get("assets") or []
    if len(assets) != 7:
        raise RuntimeError(f"expected 7 assets, found {len(assets)}")
    hashes: set[str] = set()
    failures: list[str] = []

    def verify_record(record: dict[str, object], label: str) -> None:
        relative = str(record.get("path") or "")
        path = ROOT / relative
        if not path.is_file() or path.stat().st_size <= 128:
            failures.append(f"{label}: missing/empty file {relative}")
            return
        actual_hash = sha256(path)
        if actual_hash != record.get("sha256"):
            failures.append(f"{label}: hash mismatch {relative}")

    references = manifest.get("review_references") or []
    expected_notes = {str(note["id"]): note for note in REVIEW_PIANO_NOTES}
    if len(references) != len(expected_notes):
        failures.append(f"expected {len(expected_notes)} review references, found {len(references)}")
    for reference in references:
        note_id = str(reference.get("note_id") or "")
        expected = expected_notes.get(note_id)
        if not expected:
            failures.append(f"unexpected review note {note_id}")
            continue
        if reference.get("frequency_hz") != expected["frequency_hz"]:
            failures.append(f"{note_id}: reference frequency mismatch")
        if reference.get("runtime_approved") or reference.get("runtimeApproval") or not reference.get("review_only"):
            failures.append(f"{note_id}: reference approval flags are invalid")
        verify_record(reference["source_wav"], f"{note_id} reference WAV")
        verify_record(reference["web_m4a"], f"{note_id} reference AAC")

    for item in assets:
        source = item["analysis"]["source"]
        if source["sample_rate_hz"] != SAMPLE_RATE or source["bit_depth"] != 24 or source["channels"] != 1:
            failures.append(f"{item['slug']}: invalid source format")
        if source["sample_peak_dbfs"] > -2.9:
            failures.append(f"{item['slug']}: source peak exceeds -2.9 dBFS")
        if source["integrated_lufs"] is None:
            failures.append(f"{item['slug']}: missing LUFS measurement")
        if item["category"] == "feedback" and item["pitch_contract"]["result"] != "pass":
            failures.append(f"{item['slug']}: stable-pitch screen did not pass")
        source_path = ROOT / item["files"]["source_wav"]
        if not source_path.is_file() or source_path.stat().st_size <= 128:
            failures.append(f"{item['slug']}: missing/empty source WAV")
        elif sha256(source_path) != source["sha256"]:
            failures.append(f"{item['slug']}: source hash mismatch")
        for record in item["files"]["runtime_candidates"]:
            verify_record(record, f"{item['slug']} runtime candidate")
            if record["sample_rate_hz"] != SAMPLE_RATE or record["channels"] != 1:
                failures.append(f"{item['slug']}: invalid runtime format {record['path']}")
            if record["sha256"] in hashes:
                failures.append(f"{item['slug']}: duplicate runtime hash {record['path']}")
            hashes.add(record["sha256"])

        is_ls04 = item["slug"] in LS04_REVIEW_SLUGS
        review = item["ls04_offline_ab_review"]
        review_mixes = item["files"]["review_mixes"]
        if not is_ls04:
            if review["status"] != "not_in_ls04_scope" or review_mixes:
                failures.append(f"{item['slug']}: non-LS04 cue unexpectedly has LS04 mixes")
            continue

        if item["pitch_contract"]["result"] != "pass" or item["answer_note_risk_screen"]["answer_hint_result"] != "pass_screening_only":
            failures.append(f"{item['slug']}: C4/D4 answer-risk screen did not pass")
        if item["category"] == "feedback":
            experience = item.get("feedback_experience_screen") or {}
            if experience.get("automatic_result") != "pass_screening_only" or not str(experience.get("human_listening_status") or "").startswith("missing_"):
                failures.append(f"{item['slug']}: feedback experience screen must retain a human-hearing gap")
        if review["status"] != "automatic_contract_passed_human_listening_missing" or review["runtime_approval"] or review["runtimeApproval"]:
            failures.append(f"{item['slug']}: invalid LS04 review approval state")
        if review["human_hearing_status"] != "missing_headphones_speakers_ipad":
            failures.append(f"{item['slug']}: human hearing gate must remain missing")
        expected_mix_ids = {(note_id, variant) for note_id in expected_notes for variant in ("a_no_duck", "b_piano_priority")}
        actual_mix_ids = {(record.get("review_note_id"), record.get("variant")) for record in review_mixes}
        if actual_mix_ids != expected_mix_ids:
            failures.append(f"{item['slug']}: LS04 mix matrix is incomplete")
        for record in review_mixes:
            verify_record(record, f"{item['slug']} LS04 review mix")
            if record.get("runtime_approved") or record.get("runtimeApproval") or not record.get("review_only"):
                failures.append(f"{item['slug']}: LS04 review mix approval flags are invalid")

        duck = review["duck_measurement"]
        if duck["note_bus_gain_before_t0"] != 1.0 or duck["note_bus_gain_t0_to_540ms"] != 1.0:
            failures.append(f"{item['slug']}: note bus is not unity in audit")
        if duck["sfx_pre_onset_samples"] != 0 or duck["sfx_pre_onset_multiplier"] != 1.0 or not duck["no_pre_onset_duck"]:
            failures.append(f"{item['slug']}: pre-onset duck audit failed")
        if duck["sfx_first_sample_after_note_onset_ms"] != item["trigger_contract"]["recommended_delay_after_teaching_note_ms"]:
            failures.append(f"{item['slug']}: trigger delay audit mismatch")
        if not duck["window_duck_pass"] or duck["worst_case_duck_db_t0_to_540ms"] > DUCK_DB + 1e-9:
            failures.append(f"{item['slug']}: 540 ms duck audit failed")
        release_starts = duck["release_starts_after_ms"]
        if not duck["release_after_window_pass"] or (
            release_starts is not None and release_starts <= PROTECTION_WINDOW_SECONDS * 1000.0
        ):
            failures.append(f"{item['slug']}: release starts too early")
    if failures:
        raise RuntimeError("verification failed:\n- " + "\n- ".join(failures))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--verify-only", action="store_true", help="verify the existing generated manifest/files")
    args = parser.parse_args()
    if args.verify_only:
        if not MANIFEST_PATH.is_file():
            raise RuntimeError(f"manifest not found: {MANIFEST_PATH}")
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
    else:
        manifest = generate()
    verify(manifest)
    print(f"audio batch verified: {len(manifest['assets'])} assets")
    for item in manifest["assets"]:
        source = item["analysis"]["source"]
        print(
            f"- {item['asset_id']} {item['slug']}: {source['duration_seconds']:.3f}s, "
            f"{source['integrated_lufs']:.1f} LUFS, {source['true_peak_dbtp']:.1f} dBTP, "
            f"periodicity {item['pitch_contract']['periodicity_score_0_to_1']:.4f}"
        )
    print(f"manifest: {relpath(MANIFEST_PATH)}")
    print(f"review page: {relpath(REVIEW_DIR / 'index.html')}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"error: {error}", file=sys.stderr)
        raise SystemExit(1)
