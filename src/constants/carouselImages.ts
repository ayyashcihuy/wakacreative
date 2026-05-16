import { StaticImageData } from "next/image";
import heroImage1 from "@/assets/image/hero/waka-creative-3d-animation-video-production.png";
import heroImage2 from "@/assets/image/hero/waka-creative-dinas-kebudayaan-jakarta-video-production.png";
import heroImage3 from "@/assets/image/hero/waka-creative-dinas-kebudayaan-jakarta-social-media.png";
import heroImage4 from "@/assets/image/hero/waka-creative-dinas-kebudayaan-jakarta-dokumentasi.png";
import heroImage5 from "@/assets/image/hero/waka-creative-company-profile-01.png";
import heroImage6 from "@/assets/image/hero/waka-creative-company-profile-02.png";
import heroImage7 from "@/assets/image/hero/waka-creative-tvc-iklan-01.png";
import heroImage8 from "@/assets/image/hero/waka-creative-tvc-iklan-02.png";
import heroImage9 from "@/assets/image/hero/waka-creative-company-profile-03.png";
import heroImage10 from "@/assets/image/hero/waka-creative-company-profile-04.png";
import heroImage11 from "@/assets/image/hero/waka-creative-company-profile-05.png";
import heroImage12 from "@/assets/image/hero/waka-creative-company-profile-06.png";
import heroImage13 from "@/assets/image/hero/waka-creative-company-profile-07.png";
import heroImage14 from "@/assets/image/hero/waka-creative-company-profile-08.png";
import heroImage15 from "@/assets/image/hero/waka-creative-company-profile-09.png";
import heroImage16 from "@/assets/image/hero/waka-creative-company-profile-10.png";

export interface CarouselItem {
  src: StaticImageData;
  title: string;
  category: string;
  alt: string;
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    src: heroImage1,
    title: "3D Animation",
    category: "Video Production",
    alt: "Waka Creative — Proyek 3D Animation untuk Video Production",
  },
  {
    src: heroImage2,
    title: "Dinas Kebudayaan Jakarta",
    category: "Video Production",
    alt: "Waka Creative — Video Production untuk Dinas Kebudayaan Jakarta",
  },
  {
    src: heroImage3,
    title: "Dinas Kebudayaan Jakarta",
    category: "Social Media",
    alt: "Waka Creative — Konten Social Media untuk Dinas Kebudayaan Jakarta",
  },
  {
    src: heroImage4,
    title: "Dinas Kebudayaan Jakarta",
    category: "Video Production",
    alt: "Waka Creative — Video Dokumentasi Dinas Kebudayaan Jakarta",
  },
  {
    src: heroImage5,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Company Profile Profesional",
  },
  {
    src: heroImage6,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Produksi Video Company Profile Bekasi",
  },
  {
    src: heroImage7,
    title: "",
    category: "TVC",
    alt: "Waka Creative — Produksi Iklan TVC Profesional",
  },
  {
    src: heroImage8,
    title: "",
    category: "TVC",
    alt: "Waka Creative — Jasa Produksi Video Iklan TVC",
  },
  {
    src: heroImage9,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Company Profile untuk Brand Indonesia",
  },
  {
    src: heroImage10,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Videografi Company Profile Bekasi Jakarta",
  },
  {
    src: heroImage11,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Jasa Video Company Profile Terpercaya",
  },
  {
    src: heroImage12,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Produksi Video Profil Perusahaan",
  },
  {
    src: heroImage13,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Video Production Company Profile Bekasi",
  },
  {
    src: heroImage14,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Sinematografi Company Profile Profesional",
  },
  {
    src: heroImage15,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Portfolio Video Company Profile",
  },
  {
    src: heroImage16,
    title: "",
    category: "Company Profile",
    alt: "Waka Creative — Layanan Video Production dan Foto Bekasi",
  },
];

export const CAROUSEL_IMAGES = CAROUSEL_ITEMS.map((item) => item.src);
