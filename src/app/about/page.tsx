"use client";

import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import CTASection from "@/components/sections/CTASection";
import { Palette, Code, Sparkles, Network } from "lucide-react";

const stats = [
  { value: "12", label: "Awards Won" },
  { value: "150+", label: "Global Projects" },
  { value: "5", label: "Active Retainers" },
];

const expertise = [
  {
    title: "Identity Design",
    description: "Strategic visual systems that define and differentiate brands in competitive landscapes.",
    icon: Palette,
    color: "text-primary/80",
    bg: "bg-primary/[0.06]",
  },
  {
    title: "Digital Craft",
    description: "Pixel-perfect interfaces engineered for performance, accessibility, and delight.",
    icon: Code,
    color: "text-secondary/80",
    bg: "bg-secondary/[0.06]",
  },
  {
    title: "Creative Strategy",
    description: "Data-informed creative direction that aligns brand vision with market opportunity.",
    icon: Sparkles,
    color: "text-tertiary/80",
    bg: "bg-tertiary/[0.06]",
  },
  {
    title: "Ecosystem Scaling",
    description: "Design systems and infrastructure built to grow with your organization.",
    icon: Network,
    color: "text-primary-fixed-dim/80",
    bg: "bg-primary/[0.06]",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Container size="narrow" className="pt-36">
        <FadeIn>
          <div className="text-center mb-20">
            <span className="text-primary/60 font-label text-[11px] tracking-[0.3em] uppercase mb-6 block font-medium">
              The Collective
            </span>
            <h1 className="text-on-surface text-[2.5rem] md:text-[3.5rem] font-extrabold font-headline tracking-[-0.04em] leading-[1.08] mb-8">
              A small studio with{" "}
              <span className="gradient-text-aurora">big creative energy</span>
            </h1>
            <p className="text-on-surface-variant/65 text-[17px] max-w-[520px] mx-auto leading-[1.7]">
              We are a high-frequency collective of specialists dedicated to the
              art of digital craft.
            </p>
          </div>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-3 gap-4 mb-24">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded-2xl p-8 text-center group hover:-translate-y-1 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-default"
              >
                <p className="text-on-surface text-[2rem] font-extrabold font-headline mb-2 tracking-[-0.02em]">
                  {stat.value}
                </p>
                <p className="text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.18em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* Manifesto Image */}
      <Container>
        <FadeIn>
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/[0.04] mb-28">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlPmQGelY2OByVROP_yoP1njLnVX-B3x8pK56gY99xyYJruzOFdkDb6knqlXjVJw1GZnIWanre9DdiDRE1FCA4f4RnsUEsZCl5GApbCDZHttHBsLTOJlOlYkLhMvoWzC8zoiGOVIz5Sah-m3avorMnlpqg5m6eqPoexo05POx4A5U85p9BiFgFD3lP6UCq8C5gCuZfWYYm1PUOESkaBfR1YpjlhMpHkBSTETByQkzoCemNIuC0-bGM1vyO2bz4f9y7k6YYnsZsjtU"
              alt="Minimalist design studio interior"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-[2500ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/30 via-transparent to-transparent" />
          </div>
        </FadeIn>
      </Container>

      {/* Expertise Grid */}
      <Container size="narrow">
        <Section>
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-secondary/60 font-label text-[11px] tracking-[0.3em] uppercase mb-4 block font-medium">
                Core Disciplines
              </span>
              <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em]">
                What We Do Best
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {expertise.map((item, i) => (
              <FadeIn key={item.title} delay={0.08 + i * 0.1}>
                <div className="glass-panel rounded-2xl p-8 group hover:-translate-y-1 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                  <div
                    className={`size-11 rounded-xl ${item.bg} flex items-center justify-center mb-6 ${item.color}`}
                  >
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-on-surface text-[16px] font-bold font-headline mb-2.5 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant/60 text-[13px] leading-[1.7]">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
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
