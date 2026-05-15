import Image from "next/image";
import { StaticImageData } from "next/image";

interface ProjectCarouselRowProps {
  images: StaticImageData[];
  direction: "left" | "right";
  durationSec?: number;
}

export default function ProjectCarouselRow({
  images,
  direction,
  durationSec = 105,
}: ProjectCarouselRowProps) {
  const doubled = [...images, ...images];
  const trackClass =
    direction === "left" ? "carousel-track" : "carousel-track-reverse";

  return (
    <div className="w-full overflow-hidden flex-shrink-0">
      <div
        className={`flex gap-3 ${trackClass}`}
        style={{ width: "max-content", animationDuration: `${durationSec}s` }}
      >
        {doubled.map((img, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[180px] h-[120px] sm:w-[210px] sm:h-[140px] rounded-lg overflow-hidden"
          >
            <Image
              src={img}
              alt={`Project ${(index % images.length) + 1}`}
              fill
              className="object-cover"
              sizes="210px"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
