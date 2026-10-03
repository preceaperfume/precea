import { Sparkles } from "lucide-react";

interface PerfumeLoaderProps {
  variant?: "card" | "fullscreen" | "detail";
  sizeLabel?: string;
  productName?: string;
  className?: string;
  isVisible?: boolean;
}

/**
 * Creative Luxury Perfume & Attar Loader
 * Features an artisanal ittr flacon with golden dome, hanging tassel,
 * glowing liquid essence wave, ascending scent mist, and official PRECEA logo.
 */
export function PerfumeLoader({
  variant = "card",
  sizeLabel,
  productName,
  className = "",
  isVisible = true
}: PerfumeLoaderProps) {
  const isCard = variant === "card";
  const isFullscreen = variant === "fullscreen";

  return (
    <div
      role="status"
      aria-label={`Loading ${productName || "fragrance"}...`}
      aria-hidden={!isVisible}
      className={`relative flex flex-col items-center justify-center overflow-hidden select-none transition-all duration-700 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } ${
        isFullscreen
          ? "fixed inset-0 z-[150] min-h-screen bg-silk/95 backdrop-blur-2xl dark:bg-noir/95"
          : isCard
          ? "absolute inset-0 z-10 size-full bg-gradient-to-b from-[#f9f5ed] via-[#f4ecdc] to-[#ebe1cc] dark:from-[#110f0c] dark:via-[#191612] dark:to-[#0c0b09]"
          : "relative size-full min-h-[360px] bg-gradient-to-b from-[#f9f5ed] via-[#f4ecdc] to-[#ebe1cc] dark:from-[#110f0c] dark:via-[#191612] dark:to-[#0c0b09]"
      } ${className}`}
    >
      {/* Golden Shimmer Light Sweep */}
      <div className="shimmer-sweep-layer" aria-hidden="true" />

      {/* Subtle Radial Glow */}
      <div
        className={`pointer-events-none absolute ${
          isFullscreen ? "-inset-20 blur-3xl" : "-inset-10 blur-2xl"
        } rounded-full bg-gradient-radial from-champagne/30 via-transparent to-transparent`}
        aria-hidden="true"
      />

      {/* Main Flacon Graphic & Particles */}
      <div className="relative flex flex-col items-center z-10 px-4">
        {/* Animated Ascending Scent Mist & Sparkles */}
        <div
          className={`relative ${
            isFullscreen ? "mb-3.5 gap-3" : "mb-1 gap-2"
          } flex items-center justify-center`}
          aria-hidden="true"
        >
          <div
            className={`perfume-mist-1 ${
              isFullscreen ? "size-2.5 sm:size-3" : "size-1.5"
            } rounded-full bg-champagne shadow-[0_0_12px_#d8b878]`}
          />
          <div
            className={`perfume-mist-2 ${
              isFullscreen ? "size-3 sm:size-4" : "size-2"
            } rounded-full bg-[#b89149] shadow-[0_0_14px_#b89149]`}
          />
          <div
            className={`perfume-mist-3 ${
              isFullscreen ? "size-2.5 sm:size-3" : "size-1.5"
            } rounded-full bg-champagne/90 shadow-[0_0_12px_#d8b878]`}
          />
          {/* Twinkling star sparkles */}
          <Sparkles
            className={`perfume-sparkle-1 absolute ${
              isFullscreen ? "-left-10 -top-5 size-5 sm:size-6" : "-left-4 -top-2 size-3"
            } text-[#d8b878]`}
          />
          <Sparkles
            className={`perfume-sparkle-2 absolute ${
              isFullscreen ? "-right-10 -top-4 size-4 sm:size-5" : "-right-4 -top-1 size-2.5"
            } text-[#b89149]`}
          />
        </div>

        {/* Artisanal Attar Bottle Silhouette SVG */}
        <div className="relative">
          <svg
            className={`${
              isFullscreen
                ? "size-32 sm:size-44 md:size-52"
                : isCard
                ? "size-16 sm:size-20"
                : "size-20 sm:size-28"
            } drop-shadow-[0_16px_36px_rgba(216,184,120,0.45)]`}
            viewBox="0 0 72 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients, clips and liquid wave */}
            <defs>
              {/* Bottle internal clip */}
              <clipPath id="attarFlaconClip">
                <rect x="15" y="32" width="42" height="50" rx="7" />
              </clipPath>

              {/* Gold metallic cap gradient */}
              <linearGradient id="goldCapGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#8d6b2c" />
                <stop offset="35%" stopColor="#e7ce8e" />
                <stop offset="60%" stopColor="#f8e7bb" />
                <stop offset="80%" stopColor="#d4af62" />
                <stop offset="100%" stopColor="#8d6b2c" />
              </linearGradient>

              {/* Liquid gold essence gradient */}
              <linearGradient id="liquidGoldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fae29c" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#dfa745" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#966318" stopOpacity="0.98" />
              </linearGradient>

              {/* Glass reflection gradient */}
              <linearGradient id="glassReflect" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Finial / Crown Dome Top */}
            <circle cx="36" cy="7" r="4.2" fill="url(#goldCapGrad)" stroke="#6f4e1b" strokeWidth="0.6" />
            <path
              d="M33 11 C33 9, 39 9, 39 11 L41 16 L31 16 Z"
              fill="url(#goldCapGrad)"
              stroke="#6f4e1b"
              strokeWidth="0.6"
            />

            {/* Dome Cap Base Ring */}
            <rect x="29" y="16" width="14" height="4.5" rx="1.5" fill="url(#goldCapGrad)" stroke="#6f4e1b" strokeWidth="0.6" />

            {/* Traditional Golden Tassel hanging from neck */}
            <path
              d="M42 18 C46 20, 52 24, 53 32"
              stroke="#d4af62"
              strokeWidth="1.2"
              strokeDasharray="1.5 1"
              strokeLinecap="round"
            />
            <path
              d="M53 32 L51 44 L55 44 Z"
              fill="#c29845"
            />

            {/* Neck / Collar Ring */}
            <rect x="26" y="21" width="20" height="7" rx="1.8" fill="url(#goldCapGrad)" stroke="#6f4e1b" strokeWidth="0.6" />
            <rect x="24" y="27" width="24" height="4.5" rx="1" fill="url(#goldCapGrad)" stroke="#6f4e1b" strokeWidth="0.6" />

            {/* Crystal Flacon Glass Outer Body */}
            <rect
              x="14"
              y="31"
              width="44"
              height="52"
              rx="8"
              fill="url(#glassReflect)"
              stroke="url(#goldCapGrad)"
              strokeWidth="2"
              className="drop-shadow-sm"
            />

            {/* Inner Liquid Gold Essence with Animated Level */}
            <g clipPath="url(#attarFlaconClip)">
              {/* Back ambient liquid */}
              <rect x="15" y="44" width="42" height="40" fill="url(#liquidGoldGrad)">
                <animate
                  attributeName="y"
                  values="52;38;52"
                  dur="2.8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </rect>

              {/* Surface liquid shimmer line */}
              <line
                x1="15"
                y1="44"
                x2="57"
                y2="44"
                stroke="#fff6d6"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <animate
                  attributeName="y1"
                  values="52;38;52"
                  dur="2.8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
                <animate
                  attributeName="y2"
                  values="51;39;51"
                  dur="2.8s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                />
              </line>

              {/* Rising fragrance bubbles inside essence */}
              <circle cx="28" cy="68" r="1.6" fill="#fff" opacity="0.75">
                <animate attributeName="cy" values="76;46;76" dur="2.1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.9;0" dur="2.1s" repeatCount="indefinite" />
              </circle>
              <circle cx="44" cy="72" r="1.8" fill="#fff" opacity="0.8">
                <animate attributeName="cy" values="78;48;78" dur="2.6s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.9;0" dur="2.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="36" cy="62" r="1.2" fill="#fff" opacity="0.7">
                <animate attributeName="cy" values="70;44;70" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Front Glass Facet Reflections */}
            <path
              d="M18 36 L18 78"
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M54 36 L54 78"
              stroke="#ffffff"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Center Luxury Emblem Ring on bottle */}
            <circle cx="36" cy="57" r="8.5" stroke="#d4af62" strokeWidth="1" fill="#11100e" fillOpacity="0.4" />
            <circle cx="36" cy="57" r="7" stroke="#fae29c" strokeWidth="0.5" strokeDasharray="1.5 1" />
            {/* Small Monogram P */}
            <text
              x="36"
              y="60"
              textAnchor="middle"
              fontSize="6"
              fontFamily="serif"
              fontWeight="bold"
              fill="#f8e7bb"
            >
              P
            </text>
          </svg>

          {/* Ambient Glow Aura */}
          <div
            className={`perfume-flacon-glow pointer-events-none absolute ${
              isFullscreen ? "-inset-10 sm:-inset-16" : "-inset-3"
            } -z-10 rounded-full bg-champagne/35 blur-2xl sm:blur-3xl`}
          />
        </div>

        {/* Optional Size Label for card variant */}
        {!isFullscreen && sizeLabel && (
          <div className="mt-2 flex flex-col items-center text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-smoke">
              {sizeLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
