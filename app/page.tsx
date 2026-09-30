import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { PrinciplesSection } from "@/components/sections/principles";
import { EducationSection } from "@/components/sections/education";
import { ContactSection } from "@/components/sections/contact";
import { SystemBackground } from "@/components/visual/system-background";
import { getResumeUrl, getSiteUrl } from "@/lib/site";
import { personal, skills } from "@/data/portfolio";

export default function HomePage() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.role,
    description: `${personal.studentStatus} and ${personal.role} based in ${personal.location}.`,
    ...(siteUrl ? { url: siteUrl.toString() } : {}),
    email: personal.email,
    telephone: personal.phone,
    homeLocation: { "@type": "Country", name: personal.location },
    sameAs: [
      personal.socials.linkedin,
      ...(personal.socials.github ? [personal.socials.github] : []),
    ],
    knowsAbout: skills.flatMap((group) => group.items),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SystemBackground />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero resumeUrl={getResumeUrl()} />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <PrinciplesSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
