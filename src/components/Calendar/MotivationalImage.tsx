//src/components/Calendar/MotivationalImage.tsx

"use client";

import React, { memo } from "react";
import Image from "next/image";
import { motivationalImages } from "@/config/calendar";
import type { MotivationalImageProps } from "@/types/calendar";

export const MotivationalImage: React.FC<MotivationalImageProps> = memo(
  ({ imageId }) => {
    const image =
      motivationalImages.find((img) => img.id === imageId) ||
      motivationalImages[0];

    return (
      <div
        className="w-full h-full rounded-xl overflow-hidden"
        role="img"
        aria-label={image.alt}
      >
        <div className="relative w-full h-full">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover"
          />
        </div>
      </div>
    );
  }
);

MotivationalImage.displayName = "MotivationalImage";
