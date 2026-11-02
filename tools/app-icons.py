"""Copy each announced app's real icon from its own project into the site.

    python3 tools/app-icons.py

Writes src/app/assets/<slug>/icon.webp, 256px with a transparent corner, for
every app in APPS below. The cards, the product pages, and the "More From
Retrac Labs" list show it in place of the Lucide icon (`appIcon` in
projects.ts).

Icons drawn in Icon Composer (an `.icon` folder) are rendered by Xcode's own
ictool, the same renderer the App Store build uses, so the glass and shading
match the app. Icons that are plain PNGs are used as they are; a full-bleed
square (an iOS icon, which iOS rounds itself) is cut to Apple's icon shape,
which ictool also draws.

Never add a codename project here: its real icon would name it.
"""
import io
import json
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

HOME = Path.home()
ASSETS = Path(__file__).parent.parent / 'src' / 'app' / 'assets'
ICTOOL = '/Applications/Xcode.app/Contents/Applications/Icon Composer.app/Contents/Executables/ictool'
SIZE = 256   # four times the 64px it shows at on a card, so it stays sharp at 2x and 3x

# slug: (source, platform for an .icon). The platform decides the shape and
# lighting ictool draws: macOS for Mac apps, iOS for iPhone apps.
APPS = {
    'get-on-the-rug': (HOME / 'Documents/GetOnTheRug/GetOnTheRug/Resources/Assets.xcassets/AppIcon.appiconset/AppIcon-1024.png', None),
    'hash-drop': (HOME / 'Documents/HashDrop/HashDrop/AppIcon.icon', 'macOS'),
    'apunte': (HOME / 'Documents/Apunte/Resources/Assets.xcassets/AppIcon.appiconset/icon_512x512@2x.png', None),
    'retazo': (HOME / 'Downloads/Retazo/Snippy/AppIcon.icon', 'macOS'),
    'amparo': (HOME / 'Documents/Amparo/Amparo/AppIcon.icon', 'iOS'),
}


def render(document, platform):
    """An Icon Composer document, drawn by ictool at 1024px."""
    with tempfile.TemporaryDirectory() as folder:
        out = Path(folder) / 'icon.png'
        subprocess.run([ICTOOL, str(document), '--export-image', '--output-file', str(out),
                        '--platform', platform, '--rendition', 'Default',
                        '--width', '1024', '--height', '1024', '--scale', '1'],
                       check=True, capture_output=True)
        return Image.open(out).convert('RGBA')


def icon_shape():
    """Apple's icon shape as a 1024px mask: a blank, opaque Icon Composer
    document, drawn by ictool."""
    with tempfile.TemporaryDirectory() as folder:
        document = Path(folder) / 'Shape.icon'
        document.mkdir()
        (document / 'icon.json').write_text(json.dumps({'fill': {'solid': 'srgb:1,1,1,1'}, 'groups': []}))
        return render(document, 'iOS').getchannel('A')


def main():
    shape = None
    for slug, (source, platform) in APPS.items():
        if platform:
            image = render(source, platform)
        else:
            image = Image.open(source).convert('RGBA')
            if image.getchannel('A').getextrema()[0] == 255:   # a full-bleed square
                shape = shape or icon_shape()
                image = image.resize((1024, 1024), Image.LANCZOS)
                image.putalpha(shape)
            else:   # a Mac icon, already shaped, with a margin around it
                image = image.crop(image.getchannel('A').getbbox())
        out = ASSETS / slug / 'icon.webp'
        out.parent.mkdir(exist_ok=True)
        buffer = io.BytesIO()
        image.resize((SIZE, SIZE), Image.LANCZOS).save(buffer, 'WEBP', quality=90, method=6)
        out.write_bytes(buffer.getvalue())
        print(f'{out.relative_to(ASSETS.parent.parent.parent)}  {len(buffer.getvalue()):>6} bytes')


if __name__ == '__main__':
    main()
