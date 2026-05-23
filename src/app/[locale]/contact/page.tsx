"use client";

import { useState } from "react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { Input } from "@chiti/ui";
import {
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const projectTypes = ["New Website", "App Product Design", "Branding", "Product System"];

export default function ContactPage() {
  const [activeType, setActiveType] = useState("App Product Design");
  const t = useTranslations("contact");

  const fitChecks = [
    {
      title: t("fit01"),
      description: t("fit01Desc"),
    },
    {
      title: t("fit02"),
      description: t("fit02Desc"),
    },
    {
      title: t("fit03"),
      description: t("fit03Desc"),
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const company = formData.get("company") as string;
    const budget = formData.get("budget") as string;
    const message = formData.get("message") as string;

    const subject = `Project Inquiry from ${name}${company ? ` (${company})` : ""}`;
    const body = `Name: ${name}
Email: ${email}
Company: ${company || "N/A"}
Budget: ${budget || "Not specified"}
Project Type: ${activeType}

Message:
${message || "No message provided."}`;

    window.location.href = `mailto:chititech@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Container size="wide" className="pt-36">
        <FadeIn>
          <div className="max-w-3xl mb-24">
            <span className="text-secondary/70 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-bold neon-text-glow">
              {t("tagline")}
            </span>
            <h1 className="text-on-surface text-[3rem] md:text-[4.5rem] font-extrabold font-headline tracking-[-0.04em] mb-8 leading-[0.95]">
              {t("title")}
            </h1>
            <p className="text-on-surface-variant/60 text-[17px] md:text-[19px] font-light leading-[1.7] max-w-[520px]">
              {t("subtitle")}
            </p>
          </div>
        </FadeIn>
      </Container>

      <Container size="wide">
        <FadeIn>
          <div className="glass-panel rounded-[1.75rem] p-6 md:p-8 lg:p-10 mb-12 relative overflow-hidden border border-white/[0.03]">
            <div
              className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(153,102,255,0.06) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-on-surface text-[1.25rem] font-bold font-headline mb-2">
                  {t("callHeadline")}
                </h3>
                <p className="text-on-surface-variant/60 text-[14px] max-w-[420px]">
                  {t("callDesc")}
                </p>
              </div>
              <a
                href="https://calendly.com/chiti-studio/discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-primary-dim text-on-primary text-[14px] font-semibold hover:shadow-[0_0_30px_rgba(153,102,255,0.3)] transition-all duration-[500ms] shrink-0"
              >
                {t("callCta")}
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>

      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          <FadeIn className="lg:col-span-7">
            <div className="glass-panel rounded-[1.75rem] p-6 md:p-10 lg:p-14">
              <form onSubmit={handleSubmit} className="space-y-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
                  {[
                    { label: t("formName"), name: "name", type: "text", placeholder: t("formPlaceholderName"), required: true },
                    { label: t("formEmail"), name: "email", type: "email", placeholder: t("formPlaceholderEmail"), required: true },
                    { label: t("formCompany"), name: "company", type: "text", placeholder: t("formPlaceholderCompany"), required: false },
                  ].map((field) => (
                    <Input
                      key={field.name}
                      label={field.label}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  ))}

                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                      {t("formBudget")}
                    </label>
                    <select
                      name="budget"
                      className="w-full bg-transparent border-0 border-b border-white/[0.06] py-3.5 px-0 focus:ring-0 focus:border-primary/50 text-on-surface transition-all duration-[500ms] font-body appearance-none text-[15px] outline-none cursor-pointer"
                    >
                      <option className="bg-surface-container-high">$10k - $25k</option>
                      <option className="bg-surface-container-high">$25k - $50k</option>
                      <option className="bg-surface-container-high">$50k - $100k</option>
                      <option className="bg-surface-container-high">$100k+</option>
                    </select>
                    <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-6">
                    {t("formType")}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        className={`px-6 py-2.5 rounded-full border text-[12px] font-medium transition-all duration-[500ms] ease-[var(--ease-out)] cursor-pointer ${
                          activeType === type
                            ? "border-primary/40 bg-primary/[0.08] text-primary/90 shadow-[0_0_16px_rgba(153,102,255,0.1)]"
                            : "border-white/[0.06] bg-white/[0.02] text-on-surface-variant/50 hover:border-primary/20 hover:bg-primary/[0.03] hover:text-primary/70"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    {t("formMessage")}
                  </label>
                  <textarea
                    name="message"
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-3.5 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body resize-none text-[15px] outline-none"
                    placeholder={t("formPlaceholderMessage")}
                    rows={4}
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                </div>

                <div className="pt-6">
                  <Button variant="primary" size="lg" type="submit">
                    {t("formSubmit")}
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>

          <aside className="lg:col-span-5 space-y-10">
            <FadeIn delay={0.2}>
              <div className="glass-panel rounded-[1.75rem] p-9 relative overflow-hidden border border-white/[0.03]">
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(153,102,255,0.06) 0%, transparent 70%)",
                  }}
                />
                <h3 className="font-headline text-lg font-bold mb-8 text-on-surface tracking-[-0.01em]">
                  {t("fitTitle")}
                </h3>
                <ul className="space-y-6 mb-10">
                  {fitChecks.map((check) => (
                    <li key={check.title} className="flex items-start gap-4 group">
                      <div className="p-1 rounded-full bg-secondary/[0.06] group-hover:bg-secondary/[0.1] transition-colors duration-[400ms] shrink-0 mt-0.5">
                        <CheckCircle2 className="text-secondary/70" size={16} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-on-surface mb-1">
                          {check.title}
                        </h4>
                        <p className="text-[12px] text-on-surface-variant/55 leading-[1.6]">
                          {check.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="neon-line mb-8 opacity-25" />

                <div className="flex items-center gap-3 mb-3">
                  <Clock className="text-tertiary/60" size={16} strokeWidth={1.5} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-on-surface/80">
                    {t("responseTime")}
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant/55 leading-[1.7]">
                  {t("responseDesc")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="px-2 space-y-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label mb-4 block font-medium">
                    {t("directContact")}
                  </span>
                  <a
                    href="mailto:chititech@gmail.com"
                    className="text-2xl font-headline font-bold text-on-surface hover:text-primary/80 transition-colors duration-[500ms] relative inline-block group tracking-[-0.02em]"
                  >
                    chititech@gmail.com
                    <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-primary/50 group-hover:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                  </a>
                  <a
                    href="tel:+919972934937"
                    className="text-2xl font-headline font-bold text-on-surface hover:text-primary/80 transition-colors duration-[500ms] relative inline-block group tracking-[-0.02em] mt-2"
                  >
                    +91 99729 34937
                    <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-primary/50 group-hover:w-full transition-all duration-[600ms] ease-[var(--ease-out)]" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label mb-4 block font-medium">
                      {t("social")}
                    </span>
                    <div className="flex flex-col gap-2.5">
                      {["LinkedIn", "Instagram", "Dribbble"].map((social) => (
                        <Link
                          key={social}
                          href="#"
                          className="text-[12px] font-medium text-on-surface-variant/50 hover:text-secondary/80 transition-colors duration-[400ms]"
                        >
                          {social}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label mb-4 block font-medium">
                      {t("location")}
                    </span>
                    <p className="text-[12px] font-medium text-on-surface/80 leading-relaxed">
                      {t("locationValue")}
                    </p>
                  </div>
                </div>

                <div className="p-7 glass-panel rounded-xl border border-white/[0.03]">
                  <p className="text-[12px] text-on-surface-variant/50 italic leading-[1.7]">
                    &ldquo;{t("quote")}&rdquo;
                  </p>
                </div>
              </div>
            </FadeIn>
          </aside>
        </div>
      </Container>
    </>
  );
}
