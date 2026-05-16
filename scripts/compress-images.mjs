/**
 * Image compression script using sharp.
 * Run: node scripts/compress-images.mjs
 *
 * Strategy per folder:
 *  - clients/      : project tiles (displayed 180×120px)  → resize max 400px wide, quality 75
 *  - clients_logo/ : logos          (displayed 160×64px)   → resize max 320px wide, quality 82
 *  - contacts/     : contact image  (medium display)       → resize max 900px wide, quality 80
 *  - services/     : service photos (large display)        → resize max 1400px wide, quality 80
 *  - image/about/  : about photos   (large display)        → resize max 1400px wide, quality 80
 *  - image/hero/   : hero carousel  (displayed 340px wide) → resize max 700px wide,  quality 78
 */

import sharp from "sharp";
import { readdirSync, statSync, renameSync, unlinkSync } from "fs";
import { join, extname, basename } from "path";

const ASSET_BASE = "src/assets";

const CONFIGS = [
  { dir: "clients",        maxWidth: 400,  quality: 75 },
  { dir: "clients_logo",   maxWidth: 320,  quality: 82 },
  { dir: "contacts",       maxWidth: 900,  quality: 80 },
  { dir: "services",       maxWidth: 1400, quality: 80 },
  { dir: "image/about",    maxWidth: 1400, quality: 80 },
  { dir: "image/hero",     maxWidth: 700,  quality: 78 },
];

const SUPPORTED = new Set([".png", ".jpg", ".jpeg"]);

let totalBefore = 0;
let totalAfter  = 0;
let totalFiles  = 0;
let skipped     = 0;

for (const { dir, maxWidth, quality } of CONFIGS) {
  const fullDir = join(ASSET_BASE, dir);
  let files;
  try {
    files = readdirSync(fullDir);
  } catch {
    console.warn(`  [SKIP] Folder not found: ${fullDir}`);
    continue;
  }

  console.log(`\n📁 ${dir}  (max ${maxWidth}px, quality ${quality})`);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!SUPPORTED.has(ext)) continue;

    const filePath  = join(fullDir, file);
    const tmpPath   = filePath + ".tmp";
    const sizeBefore = statSync(filePath).size;

    try {
      const instance = sharp(filePath).resize(maxWidth, undefined, {
        withoutEnlargement: true,
        fit: "inside",
      });

      if (ext === ".jpg" || ext === ".jpeg") {
        await instance.jpeg({ quality, mozjpeg: true }).toFile(tmpPath);
      } else {
        // PNG: convert to png with high compression
        await instance.png({ compressionLevel: 9, effort: 10 }).toFile(tmpPath);
      }

      const sizeAfter = statSync(tmpPath).size;

      if (sizeAfter >= sizeBefore) {
        // If output is larger (rare edge case), keep original
        unlinkSync(tmpPath);
        skipped++;
        console.log(`  ⏭  ${file}  (already optimal, kept original)`);
        continue;
      }

      // Replace original with compressed
      unlinkSync(filePath);
      renameSync(tmpPath, filePath);

      const savedPct = Math.round((1 - sizeAfter / sizeBefore) * 100);
      const beforeKB  = Math.round(sizeBefore / 1024);
      const afterKB   = Math.round(sizeAfter  / 1024);
      console.log(`  ✓  ${file.substring(0, 55).padEnd(55)}  ${String(beforeKB).padStart(6)} KB → ${String(afterKB).padStart(5)} KB  (-${savedPct}%)`);

      totalBefore += sizeBefore;
      totalAfter  += sizeAfter;
      totalFiles++;
    } catch (err) {
      // Clean up tmp if it exists
      try { unlinkSync(tmpPath); } catch {}
      console.error(`  ✗  ${file}: ${err.message}`);
    }
  }
}

const savedMB   = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const beforeMB  = (totalBefore / 1024 / 1024).toFixed(1);
const afterMB   = (totalAfter  / 1024 / 1024).toFixed(1);
const savedPct  = Math.round((1 - totalAfter / totalBefore) * 100);

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Files compressed : ${totalFiles}
  Skipped          : ${skipped}
  Before           : ${beforeMB} MB
  After            : ${afterMB} MB
  Saved            : ${savedMB} MB  (-${savedPct}%)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
