import { StaticImageData } from "next/image";
import heroImage1 from "@/assets/image/hero/Screenshot 2023-05-16 093710.png";
import heroImage2 from "@/assets/image/hero/Screenshot 2023-05-16 092600.png";
import heroImage3 from "@/assets/image/hero/Screenshot 2023-05-16 092530.png";
import heroImage4 from "@/assets/image/hero/Screenshot 2023-05-16 092441.png";
import heroImage5 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.56.12.png";
import heroImage6 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.56.48.png";
import heroImage7 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.57.20.png";
import heroImage8 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.58.29.png";
import heroImage9 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.59.06.png";
import heroImage10 from "@/assets/image/hero/Screenshot 2026-05-15 at 15.59.36.png";
import heroImage11 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.00.12.png";
import heroImage12 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.00.47.png";
import heroImage13 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.01.18.png";
import heroImage14 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.01.33.png";
import heroImage15 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.01.55.png";
import heroImage16 from "@/assets/image/hero/Screenshot 2026-05-15 at 16.02.08.png";

export interface CarouselItem {
  src: StaticImageData;
  title: string;
  category: string;
}

export const CAROUSEL_ITEMS: CarouselItem[] = [
  { src: heroImage1, title: "3D Animation", category: "Video Production" },
  { src: heroImage2, title: "Dinas Kebudayaan Jakarta", category: "Video Production" },
  { src: heroImage3, title: "Dinas Kebudayaan Jakarta", category: "Social Media" },
  { src: heroImage4, title: "Dinas Kebudayaan Jakarta", category: "Video Production" },
  { src: heroImage5, title: "", category: "Company Profile" },
  { src: heroImage6, title: "", category: "Company Profile " },
  { src: heroImage7, title: "", category: "TVC" },
  { src: heroImage8, title: "", category: "TVC" },
  { src: heroImage9, title: "", category: "Company Profile" },
  { src: heroImage10, title: "", category: "Company Profile" },
  { src: heroImage11, title: "", category: "Company Profile" },
  { src: heroImage12, title: "", category: "Company Profile" },
  { src: heroImage13, title: "", category: "Company Profile" },
  { src: heroImage14, title: "", category: "Company Profile" },
  { src: heroImage15, title: "", category: "Company Profile" },
  { src: heroImage16, title: "", category: "Company Profile" },
];

// Legacy export kept for backwards compatibility
export const CAROUSEL_IMAGES = CAROUSEL_ITEMS.map((item) => item.src);
