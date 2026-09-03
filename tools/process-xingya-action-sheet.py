#!/usr/bin/env python3
"""Split the approved Xingya action sheet into normalized runtime WebP assets."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


DEFAULT_LAYOUT = {
    "input": "concepts/generated-v2/xingya-sealed-action-sheet-v1-alpha.png",
    "grid": {"columns": 3, "rows": 2},
    "runtime": {
        "prefix": "xingya-suit",
        "canvasSize": 512,
        "subjectHeight": 430,
        "maxSubjectWidth": 464,
        "bottomMargin": 24,
        "webpQuality": 86,
        "webpMethod": 6,
        "maxBytes": 100_000,
    },
    "visor": {
        "bounds": [106, 62, 333, 280],
        "tint": [111, 209, 229],
        "opacity": 52,
        "edgeFeather": 2,
        "highlightBounds": [129, 81, 199, 147],
        "highlightOpacity": 42,
    },
    "poses": [
        {"name": "point", "column": 0, "row": 0},
        {"name": "listen", "column": 1, "row": 0},
        {"name": "good", "column": 2, "row": 0},
        {"name": "try-again", "column": 0, "row": 1},
        {"name": "celebrate", "column": 1, "row": 1, "crop": {"right": -24}},
        {"name": "jump", "column": 2, "row": 1, "crop": {"left": -24}},
    ],
}


def resolve_config_path(value: str, base_dir: Path) -> Path:
    candidate = Path(value)
    return candidate if candidate.is_absolute() else (base_dir / candidate)


def load_layout(manifest: Path | None) -> tuple[dict, Path]:
    if manifest is None:
        return json.loads(json.dumps(DEFAULT_LAYOUT)), Path.cwd()

    with manifest.open("r", encoding="utf-8") as handle:
        layout = json.load(handle)
    if not isinstance(layout, dict):
        raise ValueError("Action-sheet manifest must be a JSON object")
    return layout, manifest.parent


def validate_visor(visor: dict, runtime: dict, label: str) -> None:
    if not isinstance(visor, dict):
        raise ValueError(f"{label} must be an object")
    allowed_keys = {"bounds", "tint", "opacity", "edgeFeather", "highlightBounds", "highlightOpacity"}
    unknown_keys = set(visor) - allowed_keys
    if unknown_keys:
        raise ValueError(f"{label} has unsupported keys: {', '.join(sorted(unknown_keys))}")
    bounds = visor.get("bounds")
    highlight_bounds = visor.get("highlightBounds")
    canvas_size = runtime["canvasSize"]
    if (
        not isinstance(bounds, list)
        or len(bounds) != 4
        or not all(isinstance(value, int) for value in bounds)
        or not 0 <= bounds[0] < bounds[2] <= canvas_size
        or not 0 <= bounds[1] < bounds[3] <= canvas_size
    ):
        raise ValueError(f"{label}.bounds must be an in-canvas [left, top, right, bottom] rectangle")
    if (
        not isinstance(highlight_bounds, list)
        or len(highlight_bounds) != 4
        or not all(isinstance(value, int) for value in highlight_bounds)
        or not bounds[0] <= highlight_bounds[0] < highlight_bounds[2] <= bounds[2]
        or not bounds[1] <= highlight_bounds[1] < highlight_bounds[3] <= bounds[3]
    ):
        raise ValueError(f"{label}.highlightBounds must fall inside {label}.bounds")
    tint = visor.get("tint")
    if not isinstance(tint, list) or len(tint) != 3 or not all(isinstance(value, int) and 0 <= value <= 255 for value in tint):
        raise ValueError(f"{label}.tint must be an RGB array")
    for key in ("opacity", "edgeFeather", "highlightOpacity"):
        if not isinstance(visor.get(key), int) or not 0 <= visor[key] <= 255:
            raise ValueError(f"{label}.{key} must be an integer between 0 and 255")


def validate_layout(layout: dict) -> None:
    grid = layout.get("grid")
    runtime = layout.get("runtime")
    poses = layout.get("poses")
    if not isinstance(layout.get("input"), str) or not layout["input"]:
        raise ValueError("Action-sheet manifest requires a non-empty input path")
    if not isinstance(grid, dict) or not all(isinstance(grid.get(key), int) and grid[key] > 0 for key in ("columns", "rows")):
        raise ValueError("Action-sheet manifest requires positive grid.columns and grid.rows")
    if not isinstance(runtime, dict):
        raise ValueError("Action-sheet manifest requires a runtime object")
    for key in ("prefix", "canvasSize", "subjectHeight", "maxSubjectWidth", "bottomMargin", "webpQuality", "webpMethod", "maxBytes"):
        if key not in runtime:
            raise ValueError(f"Action-sheet manifest runtime is missing {key}")
    if not isinstance(runtime["prefix"], str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]*", runtime["prefix"]):
        raise ValueError("Action-sheet runtime.prefix must use lowercase letters, numbers, and hyphens")
    for key in ("canvasSize", "subjectHeight", "maxSubjectWidth", "bottomMargin", "webpQuality", "webpMethod", "maxBytes"):
        if not isinstance(runtime[key], int) or runtime[key] <= 0:
            raise ValueError(f"Action-sheet runtime.{key} must be a positive integer")

    validate_visor(layout.get("visor"), runtime, "Action-sheet visor")
    if not isinstance(poses, list) or not poses:
        raise ValueError("Action-sheet manifest requires at least one pose")

    names: set[str] = set()
    for pose in poses:
        if not isinstance(pose, dict):
            raise ValueError("Every action-sheet pose must be an object")
        name = pose.get("name")
        if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9][a-z0-9-]*", name) or name in names:
            raise ValueError(f"Invalid or duplicate action-sheet pose name: {name}")
        names.add(name)
        if not isinstance(pose.get("column"), int) or not 0 <= pose["column"] < grid["columns"]:
            raise ValueError(f"{name}: column is outside the configured grid")
        if not isinstance(pose.get("row"), int) or not 0 <= pose["row"] < grid["rows"]:
            raise ValueError(f"{name}: row is outside the configured grid")
        crop = pose.get("crop", {})
        if not isinstance(crop, dict) or any(key not in {"left", "top", "right", "bottom"} for key in crop):
            raise ValueError(f"{name}: crop adjustments must use left, top, right, or bottom")
        if any(not isinstance(value, int) for value in crop.values()):
            raise ValueError(f"{name}: crop adjustments must be integer source pixels")
        pose_visor = pose.get("visor")
        if pose_visor is not None:
            if not isinstance(pose_visor, dict):
                raise ValueError(f"{name}: visor override must be an object")
            merged_visor = {**layout["visor"], **pose_visor}
            validate_visor(merged_visor, runtime, f"{name}: visor override")

    expected = layout.get("expectedSha256", {})
    if not isinstance(expected, dict):
        raise ValueError("expectedSha256 must be an object when provided")
    for name, digest in expected.items():
        if name not in names or not isinstance(digest, str) or not re.fullmatch(r"[a-fA-F0-9]{64}", digest):
            raise ValueError(f"Invalid expectedSha256 entry for {name}")


def normalize_cell(cell: Image.Image, runtime: dict) -> Image.Image:
    alpha = cell.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        raise ValueError("Action-sheet cell has no visible subject")

    subject = cell.crop(bbox)
    scale = min(
        runtime["subjectHeight"] / subject.height,
        runtime["maxSubjectWidth"] / subject.width,
    )
    target_size = (
        max(1, round(subject.width * scale)),
        max(1, round(subject.height * scale)),
    )
    subject = subject.resize(target_size, Image.Resampling.LANCZOS)

    canvas_size = runtime["canvasSize"]
    canvas = Image.new("RGBA", (canvas_size, canvas_size), (0, 0, 0, 0))
    left = (canvas_size - subject.width) // 2
    top = canvas_size - runtime["bottomMargin"] - subject.height
    if top < 8:
        top = 8
    canvas.alpha_composite(subject, (left, top))
    return canvas


def _ellipse_mask(size: tuple[int, int], bounds: list[int], feather: int) -> Image.Image:
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).ellipse(bounds, fill=255)
    return mask.filter(ImageFilter.GaussianBlur(radius=feather)) if feather else mask


def add_semitransparent_visor(image: Image.Image, visor: dict) -> Image.Image:
    """Give every helmet the same restrained glass tint without covering its rim."""
    size = image.size
    feather = visor["edgeFeather"]
    glass_mask = _ellipse_mask(size, visor["bounds"], feather)
    base_alpha = glass_mask.point(lambda value: value * visor["opacity"] // 255)
    base = Image.new("RGBA", size, (*visor["tint"], 0))
    base.putalpha(base_alpha)

    highlight_mask = _ellipse_mask(size, visor["highlightBounds"], feather + 3)
    highlight_mask = ImageChops.multiply(highlight_mask, glass_mask)
    highlight_alpha = highlight_mask.point(lambda value: value * visor["highlightOpacity"] // 255)
    highlight = Image.new("RGBA", size, (235, 252, 255, 0))
    highlight.putalpha(highlight_alpha)

    return Image.alpha_composite(Image.alpha_composite(image, base), highlight)


def checkerboard(size: tuple[int, int], tile: int = 24) -> Image.Image:
    image = Image.new("RGBA", size, "#EEF3F8")
    draw = ImageDraw.Draw(image)
    for y in range(0, size[1], tile):
        for x in range(0, size[0], tile):
            if ((x // tile) + (y // tile)) % 2:
                draw.rectangle(
                    (x, y, min(x + tile - 1, size[0] - 1), min(y + tile - 1, size[1] - 1)),
                    fill="#C9D4DF",
                )
    return image


def validate_pose(name: str, image: Image.Image, runtime: dict) -> None:
    alpha = image.getchannel("A")
    bbox = alpha.getbbox()
    if bbox is None:
        raise ValueError(f"{name}: empty alpha")
    canvas_size = runtime["canvasSize"]
    if alpha.getpixel((0, 0)) != 0 or alpha.getpixel((canvas_size - 1, canvas_size - 1)) != 0:
        raise ValueError(f"{name}: canvas corners must be transparent")

    visible = 0
    partial = 0
    magenta_like = 0
    for red, green, blue, alpha_value in image.getdata():
        if not alpha_value:
            continue
        visible += 1
        if alpha_value < 255:
            partial += 1
        if red > 180 and blue > 150 and green < 90:
            magenta_like += 1

    if visible < 45_000:
        raise ValueError(f"{name}: unexpectedly small visible subject ({visible} pixels)")
    if magenta_like > max(16, round(visible * 0.0005)):
        raise ValueError(f"{name}: possible chroma fringe ({magenta_like} pixels)")

    print(
        f"{name}: bbox={bbox}, visible={visible}, partial_alpha={partial}, "
        f"magenta_like={magenta_like}"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--manifest",
        type=Path,
        help="Optional JSON layout manifest. Input paths are relative to the manifest file.",
    )
    parser.add_argument(
        "--input",
        type=Path,
        help="Override the source action sheet path.",
    )
    parser.add_argument("--runtime-dir", type=Path, default=Path("assets/runtime"))
    parser.add_argument(
        "--audit-out",
        type=Path,
        default=Path("concepts/generated-v2/xingya-sealed-action-cuts-v1.png"),
    )
    parser.add_argument(
        "--update-expected-hashes",
        action="store_true",
        help="Write generated output SHA-256 values back to the supplied layout manifest.",
    )
    args = parser.parse_args()

    manifest = args.manifest.resolve() if args.manifest else None
    if args.update_expected_hashes and manifest is None:
        raise ValueError("--update-expected-hashes requires --manifest")
    layout, layout_base = load_layout(manifest)
    validate_layout(layout)
    source_path = args.input.resolve() if args.input else resolve_config_path(layout["input"], layout_base)
    source = Image.open(source_path).convert("RGBA")
    columns = layout["grid"]["columns"]
    rows = layout["grid"]["rows"]
    if source.width % columns or source.height % rows:
        raise ValueError(f"Expected a {columns}x{rows} sheet, got {source.size}")

    cell_width = source.width // columns
    cell_height = source.height // rows
    args.runtime_dir.mkdir(parents=True, exist_ok=True)
    args.audit_out.parent.mkdir(parents=True, exist_ok=True)

    processed: list[tuple[str, Image.Image]] = []
    generated_hashes: dict[str, str] = {}
    expected_hashes = {name: digest.lower() for name, digest in layout.get("expectedSha256", {}).items()}
    runtime = layout["runtime"]
    for pose_config in layout["poses"]:
        name = pose_config["name"]
        column = pose_config["column"]
        row = pose_config["row"]
        crop = pose_config.get("crop", {})
        left = column * cell_width + crop.get("left", 0)
        top = row * cell_height + crop.get("top", 0)
        right = (column + 1) * cell_width + crop.get("right", 0)
        bottom = (row + 1) * cell_height + crop.get("bottom", 0)
        if not 0 <= left < right <= source.width or not 0 <= top < bottom <= source.height:
            raise ValueError(f"{name}: crop falls outside the source sheet")
        cell = source.crop(
            (
                left,
                top,
                right,
                bottom,
            )
        )
        visor = {**layout["visor"], **pose_config.get("visor", {})}
        pose = add_semitransparent_visor(normalize_cell(cell, runtime), visor)
        validate_pose(name, pose, runtime)
        out_path = args.runtime_dir / f"{runtime['prefix']}-{name}.webp"
        pose.save(out_path, "WEBP", quality=runtime["webpQuality"], method=runtime["webpMethod"], exact=True)
        output_bytes = out_path.stat().st_size
        if output_bytes > runtime["maxBytes"]:
            raise ValueError(f"{name}: output is {output_bytes} bytes, above {runtime['maxBytes']} byte budget")
        digest = hashlib.sha256(out_path.read_bytes()).hexdigest()
        expected = expected_hashes.get(name)
        if expected and digest != expected and not args.update_expected_hashes:
            raise ValueError(f"{name}: output hash {digest} does not match expected {expected}")
        print(f"wrote {out_path} ({output_bytes} bytes, sha256={digest})")
        generated_hashes[name] = digest
        processed.append((name, pose))

    canvas_size = runtime["canvasSize"]
    audit = checkerboard((canvas_size * columns, canvas_size * rows))
    draw = ImageDraw.Draw(audit)
    for index, (name, pose) in enumerate(processed):
        x = (index % columns) * canvas_size
        y = (index // columns) * canvas_size
        audit.alpha_composite(pose, (x, y))
        draw.rounded_rectangle((x + 14, y + 14, x + 132, y + 50), radius=12, fill="#10243DDE")
        draw.text((x + 28, y + 24), name, fill="white")

    audit.convert("RGB").save(args.audit_out, "PNG", optimize=True)
    print(f"wrote {args.audit_out} ({args.audit_out.stat().st_size} bytes)")
    if args.update_expected_hashes:
        layout["expectedSha256"] = generated_hashes
        manifest.write_text(json.dumps(layout, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"updated {manifest} expectedSha256")


if __name__ == "__main__":
    main()
