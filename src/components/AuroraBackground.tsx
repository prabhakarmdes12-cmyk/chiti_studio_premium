"use client";

import { useEffect, useRef, useMemo } from "react";

export default function AuroraBackground() {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const frameRef = useRef<number>(0);

  // Use stable seed for SSR consistency
  const stableSeed = useMemo(() => 42, []);

  useEffect(() => {
    const turb = turbRef.current;
    if (!turb) return;
    
    let seed = stableSeed;
    const animate = () => {
      seed = (seed + 0.15) % 1000;
      turb.setAttribute("seed", String(Math.floor(seed)));
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [stableSeed]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* SVG filter for organic morphing */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="aurora-morph" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="42"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="45"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Aurora Blob 1 - Electric Cyan */}
      <div
        className="aurora-blob aurora-blob-1"
      />

      {/* Aurora Blob 2 - Deep Teal */}
      <div
        className="aurora-blob aurora-blob-2"
      />

      {/* Aurora Blob 3 - Deep Blue */}
      <div
        className="aurora-blob aurora-blob-3"
      />

      {/* Aurora Blob 4 - Aurora Purple */}
      <div
        className="aurora-blob aurora-blob-4"
      />

      {/* Aurora Blob 5 - Ocean Blue */}
      <div
        className="aurora-blob aurora-blob-5"
      />

      {/* Particles Layer - using stable particles for SSR */}
      <StableParticleField />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-[30%] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(10, 15, 20, 0.92) 0%, rgba(10, 15, 20, 0.5) 40%, transparent 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-[25%] pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(10, 15, 20, 0.95) 0%, rgba(10, 15, 20, 0.4) 50%, transparent 100%)",
        }}
      />

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Noise texture */}
      <div className="noise-overlay" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Grid Floor */}
      <div className="grid-floor" />
    </div>
  );
}

// Stable particle field with deterministic positions for SSR
function StableParticleField() {
  // Generate stable deterministic particle positions
  const particles = useMemo(() => [
    { id: 0, left: "5%", top: "12%", size: 3, delay: 2, duration: 18 },
    { id: 1, left: "15%", top: "45%", size: 5, delay: 8, duration: 22 },
    { id: 2, left: "28%", top: "78%", size: 2, delay: 12, duration: 16 },
    { id: 3, left: "35%", top: "23%", size: 4, delay: 1, duration: 20 },
    { id: 4, left: "42%", top: "67%", size: 6, delay: 5, duration: 25 },
    { id: 5, left: "55%", top: "34%", size: 3, delay: 9, duration: 17 },
    { id: 6, left: "62%", top: "89%", size: 4, delay: 14, duration: 21 },
    { id: 7, left: "71%", top: "15%", size: 5, delay: 3, duration: 19 },
    { id: 8, left: "78%", top: "56%", size: 2, delay: 7, duration: 23 },
    { id: 9, left: "85%", top: "41%", size: 4, delay: 11, duration: 15 },
    { id: 10, left: "92%", top: "72%", size: 3, delay: 6, duration: 24 },
    { id: 11, left: "8%", top: "58%", size: 5, delay: 13, duration: 18 },
    { id: 12, left: "22%", top: "91%", size: 4, delay: 4, duration: 22 },
    { id: 13, left: "38%", top: "5%", size: 6, delay: 10, duration: 16 },
    { id: 14, left: "48%", top: "38%", size: 2, delay: 15, duration: 20 },
    { id: 15, left: "58%", top: "82%", size: 5, delay: 2, duration: 25 },
    { id: 16, left: "68%", top: "19%", size: 3, delay: 8, duration: 17 },
    { id: 17, left: "82%", top: "63%", size: 4, delay: 12, duration: 21 },
    { id: 18, left: "95%", top: "27%", size: 2, delay: 5, duration: 19 },
    { id: 19, left: "3%", top: "73%", size: 5, delay: 9, duration: 23 },
    { id: 20, left: "18%", top: "36%", size: 3, delay: 14, duration: 15 },
    { id: 21, left: "32%", top: "8%", size: 4, delay: 1, duration: 24 },
    { id: 22, left: "52%", top: "54%", size: 6, delay: 7, duration: 18 },
    { id: 23, left: "75%", top: "95%", size: 2, delay: 11, duration: 22 },
    { id: 24, left: "88%", top: "48%", size: 5, delay: 3, duration: 16 },
    { id: 25, left: "12%", top: "21%", size: 3, delay: 13, duration: 20 },
    { id: 26, left: "25%", top: "64%", size: 4, delay: 6, duration: 25 },
    { id: 27, left: "45%", top: "9%", size: 2, delay: 10, duration: 17 },
    { id: 28, left: "65%", top: "77%", size: 5, delay: 4, duration: 21 },
    { id: 29, left: "82%", top: "44%", size: 3, delay: 15, duration: 19 },
  ], []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}