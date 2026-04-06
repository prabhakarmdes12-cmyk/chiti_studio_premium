"use client";

import Container from "@/components/Container";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import Card from "@/components/Card";
import CTASection from "@/components/sections/CTASection";
import {
  Palette,
  Globe,
  PenTool,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const services = [
  {
    title: "Brand Strategy",
    description:
      "Defining the core narrative and visual language that makes your brand unforgettable in a saturated market.",
    icon: Palette,
    accent: "primary" as const,
    features: ["Brand Audit", "Positioning", "Voice & Tone"],
  },
  {
    title: "Digital Curation",
    description:
      "End-to-end digital experiences crafted with editorial precision and technical excellence.",
    icon: Globe,
    accent: "secondary" as const,
    features: ["Web Design", "CMS Integration", "Performance"],
  },
  {
    title: "Visual Identity",
    description:
      "Strategic visual systems that communicate your brand's essence across every touchpoint.",
    icon: PenTool,
    accent: "tertiary" as const,
    features: ["Logo Design", "Typography", "Color Systems"],
  },
  {
    title: "Experience Design",
    description:
      "Human-centric interfaces that transform complex workflows into intuitive, delightful journeys.",
    icon: Lightbulb,
    accent: "primary" as const,
    features: ["UX Research", "Prototyping", "Design Systems"],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Audit & Strategic Synthesis",
    description:
      "We begin with a deep analysis of your brand, market position, and user needs. Every decision is data-informed and strategically aligned.",
    hasImage: true,
  },
  {
    number: "02",
    title: "Iterative Prototyping",
    description:
      "Rapid prototyping cycles that refine interactions, validate assumptions, and evolve the design through continuous feedback loops.",
    hasImage: false,
  },
  {
    number: "03",
    title: "Implementation & Launch",
    description:
      "Pixel-perfect development with rigorous QA, performance optimization, and a seamless handoff process that ensures long-term maintainability.",
    hasImage: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-36">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-secondary/60 font-label text-[11px] tracking-[0.25em] uppercase mb-6 block font-medium">
              Our Expertise
            </span>
            <h1 className="text-on-surface text-[2.5rem] md:text-[3.5rem] font-extrabold font-headline tracking-[-0.04em] leading-[1.08] mb-8">
              Services built to{" "}
              <span className="gradient-text-aurora">elevate your brand</span>
            </h1>
            <p className="text-on-surface-variant/70 text-[17px] max-w-[520px] mx-auto leading-[1.7] mb-12">
              We combine strategic thinking with meticulous craft to deliver
              digital experiences that define categories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="md" href="/work">
                View Portfolio
              </Button>
              <Button variant="secondary" size="md" href="#process">
                Our Process
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Expertise Grid */}
      <Container>
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={0.08 + i * 0.1}>
                <Card accent={service.accent} className="h-full p-7">
                  <div
                    className={`size-11 rounded-xl flex items-center justify-center mb-7 ${
                      service.accent === "primary"
                        ? "bg-primary/[0.07] text-primary/80"
                        : service.accent === "secondary"
                        ? "bg-secondary/[0.07] text-secondary/80"
                        : "bg-tertiary/[0.07] text-tertiary/80"
                    }`}
                  >
                    <service.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-on-surface text-[15px] font-bold font-headline mb-2.5 tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p className="text-on-surface-variant/60 text-[13px] leading-[1.7] mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 rounded-full text-[9px] font-label uppercase tracking-[0.12em] bg-white/[0.03] text-on-surface-variant/40 border border-white/[0.04]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Section>
      </Container>

      {/* Strategic Process */}
      <Container>
        <Section id="process" bordered>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            <div className="lg:col-span-4">
              <FadeIn>
                <div className="lg:sticky lg:top-32">
                  <span className="text-tertiary/60 font-label text-[11px] tracking-[0.3em] uppercase block mb-4 font-medium">
                    Methodology
                  </span>
                  <h2 className="text-on-surface text-[2rem] font-extrabold font-headline mb-5 tracking-[-0.02em]">
                    Strategic Process
                  </h2>
                  <p className="text-on-surface-variant/60 text-[14px] leading-[1.7]">
                    Our process is built on transparency, iteration, and an
                    unwavering commitment to excellence.
                  </p>
                </div>
              </FadeIn>
            </div>

            <div className="lg:col-span-8 space-y-16">
              {processSteps.map((step, i) => (
                <FadeIn key={step.number} delay={0.1 + i * 0.12}>
                  <div className="flex gap-7 items-start relative group">
                    <div className="w-11 h-11 rounded-full glass-panel flex items-center justify-center shrink-0 text-primary/70 font-bold text-[13px]">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold font-headline text-on-surface mb-3 tracking-[-0.01em]">
                        {step.title}
                      </h4>
                      <p className="text-on-surface-variant/65 text-[14px] leading-[1.7] mb-6">
                        {step.description}
                      </p>
                      {step.hasImage && (
                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/[0.04]">
                          <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYxlpbwhzO2KzP9BV4zTUfCNXlfvSEvENAxa-IV1AE_AdsQNlLUII7VO6xub8uqyEZqaoguMRIoNdDuV48qdRfsmwjlmXpBkpqGA8vqy0D-i7BQDmnsM4bvoWeINFuSTqSUqT6G2GJxvb5gDCqgHWW5rGff6aHDWL2lVG0R38QWFvuMaaRrLWd4PdWSHnhEfVJMBnevK9BHw80vr6AoNrO7s7Tmkky73Y5VG5iioAd7lyrKOZdpNwQZDj2V1VMr8U1_bt-HMgR5Q"
                            alt="Minimalist design audit setup"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                            sizes="(max-width: 1024px) 100vw, 600px"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </Section>
      </Container>

      {/* Case Study Highlight */}
      <Container>
        <Section>
          <FadeIn>
            <div className="glass-panel rounded-[2rem] p-10 md:p-16 relative overflow-hidden border border-white/[0.03]">
              <div
                className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(77,208,225,0.04) 0%, transparent 70%)",
                }}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                  <span className="text-secondary/60 font-label text-[11px] tracking-[0.25em] uppercase block mb-5 font-medium">
                    Case Study
                  </span>
                  <h3 className="text-on-surface text-[1.75rem] font-extrabold font-headline mb-5 tracking-[-0.02em]">
                    The Ethereal Project
                  </h3>
                  <p className="text-on-surface-variant/65 text-[14px] leading-[1.75] mb-8">
                    A complete brand transformation that redefined how a fintech
                    startup connects with its audience. From visual identity to
                    digital experience, every touchpoint was meticulously
                    crafted.
                  </p>
                  <div className="flex gap-10 mb-8 pt-6 border-t border-white/[0.04]">
                    <div>
                      <p className="text-xl font-extrabold font-headline text-primary/80 tracking-[-0.02em]">
                        340%
                      </p>
                      <p className="text-[10px] text-on-surface-variant/40 font-label uppercase tracking-[0.15em] mt-1">
                        Engagement
                      </p>
                    </div>
                    <div>
                      <p className="text-xl font-extrabold font-headline text-secondary/80 tracking-[-0.02em]">
                        2.1M
                      </p>
                      <p className="text-[10px] text-on-surface-variant/40 font-label uppercase tracking-[0.15em] mt-1">
                        Impressions
                      </p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm" href="/work">
                    View Case Study <ArrowRight size={14} strokeWidth={1.5} className="ml-2" />
                  </Button>
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.04]">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQleV-WqKnu5OUNB3uMumlJX5oaf30iFPsN9ZUi9x-u5civdXmJ6bi2qCt0iTa1NiobwVD9_qUfjDQY5Xuls8kZI72Zos917pDg72akgZ_Ptgqi5aa2GxhuPOawxuFoVzHoaE2BCxuloALCRyA7VIsdf8Sxi3WQ4yi_9UEqqI9tvv42wTocoTe3BzarrRkI2c7q-IdrqpTockqHltKvIZrdVbRcfwrzPksfUghZiXihYuCgAgxJoGblG-Yivnvku12xlfm0oUPKM0"
                    alt="Abstract 3D render"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>
      </Container>

      {/* CTA */}
      <Container>
        <Section>
          <CTASection />
        </Section>
      </Container>
    </>
  );
}
