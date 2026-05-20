import { StaticImageData } from "next/image";
import videoProduction from "@/assets/services/video-productions.jpg";
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
      "Video Dokumenter",
      "Film Production",
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
