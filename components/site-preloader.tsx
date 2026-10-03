"use client";

import { useEffect, useState } from "react";
import { PerfumeLoader } from "@/components/perfume-loader";

/**
 * SitePreloader
 * Displays a full-screen luxury perfume & attar loading experience on website entry.
 * Smoothly bottles rare essences and dissolves into the homepage once ready.
 */
export function SitePreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Check if user has already seen preloader in this tab session to keep reloads fast
    const hasSeen = typeof window !== "undefined" ? sessionStorage.getItem("precea_preloader_seen") : null;

    if (hasSeen === "true") {
      setIsVisible(false);
      setIsRendered(false);
      return;
    }

    // Mark as seen for subsequent quick interactions
    try {
      sessionStorage.setItem("precea_preloader_seen", "true");
    } catch {
      // Ignore sessionStorage errors in incognito/restricted mode
    }

    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Fast, elegant entrance: dismiss smoothly after 750ms so website loads instantly
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 750);

    // Unmount completely from DOM after smooth fade transition
    const unmountTimer = setTimeout(() => {
      setIsRendered(false);
    }, 1350);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isRendered) return null;

  return (
    <div
      aria-hidden={!isVisible}
      onClick={() => {
        setIsVisible(false);
        document.body.style.overflow = "";
      }}
      className={`fixed inset-0 z-[200] transition-all duration-600 ease-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <PerfumeLoader variant="fullscreen" isVisible={isVisible} />
    </div>
  );
}
