"use client";

import Image from "next/image";
import { useState } from "react";
import { CarouselItem } from "@/constants/carouselImages";

interface InfiniteCarouselProps {
  items: CarouselItem[];
  onItemHover: (item: CarouselItem | null) => void;
}

export default function InfiniteCarousel({
  items,
  onItemHover,
}: InfiniteCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const doubled = [...items, ...items];
  const isPaused = hoveredIndex !== null;

  function handleEnter(index: number, item: CarouselItem) {
    setHoveredIndex(index);
    onItemHover(item);
  }

  function handleLeave() {
    setHoveredIndex(null);
    onItemHover(null);
  }

  return (
    <div className="w-full overflow-hidden" onMouseLeave={handleLeave}>
      <div
        className={`flex gap-4 carousel-track${isPaused ? " paused" : ""}`}
        style={{ width: "max-content" }}
      >
        {doubled.map((item, index) => {
          const dimmed = hoveredIndex !== null && hoveredIndex !== index;
          return (
            <div
              key={index}
              className="relative flex-shrink-0 w-[220px] h-[150px] sm:w-[300px] sm:h-[200px] lg:w-[340px] lg:h-[230px] rounded-xl overflow-hidden cursor-pointer"
              style={{
                opacity: dimmed ? 0.25 : 1,
                transition: "opacity 0.4s ease",
              }}
              onMouseEnter={() => handleEnter(index, item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 300px, 340px"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
