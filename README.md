# Waka Creative

Website resmi **Waka Creative** — spesialis video production & foto profesional di Bekasi, Indonesia.

---

## Menjalankan Project

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm start
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

---

## Environment Variables

Buat file `.env.local` di root project dengan variabel berikut:

```env
# Google Analytics 4 (isi setelah mendapatkan Measurement ID dari Google)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Struktur Konten

Semua konten website yang perlu diupdate ada di folder `src/constants/`:

| File | Isi |
|------|-----|
| `src/constants/aboutSection.ts` | Teks dan gambar di section About |
| `src/constants/services.ts` | Daftar layanan (Video Production, Foto, Editing) |
| `src/constants/carouselImages.ts` | Gambar-gambar di carousel hero |
| `src/constants/projectImages.ts` | Gambar di section Projects |

---

## Management Website

### Menambah Gambar Portfolio Baru

1. Letakkan file gambar di `src/assets/image/hero/`
2. Gunakan nama file yang deskriptif, contoh: `waka-creative-video-company-profile-bank-xyz.jpg`
3. Import dan tambahkan ke array `CAROUSEL_ITEMS` di `src/constants/carouselImages.ts`
4. Pastikan mengisi `title` dan `category` untuk setiap gambar

### Mengubah Informasi Kontak

Edit file `src/components/Section/Contact/ContactSection.tsx` — ubah nilai di array `CONTACT_ITEMS`.

### Mengubah Layanan

Edit file `src/constants/services.ts` — tambah, hapus, atau ubah objek di array `SERVICES`.

### Mengubah Teks About

Edit file `src/constants/aboutSection.ts` — ubah `title` dan `description`.

---

## Hal Penting Sebelum Deploy

- [ ] Pastikan file `public/og-image.jpg` sudah ada (1200x630px) — untuk preview saat link dibagikan
- [ ] Pastikan favicon set sudah ada di `public/` (`favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`)
- [ ] Pastikan `BASE_URL` di `src/app/layout.tsx` sesuai dengan domain yang aktif
- [ ] Isi `NEXT_PUBLIC_GA_ID` di environment variables platform deploy (Vercel, dll)

---

## Deploy

Cara termudah adalah via [Vercel](https://vercel.com):

1. Push repository ke GitHub
2. Connect repository di dashboard Vercel
3. Tambahkan environment variables di Vercel dashboard
4. Deploy otomatis setiap push ke branch `master`

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Radix UI
- **Language:** TypeScript
