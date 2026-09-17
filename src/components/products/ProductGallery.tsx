"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  title: string;
}


export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const gallery = images.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-mist bg-mist">
        <Image
          src={gallery[activeIndex]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-contain"
          priority
        />
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-3">
          {gallery.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-mist transition-colors ${
                index === activeIndex ? "border-brand-teal" : "border-mist hover:border-ink/20"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}