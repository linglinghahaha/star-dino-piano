from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "concepts" / "generated-v2"


def font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in (
        Path("C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/msyh.ttc"),
    ):
        if path.exists():
            return ImageFont.truetype(str(path), size)
    return ImageFont.load_default()


TITLE_FONT = font(34)
LABEL_FONT = font(24)
BG = (244, 242, 236)
INK = (31, 43, 57)
CELL = (255, 254, 250)
LINE = (211, 205, 192)


def make_sheet(
    title: str,
    items: list[tuple[str, str]],
    columns: int,
    cell_size: tuple[int, int],
    output_name: str,
) -> Path:
    rows = (len(items) + columns - 1) // columns
    margin = 28
    header = 72
    gap = 20
    label_height = 42
    cell_width, cell_height = cell_size
    width = margin * 2 + columns * cell_width + (columns - 1) * gap
    height = header + margin + rows * cell_height + (rows - 1) * gap + margin

    sheet = Image.new("RGB", (width, height), BG)
    draw = ImageDraw.Draw(sheet)
    draw.text((margin, 20), title, fill=INK, font=TITLE_FONT)

    for index, (label, filename) in enumerate(items):
        row, column = divmod(index, columns)
        x = margin + column * (cell_width + gap)
        y = header + row * (cell_height + gap)
        draw.rounded_rectangle(
            (x, y, x + cell_width, y + cell_height),
            radius=8,
            fill=CELL,
            outline=LINE,
            width=2,
        )
        image = Image.open(SOURCE / filename).convert("RGB")
        thumb = ImageOps.contain(
            image,
            (cell_width - 24, cell_height - label_height - 24),
            Image.Resampling.LANCZOS,
        )
        image_x = x + (cell_width - thumb.width) // 2
        image_y = y + 12 + (cell_height - label_height - 24 - thumb.height) // 2
        sheet.paste(thumb, (image_x, image_y))
        draw.text(
            (x + 14, y + cell_height - label_height + 4),
            label,
            fill=INK,
            font=LABEL_FONT,
        )

    output = SOURCE / output_name
    sheet.save(output, optimize=True)
    return output


def make_package_sheet(parts: list[Path], output_name: str) -> Path:
    width = max(Image.open(path).width for path in parts)
    margin = 24
    gap = 24
    header = 72
    scaled: list[Image.Image] = []
    for path in parts:
        image = Image.open(path).convert("RGB")
        if image.width != width:
            height = round(image.height * width / image.width)
            image = image.resize((width, height), Image.Resampling.LANCZOS)
        scaled.append(image)

    total_height = header + margin + sum(image.height for image in scaled) + gap * (
        len(scaled) - 1
    ) + margin
    sheet = Image.new("RGB", (width + margin * 2, total_height), BG)
    draw = ImageDraw.Draw(sheet)
    draw.text((margin, 20), "Star Dino Concept Package v2", fill=INK, font=TITLE_FONT)
    y = header + margin
    for image in scaled:
        sheet.paste(image, (margin, y))
        y += image.height + gap

    output = SOURCE / output_name
    sheet.save(output, optimize=True)
    return output


def main() -> None:
    character_sheet = make_sheet(
        "Character and Relationship Concepts",
        [
            ("Xingya core identity", "xingya-model-sheet-v1.png"),
            ("Xingya complete pressure suit", "xingya-space-exploration-suit-v3.png"),
            ("Dongdong core identity", "dongdong-model-sheet-v1.png"),
            ("Duo actions", "xingya-dongdong-duo-actions-v1.png"),
        ],
        columns=2,
        cell_size=(900, 650),
        output_name="contact-sheet-characters-v2.png",
    )
    scene_sheet = make_sheet(
        "Five Chapters and Atmosphere Transition",
        [
            ("Chapter 1 - Moon Outpost", "ch01-moon-little-home-keyframe-v3.png"),
            ("Chapter 2 - Open Space Staff Bridge", "ch02-staff-star-bridge-keyframe-v3.png"),
            ("Chapter 3 - Listening Seed Garden", "ch03-listening-seed-garden-keyframe-v1.png"),
            ("Chapter 3 entry - Atmosphere check", "ch03-atmosphere-check-transition-v1.png"),
            ("Chapter 4 - Dongdong Low Planet", "ch04-dongdong-low-planet-keyframe-v1.png"),
            ("Chapter 5 - Singing Shared Garden", "ch05-singing-shared-garden-keyframe-v1.png"),
        ],
        columns=2,
        cell_size=(840, 520),
        output_name="contact-sheet-scenes-v2.png",
    )
    prop_sheet = make_sheet(
        "Chapter Props and Teaching Mechanics",
        [
            ("Chapter 1 construction props", "ch01-moon-home-props-v1.png"),
            ("Chapter 1 countdown exact states", "ch01-countdown-tower-states-v1.png"),
            ("Chapter 2 bridge mechanics", "ch02-staff-bridge-mechanics-v1.png"),
            ("Chapter 3 listening garden props", "ch03-listening-garden-props-v1.png"),
            ("Chapter 4 low-planet props", "ch04-low-planet-props-v1.png"),
            ("Chapter 4 three-stone exact states", "ch04-three-foundation-stones-v1.png"),
            ("Chapter 5 shared-garden props", "ch05-shared-garden-props-v1.png"),
        ],
        columns=2,
        cell_size=(840, 590),
        output_name="contact-sheet-props-v2.png",
    )
    space_gear_sheet = make_sheet(
        "Xingya Species, Pressure Suit and Exterior Continuity",
        [
            ("Selected three-state pressure suit", "xingya-space-exploration-suit-v3.png"),
            ("Moon exterior - fully sealed", "ch01-moon-little-home-keyframe-v3.png"),
            ("Open-space crossing - fully sealed", "ch02-staff-star-bridge-keyframe-v3.png"),
        ],
        columns=3,
        cell_size=(600, 520),
        output_name="contact-sheet-xingya-space-gear-v1.png",
    )
    package_sheet = make_package_sheet(
        [character_sheet, scene_sheet, space_gear_sheet, prop_sheet],
        "concept-package-contact-sheet-v2.png",
    )
    for path in (
        character_sheet,
        scene_sheet,
        space_gear_sheet,
        prop_sheet,
        package_sheet,
    ):
        print(path)


if __name__ == "__main__":
    main()
