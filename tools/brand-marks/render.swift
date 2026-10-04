// Rasterize an SVG to PNG (transparency kept) or JPG with macOS's own SVG
// renderer. The output width is given; height follows the SVG's aspect ratio.
// usage: render <in.svg> <out.png|out.jpg> <width>
import AppKit
import ImageIO
import UniformTypeIdentifiers

let args = CommandLine.arguments
guard args.count >= 4, let width = Int(args[3]) else { fatalError("usage: render <in.svg> <out> <width>") }
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])
guard let image = NSImage(contentsOf: input), image.size.width > 0 else { fatalError("cannot load \(args[1])") }
let height = Int((Double(width) * image.size.height / image.size.width).rounded())

let space = CGColorSpace(name: CGColorSpace.sRGB)!
guard let ctx = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0,
                          space: space, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue) else { fatalError("no context") }
let isJPEG = output.pathExtension.lowercased().hasPrefix("jp")
if isJPEG, args.count >= 5 {  // JPEG has no alpha: fill with the given hex color first
    let hex = args[4].trimmingCharacters(in: CharacterSet(charactersIn: "#"))
    let v = UInt32(hex, radix: 16) ?? 0
    ctx.setFillColor(CGColor(srgbRed: CGFloat((v >> 16) & 0xff) / 255, green: CGFloat((v >> 8) & 0xff) / 255, blue: CGFloat(v & 0xff) / 255, alpha: 1))
    ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))
}
ctx.interpolationQuality = .high
NSGraphicsContext.current = NSGraphicsContext(cgContext: ctx, flipped: false)
image.draw(in: NSRect(x: 0, y: 0, width: width, height: height))
NSGraphicsContext.current = nil

guard let cg = ctx.makeImage(),
      let dest = CGImageDestinationCreateWithURL(output as CFURL, (isJPEG ? UTType.jpeg : UTType.png).identifier as CFString, 1, nil)
else { fatalError("cannot write \(args[2])") }
let props: [CFString: Any] = isJPEG ? [kCGImageDestinationLossyCompressionQuality: 0.92] : [:]
CGImageDestinationAddImage(dest, cg, props as CFDictionary)
guard CGImageDestinationFinalize(dest) else { fatalError("write failed") }
