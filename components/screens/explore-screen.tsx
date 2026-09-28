"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFolder, type FolderCardData } from "@/components/card-folder";
import { PortfolioCard } from "@/components/portfolio-card";
import { linkedinUrl, projects, type PortfolioProject, type PortfolioProjectId } from "@/app/portfolio-data";
import { type Language, type SectionCopy } from "./copy";

interface ExploreScreenProps {
  active: boolean;
  caseStudyProjectId: PortfolioProjectId | null;
  copy: SectionCopy;
  language: Language;
  onCaseStudyBack: (projectId: PortfolioProjectId) => void;
  onProjectSelect: (projectId: PortfolioProjectId) => void;
}

function ProjectPreview({ project, language }: { project: PortfolioProject; language: Language }) {
  return (
    <span className={`project-preview ${project.color}`} aria-hidden="true">
      <strong>{project.title}</strong>
      <span className="project-preview-terms">
        {project.previewItems[language].map((item) => <span key={item}>{item}</span>)}
      </span>
    </span>
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
  const { summary, category, story } = project.content[language];
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backButtonRef.current?.focus();
  }, []);

  function handleBack() {
    onBack(project.id);
    window.requestAnimationFrame(() => document.getElementById(`folder-card-${project.id}`)?.focus());
  }

  return (
    <div className={`project-case-study ${project.color}`}>
      <Button ref={backButtonRef} variant="ghost" className="case-study-back" onClick={handleBack}>
        <ArrowLeft size={17} />
        {copy.caseStudyBack}
      </Button>
      <div className="case-study-scroll" data-case-study-scroll role="region" tabIndex={0} aria-label={`${project.title} ${copy.caseStudy}`}>
        <div className="case-study-layout">
          <div className="case-study-copy">
            <h2 id="case-study-title">{project.title}</h2>
            <p className="case-study-summary">{story?.problem ?? summary}</p>
            <p className="project-meta case-study-category">{category}</p>
            <dl className="case-study-facts">
              <div><dt>{copy.caseStudyRole}</dt><dd>{copy.caseStudyPending}</dd></div>
              <div><dt>{copy.caseStudyYear}</dt><dd>{copy.caseStudyPending}</dd></div>
              <div><dt>{copy.caseStudyScope}</dt><dd>{copy.caseStudyPending}</dd></div>
            </dl>
          </div>
          <PortfolioCard role="img" elevation="subtle" className="case-study-artwork" aria-label={`${project.title} ${copy.caseStudyConceptPreview}`}>
            <ProjectPreview project={project} language={language} />
            <span className="case-study-visual-caption">{copy.caseStudyConceptPreview}</span>
          </PortfolioCard>
        </div>

        <div className="case-study-story">
          <section className="case-study-section" aria-labelledby="case-situation">
            <span className="case-study-step">01</span>
            <div><h3 id="case-situation">{copy.caseStudySituation}</h3><p className="case-study-pending">{story?.situation ?? copy.caseStudySituationPending}</p></div>
          </section>
          <section className="case-study-section" aria-labelledby="case-insights">
            <span className="case-study-step">02</span>
            <div>
              <h3 id="case-insights">{copy.caseStudyInsights}</h3>
              <ol className="case-study-list">{[0, 1, 2].map((index) => <li key={index}><span>0{index + 1}</span>{story?.insights[index] ?? copy.caseStudyInsightPending}</li>)}</ol>
            </div>
          </section>
          <section className="case-study-section" aria-labelledby="case-decisions">
            <span className="case-study-step">03</span>
            <div>
              <h3 id="case-decisions">{copy.caseStudyDecisions}</h3>
              <div className="case-study-decision-grid">{[0, 1, 2].map((index) => (
                <article key={index}>
                  <div className="case-study-evidence">{copy.caseStudyVisualPending}</div>
                  <h4>{story?.decisions[index].title ?? `${copy.caseStudyDecisionPending} 0${index + 1}`}</h4>
                  <p>{story?.decisions[index].explanation ?? copy.caseStudyExplanationPending}</p>
                </article>
              ))}</div>
            </div>
          </section>
          <section className="case-study-section" aria-labelledby="case-system">
            <span className="case-study-step">04</span>
            <div>
              <h3 id="case-system">{copy.caseStudySystem}</h3>
              <div className="case-study-system-slot">
                <strong>{story?.artifact ?? copy.caseStudyArtifactPending}</strong>
                <span>{copy.caseStudyArtifactVisualPending}</span>
              </div>
            </div>
          </section>
          <section className="case-study-section" aria-labelledby="case-result">
            <span className="case-study-step">05</span>
            <div>
              <h3 id="case-result">{copy.caseStudyResult}</h3>
              {story ? (
                <div className="case-study-result-flow">
                  <div><span>{copy.caseStudyBefore}</span><strong>{story.resultBefore}</strong></div>
                  <ArrowRight size={20} aria-hidden="true" />
                  <div><span>{copy.caseStudyAfter}</span><strong>{story.resultAfter}</strong></div>
                </div>
              ) : <p className="case-study-pending">{copy.caseStudyResultPending}</p>}
            </div>
          </section>
          <section className="case-study-cta" aria-label={copy.caseStudyContactLabel}>
            <h3>{copy.caseStudyContactTitle}</h3>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">{copy.caseStudyContactAction} <ArrowRight size={18} /></a>
          </section>
        </div>
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
                artwork: <span className="card-folder-project-art" aria-hidden="true"><ProjectPreview project={project} language={language} /></span>,
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
