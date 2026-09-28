"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ClipboardCheck, MapPin, TrendingUp, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFolder, type FolderCardData } from "@/components/card-folder";
import { NarrativeGallery } from "./narrative-gallery";
import { ScreenStack } from "./screen-stack";
import { linkedinUrl, projects, type CaseStudyNarrative, type CaseStudyShowcase, type PortfolioProject, type PortfolioProjectId } from "@/app/portfolio-data";
import { type Language, type SectionCopy } from "./copy";

interface ExploreScreenProps {
  active: boolean;
  caseStudyProjectId: PortfolioProjectId | null;
  copy: SectionCopy;
  language: Language;
  onCaseStudyBack: (projectId: PortfolioProjectId) => void;
  onProjectSelect: (projectId: PortfolioProjectId) => void;
}

const journeyIcons = [ClipboardCheck, Truck, MapPin, TrendingUp] as const;

function NarrativeCaseStudy({
  title,
  category,
  narrative,
  copy,
}: {
  title: string;
  category: string;
  narrative: CaseStudyNarrative;
  copy: SectionCopy;
}) {
  return (
    <article className="case-study-narrative">
      <header className="narrative-header">
        <h2 id="case-study-title">{title}</h2>
        <p className="project-meta case-study-category">{category}</p>
      </header>
      <div className="narrative-sequence">
        {narrative.beats.map((beat, index) => (
          <section className={`narrative-beat${beat.visual?.kind === "model" || (beat.visual?.kind === "screens" && beat.visual.layout === "wide") ? " narrative-beat--model" : beat.visual ? "" : " narrative-beat--text-only"}`} aria-labelledby={`narrative-beat-${index}`} key={beat.title}>
            <div className="narrative-copy">
              <h3 id={`narrative-beat-${index}`}>{beat.title}</h3>
              <p>{beat.text}</p>
            </div>
            {beat.visual && <figure className="narrative-visual">
              {beat.visual.kind === "journey" ? (
                <ol className="narrative-journey">
                  {beat.visual.steps.map((step, stepIndex) => {
                    const Icon = journeyIcons[stepIndex];
                    return (
                      <li key={step}>
                        <span className="journey-node" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>
                        <span className="journey-label">{step}</span>
                      </li>
                    );
                  })}
                </ol>
              ) : beat.visual.kind === "screens" ? (
                <NarrativeGallery screens={beat.visual.screens} copy={copy} layout={beat.visual.layout} />
              ) : beat.visual.kind === "model" ? (
                <div className="narrative-model">
                  <ol className="narrative-model-steps">
                    {beat.visual.steps.map((step) => (
                      <li key={step.title}>
                        <div className="narrative-model-copy">
                          <strong>{step.title}</strong>
                          <span>{step.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <NarrativeGallery screens={beat.visual.screens} copy={copy} layout="wide" />
                </div>
              ) : (
                <div className="narrative-visual-placeholder">{copy.caseStudyVisualPending}</div>
              )}
              <figcaption>{beat.visual.caption}{(beat.visual.kind === "screens" || beat.visual.kind === "model") && <span> · {copy.caseStudyOpenScreenshot}</span>}</figcaption>
            </figure>}
          </section>
        ))}
      </div>
      <blockquote className="narrative-closing"><p>{narrative.closing}</p></blockquote>
      <section className="case-study-cta" aria-label={copy.caseStudyContactLabel}>
        <h3>{copy.caseStudyContactTitle}</h3>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{copy.caseStudyContactAction} <ArrowRight size={18} /></a>
      </section>
    </article>
  );
}

function ShowcaseCaseStudy({
  title,
  category,
  showcase,
  copy,
}: {
  title: string;
  category: string;
  showcase: CaseStudyShowcase;
  copy: SectionCopy;
}) {
  return (
    <article className="case-study-narrative case-study-showcase">
      <header className="narrative-header showcase-header">
        <h2 id="case-study-title">{title}</h2>
        <p className="project-meta case-study-category">{category}</p>
        <p className="showcase-lede">{showcase.lede}</p>
      </header>
      <ScreenStack showcase={showcase} copy={copy} />
      <blockquote className="narrative-closing"><p>{showcase.closing}</p></blockquote>
      <section className="case-study-cta" aria-label={copy.caseStudyContactLabel}>
        <h3>{copy.caseStudyContactTitle}</h3>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{copy.caseStudyContactAction} <ArrowRight size={18} /></a>
      </section>
    </article>
  );
}

function ProjectCaseStudy({
  project,
  language,
  copy,
  onBack,
}: {
  project: PortfolioProject;
  language: Language;
  copy: SectionCopy;
  onBack: (projectId: PortfolioProjectId) => void;
}) {
  const { category, narrative, showcase, comingSoon } = project.content[language];
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  function handleBack() {
    onBack(project.id);
    window.requestAnimationFrame(() => document.getElementById(`folder-card-${project.id}`)?.focus());
  }

  return (
    <div className="project-case-study">
      <Button ref={backButtonRef} variant="ghost" className="case-study-back" onClick={handleBack}>
        <ArrowLeft size={17} />
        {copy.caseStudyBack}
      </Button>
      <div className="case-study-scroll" data-case-study-scroll role="region" tabIndex={0} aria-label={`${project.title} ${copy.caseStudy}`}>
        {showcase ? (
          <ShowcaseCaseStudy title={project.title} category={category} showcase={showcase} copy={copy} />
        ) : narrative ? (
          <NarrativeCaseStudy title={project.title} category={category} narrative={narrative} copy={copy} />
        ) : (
        <div className="case-study-wip">
          {comingSoon && <Image className="case-study-wip-emoji" src={comingSoon.emoji} alt="" width={256} height={256} sizes="112px" unoptimized />}
          <h2 id="case-study-title">{project.title}</h2>
          <p className="project-meta case-study-category">{category}</p>
          {comingSoon && (
            <div className="case-study-wip-note">
              <h3>{comingSoon.title}</h3>
              <p>{comingSoon.text}</p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

export function ExploreScreen({
  active,
  caseStudyProjectId,
  copy,
  language,
  onCaseStudyBack,
  onProjectSelect,
}: ExploreScreenProps) {
  const activeCaseStudyProject = projects.find((project) => project.id === caseStudyProjectId) ?? null;

  return (
    <section
      className="screen explore-screen"
      id="explore"
      aria-label={activeCaseStudyProject ? `${copy.caseStudy}: ${activeCaseStudyProject.title}` : copy.exploreTitle}
      data-active={active}
      aria-hidden={!active}
      inert={!active}
    >
      {activeCaseStudyProject ? (
        <ProjectCaseStudy project={activeCaseStudyProject} language={language} copy={copy} onBack={onCaseStudyBack} />
      ) : (
        <>
          <div className="section-heading explore-heading">
            <h2 id="explore-title">{copy.exploreTitle}</h2>
          </div>
          <div className="folder-grid" role="group" aria-label={language === "en" ? "Portfolio folders" : "Folder portfolio"}>
            {projects.map((project, index) => {
              const card: FolderCardData = {
                number: String(index + 1).padStart(2, "0"),
                title: project.title,
                description: project.content[language].summary,
                backgroundColor: "var(--folder-card-back)",
                folderColor: "var(--folder-card-front)",
                borderColor: "var(--folder-card-edge)",
                textColor: "var(--folder-card-ink)",
                subTextColor: "var(--folder-card-muted)",
                artwork: <span className="card-folder-project-art" aria-hidden="true"><span className="card-folder-sheet"><Image className="card-folder-emoji" src={project.folderEmoji} alt="" width={256} height={256} sizes="120px" unoptimized /></span></span>,
              };

              return (
                <CardFolder
                  key={project.id}
                  id={`folder-card-${project.id}`}
                  className="portfolio-folder-card"
                  card={card}
                  isOpen={caseStudyProjectId === project.id}
                  ariaLabel={`${copy.openFolder}: ${project.title}`}
                  onSelect={() => onProjectSelect(project.id)}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
