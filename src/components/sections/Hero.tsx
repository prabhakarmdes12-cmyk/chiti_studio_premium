"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, BarChart3, Workflow, Database, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import CanvasParticles from "@/components/CanvasParticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { caseStudies } from "@/data/case-studies";

const showcaseProjects = caseStudies.map((s) => ({
  slug: s.slug,
  client: s.client,
  image: s.images.hero,
  category: s.category,
  tags: s.tags,
  subtitle: s.subtitle,
  liveUrl: s.liveUrl,
  year: s.year,
}));

const systemModules = [
  { icon: Database, labelKey: "crmCore", position: "left-0 -translate-x-4 top-1/4" },
  { icon: Workflow, labelKey: "automation", position: "right-0 translate-x-4 top-1/3" },
  { icon: BarChart3, labelKey: "analytics", position: "left-0 -translate-x-2 bottom-1/3" },
  { icon: Cpu, labelKey: "aiEngine", position: "right-0 translate-x-2 bottom-1/4" },
];

const kenBurnsOrigins = [
  "center top",
  "center bottom",
  "left center",
  "right center",
  "top left",
  "top right",
  "bottom left",
  "bottom right",
];

export default function Hero() {
  const t = useTranslations("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [originIndex, setOriginIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    setOriginIndex(Math.floor(Math.random() * kenBurnsOrigins.length));
  }, [currentSlide]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseProjects.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const goTo = useCallback(
    (i: number) => {
      setCurrentSlide(i);
      startTimer();
    },
    [startTimer]
  );

  const prev = useCallback(() => {
    goTo((currentSlide - 1 + showcaseProjects.length) % showcaseProjects.length);
  }, [currentSlide, goTo]);

  const next = useCallback(() => {
    goTo((currentSlide + 1) % showcaseProjects.length);
  }, [currentSlide, goTo]);

  const project = showcaseProjects[currentSlide];

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gsapInitialized = useRef(false);

  useEffect(() => {
    if (gsapInitialized.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsapInitialized.current = true;
  }, []);

  const headlineText = t("headline");
  const splitWords = useCallback((text: string) => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block overflow-hidden" style={{ perspective: "600px" }}>
        <span className="inline-block">
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </span>
      </span>
    ));
  }, []);

  const headlineWords = splitWords(headlineText);

  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll("span > span");
    if (words.length === 0) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, rotateX: 30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="@container relative">
      <CanvasParticles />
      <div className="flex flex-col gap-8 px-4 py-16 @[864px]:flex-row @[864px]:items-center @[864px]:gap-20 @[864px]:py-24 relative z-10">
        <div className="flex flex-col gap-10 flex-1 relative order-2 @[864px]:order-1">
          <div className="hidden @[1024px]:block absolute inset-0 pointer-events-none">
            {systemModules.map((module, i) => (
              <motion.div
                key={module.labelKey}
                className={`absolute ${module.position}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: module.labelKey === project.category.toLowerCase() ? 0.4 : 0.2, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
              >
                <div className="system-module rounded-xl p-4 float-slow">
                  <module.icon size={28} strokeWidth={1} className="text-primary" />
                  <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/60 mt-2 block">
                    {t(`modules.${module.labelKey}`)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <FadeIn direction="none" delay={0.15}>
            <div className="flex flex-col gap-6 text-left relative z-10">
              <div className="flex items-center gap-3">
                <div className="neon-dot" />
                <span className="text-secondary/70 font-label text-[11px] tracking-[0.25em] uppercase font-medium">
                  {t("tagline")}
                </span>
              </div>
              <h1 ref={headlineRef} className="text-on-surface text-[2.75rem] font-extrabold leading-[1.12] tracking-[-0.025em] @[480px]:text-[4rem] font-headline">
                {headlineWords}
              </h1>
              <p className="text-on-surface-variant/70 text-[17px] max-w-[480px] leading-[1.65]">
                {t("subtitle")}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="none" delay={0.35}>
            <div className="flex flex-wrap gap-4 relative z-10">
              <span id="start-project">
                <Button variant="primary" size="md" href="/contact" data-magnetic data-cursor-text="Inquire →">
                {t("cta")}
              </Button>
              </span>
              <span id="view-systems">
                <Button variant="secondary" size="md" href="/work" data-magnetic data-cursor-text="View Systems">
                {t("ctaSecondary")}
              </Button>
              </span>
            </div>
          </FadeIn>

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 right-10 w-2 h-2 bg-primary/30 rounded-full"
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-40 right-20 w-1 h-1 bg-secondary/40 rounded-full"
              animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-tertiary/30 rounded-full"
              animate={{ y: [0, -25, 0], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>
        </div>

        <FadeIn direction="right" delay={0.25} duration={1.2} className="order-1 @[864px]:order-2">
          <div className="relative w-full @[864px]:w-[480px] @[864px]:h-[480px] h-[280px] @[480px]:h-[340px] @[864px]:min-h-0 overflow-hidden rounded-3xl">
            <div
              className="absolute -inset-20 bg-gradient-to-tr from-primary/20 via-secondary/15 to-tertiary/10 blur-[120px] rounded-full"
              style={{ animation: "drift 20s ease-in-out infinite alternate" }}
            />

            <div ref={panelRef} className="relative w-full h-full glass-panel rounded-3xl overflow-hidden p-6 @[480px]:p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant/60">
                  <Sparkles size={14} />
                  <span className="text-[11px] font-headline font-bold tracking-[-0.01em]">
                    {project.client}
                  </span>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {project.image.endsWith(".svg") ? (
                      <img
                        src={project.image}
                        alt={project.client}
                        className={`w-full h-full object-cover ${isDesktop ? "ken-burns-in" : ""}`}
                        style={isDesktop ? { transformOrigin: kenBurnsOrigins[originIndex] } : undefined}
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.client}
                        fill
                        className={`object-cover ${isDesktop ? "ken-burns-in" : ""}`}
                        style={isDesktop ? { transformOrigin: kenBurnsOrigins[originIndex] } : undefined}
                        sizes="(max-width: 864px) 100vw, 480px"
                        unoptimized
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={prev}
                  onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
                  onMouseLeave={() => startTimer()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant/60 hover:text-on-surface hover:bg-surface/80 transition-all duration-[400ms] opacity-80 md:opacity-60 md:hover:opacity-100 cursor-pointer"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current); }}
                  onMouseLeave={() => startTimer()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-surface/60 backdrop-blur-sm flex items-center justify-center text-on-surface-variant/60 hover:text-on-surface hover:bg-surface/80 transition-all duration-[400ms] opacity-80 md:opacity-60 md:hover:opacity-100 cursor-pointer"
                  aria-label="Next project"
                >
                  <ChevronRight size={18} />
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="text-[10px] font-mono text-on-surface-variant/40 tracking-[0.1em]">
                    {currentSlide + 1} / {showcaseProjects.length}
                  </span>
                </div>
              </div>

              <div className="hidden @[864px]:block pt-6 border-t border-white/[0.04] space-y-3">
                <h3 className="text-on-surface text-lg font-bold font-headline leading-tight">
                  {project.client}
                </h3>
                <p className="text-on-surface-variant/50 text-[11px] leading-relaxed line-clamp-2">
                  {project.subtitle}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-white/[0.03] text-[9px] font-label uppercase tracking-[0.12em] text-primary/50 border border-white/[0.04]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                className="absolute -top-2 md:-top-4 -right-2 md:-right-4 glass rounded-xl px-4 py-2 float cursor-pointer block hover:bg-white/[0.06] transition-colors duration-[400ms]"
              >
                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">Visit Site →</span>
              </Link>
            )}

            </div>
        </FadeIn>
      </div>
    </div>
  );
}
