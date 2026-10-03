"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Global declaration so any component can safely invoke window.__lenis?.scrollTo(...)
declare global {
  interface Window {
    __lenis?: Lenis;
    scrollToTarget?: (target: string | HTMLElement, offset?: number) => void;
  }
}

/**
 * Keeps native scrolling accessible while providing buttery smooth motion
 * synchronized seamlessly with GSAP ScrollTrigger and in-page anchor links.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.15,
      autoRaf: false
    });

    window.__lenis = lenis;
    window.dispatchEvent(new Event("lenis:ready"));
    window.scrollToTarget = (target: string | HTMLElement, offset = -75) => {
      lenis.scrollTo(target, {
        offset,
        duration: 1.2
      });
    };

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis requestAnimationFrame directly through GSAP's ticker
    // This locks scroll calculations and GSAP animations to the exact same render frame
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Global listener for anchor links to provide buttery-smooth scrolling
    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          event.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -75,
            duration: 1.2
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    // Refresh ScrollTrigger once DOM layout settles
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      delete window.__lenis;
      delete window.scrollToTarget;
    };
  }, []);

  return null;
}

