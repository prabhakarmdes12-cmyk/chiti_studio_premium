"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowDown, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import CanvasParticles from "@/components/CanvasParticles";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const t = useTranslations("contact");
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gsapInit = useRef(false);

  useEffect(() => {
    if (gsapInit.current) return;
    gsap.registerPlugin(ScrollTrigger);
    gsapInit.current = true;
  }, []);

  const headlineText = t("heroTitle");
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const currencyVal = formData.get("currency") as string;
    const amount = formData.get("budget") as string;
    const budget = currencyVal && amount ? `${currencyVal} ${amount}` : "Not specified";
    const message = formData.get("message") as string;

    const subject = `Project Inquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}\nBudget: ${budget}\n\nMessage:\n${message || "No message provided."}`;

    setSubmitted(true);
    setTimeout(() => {
      window.location.href = `mailto:chititech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-3" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center relative z-10 px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="text-primary" size={32} strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-on-surface text-2xl md:text-3xl font-bold font-headline mb-4">
            {t("formSuccess")}
          </h2>
          <p className="text-on-surface-variant/60 text-sm max-w-md mx-auto">
            {t("responseDesc")}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden">
      {/* 1. Hero — full-viewport atmospheric */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <CanvasParticles />
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-3" />

        <Container size="wide" className="relative z-10 pt-20 pb-12">
          <FadeIn direction="none" delay={0.15}>
            <div className="max-w-3xl">
              <span className="text-secondary/70 font-label text-[11px] tracking-[0.25em] uppercase mb-6 block font-medium">
                {t("heroTagline")}
              </span>
              <h1
                ref={headlineRef}
                className="text-on-surface text-[1.75rem] md:text-[4.5rem] font-extrabold font-headline tracking-[-0.04em] mb-6 leading-[1.05]"
              >
                {headlineWords}
              </h1>
              <p className="text-on-surface-variant/60 text-[15px] md:text-[19px] font-light leading-[1.7] max-w-[520px]">
                {t("heroSubtitle")}
              </p>
            </div>
          </FadeIn>
        </Container>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-on-surface-variant/30" />
        </motion.div>
      </section>

      {/* 2. Philosophy — narrative bridge */}
      <section className="py-16 md:py-32">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", titleKey: "phil01", descKey: "phil01Desc" },
              { num: "02", titleKey: "phil02", descKey: "phil02Desc" },
              { num: "03", titleKey: "phil03", descKey: "phil03Desc" },
            ].map((item, i) => (
              <FadeIn key={item.num} delay={0.1 + i * 0.12} direction="up">
                <div className="glass-panel rounded-[1.75rem] p-8 md:p-10 h-full flex flex-col">
                  <span className="text-[2rem] md:text-[2.5rem] font-bold font-headline text-primary/30 tracking-[-0.03em] leading-none mb-6 block">
                    {item.num}
                  </span>
                  <h3 className="text-on-surface text-[1.1rem] md:text-[1.25rem] font-bold font-headline mb-4 tracking-[-0.01em]">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-on-surface-variant/60 text-[13px] md:text-[14px] leading-[1.7] flex-1">
                    {t(item.descKey)}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Form — centered, generous */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="aurora-blob aurora-blob-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Container size="wide">
          <FadeIn>
            <div className="max-w-2xl mx-auto relative z-10">
              <form onSubmit={handleSubmit} className="space-y-14 md:space-y-16">
                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formName")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t("formPlaceholderName")}
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-4 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[16px] outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formEmail")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t("formPlaceholderEmail")}
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-4 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[16px] outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formCompany")}
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder={t("formPlaceholderCompany")}
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-4 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[16px] outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formBudget")}
                  </label>
                  <div className="flex items-center gap-3 border-b border-white/[0.06] group-focus-within:border-primary/50 transition-all duration-[500ms]">
                    <select
                      name="currency"
                      defaultValue="USD"
                      className="bg-transparent border-0 py-4 pr-2 focus:ring-0 text-on-surface font-body appearance-none text-[16px] outline-none cursor-pointer min-w-[72px]"
                    >
                      <option className="bg-surface-container-high" value="USD">$ USD</option>
                      <option className="bg-surface-container-high" value="INR">₹ INR</option>
                      <option className="bg-surface-container-high" value="EUR">€ EUR</option>
                      <option className="bg-surface-container-high" value="GBP">£ GBP</option>
                    </select>
                    <span className="text-on-surface-variant/30">|</span>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      min="0"
                      name="budget"
                      placeholder="50,000"
                      className="flex-1 bg-transparent border-0 py-4 px-0 focus:ring-0 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[16px] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formMessage")}
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder={t("formPlaceholderMessage")}
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-4 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[16px] outline-none resize-none"
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="pt-8">
                  <Button variant="primary" size="lg" type="submit" className="w-full">
                    {t("formSubmit")}
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 4. Calendly — standalone ritual */}
      <section className="py-24 md:py-32">
        <Container size="wide">
          <FadeIn>
            <div className="glass-panel rounded-[1.75rem] p-8 md:p-14 relative overflow-hidden border border-white/[0.03]">
              <div className="aurora-blob aurora-blob-1 absolute -top-20 -right-20 opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-start gap-6">
                  <div className="hidden md:flex size-14 rounded-2xl bg-primary/[0.08] items-center justify-center shrink-0">
                    <Calendar className="text-primary" size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-on-surface text-[1.5rem] md:text-[1.75rem] font-bold font-headline mb-3 tracking-[-0.02em]">
                      {t("callHeadline")}
                    </h3>
                    <p className="text-on-surface-variant/60 text-[14px] md:text-[15px] max-w-[480px] leading-[1.7]">
                      {t("callDesc")}
                    </p>
                  </div>
                </div>
                <a
                  href="https://calendly.com/chiti-studio/discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary text-[14px] font-semibold hover:shadow-[0_0_30px_rgba(153,102,255,0.3)] transition-all duration-[500ms] shrink-0"
                >
                  {t("callCta")}
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* 5. Contact info — minimal footer */}
      <section className="pb-16 md:pb-24">
        <Container size="wide">
          <FadeIn delay={0.2}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 pt-12 border-t border-white/[0.04]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label block mb-2">
                  {t("contactEmail")}
                </span>
                <a
                  href="mailto:chititech@gmail.com"
                  className="text-[15px] font-medium text-on-surface hover:text-primary/80 transition-colors duration-[400ms]"
                >
                  chititech@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label block mb-2">
                  {t("contactPhone")}
                </span>
                <a
                  href="tel:+919972934937"
                  className="text-[15px] font-medium text-on-surface hover:text-primary/80 transition-colors duration-[400ms]"
                >
                  +91 99729 34937
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
