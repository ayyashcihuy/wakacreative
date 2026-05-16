// Images served as static files from public/hero/
// No static imports = no build-time processing overhead on VPS

export interface CarouselItem {
  src: string;
  title: string;
  category: string;
  alt: string;
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    src: "/hero/waka-creative-3d-animation-video-production.png",
    title: "3D Animation",
    category: "Video Production",
    alt: "Waka Creative — Proyek 3D Animation untuk Video Production",
  },
  {
    src: "/hero/waka-creative-dinas-kebudayaan-jakarta-video-production.png",
    title: "Dinas Kebudayaan Jakarta",
    category: "Video Production",
    alt: "Waka Creative — Video Production untuk Dinas Kebudayaan Jakarta",
  },
  {
    src: "/hero/waka-creative-dinas-kebudayaan-jakarta-social-media.png",
    title: "Dinas Kebudayaan Jakarta",
    category: "Social Media",
    alt: "Waka Creative — Konten Social Media untuk Dinas Kebudayaan Jakarta",
  },
  {
    src: "/hero/waka-creative-dinas-kebudayaan-jakarta-dokumentasi.png",
    title: "Dinas Kebudayaan Jakarta",
    category: "Video Production",
    alt: "Waka Creative — Video Dokumentasi Dinas Kebudayaan Jakarta",
  },
  {
    src: "/hero/waka-creative-company-profile-01.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Company Profile Profesional",
  },
  {
    src: "/hero/waka-creative-company-profile-02.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Produksi Video Company Profile Bekasi",
  },
  {
    src: "/hero/waka-creative-tvc-iklan-01.png",
    title: "",
    category: "TVC",
    alt: "Waka Creative — Produksi Iklan TVC Profesional",
  },
  {
    src: "/hero/waka-creative-tvc-iklan-02.png",
    title: "",
    category: "TVC",
    alt: "Waka Creative — Jasa Produksi Video Iklan TVC",
  },
  {
    src: "/hero/waka-creative-company-profile-03.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Company Profile untuk Brand Indonesia",
  },
  {
    src: "/hero/waka-creative-company-profile-04.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Videografi Company Profile Bekasi Jakarta",
  },
  {
    src: "/hero/waka-creative-company-profile-05.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Jasa Video Company Profile Terpercaya",
  },
  {
    src: "/hero/waka-creative-company-profile-06.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Produksi Video Profil Perusahaan",
  },
  {
    src: "/hero/waka-creative-company-profile-07.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Production Company Profile Bekasi",
  },
  {
    src: "/hero/waka-creative-company-profile-08.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Sinematografi Company Profile Profesional",
  },
  {
    src: "/hero/waka-creative-company-profile-09.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Portfolio Video Company Profile",
  },
  {
    src: "/hero/waka-creative-company-profile-10.png",
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Layanan Video Production dan Foto Bekasi",
  },
];

export const CAROUSEL_IMAGES = CAROUSEL_ITEMS.map((item) => item.src);
