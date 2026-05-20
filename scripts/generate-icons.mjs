/**
 * Generate all app icons from logo_wide.png as source.
 * Run: node scripts/generate-icons.mjs
 *
 * Output files:
 *   src/app/favicon.ico           → 48x48 (PNG format, accepted by modern browsers & Next.js)
 *   src/app/icon1.png             → 96x96
 *   src/app/apple-icon.png        → 180x180
 *   public/web-app-manifest-192x192.png → 192x192
 *   public/web-app-manifest-512x512.png → 512x512
 */

import sharp from "sharp";
import { writeFileSync } from "fs";

const SOURCE  = "src/assets/logo/logo_wide.png";
const BG      = { r: 10, g: 10, b: 10, alpha: 1 }; // #0a0a0a — site background

const TARGETS = [
  { out: "src/app/favicon.ico",                    size: 48  },
  { out: "src/app/icon1.png",                      size: 96  },
  { out: "src/app/apple-icon.png",                 size: 180 },
  { out: "public/web-app-manifest-192x192.png",    size: 192 },
  { out: "public/web-app-manifest-512x512.png",    size: 512 },
];

for (const { out, size } of TARGETS) {
  const padding = Math.round(size * 0.15); // 15% padding on each side
  const logoSize = size - padding * 2;

  const buf = await sharp(SOURCE)
    .resize(logoSize, logoSize, { fit: "contain", background: BG })
    .flatten({ background: BG })
    .extend({
      top: padding, bottom: padding, left: padding, right: padding,
      background: BG,
    })
    .png()
    .toBuffer();

  writeFileSync(out, buf);
  console.log(`✓  ${out}  (${size}x${size}px)`);
}

console.log("\nDone. All icons generated from logo_wide.png.");
