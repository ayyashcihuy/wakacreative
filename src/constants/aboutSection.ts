import heroImage1 from "@/assets/image/about/hero1.jpg";
import heroImage2 from "@/assets/image/about/hero2.jpg";
import heroImage3 from "@/assets/image/about/hero3.jpg";
import heroImage4 from "@/assets/image/about/hero4.jpg";

export const ABOUT_SECTION_CONTENT = {
  title: "About Waka",
  description: `Waka Creative is a video production specialist dedicated to telling your story with precision and impact. From company profiles and commercial films to documentaries and branded content, we craft every frame to represent you and your brand authentically — delivering productions that resonate with the right audience.`,
  imagePosition: "right" as const,
  // To add images:
  // 1. Place image files in src/assets/image/about/
  // 2. Import them below
  // 3. Add to images array
  images: [heroImage1, heroImage2, heroImage3, heroImage4],
};
