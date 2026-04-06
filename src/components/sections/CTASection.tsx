"use client";

import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";

export default function CTASection() {
  return (
    <FadeIn>
      <div className="relative overflow-hidden rounded-[2rem] p-14 md:p-28 text-center glass-panel">
        {/* Glow blobs */}
        <div
          className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(92, 124, 250, 0.06) 0%, transparent 70%)",
            animation: "drift 20s ease-in-out infinite alternate",
          }}
        />
        <div
          className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(77, 208, 225, 0.06) 0%, transparent 70%)",
            animation: "drift-reverse 18s ease-in-out infinite alternate",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-on-surface text-[2.5rem] md:text-[3.5rem] font-extrabold font-headline tracking-[-0.04em] max-w-[720px] leading-[1.08]">
            Ready to evolve your{" "}
            <span className="gradient-text-aurora">digital infrastructure</span>?
          </h2>
          <p className="text-on-surface-variant/60 text-[16px] max-w-[460px] leading-[1.7]">
            Limited intake for Q2. We prioritize partnerships that demand
            excellence and strategic innovation.
          </p>
          <Button variant="primary" size="lg" href="/contact">
            Book a Call
          </Button>
        </div>
      </div>
    </FadeIn>
  );
}
