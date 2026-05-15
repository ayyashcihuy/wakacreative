import { StaticImageData } from "next/image";
import videoProduction from "@/assets/services/video-productions.jpg";
import photoProduction from "@/assets/services/photo-production.jpg";
import videoEditing from "@/assets/services/video-editing.jpg";

export interface Service {
  id: string;
  title: string;
  category: string;
  image: StaticImageData;
  items: string[];
}

export const SERVICES: Service[] = [
  {
    id: "video-production",
    title: "Video Production",
    category: "Production",
    image: videoProduction,
    items: [
      "Video Company Profile",
      "Video Dokumentasi",
      "Video Iklan",
      "Video Konten",
      "Video Campaigne",
      "Video Podcast",
    ],
  },
  {
    id: "photo-production",
    title: "Photo Production",
    category: "Production",
    image: photoProduction,
    items: [
      "Foto Company Profile",
      "Foto Dokumentasi",
      "Foto Direksi",
      "Foto Iklan",
    ],
  },
  {
    id: "video-editing",
    title: "Video Editing",
    category: "Post-Production",
    image: videoEditing,
    items: [
      "Color Grading",
      "Animasi",
      "Motion Graphic",
    ],
  },
];
