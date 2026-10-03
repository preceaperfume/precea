"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Ultra-smooth, GPU-accelerated top scroll progress bar.
 * Directly synchronized with Lenis & GSAP render ticker for 120fps fluid motion.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let cleanUp = () => {};

    const applyProgress = (progressRatio: number, scrollY: number) => {
      if (barRef.current) {
        // Direct GPU scaleX transform: avoids expensive layout reflow and eliminating stutter
        const clamped = Math.min(Math.max(progressRatio, 0), 1);
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
      setShowScrollTop(scrollY > 420);
    };

    const attachLenis = (lenisInstance: any) => {
      const handleScroll = (e: { progress: number; scroll: number }) => {
        applyProgress(e.progress, e.scroll);
      };

      lenisInstance.on("scroll", handleScroll);

      if (typeof lenisInstance.progress === "number") {
        applyProgress(lenisInstance.progress, lenisInstance.scroll ?? window.scrollY);
      }

      cleanUp = () => {
        lenisInstance.off("scroll", handleScroll);
      };
    };

    if (window.__lenis) {
      attachLenis(window.__lenis);
    } else {
      // Fallback native scroll listener until Lenis fires ready
      const handleNativeScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = totalHeight > 0 ? currentScroll / totalHeight : 0;
        applyProgress(progress, currentScroll);
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      handleNativeScroll();

      const onLenisReady = () => {
        window.removeEventListener("scroll", handleNativeScroll);
        if (window.__lenis) {
          attachLenis(window.__lenis);
        }
      };

      window.addEventListener("lenis:ready", onLenisReady, { once: true });

      cleanUp = () => {
        window.removeEventListener("scroll", handleNativeScroll);
        window.removeEventListener("lenis:ready", onLenisReady);
      };
    }

    return () => {
      cleanUp();
    };
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Scroll Indicator Line - GPU-Accelerated & Synchronized with Lenis */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left bg-gradient-to-r from-champagne via-[#ebd59f] to-rosewood shadow-[0_1px_8px_rgba(216,184,120,0.7)] will-change-transform dark:from-champagne dark:via-silk dark:to-champagne"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 sm:right-7 z-[55] flex size-11 items-center justify-center rounded-full border border-champagne/40 bg-silk/90 text-ink shadow-luxe backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-champagne hover:bg-white hover:text-rosewood focus:outline-none focus:ring-2 focus:ring-champagne touch-manipulation sm:size-12 dark:border-white/15 dark:bg-noir/90 dark:text-silk dark:hover:bg-white/10 dark:hover:text-champagne ${
          showScrollTop
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </>
  );
}
