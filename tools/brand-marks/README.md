# Brand Marks

Builds the J marks in `public/brand/j/` from real font outlines, so every file
renders identically everywhere, with no fonts installed.

```bash
python3 tools/brand-marks/build.py
```

Needs macOS, which supplies the font engine (CoreText) and the SVG renderer,
plus Xcode's command line tools for `swiftc`. The two Swift helpers compile
themselves on the first run.

## What Gets Built

Two marks, each in two fonts:

| Mark | Text | Fonts |
|---|---|---|
| `code` | `J/>` | `mono` (Geist Mono ExtraBold, the main mark) and `pixel` (Silkscreen Bold) |
| `cursor` | `J_` | the same two |

Each comes as a tile (the rounded app-icon square) and as a transparent mark:

| Style | Mono | Pixel |
|---|---|---|
| `tile-dark`, `tile-dark-green`, `tile-light` | yes | yes |
| `tile-dark-gradient` | yes | |
| `black`, `white`, `green` | yes | yes |
| `cyan`, `gradient`, `gradient-green` | yes | |

Files are named `j-<mark>-<font>-<style>`, as SVG in `j/svg/` and 2048px PNG in
`j/png/`. Tiles are 2048 × 2048; transparent marks are 2048px wide, except the
pixel ones, which export at exactly 96px per font pixel so their edges stay
sharp.

## Wordmarks

`public/brand/wordmarks/` holds `@j__cart`, `jarred m. carter`, and
`jarred carter`, transparent, made for laying over photos and video:

| Font | Colors |
|---|---|
| `mono` (Geist Mono ExtraBold) | `black`, `white`, `green`, `cyan`, `gradient`, `gradient-green` |
| `pixel` (Silkscreen Bold) | `black`, `white`, `green` |

Files are named `<text>-<font>-<color>`, for example
`at-j__cart-mono-white.png`. Unlike the J marks they keep each font's own
letter spacing, and every wordmark in a font shares one scale and one height:
the type is the same size in every file and the baseline sits at the same
point. Line two of them up in a video editor and cut between them, and the
text doesn't jump. PNGs are 400px type (`WORDMARK_SCALE`), wide enough for 4K
video; in the pixel font, each font pixel is exactly 50px.

Silkscreen has no lowercase, so its wordmarks are set in capitals.

The build also rewrites the four older files in `public/brand/` (`j-mark`,
`j-code-mark`, and their `-gradient` versions, with `-2048` PNG and JPG) in the
new design, so anything already linking to them picks it up.

## Fonts

Not committed. Put these two files in `tools/brand-marks/fonts/`:

- `GeistMono.ttf`: Geist Mono, the variable font, from Google Fonts
- `Silkscreen-Bold.ttf`: Silkscreen Bold, from Google Fonts

Both are released under the SIL Open Font License, which allows using them in
a logo.

## Changing Things

- **Colors** are at the top of `build.py`, taken from jarredmcarter.com's own
  CSS variables. The pink gradient is the RETRAC LABS wordmark gradient.
- **Spacing** is the `MARKS` table. Each gap is the narrowest distance between
  two neighboring glyphs, measured from their actual outlines, so it holds
  for any font. `/>` is kept tighter than the gap after the J, so it reads as
  one unit.
- **Pixel sharpness**: every pixel edge on a pixel tile lands on a multiple of
  32px (`GRID`), so a 2048 tile scales down to 1024, 512, 256, 128, or 64 with
  no blurred edges. The SVGs also ask renderers for crisp edges.
