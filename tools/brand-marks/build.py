"""Build every J mark: two marks, two fonts, tile and transparent versions in
each color, as outlined SVG plus a 2048px PNG.

    python3 tools/brand-marks/build.py

Writes public/brand/j/svg/*.svg and <out>/j/png/*.png, and regenerates the four older
files in public/brand/ (j-mark, j-code-mark, and their -gradient versions, with their
-2048 PNG and JPG) so anything already pointing at them gets the new design.
"""
import subprocess
import sys
from pathlib import Path

from compose import compose, flatten, bbox, tool, load, parse

HERE = Path(__file__).parent

# ── the palette, from jarredmcarter.com's own CSS variables ──────────────────
INK_LIGHT = '#f4f4f2'   # --ink, dark theme
INK_DARK = '#0c0c0f'    # --ink, light theme
GREEN = '#83fa40'       # --sec, the site's accent
CYAN = '#00a7d3'        # --slt
TILE_DARK = ('#0e0e10', '#2e3037')    # --panel, --rule-hi
TILE_LIGHT = ('#f6f5f1', '#d3d2c6')   # light --panel, --rule
GRADIENTS = {
    'pink': ['#e879f9', '#ec4899', '#fb923c'],   # the RETRAC LABS wordmark gradient
    'green': [GREEN, CYAN],                      # the site's two accents
}

# ── the marks ────────────────────────────────────────────────────────────────
# Gaps are the narrowest distance between neighboring glyphs, in em. "/>" is
# deliberately tighter than the J's gap, so it reads as one unit.
MARKS = {
    'code': {'text': 'J/>', 'mono': [0.10, 0.035], 'pixel': [0.25, 0.125]},
    'cursor': {'text': 'J_', 'mono': [0.06], 'pixel': [0.125]},
}
FONT_KEY = {'mono': 'geist', 'pixel': 'silk'}
PIXEL = 125   # Silkscreen draws on a 125-unit grid
PIXEL_PX = 96  # one font pixel = 96px on the 2048 tile
GRID = 32      # every pixel edge lands on a multiple of 32: whole pixels down to a 64px export

STYLES = {
    'mono': [
        ('tile-dark', 'tile', TILE_DARK, INK_LIGHT),
        ('tile-dark-green', 'tile', TILE_DARK, GREEN),
        ('tile-dark-gradient', 'tile', TILE_DARK, 'pink'),
        ('tile-light', 'tile', TILE_LIGHT, INK_DARK),
        ('black', 'bare', None, '#000000'),
        ('white', 'bare', None, '#ffffff'),
        ('green', 'bare', None, GREEN),
        ('cyan', 'bare', None, CYAN),
        ('gradient', 'bare', None, 'pink'),
        ('gradient-green', 'bare', None, 'green'),
    ],
    'pixel': [
        ('tile-dark', 'tile', TILE_DARK, INK_LIGHT),
        ('tile-dark-green', 'tile', TILE_DARK, GREEN),
        ('tile-light', 'tile', TILE_LIGHT, INK_DARK),
        ('black', 'bare', None, '#000000'),
        ('white', 'bare', None, '#ffffff'),
        ('green', 'bare', None, GREEN),
    ],
}

# ── the wordmarks ────────────────────────────────────────────────────────────
# Set in each font's own spacing (no tightening: the monospace rhythm is the
# point), all at one scale, so the type is the same size in every file and the
# baseline sits at the same height. Cut from one to another in a video and
# nothing jumps.
WORDMARKS = {
    'at-j__cart': '@j__cart',
    'jarred-m-carter': 'jarred m. carter',
    'jarred-carter': 'jarred carter',
}
WORDMARK_STYLES = {
    'mono': ['black', 'white', 'green', 'cyan', 'gradient', 'gradient-green'],
    'pixel': ['black', 'white', 'green'],
}
STYLE_PAINT = {'black': '#000000', 'white': '#ffffff', 'green': GREEN, 'cyan': CYAN,
               'gradient': 'pink', 'gradient-green': 'green'}
WORDMARK_SCALE = 0.4   # px per font unit: 400px type; a pixel-font pixel is exactly 50px

LEGACY = {   # old filename -> new design it now carries
    'j-code-mark': 'j-code-mono-tile-dark',
    'j-code-mark-gradient': 'j-code-mono-tile-dark-gradient',
    'j-mark': 'j-cursor-mono-tile-dark',
    'j-mark-gradient': 'j-cursor-mono-tile-dark-gradient',
}


def layout(mark, font):
    placed, box, _ = compose(FONT_KEY[font], MARKS[mark]['text'], MARKS[mark][font])
    if font == 'pixel':  # keep every glyph on the pixel grid
        placed = [(cmds, round(dx / PIXEL) * PIXEL) for cmds, dx in placed]
        polys = [[(x + dx, y) for x, y in p] for cmds, dx in placed for p in flatten(cmds)]
        box = bbox(polys)
    return placed, box


def path_d(placed, s, ox, oy):
    out = []
    for cmds, dx in placed:
        for c, pts in cmds:
            out.append(c + ' '.join(f'{(x + dx) * s + ox:.2f} {y * s + oy:.2f}'.replace('.00', '') for x, y in pts))
    return ''.join(out)


def paint(color, box_px, gid):
    """-> (fill attribute, defs)"""
    if color not in GRADIENTS:
        return color, ''
    x0, y0, x1, y1 = box_px
    stops = GRADIENTS[color]
    stop_xml = ''.join(f'<stop offset="{i / (len(stops) - 1):.2f}" stop-color="{c}"/>' for i, c in enumerate(stops))
    defs = (f'<defs><linearGradient id="{gid}" gradientUnits="userSpaceOnUse" x1="{x0:.0f}" y1="{y0:.0f}" '
            f'x2="{x1:.0f}" y2="{y1:.0f}">{stop_xml}</linearGradient></defs>')
    return f'url(#{gid})', defs


def tile_svg(mark, font, tile, color, gid):
    placed, (x0, y0, x1, y1) = layout(mark, font)
    w, h = x1 - x0, y1 - y0
    if font == 'pixel':
        s = PIXEL_PX / PIXEL
        left = round((2048 - w * s) / 2 / GRID) * GRID
        top = round((2048 - h * s) / 2 / GRID) * GRID
        ox, oy = left - x0 * s, top - y0 * s
    else:
        s = min(2048 * 0.62 / w, 2048 * 0.50 / h)
        ox, oy = (2048 - w * s) / 2 - x0 * s, (2048 - h * s) / 2 - y0 * s
    box_px = (x0 * s + ox, y0 * s + oy, x1 * s + ox, y1 * s + oy)
    fill, defs = paint(color, box_px, gid)
    crisp = ' shape-rendering="crispEdges"' if font == 'pixel' else ''
    bg, rule = tile
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="2048" height="2048">'
        '<title>Jarred M. Carter</title>' + defs +
        f'<rect width="2048" height="2048" rx="416" fill="{bg}"/>'
        f'<rect x="56" y="56" width="1936" height="1936" rx="360" fill="none" stroke="{rule}" stroke-width="72"/>'
        f'<path fill="{fill}"{crisp} d="{path_d(placed, s, ox, oy)}"/>'
        '</svg>'
    )


def bare_png_width(mark, font):
    """Pixel marks export at exactly PIXEL_PX per font pixel, so edges stay sharp."""
    if font != 'pixel':
        return 2048
    _, (x0, _, x1, _) = layout(mark, font)
    return round((x1 - x0) / PIXEL + 2) * PIXEL_PX


def bare_svg(mark, font, color, gid):
    placed, (x0, y0, x1, y1) = layout(mark, font)
    pad = PIXEL if font == 'pixel' else 0.06 * max(x1 - x0, y1 - y0)
    vx, vy, vw, vh = x0 - pad, y0 - pad, (x1 - x0) + 2 * pad, (y1 - y0) + 2 * pad
    fill, defs = paint(color, (x0, y0, x1, y1), gid)
    crisp = ' shape-rendering="crispEdges"' if font == 'pixel' else ''
    height = 512
    width = round(height * vw / vh)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx:.0f} {vy:.0f} {vw:.0f} {vh:.0f}" width="{width}" height="{height}">'
        '<title>Jarred M. Carter</title>' + defs +
        f'<path fill="{fill}"{crisp} d="{path_d(placed, 1, 0, 0)}"/>'
        '</svg>'
    )


def natural_layout(font, text):
    """Glyphs at the font's own advances. -> [(cmds, dx)]"""
    data = load(FONT_KEY[font], text)
    placed, x = [], 0.0
    for glyph in data['glyphs']:
        if glyph['d']:
            placed.append((parse(glyph['d']), x))
        x += glyph['advance']
    return placed


def placed_bbox(placed):
    return bbox([[(x + dx, y) for x, y in p] for cmds, dx in placed for p in flatten(cmds)])


def wordmark_svg(text, font, placed, band, colour, gid):
    """`band` is the shared (top, bottom) for this font, so every wordmark in
    it has the same height and baseline."""
    x0, _, x1, _ = placed_bbox(placed)
    top, bottom = band
    pad = PIXEL if font == 'pixel' else 60
    vx, vy, vw, vh = x0 - pad, top - pad, (x1 - x0) + 2 * pad, (bottom - top) + 2 * pad
    fill, defs = paint(colour, (x0, top, x1, bottom), gid)
    crisp = ' shape-rendering="crispEdges"' if font == 'pixel' else ''
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vx:.0f} {vy:.0f} {vw:.0f} {vh:.0f}" '
        f'width="{vw * WORDMARK_SCALE:.0f}" height="{vh * WORDMARK_SCALE:.0f}">'
        f'<title>{text}</title>' + defs +
        f'<path fill="{fill}"{crisp} d="{path_d(placed, 1, 0, 0)}"/>'
        '</svg>'
    ), round(vw * WORDMARK_SCALE)


def build_wordmarks(brand):
    svg_dir, png_dir = brand / 'wordmarks' / 'svg', brand / 'wordmarks' / 'png'
    svg_dir.mkdir(parents=True, exist_ok=True)
    png_dir.mkdir(parents=True, exist_ok=True)
    for font, styles in WORDMARK_STYLES.items():
        layouts = {slug: natural_layout(font, text) for slug, text in WORDMARKS.items()}
        boxes = [placed_bbox(placed) for placed in layouts.values()]
        band = (min(b[1] for b in boxes), max(b[3] for b in boxes))
        for slug, placed in layouts.items():
            for style in styles:
                stem = f'{slug}-{font}-{style}'
                svg, width = wordmark_svg(WORDMARKS[slug], font, placed, band, STYLE_PAINT[style], f'{stem}-gradient')
                (svg_dir / f'{stem}.svg').write_text(svg + '\n')
                render(svg_dir / f'{stem}.svg', png_dir / f'{stem}.png', width)
                print('built', stem)


def render(svg_path, png_path, width=2048, jpg_bg=None):
    args = [str(tool('render')), str(svg_path), str(png_path), str(width)]
    if jpg_bg:
        args.append(jpg_bg)
    subprocess.run(args, check=True)


def main():
    brand = Path(sys.argv[1]) if len(sys.argv) > 1 else HERE.parent.parent / 'public' / 'brand'
    svg_dir, png_dir = brand / 'j' / 'svg', brand / 'j' / 'png'
    svg_dir.mkdir(parents=True, exist_ok=True)
    png_dir.mkdir(parents=True, exist_ok=True)
    built = {}
    for mark in MARKS:
        for font, styles in STYLES.items():
            for name, kind, tile, color in styles:
                stem = f'j-{mark}-{font}-{name}'
                gid = f'{stem}-gradient'  # unique, so several marks can share one page
                svg = tile_svg(mark, font, tile, color, gid) if kind == 'tile' else bare_svg(mark, font, color, gid)
                (svg_dir / f'{stem}.svg').write_text(svg + '\n')
                width = 2048 if kind == 'tile' else bare_png_width(mark, font)
                render(svg_dir / f'{stem}.svg', png_dir / f'{stem}.png', width)
                built[stem] = svg
                print('built', stem)
    for old, new in LEGACY.items():
        (brand / f'{old}.svg').write_text(built[new] + '\n')
        render(brand / f'{old}.svg', brand / f'{old}-2048.png')
        render(brand / f'{old}.svg', brand / f'{old}-2048.jpg', jpg_bg='#ffffff')
        print('regenerated', old)
    build_wordmarks(brand)


if __name__ == '__main__':
    main()
