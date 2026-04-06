import Container from "@/components/Container";
import Section from "@/components/Section";
import Hero from "@/components/sections/Hero";
import MetricsStrip from "@/components/sections/MetricsStrip";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WorkShowcase from "@/components/sections/WorkShowcase";
import Process from "@/components/sections/Process";
import AboutPreview from "@/components/sections/AboutPreview";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Container className="pt-28">
        <Hero />
        <MetricsStrip />
      </Container>

      {/* Services */}
      <Container>
        <Section id="services">
          <ServicesGrid />
        </Section>
      </Container>

      {/* Selected Work */}
      <Container>
        <Section id="work" bordered>
          <WorkShowcase />
        </Section>
      </Container>

      {/* Process */}
      <Container>
        <Section id="process">
          <Process />
        </Section>
      </Container>

      {/* About Preview */}
      <Container>
        <Section id="about" bordered>
          <AboutPreview />
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
