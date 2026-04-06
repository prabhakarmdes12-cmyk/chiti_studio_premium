"use client";

import { useState } from "react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import {
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

const projectTypes = ["New Website", "App UI/UX", "Branding", "Product System"];

const fitChecks = [
  {
    title: "Modern & High-End Branding",
    description: "For companies looking to redefine their visual soul.",
  },
  {
    title: "Product & UI Systems",
    description: "Scalable design systems built for long-term growth.",
  },
  {
    title: "Editorial Web Experiences",
    description: "Breaking the grid with intentional and elite layouts.",
  },
];

export default function ContactPage() {
  const [activeType, setActiveType] = useState("App UI/UX");

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

    window.location.href = `mailto:hello@chiti.studio?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      {/* Hero */}
      <Container size="wide" className="pt-36">
        <FadeIn>
          <div className="max-w-3xl mb-24">
            <span className="text-secondary/70 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-bold neon-text-glow">
              Ready to evolve?
            </span>
            <h1 className="text-on-surface text-[3rem] md:text-[4.5rem] font-extrabold font-headline tracking-[-0.04em] mb-8 leading-[0.95]">
              Tell us about{" "}
              <span className="gradient-text-aurora">your project</span>
            </h1>
            <p className="text-on-surface-variant/60 text-[17px] md:text-[19px] font-light leading-[1.7] max-w-[520px]">
              We work with founders, startups, and growing businesses looking
              for design that stands out and systems that scale.
            </p>
          </div>
        </FadeIn>
      </Container>

      {/* Main Content */}
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
          {/* Contact Form */}
          <FadeIn className="lg:col-span-7">
            <div className="glass-panel rounded-[1.75rem] p-10 md:p-14">
              <form onSubmit={handleSubmit} className="space-y-14">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
                  {[
                    { label: "Name", name: "name", type: "text", placeholder: "John Doe", required: true },
                    { label: "Email Address", name: "email", type: "email", placeholder: "john@company.com", required: true },
                    { label: "Company / Brand", name: "company", type: "text", placeholder: "The Future Inc.", required: false },
                  ].map((field) => (
                    <div key={field.name} className="group relative">
                      <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                        {field.label}
                      </label>
                      <input
                        name={field.name}
                        required={field.required}
                        className="w-full bg-transparent border-0 border-b border-white/[0.06] py-3.5 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body text-[15px] outline-none"
                        placeholder={field.placeholder}
                        type={field.type}
                      />
                      <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                    </div>
                  ))}

                  {/* Budget */}
                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                      Budget Range
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
                    <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </div>
                </div>

                {/* Project Type Chips */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-6">
                    Project Type
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setActiveType(type)}
                        className={`px-6 py-2.5 rounded-full border text-[12px] font-medium transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                          activeType === type
                            ? "border-primary/40 bg-primary/[0.08] text-primary/90 shadow-[0_0_16px_rgba(77,208,225,0.1)]"
                            : "border-white/[0.06] bg-white/[0.02] text-on-surface-variant/50 hover:border-primary/20 hover:bg-primary/[0.03] hover:text-primary/70"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="group relative">
                  <label className="block text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/50 font-label mb-3 group-focus-within:text-primary/80 transition-colors duration-[400ms]">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="w-full bg-transparent border-0 border-b border-white/[0.06] py-3.5 px-0 focus:ring-0 focus:border-primary/50 text-on-surface placeholder:text-on-surface-variant/20 transition-all duration-[500ms] font-body resize-none text-[15px] outline-none"
                    placeholder="Briefly describe your goals, timeline, and any existing brand assets..."
                    rows={4}
                  />
                  <div className="absolute bottom-0 left-0 h-[0.5px] w-0 bg-gradient-to-r from-primary/60 to-secondary/40 group-focus-within:w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <Button variant="primary" size="lg" type="submit">
                    Send Inquiry
                  </Button>
                </div>
              </form>
            </div>
          </FadeIn>

          {/* Sidebar */}
          <aside className="lg:col-span-5 space-y-10">
            <FadeIn delay={0.2}>
              <div className="glass-panel rounded-[1.75rem] p-9 relative overflow-hidden border border-white/[0.03]">
                <div
                  className="absolute top-0 right-0 w-20 h-20 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(77,208,225,0.06) 0%, transparent 70%)",
                  }}
                />
                <h3 className="font-headline text-lg font-bold mb-8 text-on-surface tracking-[-0.01em]">
                  Is Chiti Studio the right fit?
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
                    Response Time
                  </span>
                </div>
                <p className="text-[12px] text-on-surface-variant/55 leading-[1.7]">
                  Typically within 24-48 hours. We value deep work and intentional
                  responses over speed.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="px-2 space-y-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label mb-4 block font-medium">
                    Direct Contact
                  </span>
                  <a
                    href="mailto:hello@chiti.studio"
                    className="text-2xl font-headline font-bold text-on-surface hover:text-primary/80 transition-colors duration-[500ms] relative inline-block group tracking-[-0.02em]"
                  >
                    hello@chiti.studio
                    <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-primary/50 group-hover:w-full transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]" />
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant/40 font-label mb-4 block font-medium">
                      Social
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
                      Location
                    </span>
                    <p className="text-[12px] font-medium text-on-surface/80 leading-relaxed">
                      Remote-first,
                      <br />
                      Based Globally.
                    </p>
                  </div>
                </div>

                <div className="p-7 glass-panel rounded-xl border border-white/[0.03]">
                  <p className="text-[12px] text-on-surface-variant/50 italic leading-[1.7]">
                    &ldquo;Whether you need a full website, a product redesign,
                    or a long-term design partner, we&rsquo;d love to hear from
                    you.&rdquo;
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
