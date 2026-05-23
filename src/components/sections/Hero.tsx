"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import FadeIn from "@/components/FadeIn";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, BarChart3, Workflow, Database, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import CanvasParticles from "@/components/CanvasParticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const showcaseSlides = [
  { src: "/case-studies/house-of-giriraj/curation.mp4",       alt: "Giriraj Curation",  type: "video" },
  { src: "/case-studies/house-of-giriraj/maharani-viraasat.mp4", alt: "Maharani Viraasat", type: "video" },
  { src: "/case-studies/house-of-giriraj/raj-tilak.mp4",     alt: "Raj Tilak",          type: "video" },
  { src: "/case-studies/ts-aromatics/hero.png",           alt: "TS Aromatics" },
  { src: "/case-studies/ts-aromatics/coconut-oil.jpg",    alt: "TS Aromatics — Coconut Oil" },
  { src: "/case-studies/house-of-giriraj/hero.png",       alt: "House of Giriraj" },
  { src: "/case-studies/netq/overview-screen.svg",        alt: "NetQ Command" },
  { src: "/case-studies/batchflow/today-dashboard.png",   alt: "BatchFlow" },
  { src: "/case-studies/bighi-brothers/overview-screen.jpg", alt: "Bighi Brothers" },
];

const systemModules = [
  { icon: Database, labelKey: "crmCore", position: "left-0 -translate-x-4 top-1/4" },
  { icon: Workflow, labelKey: "automation", position: "right-0 translate-x-4 top-1/3" },
  { icon: BarChart3, labelKey: "analytics", position: "left-0 -translate-x-2 bottom-1/3" },
  { icon: Cpu, labelKey: "aiEngine", position: "right-0 translate-x-2 bottom-1/4" },
];

export default function Hero() {
  const t = useTranslations("hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const slide = showcaseSlides[currentSlide];
    if (slide.type === "video" && videoRef.current) {
      const vid = videoRef.current;
      if (vid.src !== window.location.origin + slide.src) {
        vid.src = slide.src;
        vid.load();
      }
      vid.currentTime = 0;
      vid.play().catch(() => {});
    }
  }, [currentSlide]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const handleInteraction = () => {
      if (showcaseSlides[currentSlide].type === "video" && videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
    };
    panel.addEventListener("touchstart", handleInteraction, { passive: true });
    panel.addEventListener("click", handleInteraction);
    return () => {
      panel.removeEventListener("touchstart", handleInteraction);
      panel.removeEventListener("click", handleInteraction);
    };
  }, [currentSlide]);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gsapInitialized = useRef(false);

  useEffect(() => {
    if (gsapInitialized.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsapInitialized.current = true;
  }, []);

  const headlineText = t("headline");
  const splitWords = useCallback(
    (text: string) => {
      const isEmphasis = (w: string) => {
        const trimmed = w.replace(/[^a-zA-Z\u0900-\u097F]/g, "").toLowerCase();
        return trimmed === "intelligent" || trimmed === "बुद्धिमान" || trimmed === "beautiful" || trimmed === "खूबसूरत";
      };
      const emphasisClass = (w: string) => {
        const trimmed = w.replace(/[^a-zA-Z\u0900-\u097F]/g, "").toLowerCase();
        if (trimmed === "intelligent" || trimmed === "बुद्धिमान") return "hero-emphasis-intelligent";
        if (trimmed === "beautiful" || trimmed === "खूबसूरत") return "hero-emphasis-beautiful";
        return "";
      };
      return text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ perspective: "600px" }}
        >
          <span className={`inline-block ${emphasisClass(word)}`}>
            {word}
            {i < text.split(" ").length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ));
    },
    []
  );

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
      <div className="flex flex-col gap-16 px-4 py-24 @[864px]:flex-row @[864px]:items-center @[864px]:gap-20 relative z-10">
        <div className="flex flex-col gap-10 flex-1 relative">
          <div className="hidden @[1024px]:block absolute inset-0 pointer-events-none">
            {systemModules.map((module, i) => (
              <motion.div
                key={module.labelKey}
                className={`absolute ${module.position} opacity-20`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 0 }}
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
              <Button variant="primary" size="md" href="/contact" data-magnetic data-cursor-text="Inquire →">
                {t("cta")}
              </Button>
              <Button variant="secondary" size="md" href="/work" data-magnetic data-cursor-text="View Systems">
                {t("ctaSecondary")}
              </Button>
            </div>
          </FadeIn>

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

        <FadeIn direction="right" delay={0.25} duration={1.2}>
          <div className="relative w-full @[864px]:w-[480px] @[864px]:h-[480px] min-h-[280px] @[480px]:min-h-[340px] @[864px]:min-h-0">
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
                <div className="flex items-center gap-2 text-on-surface-variant/40">
                  <Sparkles size={14} />
                  <span className="text-[10px] uppercase tracking-[0.15em]">{t("systemActive")}</span>
                </div>
              </div>

              <div className="flex-1 relative overflow-hidden rounded-xl">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  loop
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-800 ${
                    showcaseSlides[currentSlide].type === "video" ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                />
                <AnimatePresence mode="wait">
                  {showcaseSlides[currentSlide].type !== "video" && (
                    <motion.div
                      key={showcaseSlides[currentSlide].src}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={showcaseSlides[currentSlide].src}
                        alt={showcaseSlides[currentSlide].alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 864px) 100vw, 480px"
                        unoptimized
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/30 to-transparent" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {showcaseSlides.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                        i === currentSlide
                          ? "bg-primary w-4"
                          : "bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.04]">
                <div className="text-center">
                  <p className="text-on-surface text-xl font-bold font-headline">99.9%</p>
                  <p className="text-on-surface-variant/40 text-[9px] uppercase tracking-[0.12em]">{t("uptime")}</p>
                </div>
                <div className="text-center">
                  <p className="text-on-surface text-xl font-bold font-headline">12ms</p>
                  <p className="text-on-surface-variant/40 text-[9px] uppercase tracking-[0.12em]">{t("latency")}</p>
                </div>
                <div className="text-center">
                  <p className="text-on-surface text-xl font-bold font-headline">256</p>
                  <p className="text-on-surface-variant/40 text-[9px] uppercase tracking-[0.12em]">{t("encryption")}</p>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 float"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-primary text-[10px] font-bold uppercase tracking-[0.15em]">{t("live")}</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-3 -left-3 glass rounded-xl px-3 py-2 float-medium"
              style={{ animationDelay: "1s" }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.15em]">{t("version")}</span>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
