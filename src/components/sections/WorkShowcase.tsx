"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Nexus Portal",
    description: "Global design system and semantic interface architecture.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsRZ7pn8GgNW-s5KdfMrM2B4BD3gya-gh8HeseIH-K_M2mBPaPm4RRvbdweREcOY_xjon6VDIxpPnLq_J6ZZmum_PTxb8Iqq9OijD0UDJE8CAm8O70imV14gXT-F1JQrmEeSnyJcqCUSx--hQoKwahmrXGjv4tlRGoUUJLsCYXAGSQXuO0zWCnbmrNYnslPDZRJJlJbge4o2vS3EmHeScCJ_e0eF-U4ac4kQyi-p-UWhFlI6uYIiGcaETbHrlTD8polRflRZN9eaQ",
    year: "2024",
  },
  {
    title: "Aether OS",
    description: "Global design system and semantic interface architecture.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAubGwO1tvreRcPLhh1mAI6zRjXMjcVeRs-gIIKryWApJRo7fxZ8MuzFlLqZ5ripTC0e4khgdzyyIMke63_5SALSKDGiZSD47VmNYXhoHa2UimInQ0McBHU4SZmrBjHjBx1mJlLgxwnc-4-EK9prcPIK4gxHIyDz8WUMOa1YO6JHzLNIkTcTLQpjQIQWK1Isyo1uh2dGSEl_U8GjwfrujsYfVXlBMZYGI6sDf9G9hDeVA9Uh_c-VKDL-VEd71Bl0dA8CtXICsPlU9k",
    year: "2023",
  },
];

export default function WorkShowcase() {
  return (
    <div>
      <FadeIn>
        <div className="flex justify-between items-end mb-14">
          <div className="flex flex-col gap-3">
            <span className="text-primary/60 font-label text-[11px] tracking-[0.25em] uppercase font-medium">
              Showcase
            </span>
            <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em]">
              Selected Work
            </h2>
          </div>
          <a
            href="/work"
            className="text-on-surface-variant/50 hover:text-primary transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-2 group text-[13px]"
          >
            View Archive
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-[400ms]"
            />
          </a>
        </div>
      </FadeIn>

      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x">
        {projects.map((project, i) => (
          <FadeIn key={project.title} delay={0.1 + i * 0.15}>
            <div className="min-w-[380px] md:min-w-[560px] snap-start group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.04]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  sizes="(max-width: 768px) 380px, 560px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-[800ms]" />
              </div>
              <div className="mt-5 flex justify-between items-start px-1">
                <div>
                  <h4 className="text-xl font-bold font-headline text-on-surface mb-1.5 tracking-[-0.01em] group-hover:text-primary/90 transition-colors duration-[500ms]">
                    {project.title}
                  </h4>
                  <p className="text-on-surface-variant/60 text-[13px]">{project.description}</p>
                </div>
                <div className="px-3.5 py-1 rounded-full border border-white/[0.06] text-[10px] font-label uppercase tracking-[0.15em] text-on-surface-variant/40">
                  {project.year}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
