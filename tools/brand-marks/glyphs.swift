// Prints the outlines of each character of a string as SVG path data, in font
// units with y pointing down (baseline at 0), plus advances and font metrics.
// usage: swift glyphs.swift <font file> <wght, or 0 for a static font> <text>
import CoreGraphics
import CoreText
import Foundation

let args = CommandLine.arguments
guard args.count >= 4 else { fatalError("usage: glyphs <font> <wght> <text>") }
let url = URL(fileURLWithPath: args[1]) as CFURL
let wght = Double(args[2]) ?? 0
let text = args[3]

guard let descs = CTFontManagerCreateFontDescriptorsFromURL(url) as? [CTFontDescriptor],
      var desc = descs.first else { fatalError("cannot read font at \(args[1])") }
if wght > 0 {
    let wghtTag = 0x7767_6874  // 'wght'
    let attrs: [CFString: Any] = [kCTFontVariationAttribute: [wghtTag: wght]]
    desc = CTFontDescriptorCreateCopyWithAttributes(desc, attrs as CFDictionary)
}
let probe = CTFontCreateWithFontDescriptor(desc, 1000, nil)
let upem = CGFloat(CTFontGetUnitsPerEm(probe))
let font = CTFontCreateWithFontDescriptor(desc, upem, nil)  // size == upem, so 1 unit == 1 font unit

func fmt(_ v: CGFloat) -> String {
    let r = (Double(v) * 100).rounded() / 100
    return r == r.rounded() ? String(Int(r)) : String(r)
}

var out: [[String: Any]] = []
for ch in text {
    var utf16 = Array(String(ch).utf16)
    var glyphs = [CGGlyph](repeating: 0, count: utf16.count)
    guard CTFontGetGlyphsForCharacters(font, &utf16, &glyphs, utf16.count) else {
        fatalError("font has no glyph for \(ch)")
    }
    var advance = CGSize.zero
    CTFontGetAdvancesForGlyphs(font, .horizontal, &glyphs, &advance, 1)
    var d = ""
    if let path = CTFontCreatePathForGlyph(font, glyphs[0], nil) {
        path.applyWithBlock { element in
            let e = element.pointee
            let p = e.points
            switch e.type {
            case .moveToPoint: d += "M\(fmt(p[0].x)) \(fmt(-p[0].y))"
            case .addLineToPoint: d += "L\(fmt(p[0].x)) \(fmt(-p[0].y))"
            case .addQuadCurveToPoint: d += "Q\(fmt(p[0].x)) \(fmt(-p[0].y)) \(fmt(p[1].x)) \(fmt(-p[1].y))"
            case .addCurveToPoint: d += "C\(fmt(p[0].x)) \(fmt(-p[0].y)) \(fmt(p[1].x)) \(fmt(-p[1].y)) \(fmt(p[2].x)) \(fmt(-p[2].y))"
            case .closeSubpath: d += "Z"
            @unknown default: break
            }
        }
    }
    out.append(["char": String(ch), "advance": Double(advance.width), "d": d])
}

let result: [String: Any] = [
    "font": CTFontCopyFullName(font) as String,
    "unitsPerEm": Double(upem),
    "ascent": Double(CTFontGetAscent(font)),
    "descent": Double(CTFontGetDescent(font)),
    "capHeight": Double(CTFontGetCapHeight(font)),
    "xHeight": Double(CTFontGetXHeight(font)),
    "glyphs": out,
]
let data = try JSONSerialization.data(withJSONObject: result, options: [.sortedKeys])
print(String(data: data, encoding: .utf8)!)
