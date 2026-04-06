"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import CTASection from "@/components/sections/CTASection";

const filters = [
  "All Cases",
  "Website",
  "App",
  "Product",
  "Brand",
  "Dashboard",
];

const projects = [
  {
    title: "Aura Finance",
    category: "Fintech App Design",
    tags: ["UI/UX", "Mobile", "Fintech"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuByO80dqG1hzJw8SvkFFDJ5836Y9rBjSvB3BWD1WzO0FG8pYHN7931pRxOxuU_ELKNQ3nLt_w3jUHc2O3Qem6T6kgmWWPVBDCrdJCzYHqURYdud7OFyos9c59XsXNAS_dN8rp0uIv8STOP8C-tyF21mwf0MSjT2AKjubP89KIiTGPufVkdDN3TrUsVS98lfj9E8NpAQnjSF7Ceo2Zh9iTvPCKRRR8Ez6mXIVBsB8RmMxm_62eRCThkrYKEGqDCF6I5oUZ63uOOF-kQ",
    challenge: "Simplify complex financial data into intuitive mobile experiences.",
    outcome: "45% increase in user engagement and 60% faster onboarding.",
    span: "md:col-span-2",
  },
  {
    title: "Vantgarde Chrono",
    category: "Luxury Website",
    tags: ["Web Design", "E-Commerce", "Luxury"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9N0Zsmc2MDizwG_efIU7GaulO68419oY0OKsHaCYpVa1BpluoE_Elnluoe4plKGet5k9BMnFJy6sc2p05dLxYSqTPTtZeX_NuHBUlAgifooJZ7Ra1P77onJEJf_nw4D3IiMeInR2Nu1SgFM_ebRvAat6CAk7DjRZthBuKj8oSdgWIOoWUzx5vx8OWZ9HzzDlzW7q6mKWGFox_YopdK2Ft0IoK96Skpm-pUnqoSgnDIcAPEOX61YdYFbtbvlxpdk15BcEW26EdqFc",
    challenge: "Create a digital flagship that matches the craftsmanship of luxury timepieces.",
    outcome: "Award-winning design that increased online sales by 280%.",
    span: "md:row-span-2",
  },
  {
    title: "Vertex Analytics",
    category: "SaaS Dashboard",
    tags: ["Dashboard", "Data Viz", "SaaS"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBa0fngZ2YqpJOygwkEF_5_UALNEVGSrPFPg47MKuYO9Fs8lgdpn5EpyCxQ7VZtcMAJteElmgUyofRyUuqJUCDIpHIlNk02hqnCZlUNf1GNz-TX58Ax80nAIWFsVa8OPtzhqN_BuvEGTUaCvhuR8IGkJkU9T_IYt47LYT78wiElqFy2G4FvkUhVXKGG2L_hlsbnE1yTS19olkOUheKYinT1ds1077jw7WnaqeKLln1f6pyzPi0QXxWZ9M81okPPMLaDOzi4nctDOsU",
    challenge: "Transform raw analytics into actionable insights with minimal cognitive load.",
    outcome: "Reduced time-to-insight by 70% with an intuitive data visualization system.",
    span: "",
  },
  {
    title: "Lumina OS",
    category: "Identity & Branding",
    tags: ["Branding", "Identity", "System"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUevSUXeX-yQNdxRWRDJBpXHYbwcV2k3FcIQS-UgwdvDveav1ZedQ47XC3R4VQREQURY1gqk8r7pnx4P1kJI-54CsJLpL9tKGINZICgseDcCOBO5mmRgqQGrA5dw7kOoE7VO-hdCDshBm7CneHh5DgpCj7j_8Kma88yieWtAFP8hduOUpXIYTsXngzDmJ3aNoCQSCoUUHCk8UF4diptAEg-W1JJ1GbZaUgft8saqay3CzVX9fB0SWMYxjzYbF-7J0gxc_PEl8k7oU",
    challenge: "Build a cohesive brand identity for a next-gen operating system.",
    outcome: "A comprehensive design system used across 12 product teams globally.",
    span: "",
  },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All Cases");

  return (
    <>
      {/* Hero */}
      <Container className="pt-36">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-20">
            <div>
              <span className="text-primary/60 font-label text-[11px] tracking-[0.25em] uppercase mb-5 block font-medium">
                Portfolio
              </span>
              <h1 className="text-on-surface text-[2.5rem] md:text-[3.5rem] font-extrabold font-headline tracking-[-0.04em] leading-[1.08]">
                Curating Digital{" "}
                <span className="gradient-text-aurora">Excellence</span>
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="text-on-surface-variant/60 text-[15px] leading-[1.7] max-w-[380px] md:text-right">
                A curated selection of projects where strategy meets craft, and
                ambition meets execution.
              </p>
              <div className="flex items-baseline gap-2 mt-6">
                <span className="text-5xl font-extrabold font-headline text-on-surface tracking-[-0.03em]">
                  12
                </span>
                <span className="text-on-surface-variant/20 text-2xl">—</span>
                <span className="text-5xl font-extrabold font-headline text-on-surface tracking-[-0.03em]">
                  24
                </span>
              </div>
              <span className="text-[10px] font-label uppercase tracking-[0.18em] text-on-surface-variant/35 mt-1">
                Selected Cases
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.1}>
          <div className="neon-line mb-10 opacity-15" />
          <div className="flex flex-wrap gap-2.5 mb-20">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-[12px] font-medium font-headline transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                  activeFilter === filter
                    ? "bg-primary/90 text-on-primary shadow-[0_0_16px_rgba(77,208,225,0.2)]"
                    : "border border-white/[0.06] text-on-surface-variant/50 hover:text-on-surface hover:border-white/[0.1] bg-white/[0.02]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* Bento Grid Portfolio */}
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={0.08 + i * 0.1} className={project.span}>
              <div className="group cursor-pointer h-full">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.04] mb-5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[2000ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 380px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-surface/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-[800ms]" />
                </div>
                <div className="px-1">
                  <div className="flex flex-wrap gap-2 mb-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-label uppercase tracking-[0.15em] text-primary/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold font-headline text-on-surface mb-1.5 tracking-[-0.01em] group-hover:text-primary/80 transition-colors duration-[500ms]">
                    {project.title}
                  </h3>
                  <p className="text-on-surface-variant/50 text-[12px] mb-4">
                    {project.category}
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.04]">
                    <div>
                      <p className="text-[9px] font-label uppercase tracking-[0.15em] text-on-surface-variant/30 mb-1.5">
                        Challenge
                      </p>
                      <p className="text-[12px] text-on-surface-variant/60 leading-[1.6]">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-label uppercase tracking-[0.15em] text-on-surface-variant/30 mb-1.5">
                        Outcome
                      </p>
                      <p className="text-[12px] text-on-surface-variant/60 leading-[1.6]">
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <Container>
        <Section className="mt-20">
          <CTASection />
        </Section>
      </Container>
    </>
  );
}
