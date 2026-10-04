"""Compose the J marks from real font outlines.

Spacing is set from the glyphs' actual shapes, not their advance widths: for
each pair, the gap is the narrowest horizontal distance between the two
outlines at any height. That is what lets "/>" sit tight as one unit while the
J keeps a little more air before it, whatever font is used.
"""
import json
import re
import subprocess
from pathlib import Path

HERE = Path(__file__).parent
# Font files are not committed; see README.md for where to get them.
FONTS = {
    'geist': (HERE / 'fonts' / 'GeistMono.ttf', 800),       # variable font, ExtraBold
    'silk': (HERE / 'fonts' / 'Silkscreen-Bold.ttf', 0),    # static font
}


def tool(name):
    """Path to a compiled Swift helper, building it on first use."""
    binary = HERE / name
    if not binary.exists():
        subprocess.run(['swiftc', '-O', str(HERE / f'{name}.swift'), '-o', str(binary)], check=True)
    return binary


def load(font_key, text):
    path, wght = FONTS[font_key]
    if not path.exists():
        raise SystemExit(f'missing font: {path} (see README.md)')
    out = subprocess.run([str(tool('glyphs')), str(path), str(wght), text], capture_output=True, check=True, text=True)
    return json.loads(out.stdout)


TOKEN = re.compile(r'[MLQCZ]|-?\d+(?:\.\d+)?')


def parse(d):
    """-> list of (cmd, [(x, y), ...]); our extractor only emits absolute M L Q C Z."""
    tokens = TOKEN.findall(d)
    cmds, i = [], 0
    counts = {'M': 1, 'L': 1, 'Q': 2, 'C': 3, 'Z': 0}
    while i < len(tokens):
        c = tokens[i]; i += 1
        pts = []
        for _ in range(counts[c]):
            pts.append((float(tokens[i]), float(tokens[i + 1]))); i += 2
        cmds.append((c, pts))
    return cmds


def flatten(cmds, steps=24):
    polys, cur, start = [], [], None
    for c, pts in cmds:
        if c == 'M':
            if cur: polys.append(cur)
            cur = [pts[0]]; start = pts[0]
        elif c == 'L':
            cur.append(pts[0])
        elif c == 'Q':
            (x0, y0), (x1, y1), (x2, y2) = cur[-1], pts[0], pts[1]
            for k in range(1, steps + 1):
                t = k / steps
                cur.append(((1-t)**2*x0 + 2*(1-t)*t*x1 + t*t*x2, (1-t)**2*y0 + 2*(1-t)*t*y1 + t*t*y2))
        elif c == 'C':
            (x0, y0), (x1, y1), (x2, y2), (x3, y3) = cur[-1], pts[0], pts[1], pts[2]
            for k in range(1, steps + 1):
                t = k / steps
                cur.append(((1-t)**3*x0 + 3*(1-t)**2*t*x1 + 3*(1-t)*t*t*x2 + t**3*x3,
                            (1-t)**3*y0 + 3*(1-t)**2*t*y1 + 3*(1-t)*t*t*y2 + t**3*y3))
        elif c == 'Z':
            if cur: polys.append(cur)
            cur = []
    if cur: polys.append(cur)
    return polys


def bbox(polys):
    xs = [x for p in polys for x, _ in p]; ys = [y for p in polys for _, y in p]
    return min(xs), min(ys), max(xs), max(ys)


def row_extents(polys, y):
    """x-intersections of a horizontal line with the outline -> (min, max) or None."""
    xs = []
    for p in polys:
        for (x1, y1), (x2, y2) in zip(p, p[1:] + p[:1]):
            if (y1 <= y < y2) or (y2 <= y < y1):
                xs.append(x1 + (y - y1) * (x2 - x1) / (y2 - y1))
    return (min(xs), max(xs)) if xs else None


def min_gap(left, right, dx_right=0.0, samples=400):
    """Narrowest horizontal gap between two outlines, right one shifted by dx."""
    l0, t0, l1, b0 = bbox(left); r0, t1, r1, b1 = bbox(right)
    top, bot = max(t0, t1), min(b0, b1)
    best = None
    for k in range(samples + 1):
        y = top + (bot - top) * k / samples
        L, R = row_extents(left, y), row_extents(right, y)
        if L and R:
            g = (R[0] + dx_right) - L[1]
            best = g if best is None else min(best, g)
    return best


def shift_path(cmds, dx, dy, s=1.0):
    out = []
    for c, pts in cmds:
        out.append(c + ' '.join(f'{(x*s+dx):.2f} {(y*s+dy):.2f}' for x, y in pts))
    return ''.join(out)


def compose(font_key, text, gaps_em):
    """Lay out `text`; gaps_em[i] is the target gap (in em) before glyph i+1.
    Returns (list of (cmds, dx)), bbox in font units, font metrics."""
    data = load(font_key, text)
    em = data['unitsPerEm']
    glyphs = [parse(g['d']) for g in data['glyphs']]
    placed = [(glyphs[0], 0.0)]
    for i in range(1, len(glyphs)):
        prev_cmds, prev_dx = placed[-1]
        prev = [[(x + prev_dx, y) for x, y in p] for p in flatten(prev_cmds)]
        cur = flatten(glyphs[i])
        target = gaps_em[i - 1] * em
        g0 = min_gap(prev, cur, 0.0)
        if g0 is None:  # no shared height (e.g. underscore below the J): use bounding boxes
            g0 = bbox(cur)[0] - bbox(prev)[2]
        placed.append((glyphs[i], target - g0))
    all_polys = [[(x + dx, y) for x, y in p] for cmds, dx in placed for p in flatten(cmds)]
    return placed, bbox(all_polys), data


def svg_paths(placed, scale, ox, oy):
    return [shift_path(cmds, dx * scale + ox, oy, scale) for cmds, dx in placed]
