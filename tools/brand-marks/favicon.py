"""Build the Retrac Labs favicon: the RL monogram, a white R and a gradient L
on the dark tile, from real font outlines.

    python3 tools/brand-marks/favicon.py

Writes:
    public/brand/favicon.svg      the tab icon for current browsers
    public/favicon.ico            16, 32, and 48px, for older browsers and
                                  anything that asks for /favicon.ico on its own
    public/apple-touch-icon.png   180px, for the site saved to an iPhone home
                                  screen (square: iOS rounds the corners itself)

The letters are outlines of Geist Black, not live text. The old favicon was
<text> in the system font, so it drew in whatever font each device had (Segoe
UI on Windows, Roboto on Android), and some renderers, macOS's own included,
dropped the weight and drew it thin. Geist is under the SIL Open Font License,
which allows a logo; Apple's San Francisco does not.
"""
import io
import subprocess
from pathlib import Path

from PIL import Image

from compose import compose, svg_paths, tool

HERE = Path(__file__).parent
PUBLIC = HERE.parent.parent / 'public'

TILE, RING = '#09090b', '#3f3f46'                # zinc-950 and zinc-700, the site's own
GRADIENT = ['#e879f9', '#ec4899', '#fb923c']    # the RETRAC LABS wordmark gradient
GAP_EM = 0.07      # the narrowest distance between the R and the L
CAP = 0.36         # cap height as a share of the tile; big enough to read at 16px


def svg(ring=True, rounded=True):
    """The icon on a 512 grid. The ring is a smudge at 16px, and the
    home-screen icon is square because iOS rounds and masks it."""
    placed, (x0, y0, x1, y1), data = compose('sans', 'RL', [GAP_EM])
    s = CAP * 512 / data['capHeight']
    ox = 256 - (x0 + x1) / 2 * s
    oy = 256 + CAP * 512 / 2            # baseline, so the cap height is centered
    r, l = svg_paths(placed, s, ox, oy)
    stops = ''.join(f'<stop offset="{i * 50}%" stop-color="{c}"/>' for i, c in enumerate(GRADIENT))
    tile = (f'<rect width="512" height="512" rx="112" fill="{TILE}"/>' if rounded
            else f'<rect width="512" height="512" fill="{TILE}"/>')
    if ring and rounded:
        tile += f'<rect x="22" y="22" width="468" height="468" rx="96" fill="none" stroke="{RING}" stroke-width="24"/>'
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">'
            '<title>Retrac Labs</title>'
            f'<defs><linearGradient id="rl" x1="0%" y1="0%" x2="100%" y2="0%">{stops}</linearGradient></defs>'
            f'{tile}<path fill="#ffffff" d="{r}"/><path fill="url(#rl)" d="{l}"/></svg>\n')


def png(text, size, tmp):
    """Rasterize at the exact size, rather than shrinking a big render."""
    src, out = tmp / f'icon-{size}.svg', tmp / f'icon-{size}.png'
    src.write_text(text)
    subprocess.run([str(tool('render')), str(src), str(out), str(size)], check=True)
    with Image.open(out) as im:
        return im.convert('RGBA').copy()


def main():
    import tempfile
    with tempfile.TemporaryDirectory() as t:
        tmp = Path(t)
        full = svg()
        (PUBLIC / 'brand' / 'favicon.svg').write_text(full)
        frames = [png(svg(ring=False), 16, tmp), png(full, 32, tmp), png(full, 48, tmp)]
        frames[-1].save(PUBLIC / 'favicon.ico', sizes=[f.size for f in frames], append_images=frames[:-1])
        touch = png(svg(rounded=False), 180, tmp).convert('RGB')
        buf = io.BytesIO()
        touch.save(buf, 'PNG', optimize=True)   # no metadata: Pillow adds none unless asked
        (PUBLIC / 'apple-touch-icon.png').write_bytes(buf.getvalue())
    for p in ('brand/favicon.svg', 'favicon.ico', 'apple-touch-icon.png'):
        print(f'public/{p:22} {(PUBLIC / p).stat().st_size:>6} bytes')


if __name__ == '__main__':
    main()
