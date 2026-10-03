"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ProductImageSliderProps = {
  productName: string;
  images: string[];
};

import { PerfumeLoader } from "@/components/perfume-loader";

export function ProductImageSlider({ productName, images }: ProductImageSliderProps) {
  const gallery = useMemo(() => Array.from(new Set(images.filter(Boolean))), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Reset loaded status and active index on new gallery
  useEffect(() => {
    setActiveIndex(0);
    setLoadedMap({});
  }, [gallery]);

  // Mark image loaded
  const markLoaded = useCallback((idx: number) => {
    setLoadedMap((prev) => (prev[idx] ? prev : { ...prev, [idx]: true }));
  }, []);

  const canSlide = gallery.length > 1;

  const goToPrev = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  }, [gallery.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  }, [gallery.length]);

  // Auto-advance timer (pauses when user hovers over slider)
  useEffect(() => {
    if (!canSlide || isPaused) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, 4500);

    return () => window.clearInterval(timer);
  }, [canSlide, isPaused, goToNext]);

  // Touch Swipe for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToNext();
      else goToPrev();
    }
    touchStartX.current = null;
  };

  if (gallery.length === 0) return null;

  const activeImageLoaded = Boolean(loadedMap[activeIndex]);

  return (
    <div className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
      {/* Main Showcase Slider */}
      <div
        className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-champagne/30 bg-pearl/40 shadow-sm sm:aspect-[4/5] dark:border-white/10 dark:bg-white/5"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Creative Perfume Loader */}
        <PerfumeLoader
          variant="detail"
          productName={productName}
          isVisible={!activeImageLoaded}
        />

        {/* Gallery Images */}
        {gallery.map((image, index) => {
          // Preload active image and adjacent images for instant sliding
          const isCurrent = index === activeIndex;
          const isNext = index === (activeIndex + 1) % gallery.length;
          const isPrev = index === (activeIndex - 1 + gallery.length) % gallery.length;
          const shouldPreload = isCurrent || isNext || isPrev;

          return (
            <div
              key={`${image}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isCurrent ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={image}
                alt={`${productName} view ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? "eager" : shouldPreload ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                quality={82}
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 42vw"
                onLoad={() => markLoaded(index)}
                className={`object-cover object-center transition-transform duration-700 ease-out will-change-transform ${
                  isCurrent ? "scale-100" : "scale-105"
                }`}
              />
            </div>
          );
        })}

        {/* Subtle Dark Vignette at the Bottom */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />

        {/* Slide Counter Badge */}
        {canSlide && (
          <div className="absolute right-3.5 top-3.5 z-20 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
            {activeIndex + 1} / {gallery.length}
          </div>
        )}

        {/* Previous / Next Arrow Controls */}
        {canSlide && (
          <>
            <button
              type="button"
              aria-label="Previous fragrance view"
              onClick={goToPrev}
              className="absolute left-2.5 sm:left-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-85 sm:opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/60 sm:group-hover:opacity-100 focus:opacity-100 touch-manipulation sm:size-10"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next fragrance view"
              onClick={goToNext}
              className="absolute right-2.5 sm:right-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-85 sm:opacity-0 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/60 sm:group-hover:opacity-100 focus:opacity-100 touch-manipulation sm:size-10"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Row */}
      {canSlide && (
        <div className="mt-3 sm:mt-3.5 flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 px-1">
          {gallery.map((image, index) => {
            const isSelected = index === activeIndex;

            return (
              <button
                key={`thumb-${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`View photo ${index + 1} of ${productName}`}
                className={`group relative size-13 sm:size-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus:outline-none touch-manipulation ${
                  isSelected
                    ? "border-champagne ring-2 ring-champagne/80 shadow-md scale-105"
                    : "border-ink/10 opacity-70 hover:opacity-100 hover:border-champagne/60 dark:border-white/10"
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  quality={60}
                  sizes="64px"
                  className="object-cover object-center transition duration-300 group-hover:scale-105"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
