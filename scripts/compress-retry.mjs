/**
 * Retry compression for files that failed with EPERM.
 * Uses buffer approach: sharp → buffer → writeFileSync (no unlink needed).
 */

import sharp from "sharp";
import { readFileSync, writeFileSync, statSync } from "fs";

const FAILED = [
  { path: "src/assets/clients_logo/channels4_profile.jpg",                                          maxWidth: 320,  quality: 82 },
  { path: "src/assets/clients_logo/fIyYLOD4WzWdLeSfI1FpEHNSZ2I8UaRX6jVMqPtXwuQ.jpg",              maxWidth: 320,  quality: 82 },
  { path: "src/assets/services/photo-production.jpg",                                               maxWidth: 1400, quality: 80 },
  { path: "src/assets/services/video-editing.jpg",                                                  maxWidth: 1400, quality: 80 },
  { path: "src/assets/services/video-productions.jpg",                                              maxWidth: 1400, quality: 80 },
  { path: "src/assets/image/about/hero1.jpg",                                                       maxWidth: 1400, quality: 80 },
  { path: "src/assets/image/about/hero2.jpg",                                                       maxWidth: 1400, quality: 80 },
  { path: "src/assets/image/about/hero3.jpg",                                                       maxWidth: 1400, quality: 80 },
  { path: "src/assets/image/about/hero4.jpg",                                                       maxWidth: 1400, quality: 80 },
];

let totalBefore = 0;
let totalAfter  = 0;

for (const { path: filePath, maxWidth, quality } of FAILED) {
  const sizeBefore = statSync(filePath).size;
  const ext = filePath.split(".").pop().toLowerCase();

  try {
    // Read as buffer first to bypass libvips file-open issues on Windows
    const inputBuffer = readFileSync(filePath);
    const instance = sharp(inputBuffer, { failOnError: false })
      .toColorspace("srgb")
      .resize(maxWidth, undefined, {
        withoutEnlargement: true,
        fit: "inside",
      });

    const buf = ext === "jpg" || ext === "jpeg"
      ? await instance.jpeg({ quality, mozjpeg: true }).toBuffer()
      : await instance.png({ compressionLevel: 9, effort: 10 }).toBuffer();

    if (buf.length >= sizeBefore) {
      console.log(`  ⏭  ${filePath}  (already optimal)`);
      continue;
    }

    writeFileSync(filePath, buf);

    const savedPct = Math.round((1 - buf.length / sizeBefore) * 100);
    const beforeKB  = Math.round(sizeBefore / 1024);
    const afterKB   = Math.round(buf.length  / 1024);
    console.log(`  ✓  ${filePath.split("/").pop().substring(0,50).padEnd(50)}  ${String(beforeKB).padStart(6)} KB → ${String(afterKB).padStart(5)} KB  (-${savedPct}%)`);

    totalBefore += sizeBefore;
    totalAfter  += buf.length;
  } catch (err) {
    console.error(`  ✗  ${filePath}: ${err.message}`);
  }
}

const savedMB  = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
const beforeMB = (totalBefore / 1024 / 1024).toFixed(1);
const afterMB  = (totalAfter  / 1024 / 1024).toFixed(1);

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Before : ${beforeMB} MB
  After  : ${afterMB} MB
  Saved  : ${savedMB} MB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
