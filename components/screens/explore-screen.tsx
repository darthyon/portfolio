"use client";

import {
  ArrowLeft,
  ArrowRight,
  Folder,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PortfolioCard } from "@/components/portfolio-card";
import { PortfolioInfoCard } from "@/components/portfolio-info-card";
import {
  aboutNotes,
  folders,
  projects,
  sideQuests,
  type FolderId,
  type PortfolioProject,
} from "@/app/portfolio-data";
import { localizeFolder, type Language, type SectionCopy } from "./copy";

interface ExploreScreenProps {
  active: boolean;
  activeFolder: FolderId | null;
  caseStudyProjectId: string | null;
  copy: SectionCopy;
  language: Language;
  onCaseStudyBack: (projectId: string) => void;
  onFolderClose: (folderId: FolderId) => void;
  onFolderSelect: (folderId: FolderId) => void;
  onProjectSelect: (projectId: string) => void;
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

function FolderVisual({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="folder-art" aria-hidden="true">
      {isOpen ? <FolderOpen size={78} strokeWidth={1.3} /> : <Folder size={78} strokeWidth={1.3} />}
    </span>
  );
}

function ProjectRowCard({
  project,
  language,
  onSelect,
}: {
  project: PortfolioProject;
  language: Language;
  onSelect: () => void;
}) {
  const { summary, category } = localizeProject(project, language);

  return (
    <Button
      variant="ghost"
      className={`project-row ${project.color}`}
      id={`project-card-${project.id}`}
      onClick={onSelect}
      aria-label={`${language === "en" ? "Open case study:" : "Buka kajian kes:"} ${project.title}`}
    >
      <ProjectPreview project={project} />
      <span className="project-row-copy">
        <strong>{project.title}</strong>
        <span className="project-summary">{summary}</span>
        <span className="project-meta">{category}</span>
      </span>
      <span className="project-arrow"><ArrowRight size={18} /></span>
    </Button>
  );
}

function WorkPanel({
  folderId,
  language,
  copy,
  onClose,
  onProjectSelect,
}: {
  folderId: FolderId;
  language: Language;
  copy: SectionCopy;
  onClose: (folderId: FolderId) => void;
  onProjectSelect: (projectId: string) => void;
}) {
  const selectedFolder = folders.find((item) => item.id === folderId) ?? folders[0];
  const localizedFolder = localizeFolder(selectedFolder, language);

  function handleClose() {
    onClose(folderId);
    window.requestAnimationFrame(() => document.getElementById(`folder-tab-${folderId}`)?.focus());
  }

  return (
    <PortfolioCard data-folder={folderId} className="work-panel" role="complementary" aria-label={`${localizedFolder.name} panel`}>
      <CardHeader className="panel-heading">
        <div className="panel-title-wrap">
          <FolderOpen className="panel-folder-icon" size={30} strokeWidth={1.8} />
          <div>
            <CardTitle><h3>{localizedFolder.name}</h3></CardTitle>
            <CardDescription><p>{localizedFolder.description}</p></CardDescription>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="icon-button close-panel" onClick={handleClose} aria-label={copy.backFolders}>
          <ArrowLeft size={19} />
        </Button>
      </CardHeader>

      <CardContent className="panel-body">
        {folderId === "work" && (
          <div className="project-list">
            {projects.map((project) => (
              <ProjectRowCard
                key={project.id}
                project={project}
                language={language}
                onSelect={() => onProjectSelect(project.id)}
              />
            ))}
          </div>
        )}

        {folderId === "side-quests" && (
          <div className="simple-list">
            {sideQuests.map((item) => (
              <PortfolioInfoCard
                key={item.title}
                icon={item.icon}
                category={language === "en" ? item.category : "Eksperimen reka bentuk"}
                title={language === "en" ? item.title : item.title === "Little tools" ? "Alat kecil" : "Kajian interaksi"}
                summary={language === "en" ? item.summary : item.title === "Little tools" ? "Utiliti ringkas untuk mengurangkan kesukaran harian." : "Gerakan dan butiran antara muka yang diteroka dalam kod."}
              />
            ))}
          </div>
        )}

        {folderId === "about" && (
          <div className="simple-list">
            {aboutNotes.map((item) => (
              <PortfolioInfoCard
                key={item.title}
                icon={item.icon}
                iconStyle="note"
                category={language === "en" ? item.category : item.category === "How I work" ? "Cara saya bekerja" : "Perkara yang saya hargai"}
                title={language === "en" ? item.title : item.title === "Product thinking" ? "Pemikiran produk" : "Reka bentuk hingga siap"}
                summary={language === "en" ? item.summary : item.title === "Product thinking" ? "Mulakan dengan masalah, dengar dengan teliti, kemudian jelaskan langkah seterusnya." : "Saya suka membentuk idea dan bekerjasama untuk menjadikannya nyata."}
              />
            ))}
          </div>
        )}
      </CardContent>
    </PortfolioCard>
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
  onBack: (projectId: string) => void;
}) {
  const { summary, category } = localizeProject(project, language);

  function handleBack() {
    onBack(project.id);
    window.requestAnimationFrame(() => document.getElementById(`project-card-${project.id}`)?.focus());
  }

  return (
    <div className={`project-case-study ${project.color}`}>
      <Button variant="ghost" className="case-study-back" onClick={handleBack}>
        <ArrowLeft size={17} />
        {copy.caseStudyBack}
      </Button>
      <div className="case-study-layout">
        <div className="case-study-copy">
          <h2 id="case-study-title">{project.title}</h2>
          <p className="case-study-summary">{summary}</p>
          <p className="project-meta case-study-category">{category}</p>
          <div className="case-study-tags">
            {project.previewItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <PortfolioCard role="img" elevation="subtle" className="case-study-artwork" aria-label={`${project.title} interface preview`}>
          <ProjectPreview project={project} />
        </PortfolioCard>
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
  const activeFolderData = activeFolder ? folders.find((folder) => folder.id === activeFolder) ?? folders[0] : null;
  const localizedActiveFolder = activeFolderData ? localizeFolder(activeFolderData, language) : null;
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
        <ProjectCaseStudy
          project={activeCaseStudyProject}
          language={language}
          copy={copy}
          onBack={onCaseStudyBack}
        />
      ) : (
        <>
          <div className="section-heading explore-heading">
            <h2 id="explore-title">{copy.exploreTitle}</h2>
          </div>
          <div className={`explore-workspace ${activeFolder ? "folder-active" : ""}`}>
            {activeFolder ? (
              <div className={`folder-context ${activeFolderData?.color ?? "blue"}`}>
                <FolderVisual isOpen />
                <strong>{localizedActiveFolder?.name}</strong>
                <span className="folder-description">{localizedActiveFolder?.description}</span>
              </div>
            ) : (
              <div className="folder-grid" role="group" aria-label="Portfolio folders">
                {folders.map((folder, index) => {
                  const localizedFolder = localizeFolder(folder, language);
                  return (
                    <Button
                      variant="ghost"
                      className={`folder-card ${folder.color}`}
                      key={folder.id}
                      id={`folder-tab-${folder.id}`}
                      onClick={() => onFolderSelect(folder.id)}
                      aria-label={`${copy.openFolder}: ${localizedFolder.name}`}
                    >
                      <FolderVisual isOpen={false} />
                      <strong>{localizedFolder.name}</strong>
                      <span className="folder-description">{localizedFolder.description}</span>
                      <span className="folder-number">0{index + 1}</span>
                    </Button>
                  );
                })}
              </div>
            )}
            {activeFolder && (
              <div id="folder-panel" className="folder-panel-wrap">
                <WorkPanel
                  folderId={activeFolder}
                  language={language}
                  copy={copy}
                  onClose={onFolderClose}
                  onProjectSelect={onProjectSelect}
                />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
