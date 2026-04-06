"use client";

import FadeIn from "@/components/FadeIn";

const metrics = [
  { label: "Systems Deployed", value: "150", suffix: "+", accent: "text-primary/70" },
  { label: "Automation Rate", value: "99", suffix: "%", accent: "text-secondary/70" },
  { label: "Data Points", value: "40", suffix: "M+", accent: "text-tertiary/70" },
  { label: "Uptime Guaranteed", value: "99.9", suffix: "%", accent: "text-on-surface-variant/50" },
];

export default function MetricsStrip() {
  return (
    <FadeIn delay={0.15}>
      <div className="flex flex-wrap gap-px p-px bg-white/[0.03] rounded-2xl overflow-hidden glass">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex min-w-[180px] flex-1 flex-col gap-2.5 p-8 bg-black/10 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/[0.03] cursor-default group"
          >
            <p className="text-on-surface-variant/50 text-[10px] font-label tracking-[0.18em] uppercase">
              {metric.label}
            </p>
            <p className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em]">
              {metric.value}
              <span className={`${metric.accent} text-[1.5rem] font-bold`}>{metric.suffix}</span>
            </p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
