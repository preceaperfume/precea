"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ProductImageSliderProps = {
  productName: string;
  images: string[];
};

export function ProductImageSlider({ productName, images }: ProductImageSliderProps) {
  const gallery = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [gallery]);

  useEffect(() => {
    if (gallery.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => window.clearInterval(timer);
  }, [gallery]);

  if (gallery.length === 0) return null;

  const canSlide = gallery.length > 1;

  const goToPrev = () => {
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="sm:col-span-2">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-lg">
        {gallery.map((image, index) => (
          <Image
            key={`${image}-${index}`}
            src={image}
            alt={`${productName} bottle`}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={`object-cover will-change-transform transition-[opacity,transform] duration-1000 ease-in-out ${
              index === activeIndex ? "scale-100 opacity-100" : "scale-[1.03] opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />

        {canSlide && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={goToPrev}
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white opacity-90 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-black/55 hover:opacity-100"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={goToNext}
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white opacity-90 backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-black/55 hover:opacity-100"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      
    </div>
  );
}
