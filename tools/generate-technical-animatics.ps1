param(
    [switch]$SkipWebM
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$SourceRoot = Join-Path $Root "concepts/generated-v2"
$OutputRoot = Join-Path $Root "concepts/animatics/technical-preview-v1"
$FontFile = "C\:/Windows/Fonts/arial.ttf"
$Fps = 30
$Width = 1280
$Height = 720
$TransitionSeconds = 0.22
$StatusText = "TECHNICAL PREVIEW | SOURCE-CONCEPT-DERIVED | NOT RUNTIME APPROVED | NOT GEMINI/VEO"

New-Item -ItemType Directory -Force -Path $OutputRoot | Out-Null

function Assert-Tool {
    param([Parameter(Mandatory = $true)][string]$Name)

    if (-not (Get-Command $Name -ErrorAction SilentlyContinue)) {
        throw "Required tool '$Name' was not found on PATH."
    }
}

function Format-Decimal {
    param([Parameter(Mandatory = $true)][double]$Value)

    return $Value.ToString("0.###", [Globalization.CultureInfo]::InvariantCulture)
}

function Invoke-Checked {
    param(
        [Parameter(Mandatory = $true)][string]$Tool,
        [Parameter(Mandatory = $true)][string[]]$Arguments
    )

    & $Tool @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "$Tool failed with exit code $LASTEXITCODE."
    }
}

function Get-SourcePath {
    param([Parameter(Mandatory = $true)][string]$Name)

    $Path = Join-Path $SourceRoot $Name
    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Missing source concept: $Path"
    }
    return $Path
}

$StatusFilter = @(
    "drawbox=x=0:y=0:w=iw:h=38:color=0x101820@0.88:t=fill",
    "drawtext=fontfile='$FontFile':text='$StatusText':fontcolor=white:fontsize=17:x=18:y=9",
    "drawbox=x=0:y=520:w=iw:h=200:color=0x101820@0.16:t=fill"
) -join ","

function New-Preview {
    param(
        [Parameter(Mandatory = $true)][hashtable]$Spec
    )

    $InputArgs = @()
    $FilterParts = @()
    for ($Index = 0; $Index -lt $Spec.Clips.Count; $Index++) {
        $Clip = $Spec.Clips[$Index]
        $InputArgs += @(
            "-loop", "1",
            "-framerate", "$Fps",
            "-t", (Format-Decimal $Clip.Duration),
            "-i", $Clip.Source
        )
        $FilterParts += "[$Index`:v]$($Clip.Filter),setsar=1,setpts=PTS-STARTPTS,fps=$Fps,format=yuv420p[v$Index]"
    }

    $TotalDuration = [double]$Spec.Clips[0].Duration
    $LastLabel = "[v0]"
    for ($Index = 1; $Index -lt $Spec.Clips.Count; $Index++) {
        $Offset = $TotalDuration - $TransitionSeconds
        $NextLabel = "[mix$Index]"
        $FilterParts += "$LastLabel[v$Index]xfade=transition=fade:duration=$(Format-Decimal $TransitionSeconds):offset=$(Format-Decimal $Offset)$NextLabel"
        $TotalDuration += [double]$Spec.Clips[$Index].Duration - $TransitionSeconds
        $LastLabel = $NextLabel
    }

    $FilterParts += "$LastLabel$StatusFilter,format=yuv420p[outv]"
    $FilterGraph = $FilterParts -join ";"
    $BaseName = "$($Spec.Id)_$($Spec.Slug)_technical-preview"
    $Mp4Path = Join-Path $OutputRoot "$BaseName.mp4"
    $WebMPath = Join-Path $OutputRoot "$BaseName.webm"
    $PosterPath = Join-Path $OutputRoot "$BaseName`_reduced-motion-end-state.png"

    $Mp4Args = @(
        "-hide_banner", "-loglevel", "warning", "-y"
    ) + $InputArgs + @(
        "-filter_complex", $FilterGraph,
        "-map", "[outv]",
        "-an",
        "-t", (Format-Decimal $TotalDuration),
        "-r", "$Fps",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-metadata", "title=$($Spec.Title)",
        "-metadata", "comment=$StatusText",
        $Mp4Path
    )
    Invoke-Checked -Tool "ffmpeg" -Arguments $Mp4Args

    if (-not $SkipWebM) {
        $WebMArgs = @(
            "-hide_banner", "-loglevel", "warning", "-y",
            "-i", $Mp4Path,
            "-map", "0:v:0",
            "-an",
            "-c:v", "libvpx-vp9",
            "-crf", "34",
            "-b:v", "0",
            "-row-mt", "1",
            "-deadline", "good",
            "-cpu-used", "4",
            "-metadata", "title=$($Spec.Title)",
            "-metadata", "comment=$StatusText",
            $WebMPath
        )
        Invoke-Checked -Tool "ffmpeg" -Arguments $WebMArgs
    }

    $PosterInputArgs = if ($Spec.ContainsKey("PosterTimeSeconds")) {
        @("-ss", (Format-Decimal ([double]$Spec.PosterTimeSeconds)), "-i", $Mp4Path)
    } else {
        @("-sseof", "-0.12", "-i", $Mp4Path)
    }
    $PosterArgs = @(
        "-hide_banner", "-loglevel", "warning", "-y"
    ) + $PosterInputArgs + @(
        "-frames:v", "1",
        "-update", "1",
        $PosterPath
    )
    Invoke-Checked -Tool "ffmpeg" -Arguments $PosterArgs

    return [ordered]@{
        Id = $Spec.Id
        Slug = $Spec.Slug
        Title = $Spec.Title
        DurationSeconds = [Math]::Round($TotalDuration, 3)
        Mp4 = $Mp4Path
        WebM = if ($SkipWebM) { $null } else { $WebMPath }
        Poster = $PosterPath
    }
}

function New-StageStill {
    param(
        [Parameter(Mandatory = $true)][string]$Name,
        [Parameter(Mandatory = $true)][string]$Source,
        [Parameter(Mandatory = $true)][string]$Filter
    )

    $Path = Join-Path $OutputRoot $Name
    $Args = @(
        "-hide_banner", "-loglevel", "warning", "-y",
        "-i", $Source,
        "-vf", "$Filter,setsar=1,$StatusFilter,format=rgba",
        "-frames:v", "1",
        "-update", "1",
        $Path
    )
    Invoke-Checked -Tool "ffmpeg" -Arguments $Args
    return $Path
}

function New-ContactSheet {
    param(
        [Parameter(Mandatory = $true)][object[]]$Items
    )

    $InputArgs = @()
    $FilterParts = @()
    for ($Index = 0; $Index -lt $Items.Count; $Index++) {
        $InputArgs += @("-i", $Items[$Index].Path)
        $TileText = $Items[$Index].Label.Replace("'", "")
        $FilterParts += "[$Index`:v]scale=400:225:force_original_aspect_ratio=decrease,pad=400:225:(ow-iw)/2:(oh-ih)/2:color=0x101820,setsar=1,format=rgba,drawbox=x=0:y=193:w=400:h=32:color=0x101820@0.88:t=fill,drawtext=fontfile='$FontFile':text='$TileText':fontcolor=white:fontsize=16:x=12:y=201[t$Index]"
    }

    $FilterParts += "[t0][t1][t2]hstack=inputs=3[row0]"
    $FilterParts += "[t3][t4][t5]hstack=inputs=3[row1]"
    $FilterParts += "[t6][t7][t8]hstack=inputs=3[row2]"
    $FilterParts += "[row0][row1][row2]vstack=inputs=3[outv]"
    $Path = Join-Path $OutputRoot "contact-sheet_technical-preview_source-concept-derived.png"
    $Args = @(
        "-hide_banner", "-loglevel", "warning", "-y"
    ) + $InputArgs + @(
        "-filter_complex", ($FilterParts -join ";"),
        "-map", "[outv]",
        "-frames:v", "1",
        "-update", "1",
        $Path
    )
    Invoke-Checked -Tool "ffmpeg" -Arguments $Args
    return $Path
}

function Get-OutputRecord {
    param([Parameter(Mandatory = $true)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        return $null
    }
    $Item = Get-Item -LiteralPath $Path
    return [ordered]@{
        file = $Item.Name
        bytes = $Item.Length
        sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash
    }
}

Assert-Tool -Name "ffmpeg"
Assert-Tool -Name "ffprobe"

$Ch01 = Get-SourcePath "ch01-moon-little-home-keyframe-v3.png"
$Ch01Props = Get-SourcePath "ch01-moon-home-props-v1.png"
$Suit = Get-SourcePath "xingya-space-exploration-suit-v3.png"
$Ch02 = Get-SourcePath "ch02-staff-star-bridge-keyframe-v3.png"
$Ch03Transition = Get-SourcePath "ch03-atmosphere-check-transition-v1.png"
$Ch04Props = Get-SourcePath "ch04-low-planet-props-v1.png"
$Ch04 = Get-SourcePath "ch04-dongdong-low-planet-keyframe-v1.png"
$Ch05Props = Get-SourcePath "ch05-shared-garden-props-v1.png"
$Ch05 = Get-SourcePath "ch05-singing-shared-garden-keyframe-v1.png"

$GentleZoom = "zoompan=z='min(1.028,1+0.00085*on)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1280x720:fps=30"

$Specs = @(
    [ordered]@{
        Id = "01"
        Slug = "arrival-site-sealed"
        Title = "Arrival site and sealed Xingya"
        Sources = @("ch01-moon-little-home-keyframe-v3.png")
        Limitation = "No selected source concept depicts a ship in flight. This validates arrival-site framing and sealed-suit readability only."
        ReducedMotionStatus = "partial review poster only; no approved ship-flight or helmet-closing source exists; not suitable as a runtime fallback"
        Clips = @(
            [ordered]@{
                Source = $Ch01
                Duration = 3.6
                Filter = "scale=1400:788,crop=1280:720:x='min(120,t*34)':y=34"
            }
        )
    },
    [ordered]@{
        Id = "02"
        Slug = "m08-roof-pressure-helmet-open"
        Title = "M08 roof closure, pressurization, automatic helmet opening"
        Sources = @("ch01-moon-home-props-v1.png", "xingya-space-exploration-suit-v3.png")
        Limitation = "Prop-state crossfades validate order and timing; they are not motion-ready roof or helmet rigs."
        Clips = @(
            [ordered]@{ Source = $Ch01Props; Duration = 0.9; Filter = "crop=640:360:480:650,scale=1280:720,$GentleZoom" },
            [ordered]@{ Source = $Ch01Props; Duration = 0.9; Filter = "crop=640:360:760:650,scale=1280:720,$GentleZoom" },
            [ordered]@{ Source = $Ch01Props; Duration = 0.9; Filter = "crop=640:360:896:650,scale=1280:720,$GentleZoom" },
            [ordered]@{ Source = $Suit; Duration = 1.45; Filter = "crop=390:460:690:540,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,drawbox=x=320:y=380:w=110:h=220:color=0xf4eee6:t=fill,$GentleZoom" }
        )
    },
    [ordered]@{
        Id = "03"
        Slug = "s01-reseal-depart"
        Title = "S01 automatic reseal and departure from the moon outpost"
        Sources = @("xingya-space-exploration-suit-v3.png", "ch02-staff-star-bridge-keyframe-v3.png")
        Limitation = "The reseal is a state crossfade, followed by a camera move across the selected open-space keyframe."
        PosterTimeSeconds = 1.45
        ReducedMotionStatus = "pre-departure sealed-standing proxy captured before the bridge jump and before any future code-rendered pad; not runtime approved"
        Clips = @(
            [ordered]@{ Source = $Suit; Duration = 1.0; Filter = "crop=390:460:690:540,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,drawbox=x=320:y=380:w=110:h=220:color=0xf4eee6:t=fill,$GentleZoom" },
            [ordered]@{ Source = $Suit; Duration = 1.0; Filter = "crop=520:660:0:0,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,drawbox=x=860:y=630:w=180:h=90:color=0xf4eee6:t=fill,$GentleZoom" },
            [ordered]@{ Source = $Ch02; Duration = 2.15; Filter = "scale=1400:788,crop=1280:720:x='min(120,t*40)':y=34" }
        )
    },
    [ordered]@{
        Id = "04"
        Slug = "chapter3-atmosphere-open"
        Title = "Chapter 3 sealed arrival, atmosphere check, helmet opening and outer-layer stow"
        Sources = @("ch03-atmosphere-check-transition-v1.png")
        Limitation = "The approved three-panel concept is presented as chronological state transitions, not character animation."
        Clips = @(
            [ordered]@{ Source = $Ch03Transition; Duration = 1.4; Filter = "crop=557:941:0:0,scale=-2:720,pad=1280:720:(ow-iw)/2:0:color=0xf4eee6,$GentleZoom" },
            [ordered]@{ Source = $Ch03Transition; Duration = 1.4; Filter = "crop=557:941:557:0,scale=-2:720,pad=1280:720:(ow-iw)/2:0:color=0xf4eee6,$GentleZoom" },
            [ordered]@{ Source = $Ch03Transition; Duration = 1.4; Filter = "crop=558:941:1114:0,scale=-2:720,pad=1280:720:(ow-iw)/2:0:color=0xf4eee6,$GentleZoom" }
        )
    },
    [ordered]@{
        Id = "05"
        Slug = "dongdong-sound-silhouette-reveal"
        Title = "Dongdong reveal overview montage (review only)"
        Sources = @("ch04-low-planet-props-v1.png", "ch04-dongdong-low-planet-keyframe-v1.png")
        Limitation = "Review overview only. Never trigger this combined montage continuously in runtime; LP01, LP04 and LP05 remain separate story moments. The sound beat is represented visually by the approved ground ripple and this preview contains no audio."
        RuntimeRule = "overview-only; never trigger continuously in runtime"
        Clips = @(
            [ordered]@{ Source = $Ch04Props; Duration = 0.9; Filter = "crop=210:330:0:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" },
            [ordered]@{ Source = $Ch04Props; Duration = 0.9; Filter = "crop=210:330:180:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" },
            [ordered]@{ Source = $Ch04Props; Duration = 0.9; Filter = "crop=230:330:555:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" },
            [ordered]@{ Source = $Ch04; Duration = 1.75; Filter = "scale=1360:765,crop=1280:720:x='40-min(25,t*10)':y=22" }
        )
    },
    [ordered]@{
        Id = "06"
        Slug = "homes-connect-reunion"
        Title = "Two homes connect; Xingya and Dongdong reunite"
        Sources = @("ch05-shared-garden-props-v1.png", "ch05-singing-shared-garden-keyframe-v1.png")
        Limitation = "Bridge assembly uses the approved prop progression; the reunion is a camera push on the selected finale keyframe."
        Clips = @(
            [ordered]@{ Source = $Ch05Props; Duration = 1.7; Filter = "crop=768:432:740:0,scale=1280:720,$GentleZoom" },
            [ordered]@{ Source = $Ch05; Duration = 2.35; Filter = "scale=1360:765,crop=1280:720:x='40+min(20,t*8)':y=22" }
        )
    }
)

$Results = @()
foreach ($Spec in $Specs) {
    Write-Host "Generating $($Spec.Id): $($Spec.Title)"
    $Results += New-Preview -Spec $Spec
}

$DongdongMicroSpecs = @(
    [ordered]@{
        Id = "05a"
        Slug = "lp01-sound-empty-cave"
        Title = "LP01 sound cue and empty cave"
        Sources = @("ch04-low-planet-props-v1.png")
        Limitation = "Silent visual timing proxy. Future sound is a separate audio asset and must remain independent from the LP04 and LP05 reveals."
        RuntimeRule = "independent LP01 micro-beat; not runtime approved"
        Clips = @(
            [ordered]@{ Source = $Ch04Props; Duration = 2.0; Filter = "crop=210:330:0:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" }
        )
    },
    [ordered]@{
        Id = "05b"
        Slug = "lp04-silhouette"
        Title = "LP04 Dongdong silhouette"
        Sources = @("ch04-low-planet-props-v1.png")
        Limitation = "Independent silhouette beat. It must not auto-chain directly from LP01 in runtime."
        RuntimeRule = "independent LP04 micro-beat; not runtime approved"
        Clips = @(
            [ordered]@{ Source = $Ch04Props; Duration = 2.2; Filter = "crop=210:330:180:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" }
        )
    },
    [ordered]@{
        Id = "05c"
        Slug = "lp05-full-reveal"
        Title = "LP05 Dongdong full reveal"
        Sources = @("ch04-low-planet-props-v1.png")
        Limitation = "Independent full-reveal beat. Character motion remains a source-concept camera study, not a finished animation rig."
        RuntimeRule = "independent LP05 micro-beat; not runtime approved"
        Clips = @(
            [ordered]@{ Source = $Ch04Props; Duration = 2.5; Filter = "crop=230:330:555:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6,$GentleZoom" }
        )
    }
)

$DongdongMicroResults = @()
foreach ($Spec in $DongdongMicroSpecs) {
    Write-Host "Generating $($Spec.Id): $($Spec.Title)"
    $DongdongMicroResults += New-Preview -Spec $Spec
}

$DongdongStages = @(
    [ordered]@{
        Label = "05A SOUND / EMPTY CAVE"
        Path = New-StageStill -Name "05a_dongdong-sound-empty-cave_technical-preview_source-concept-derived.png" -Source $Ch04Props -Filter "crop=210:330:0:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6"
    },
    [ordered]@{
        Label = "05B SILHOUETTE"
        Path = New-StageStill -Name "05b_dongdong-silhouette_technical-preview_source-concept-derived.png" -Source $Ch04Props -Filter "crop=210:330:180:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6"
    },
    [ordered]@{
        Label = "05C FULL REVEAL"
        Path = New-StageStill -Name "05c_dongdong-full-reveal_technical-preview_source-concept-derived.png" -Source $Ch04Props -Filter "crop=230:330:555:270,scale=-2:680,pad=1280:720:(ow-iw)/2:20:color=0xf4eee6"
    }
)

$ContactItems = @()
$ContactLabels = @{
    "01" = "01 ARRIVAL / SEALED"
    "02" = "02 M08 ROOF / OPEN"
    "03" = "03 S01 RESEAL / DEPART"
    "04" = "04 CH3 AIR CHECK"
    "05" = "05 OVERVIEW / REVIEW ONLY"
    "06" = "06 HOMES CONNECT"
}
foreach ($Result in $Results) {
    $ContactItems += [ordered]@{ Label = $ContactLabels[$Result.Id]; Path = $Result.Poster }
}
for ($Index = 0; $Index -lt $DongdongMicroResults.Count; $Index++) {
    $ContactItems += [ordered]@{ Label = $DongdongStages[$Index].Label; Path = $DongdongMicroResults[$Index].Poster }
}
$ContactSheet = New-ContactSheet -Items $ContactItems

$SourceRecords = @()
$AllSourceNames = @($Specs.Sources; $DongdongMicroSpecs.Sources) | ForEach-Object { $_ } | Sort-Object -Unique
foreach ($SourceName in $AllSourceNames) {
    $SourcePath = Get-SourcePath $SourceName
    $SourceItem = Get-Item -LiteralPath $SourcePath
    $SourceRecords += [ordered]@{
        file = "concepts/generated-v2/$SourceName"
        bytes = $SourceItem.Length
        sha256 = (Get-FileHash -Algorithm SHA256 -LiteralPath $SourcePath).Hash
        classification = "approved-or-retained source concept; not runtime asset"
    }
}

$AssetRecords = @()
for ($Index = 0; $Index -lt $Specs.Count; $Index++) {
    $Spec = $Specs[$Index]
    $Result = $Results[$Index]
    $OutputRecords = @(
        (Get-OutputRecord -Path $Result.Mp4)
        (Get-OutputRecord -Path $Result.WebM)
        (Get-OutputRecord -Path $Result.Poster)
    ) | Where-Object { $null -ne $_ }
    $AssetRecords += [ordered]@{
        id = $Spec.Id
        title = $Spec.Title
        durationSeconds = $Result.DurationSeconds
        resolution = "1280x720"
        fps = $Fps
        sourceConcepts = $Spec.Sources | ForEach-Object { "concepts/generated-v2/$_" }
        limitation = $Spec.Limitation
        runtimeRule = if ($Spec.Contains("RuntimeRule")) { $Spec.RuntimeRule } else { "review candidate only; not runtime approved" }
        reducedMotionStatus = if ($Spec.Contains("ReducedMotionStatus")) { $Spec.ReducedMotionStatus } else { "review poster only; not runtime approved" }
        outputs = $OutputRecords
        flags = @(
            "technical-preview",
            "source-concept-derived",
            "not-runtime-approved",
            "not-gemini",
            "not-veo",
            "silent"
        )
    }
}

$DongdongMicroAssetRecords = @()
for ($Index = 0; $Index -lt $DongdongMicroSpecs.Count; $Index++) {
    $Spec = $DongdongMicroSpecs[$Index]
    $Result = $DongdongMicroResults[$Index]
    $OutputRecords = @(
        (Get-OutputRecord -Path $Result.Mp4)
        (Get-OutputRecord -Path $Result.WebM)
        (Get-OutputRecord -Path $Result.Poster)
    ) | Where-Object { $null -ne $_ }
    $DongdongMicroAssetRecords += [ordered]@{
        id = $Spec.Id
        title = $Spec.Title
        durationSeconds = $Result.DurationSeconds
        resolution = "1280x720"
        fps = $Fps
        sourceConcepts = $Spec.Sources | ForEach-Object { "concepts/generated-v2/$_" }
        limitation = $Spec.Limitation
        runtimeRule = $Spec.RuntimeRule
        reducedMotionStatus = "independent review poster only; not runtime approved"
        outputs = $OutputRecords
        flags = @(
            "technical-preview",
            "source-concept-derived",
            "not-runtime-approved",
            "not-gemini",
            "not-veo",
            "silent",
            "independent-micro-preview"
        )
    }
}

$Manifest = [ordered]@{
    package = "Xinglong Workshop cutscene technical preview v1"
    generatedAt = (Get-Date).ToString("o")
    generator = "tools/generate-technical-animatics.ps1"
    status = $StatusText
    teachingSafetyStatus = "contradicted_for_integration; partial_for_timing_format_and_composition_review"
    lowerBandTreatment = "16% dark contrast proxy only; no geometric clearance"
    allowedEvidence = "timing, format, composition discussion"
    runtimeApproval = $false
    runtimeChanges = $false
    aiGenerationPerformed = $false
    geminiUsed = $false
    veoUsed = $false
    audioStreams = $false
    sources = $SourceRecords
    assets = $AssetRecords
    dongdongMicroAssets = $DongdongMicroAssetRecords
    dongdongOverviewRule = "05 combined montage is review-only and must never trigger continuously in runtime"
    dongdongRevealStages = $DongdongStages | ForEach-Object { Get-OutputRecord -Path $_.Path }
    contactSheet = Get-OutputRecord -Path $ContactSheet
}
$ManifestPath = Join-Path $OutputRoot "manifest_technical-preview_source-concept-derived.json"
$Manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $ManifestPath -Encoding UTF8

$HtmlCards = @()
for ($Index = 0; $Index -lt $Specs.Count; $Index++) {
    $Spec = $Specs[$Index]
    $Result = $Results[$Index]
    $Mp4Name = Split-Path -Leaf $Result.Mp4
    $WebMName = if ($Result.WebM) { Split-Path -Leaf $Result.WebM } else { "" }
    $PosterName = Split-Path -Leaf $Result.Poster
    $WebMSource = if ($WebMName) { "<source src=`"$WebMName`" type=`"video/webm`">" } else { "" }
    $SourcesText = ($Spec.Sources | ForEach-Object { "<code>$_</code>" }) -join ", "
    $ReducedMotionText = if ($Spec.Contains("ReducedMotionStatus")) { $Spec.ReducedMotionStatus } else { "Review poster only; not runtime approved." }
    $HtmlCards += @"
      <article>
        <h2>$($Spec.Id). $($Spec.Title)</h2>
        <video muted loop playsinline controls preload="metadata" poster="$PosterName">
          $WebMSource
          <source src="$Mp4Name" type="video/mp4">
        </video>
        <img class="reduced" src="$PosterName" alt="Reduced-motion end state for $($Spec.Title)">
        <p><strong>Duration:</strong> $($Result.DurationSeconds)s. <strong>Sources:</strong> $SourcesText</p>
        <p><strong>Reduced-motion status:</strong> $ReducedMotionText</p>
        <p><strong>Scope note:</strong> $($Spec.Limitation)</p>
      </article>
"@
}

$MicroHtmlCards = @()
for ($Index = 0; $Index -lt $DongdongMicroSpecs.Count; $Index++) {
    $Spec = $DongdongMicroSpecs[$Index]
    $Result = $DongdongMicroResults[$Index]
    $Mp4Name = Split-Path -Leaf $Result.Mp4
    $WebMName = if ($Result.WebM) { Split-Path -Leaf $Result.WebM } else { "" }
    $PosterName = Split-Path -Leaf $Result.Poster
    $WebMSource = if ($WebMName) { "<source src=`"$WebMName`" type=`"video/webm`">" } else { "" }
    $SourcesText = ($Spec.Sources | ForEach-Object { "<code>$_</code>" }) -join ", "
    $MicroHtmlCards += @"
      <article>
        <h2>$($Spec.Id). $($Spec.Title)</h2>
        <video muted loop playsinline controls preload="metadata" poster="$PosterName">
          $WebMSource
          <source src="$Mp4Name" type="video/mp4">
        </video>
        <img class="reduced" src="$PosterName" alt="Reduced-motion end state for $($Spec.Title)">
        <p><strong>Duration:</strong> $($Result.DurationSeconds)s. <strong>Sources:</strong> $SourcesText</p>
        <p><strong>Story contract:</strong> $($Spec.RuntimeRule)</p>
        <p><strong>Scope note:</strong> $($Spec.Limitation)</p>
      </article>
"@
}

$StageHtml = ($DongdongStages | ForEach-Object {
    $StageName = Split-Path -Leaf $_.Path
    "<figure><img src=`"$StageName`" alt=`"$($_.Label)`"><figcaption>$($_.Label)</figcaption></figure>"
}) -join "`n"

$ContactName = Split-Path -Leaf $ContactSheet
$Html = @"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cutscene Technical Preview Review</title>
  <style>
    :root { color-scheme: dark; font-family: Arial, sans-serif; background: #101820; color: #f5f7f8; }
    body { margin: 0; padding: 24px; }
    main { max-width: 1440px; margin: 0 auto; }
    header { border-bottom: 1px solid #5d6b73; padding-bottom: 16px; margin-bottom: 24px; }
    h1 { font-size: 28px; margin: 0 0 10px; letter-spacing: 0; }
    h2 { font-size: 18px; line-height: 1.3; margin: 0 0 12px; letter-spacing: 0; }
    p { color: #d7dee2; line-height: 1.5; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 18px; }
    article { border: 1px solid #53636c; background: #19242b; padding: 14px; border-radius: 6px; overflow-wrap: anywhere; }
    video, article > img, .contact { display: block; width: 100%; aspect-ratio: 16 / 9; object-fit: cover; background: #0b1115; }
    .reduced { display: none; }
    .stages { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    figure { margin: 0; }
    figure img { width: 100%; display: block; }
    figcaption { padding-top: 8px; color: #d7dee2; }
    code { color: #ffd27a; overflow-wrap: anywhere; }
    @media (prefers-reduced-motion: reduce) {
      video { display: none; }
      article > img.reduced { display: block; }
    }
    @media (max-width: 720px) {
      body { padding: 14px; }
      .grid { grid-template-columns: 1fr; }
      .stages { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
<main>
  <header>
    <h1>Cutscene technical preview review</h1>
    <p><strong>$StatusText.</strong> These silent timing/composition studies use only existing source-concept images. They are not Gemini/Veo output, not finished animation, and not approved for runtime integration.</p>
    <p><strong>Teaching-safety status: contradicted/partial.</strong> The lower 200 px carry only a 16% dark lower-band contrast proxy. This does not prove clearance from the staff, keyboard, or central teaching target: characters, tails, and other subjects still enter those areas in several shots. Exact teaching elements remain code-rendered, and videos never autoplay on this review page.</p>
  </header>
  <section class="grid">
$($HtmlCards -join "`n")
  </section>
  <h2>Dongdong independent story micro-previews</h2>
  <p>The combined 05 montage above is review-only and must never trigger continuously in runtime. LP01, LP04, and LP05 remain independent story moments.</p>
  <section class="grid">
$($MicroHtmlCards -join "`n")
  </section>
  <h2>Dongdong reveal review stages</h2>
  <section class="stages">
$StageHtml
  </section>
  <h2>Contact sheet</h2>
  <img class="contact" src="$ContactName" alt="Contact sheet for all technical previews and Dongdong reveal stages">
</main>
</body>
</html>
"@
$HtmlPath = Join-Path $OutputRoot "review-index_technical-preview_source-concept-derived.html"
$Html | Set-Content -LiteralPath $HtmlPath -Encoding UTF8

$ProbeLines = @(
    "# $StatusText",
    "file`tcodec`twidth`theight`tfps`tduration_seconds`tpixel_format"
)
$MediaFiles = Get-ChildItem -LiteralPath $OutputRoot -File | Where-Object { $_.Extension -in @(".mp4", ".webm") } | Sort-Object Name
foreach ($MediaFile in $MediaFiles) {
    $ProbeJson = & ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate,pix_fmt:format=duration -of json $MediaFile.FullName
    if ($LASTEXITCODE -ne 0) {
        throw "ffprobe failed for $($MediaFile.FullName)."
    }
    $Probe = $ProbeJson | ConvertFrom-Json
    $Stream = $Probe.streams[0]
    $Duration = [double]::Parse($Probe.format.duration, [Globalization.CultureInfo]::InvariantCulture)
    $ProbeLines += @(
        "$($MediaFile.Name)`t$($Stream.codec_name)`t$($Stream.width)`t$($Stream.height)`t$($Stream.r_frame_rate)`t$([Math]::Round($Duration, 3))`t$($Stream.pix_fmt)"
    )
}
$ProbePath = Join-Path $OutputRoot "ffprobe-report_technical-preview_source-concept-derived.tsv"
$ProbeLines | Set-Content -LiteralPath $ProbePath -Encoding UTF8

Write-Host "Generated package: $OutputRoot"
Write-Host "Review index: $HtmlPath"
Write-Host "Probe report: $ProbePath"
