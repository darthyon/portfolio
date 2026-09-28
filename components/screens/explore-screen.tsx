"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CardFolder, type FolderCardData } from "@/components/card-folder";
import { PortfolioCard } from "@/components/portfolio-card";
import { PortfolioInfoCard } from "@/components/portfolio-info-card";
import {
  aboutNotes,
  folders,
  linkedinUrl,
  projects,
  sideQuests,
  type FolderContent,
  type FolderId,
  type PortfolioProject,
  type PortfolioProjectId,
} from "@/app/portfolio-data";
import { localizeFolder, type Language, type SectionCopy } from "./copy";

interface ExploreScreenProps {
  active: boolean;
  activeFolder: FolderId | null;
  caseStudyProjectId: PortfolioProjectId | null;
  copy: SectionCopy;
  language: Language;
  onCaseStudyBack: (projectId: PortfolioProjectId) => void;
  onFolderClose: (folderId: FolderId) => void;
  onFolderSelect: (folderId: FolderId) => void;
  onProjectSelect: (projectId: PortfolioProjectId) => void;
}

function ProjectPreview({ project }: { project: PortfolioProject }) {
  return (
    <span className={`project-preview ${project.color}`} aria-hidden="true">
      <span className="phone-frame">
        <span className="phone-speaker" />
        <span className="phone-screen">
          <span className="phone-heading">
            <span className="phone-app-mark" />
            <strong>{project.previewLabel}</strong>
          </span>
          {project.previewItems.map((item, index) => (
            <span className="phone-list-item" key={item}>
              <span className={`phone-item-icon item-${index + 1}`} />
              <span>{item}</span>
              <ArrowRight size={10} strokeWidth={2.5} />
            </span>
          ))}
        </span>
      </span>
      <span className="preview-orbit orbit-one" />
      <span className="preview-orbit orbit-two" />
    </span>
  );
}

function localizeProject(project: PortfolioProject, language: Language): Pick<PortfolioProject, "summary" | "category"> {
  if (language === "en") return { summary: project.summary, category: project.category };
  if (project.id === "mysubsidi") {
    return { summary: "Penjejak subsidi kerajaan untuk rakyat Malaysia.", category: "Perkhidmatan awam · Reka bentuk produk" };
  }
  if (project.id === "welluber") {
    return { summary: "Pengangkutan penjagaan kesihatan atas permintaan.", category: "Penjagaan kesihatan · Reka bentuk produk" };
  }
  return {
    summary: "Platform logistik yang menghubungkan perniagaan dan pemandu lori.",
    category: "Logistik · Reka bentuk produk",
  };
}

function localizeSideQuest(item: (typeof sideQuests)[number], language: Language) {
  if (language === "en") return item;
  if (item.id === "little-tools") {
    return {
      ...item,
      title: "Alat kecil",
      summary: "Utiliti ringkas untuk mengurangkan kesukaran harian.",
      category: "Sedang dibina",
    };
  }
  return {
    ...item,
    title: "Kajian interaksi",
    summary: "Gerakan dan butiran antara muka yang diteroka dalam kod.",
    category: "Eksperimen reka bentuk",
  };
}

function localizeAboutNote(item: (typeof aboutNotes)[number], language: Language) {
  if (language === "en") return item;
  if (item.title === "Product thinking") {
    return {
      ...item,
      title: "Pemikiran produk",
      summary: "Mulakan dengan masalah, dengar dengan teliti, kemudian jelaskan langkah seterusnya.",
      category: "Cara saya bekerja",
    };
  }
  return {
    ...item,
    title: "Reka bentuk hingga siap",
    summary: "Saya suka membentuk idea dan bekerjasama untuk menjadikannya nyata.",
    category: "Perkara yang saya hargai",
  };
}

function FolderArtwork({ folder, language }: { folder: FolderContent; language: Language }) {
  if (folder.kind === "project") {
    const project = projects.find((item) => item.id === folder.id);
    if (project) {
      return (
        <span className="card-folder-project-art" aria-hidden="true">
          <ProjectPreview project={project} />
        </span>
      );
    }
  }

  if (folder.kind === "side-quest") {
    const item = sideQuests.find((quest) => quest.id === folder.id);
    return <span className="card-folder-symbol-art" aria-hidden="true">{item?.icon}</span>;
  }

  return (
    <span className="card-folder-notes-art" aria-hidden="true">
      <span>{language === "en" ? "Working notes" : "Catatan kerja"}</span>
      <span>01 <i /> 02</span>
    </span>
  );
}

function FolderSubpage({
  folder,
  language,
  copy,
  onClose,
}: {
  folder: FolderContent;
  language: Language;
  copy: SectionCopy;
  onClose: (folderId: FolderId) => void;
}) {
  const localizedFolder = localizeFolder(folder, language);

  function handleClose() {
    onClose(folder.id);
    window.requestAnimationFrame(() => document.getElementById(`folder-card-${folder.id}`)?.focus());
  }

  return (
    <div className="folder-subpage">
      <Button variant="ghost" className="folder-subpage-back" onClick={handleClose}>
        <ArrowLeft size={17} />
        {copy.backFolders}
      </Button>
      <PortfolioCard className="folder-subpage-card" aria-label={`${localizedFolder.name} folder`}>
        <CardHeader className="folder-subpage-heading">
          <CardTitle><h2>{localizedFolder.name}</h2></CardTitle>
          <CardDescription><p>{localizedFolder.description}</p></CardDescription>
        </CardHeader>
        <CardContent className={`folder-subpage-body ${folder.kind === "about" ? "is-about" : ""}`}>
          {folder.kind === "side-quest" && sideQuests.filter((item) => item.id === folder.id).map((item) => {
            const localizedItem = localizeSideQuest(item, language);
            return (
              <PortfolioInfoCard
                key={item.id}
                icon={item.icon}
                category={localizedItem.category}
                title={localizedItem.title}
                summary={localizedItem.summary}
              />
            );
          })}
          {folder.kind === "about" && aboutNotes.map((item) => {
            const localizedItem = localizeAboutNote(item, language);
            return (
              <PortfolioInfoCard
                key={item.title}
                icon={item.icon}
                iconStyle="note"
                category={localizedItem.category}
                title={localizedItem.title}
                summary={localizedItem.summary}
              />
            );
          })}
        </CardContent>
      </PortfolioCard>
    </div>
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
  const { summary, category } = localizeProject(project, language);

  function handleBack() {
    onBack(project.id);
    window.requestAnimationFrame(() => document.getElementById(`folder-card-${project.id}`)?.focus());
  }

  return (
    <div className={`project-case-study ${project.color}`}>
      <Button variant="ghost" className="case-study-back" onClick={handleBack}>
        <ArrowLeft size={17} />
        {copy.caseStudyBack}
      </Button>
      <div className="case-study-scroll" data-case-study-scroll role="region" tabIndex={0} aria-label={`${project.title} ${copy.caseStudy}`}>
        <div className="case-study-layout">
          <div className="case-study-copy">
            <h2 id="case-study-title">{project.title}</h2>
            <p className="case-study-summary">{summary}</p>
            <p className="project-meta case-study-category">{category}</p>
            <dl className="case-study-facts">
              <div><dt>{copy.caseStudyRole}</dt><dd>{copy.caseStudyPending}</dd></div>
              <div><dt>{copy.caseStudyYear}</dt><dd>{copy.caseStudyPending}</dd></div>
              <div><dt>{copy.caseStudyScope}</dt><dd>{copy.caseStudyPending}</dd></div>
            </dl>
          </div>
          <PortfolioCard role="img" elevation="subtle" className="case-study-artwork" aria-label={`${project.title} ${copy.caseStudyConceptPreview}`}>
            <ProjectPreview project={project} />
            <span className="case-study-visual-caption">{copy.caseStudyConceptPreview}</span>
          </PortfolioCard>
        </div>

        <div className="case-study-story">
          <section className="case-study-section" aria-labelledby="case-situation">
            <span className="case-study-step">01</span>
            <div><h3 id="case-situation">{copy.caseStudySituation}</h3><p className="case-study-pending">{copy.caseStudySituationPending}</p></div>
          </section>
          <section className="case-study-section" aria-labelledby="case-insights">
            <span className="case-study-step">02</span>
            <div><h3 id="case-insights">{copy.caseStudyInsights}</h3><ol className="case-study-list">{[1, 2, 3].map((number) => <li key={number}><span>0{number}</span>{copy.caseStudyInsightPending}</li>)}</ol></div>
          </section>
          <section className="case-study-section" aria-labelledby="case-decisions">
            <span className="case-study-step">03</span>
            <div><h3 id="case-decisions">{copy.caseStudyDecisions}</h3><div className="case-study-decision-grid">{[1, 2, 3].map((number) => <article key={number}><div className="case-study-evidence">{copy.caseStudyVisualPending}</div><h4>{copy.caseStudyDecisionPending} 0{number}</h4><p>{copy.caseStudyExplanationPending}</p></article>)}</div></div>
          </section>
          <section className="case-study-section" aria-labelledby="case-system">
            <span className="case-study-step">04</span>
            <div><h3 id="case-system">{copy.caseStudySystem}</h3><div className="case-study-system-slot">{copy.caseStudyArtifactPending}</div></div>
          </section>
          <section className="case-study-section" aria-labelledby="case-result">
            <span className="case-study-step">05</span>
            <div><h3 id="case-result">{copy.caseStudyResult}</h3><p className="case-study-pending">{copy.caseStudyResultPending}</p></div>
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
  activeFolder,
  caseStudyProjectId,
  copy,
  language,
  onCaseStudyBack,
  onFolderClose,
  onFolderSelect,
  onProjectSelect,
}: ExploreScreenProps) {
  const activeFolderData = activeFolder ? folders.find((folder) => folder.id === activeFolder) ?? null : null;
  const activeCaseStudyProject = projects.find((project) => project.id === caseStudyProjectId) ?? null;

  return (
    <section
      className="screen explore-screen"
      id="explore"
      aria-label={activeCaseStudyProject ? `${copy.caseStudy}: ${activeCaseStudyProject.title}` : activeFolderData ? `${localizeFolder(activeFolderData, language).name} folder` : copy.exploreTitle}
      data-active={active}
      aria-hidden={!active}
      inert={!active}
    >
      {activeCaseStudyProject ? (
        <ProjectCaseStudy
          project={activeCaseStudyProject}
          language={language}
          copy={copy}
          onBack={onCaseStudyBack}
        />
      ) : activeFolderData ? (
        <FolderSubpage
          folder={activeFolderData}
          language={language}
          copy={copy}
          onClose={onFolderClose}
        />
      ) : (
        <>
          <div className="section-heading explore-heading">
            <h2 id="explore-title">{copy.exploreTitle}</h2>
          </div>
          <div className="folder-grid" role="group" aria-label={language === "en" ? "Portfolio folders" : "Folder portfolio"}>
            {folders.map((folder, index) => {
              const localizedFolder = localizeFolder(folder, language);
              const card: FolderCardData = {
                number: String(index + 1).padStart(2, "0"),
                title: localizedFolder.name,
                description: localizedFolder.description,
                backgroundColor: "var(--folder-card-back)",
                folderColor: "var(--folder-card-front)",
                borderColor: "var(--folder-card-edge)",
                textColor: "var(--folder-card-ink)",
                subTextColor: "var(--folder-card-muted)",
                artwork: <FolderArtwork folder={folder} language={language} />,
              };

              return (
                <CardFolder
                  key={folder.id}
                  id={`folder-card-${folder.id}`}
                  className="portfolio-folder-card"
                  card={card}
                  isOpen={activeFolder === folder.id || caseStudyProjectId === folder.id}
                  ariaLabel={`${copy.openFolder}: ${localizedFolder.name}`}
                  onSelect={() => {
                    if (folder.kind === "project") {
                      const project = projects.find((item) => item.id === folder.id);
                      if (project) onProjectSelect(project.id);
                      return;
                    }
                    onFolderSelect(folder.id);
                  }}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
