"use client";

import FadeIn from "@/components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Precision Design",
    description:
      "Crafting sophisticated interfaces where every pixel serves a strategic purpose in the user journey.",
    color: "#4dd0e1",
  },
  {
    number: "02",
    title: "Iterative Prototyping",
    description:
      "Rapid prototyping cycles that refine interactions and validate design decisions through user feedback.",
    color: "#5c7cfa",
  },
  {
    number: "03",
    title: "Technical Excellence",
    description:
      "Rigorous engineering ensures your platform is secure, exceptionally fast, and ready for global scale.",
    color: "#b388ff",
  },
];

export default function Process() {
  return (
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <div className="text-center mb-24">
          <span className="text-tertiary/60 font-label text-[11px] tracking-[0.3em] uppercase font-medium">
            Methodology
          </span>
          <h2 className="text-on-surface text-[2rem] font-extrabold font-headline mt-4 tracking-[-0.02em]">
            The Process
          </h2>
          <div className="flex justify-center mt-6">
            <div className="neon-line w-24 opacity-20" />
          </div>
        </div>
      </FadeIn>

      <div className="space-y-20">
        {steps.map((step, i) => (
          <FadeIn key={step.number} delay={0.1 + i * 0.12}>
            <div className="flex gap-8 items-start relative group">
              <div
                className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0 font-bold text-[14px] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default"
                style={{ color: step.color }}
              >
                {step.number}
              </div>
              <div className="pt-1">
                <h4 className="text-lg font-bold font-headline mb-3 tracking-[-0.01em] text-on-surface group-hover:text-on-surface transition-colors duration-[400ms]">
                  {step.title}
                </h4>
                <p className="text-on-surface-variant/65 text-[15px] leading-[1.7]">
                  {step.description}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div
                  className="absolute left-[23px] top-12 bottom-[-52px] w-[0.5px]"
                  style={{
                    background: `linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)`,
                  }}
                />
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
