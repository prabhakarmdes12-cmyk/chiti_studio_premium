"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import Container from "@/components/Container";
import Section from "@/components/Section";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { Badge, Modal } from "@chiti/ui";
import CTASection from "@/components/sections/CTASection";
import PasswordGate from "@/components/PasswordGate";
import { caseStudies, orderedCaseStudies } from "@/data/case-studies";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Layers,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

function screenImagePath(slug: string, file: string) {
  if (file.startsWith("http")) return file;
  return `/case-studies/${slug}/${file}`;
}

export default function CaseStudyClient() {
  const params = useParams();
  const slug = params.slug as string;
  const project = caseStudies.find((c) => c.slug === slug);
  const [lightbox, setLightbox] = useState<{
    file: string;
    caption: string;
  } | null>(null);
  const t = useTranslations("work");
  const [unlocked, setUnlocked] = useState(
    typeof window !== "undefined" && sessionStorage.getItem("cs_unlocked") === "true"
  );

  const currentIndex = orderedCaseStudies.findIndex((c) => c.slug === slug);
  const prevProject =
    currentIndex > 0 ? orderedCaseStudies[currentIndex - 1] : null;
  const nextProject =
    currentIndex < orderedCaseStudies.length - 1
      ? orderedCaseStudies[currentIndex + 1]
      : null;

  if (!project) {
    return (
      <Container className="pt-36">
        <div className="text-center py-32">
          <h1 className="text-on-surface text-2xl font-bold mb-4">
            {t("notFound")}
          </h1>
          <Button variant="primary" size="md" href="/work">
            {t("backToAll")}
          </Button>
        </div>
      </Container>
    );
  }

  if (!unlocked) {
    return (
      <PasswordGate
        onUnlocked={() => {
          sessionStorage.setItem("cs_unlocked", "true");
          setUnlocked(true);
        }}
      />
    );
  }

  return (
    <>
      {lightbox && (
        <Modal open={!!lightbox} onClose={() => setLightbox(null)}>
          <div className="p-6 md:p-10">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.06]">
              {screenImagePath(project.slug, lightbox.file).endsWith(".svg") ? (
                <img
                  src={screenImagePath(project.slug, lightbox.file)}
                  alt={lightbox.caption}
                  className="w-full h-full object-contain"
                />
              ) : (
                <Image
                  src={screenImagePath(project.slug, lightbox.file)}
                  alt={lightbox.caption}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
            <p className="text-on-surface-variant/60 text-[13px] mt-4 text-center max-w-2xl mx-auto">
              {lightbox.caption}
            </p>
          </div>
        </Modal>
      )}

      <Container className="pt-28">
        <FadeIn>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-on-surface-variant/50 hover:text-primary transition-colors duration-[400ms] text-[13px] mb-8 mt-8"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            {t("backToAll")}
          </Link>
        </FadeIn>
      </Container>

      <Container>
        <FadeIn>
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/[0.04] mb-14">
            {project.images.hero.endsWith(".svg") ? (
              <img
                src={project.images.hero}
                alt={project.client}
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={project.images.hero}
                alt={project.client}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
          </div>
        </FadeIn>
      </Container>

      {project.status === "wip" && (
        <Container>
          <FadeIn>
            <div className="mb-14 px-6 py-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0 animate-pulse" />
                <div>
                  <p className="text-amber-400 text-[11px] font-label uppercase tracking-[0.15em] mb-1">
                    {t("inProgress")}
                  </p>
                  <p className="text-amber-300/60 text-[13px] leading-[1.6]">
                    {t("wipBanner")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      )}

      <Container size="narrow">
        <FadeIn>
          <div className="mb-14">
            <span className="text-primary/60 font-label text-[11px] tracking-[0.25em] uppercase mb-5 block font-medium">
              {project.role}
            </span>
            <h1 className="text-on-surface text-[2.5rem] md:text-[3.5rem] font-extrabold font-headline tracking-[-0.04em] leading-[1.08] mb-4">
              {project.title}
            </h1>
            <p className="text-on-surface-variant/60 text-[16px] leading-[1.7] max-w-[640px] mb-8">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {project.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-8 pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 text-on-surface-variant/60 text-[13px]">
                <Clock size={14} strokeWidth={1.5} className="text-primary/60" />
                {project.year}
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/60 text-[13px]">
                <Layers size={14} strokeWidth={1.5} className="text-secondary/60" />
                {project.category}
              </div>
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors duration-[400ms] text-[13px]"
                >
                  <ExternalLink size={14} strokeWidth={1.5} />
                  {t("visitLive")}
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>

      <Container>
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass-panel rounded-2xl p-6 text-center"
              >
                <p className="text-on-surface text-[1.5rem] font-extrabold font-headline mb-1 tracking-[-0.02em]">
                  {metric.value}
                </p>
                <p className="text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.18em]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      <Container size="narrow">
        <Section bordered>
          <FadeIn>
            <span className="text-secondary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">
              {t("problem")}
            </span>
            <p className="text-on-surface-variant/70 text-[15px] leading-[1.8]">
              {project.problem}
            </p>
          </FadeIn>
        </Section>
      </Container>

      <Container size="narrow">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn>
              <div>
                <span className="text-tertiary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">
                  {t("systemOverview")}
                </span>
                <p className="text-on-surface-variant/70 text-[15px] leading-[1.8]">
                  {project.systemOverview.text}
                </p>
              </div>
            </FadeIn>
            {project.systemOverview.diagram && (
              <FadeIn delay={0.1}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/[0.04]">
                  {screenImagePath(project.slug, project.systemOverview.diagram).endsWith(".svg") ? (
                    <img
                      src={screenImagePath(project.slug, project.systemOverview.diagram)}
                      alt="System architecture diagram"
                      className="w-full h-full object-contain p-4"
                    />
                  ) : (
                    <Image
                      src={screenImagePath(project.slug, project.systemOverview.diagram)}
                      alt="System architecture diagram"
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 1024px) 100vw, 480px"
                    />
                  )}
                </div>
              </FadeIn>
            )}
          </div>
        </Section>
      </Container>

      <Container size="narrow">
        <Section bordered>
          <FadeIn>
            <span className="text-primary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
              {t("challenges")}
            </span>
          </FadeIn>
          <div className="space-y-3">
            {project.keyChallenges.map((challenge, i) => (
              <FadeIn key={challenge} delay={0.05 + i * 0.06}>
                <div className="flex items-start gap-4 glass-panel rounded-xl p-5">
                  <span className="text-primary/40 text-[11px] font-bold font-mono mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-on-surface-variant/70 text-[14px] leading-[1.7]">
                    {challenge}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </Container>

      <Container size="narrow">
        <Section>
          <FadeIn>
            <span className="text-secondary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
              {t("decisions")}
            </span>
            <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em] mb-10">
              {t("howWeSolved")}
            </h2>
          </FadeIn>
          <div className="space-y-8">
            {project.designDecisions.map((decision, i) => (
              <FadeIn key={decision.title} delay={0.08 + i * 0.1}>
                <div className="glass-panel rounded-2xl p-8 group hover:-translate-y-0.5 transition-all duration-[500ms]">
                  <span className="text-primary/30 text-[11px] font-bold font-mono tracking-wider block mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-on-surface text-[18px] font-bold font-headline mb-3 tracking-[-0.01em]">
                    {decision.title}
                  </h3>
                  <p className="text-on-surface-variant/65 text-[14px] leading-[1.7]">
                    {decision.text}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      </Container>

      {project.interfaceScreens.length > 0 && (
        <Container size="narrow">
          <Section bordered>
            <FadeIn>
              <span className="text-tertiary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
                {t("screens")}
              </span>
              <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em] mb-6">
                {t("theWork")}
              </h2>
              {project.screenIntro && (
                <p className="text-on-surface-variant/60 text-[14px] leading-[1.7] mb-8 max-w-[600px]">
                  {project.screenIntro}
                </p>
              )}
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.interfaceScreens.map((screen, i) => (
                <FadeIn key={screen.file} delay={0.06 + i * 0.08}>
                  <div
                    onClick={() => setLightbox(screen)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.04] mb-3">
                      {screenImagePath(project.slug, screen.file).endsWith(".svg") ? (
                        <img
                          src={screenImagePath(project.slug, screen.file)}
                          alt={screen.caption}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-all duration-[800ms]"
                        />
                      ) : (
                        <Image
                          src={screenImagePath(project.slug, screen.file)}
                          alt={screen.caption}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-all duration-[800ms]"
                          sizes="(max-width: 768px) 100vw, 480px"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-[500ms]" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-[500ms]">
                        <span className="px-4 py-2 rounded-full bg-on-surface/90 text-surface text-[11px] font-medium backdrop-blur-sm">
                          {t("clickToExpand")}
                        </span>
                      </div>
                    </div>
                    <p className="text-on-surface-variant/50 text-[12px] leading-[1.6]">
                      {screen.caption}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>
        </Container>
      )}

      {project.keyFeatures.length > 0 && (
        <Container size="narrow">
          <Section>
            <FadeIn>
              <span className="text-primary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
                {t("features")}
              </span>
              <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em] mb-10">
                {t("whatWeDelivered")}
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, i) => (
                <FadeIn key={feature} delay={0.05 + i * 0.06}>
                  <div className="flex items-start gap-4 glass-panel rounded-xl p-5 group hover:-translate-y-0.5 transition-all duration-[500ms]">
                    <div className="p-1.5 rounded-full bg-primary/[0.06] shrink-0 mt-0.5">
                      <CheckCircle2
                        className="text-primary/70"
                        size={14}
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-on-surface-variant/70 text-[13px] leading-[1.7]">
                      {feature}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>
        </Container>
      )}

      <Container size="narrow">
        <Section bordered>
          <FadeIn>
            <span className="text-primary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
              {t("impact")}
            </span>
          </FadeIn>
          <div className="space-y-3">
            {project.impact.map((item, i) => (
              <FadeIn key={item} delay={0.05 + i * 0.06}>
                <div className="flex items-start gap-4 glass-panel rounded-xl p-5">
                  <span className="text-primary/40 text-[11px] font-bold font-mono mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-on-surface-variant/70 text-[14px] leading-[1.7]">
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          {project.testimonial && (
            <FadeIn delay={0.2}>
              <div className="mt-10 pt-8 border-t border-white/[0.04]">
                <p className="text-on-surface text-[14px] italic leading-[1.7] mb-4">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="text-on-surface text-[13px] font-bold">
                    {project.testimonial.author}
                  </p>
                  <p className="text-on-surface-variant/40 text-[11px]">
                    {project.testimonial.title}
                  </p>
                </div>
              </div>
            </FadeIn>
          )}
        </Section>
      </Container>

      <Container size="narrow">
        <Section>
          <FadeIn>
            <div className="glass-panel rounded-[2rem] p-10 md:p-14 relative overflow-hidden border border-white/[0.03]">
              <div
                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(153,102,255,0.04) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10">
                <span className="text-secondary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-4 block font-medium">
                  {t("reflection")}
                </span>
                <p className="text-on-surface-variant/65 text-[15px] leading-[1.8] italic">
                  {project.reflection}
                </p>
              </div>
            </div>
          </FadeIn>
        </Section>
      </Container>

      {project.journal && project.journal.length > 0 && (
        <Container size="narrow">
          <Section bordered>
            <FadeIn>
              <span className="text-primary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
                Development Journal
              </span>
              <h2 className="text-on-surface text-[2rem] font-extrabold font-headline tracking-[-0.02em] mb-10">
                Process & Progress
              </h2>
            </FadeIn>
            <div className="space-y-10">
              {project.journal.map((phase, pi) => (
                <FadeIn key={phase.phase} delay={0.05 + pi * 0.08}>
                  <div className="relative pl-8 border-l border-white/[0.06]">
                    <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary/30 border-2 border-primary/60 -translate-x-[6.5px]" />
                    <span className="text-primary/50 text-[10px] font-label uppercase tracking-[0.2em] mb-2 block">
                      {phase.phase}
                    </span>
                    <div className="space-y-6 mt-4">
                      {phase.entries.map((entry, ei) => (
                        <div key={entry.title} className="glass-panel rounded-xl p-5">
                          <h3 className="text-on-surface text-[15px] font-bold font-headline mb-2 tracking-[-0.01em]">
                            {entry.title}
                          </h3>
                          <p className="text-on-surface-variant/60 text-[13px] leading-[1.7]">
                            {entry.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </Section>
        </Container>
      )}

      <Container size="narrow">
        <Section bordered>
          <FadeIn>
            <span className="text-secondary/60 font-label text-[10px] tracking-[0.3em] uppercase mb-6 block font-medium">
              {t("techStack")}
            </span>
          </FadeIn>
          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <FadeIn key={tech} delay={0.03}>
                <Badge>{tech}</Badge>
              </FadeIn>
            ))}
          </div>
        </Section>
      </Container>

      {(prevProject || nextProject) && (
        <Container size="narrow">
          <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {prevProject ? (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="glass-panel rounded-2xl p-6 group hover:-translate-y-0.5 transition-all duration-[500ms]"
                >
                  <span className="flex items-center gap-2 text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.15em] mb-3">
                    <ChevronLeft size={12} strokeWidth={1.5} />
                    {t("previous")}
                  </span>
                  <p className="text-on-surface text-[14px] font-bold font-headline group-hover:text-primary/80 transition-colors duration-[400ms]">
                    {prevProject.title.split(" — ")[0] ||
                      prevProject.client}
                  </p>
                  <p className="text-on-surface-variant/40 text-[11px] mt-1">
                    {prevProject.category}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="glass-panel rounded-2xl p-6 group hover:-translate-y-0.5 transition-all duration-[500ms] text-right"
                >
                  <span className="flex items-center justify-end gap-2 text-on-surface-variant/40 text-[10px] font-label uppercase tracking-[0.15em] mb-3">
                    {t("next")}
                    <ChevronRight size={12} strokeWidth={1.5} />
                  </span>
                  <p className="text-on-surface text-[14px] font-bold font-headline group-hover:text-primary/80 transition-colors duration-[400ms]">
                    {nextProject.title.split(" — ")[0] || nextProject.client}
                  </p>
                  <p className="text-on-surface-variant/40 text-[11px] mt-1">
                    {nextProject.category}
                  </p>
                </Link>
              )}
            </div>
          </Section>
        </Container>
      )}

      <Container>
        <Section>
          <CTASection />
        </Section>
      </Container>
    </>
  );
}
