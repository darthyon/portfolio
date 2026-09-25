"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Folder,
  FolderOpen,
  MapPin,
  Moon,
  Sun,
  X,
} from "lucide-react";
import {
  aboutNotes,
  folders,
  profile,
  projects,
  sideQuests,
  type FolderId,
} from "./portfolio-data";
import { TowerBuilder } from "./tower-builder";

type ScreenId = "intro" | "explore" | "play" | "contact";
type Language = "en" | "bm";

const screenCopy: Record<Language, Record<ScreenId, string>> = {
  en: { intro: "Intro", explore: "Explore", play: "Play", contact: "Contact" },
  bm: { intro: "Mula", explore: "Teroka", play: "Main", contact: "Hubungi" },
};

const sectionCopy = {
  en: {
    current: "Currently at",
    past: "Before that",
    introEyebrow: "A little about me",
    introTitle: "Designing useful things. Building them, too.",
    introBody:
      "I bring product thinking and hands-on making together to turn complex problems into clear, useful experiences.",
    exploreEyebrow: "The work folder",
    exploreTitle: "A few things I’ve designed and built.",
    close: "Close panel",
    openFolder: "Open folder",
    playEyebrow: "Play a little",
    playTitle: "Build the towers.",
    playBody: "A small building challenge for bigger ideas.",
    contactEyebrow: "Get in touch",
    contactTitle: "Let’s talk.",
    contactBody:
      "I’m open to thoughtful conversations about product work, collaboration, and new ideas.",
    name: "Your name",
    email: "Your email",
    message: "What’s on your mind?",
    send: "Send a message",
    emailNeeded: "Add your preferred contact email to activate this form.",
    location: profile.location,
    photoSlot: "Your 3D portrait goes here",
    contactArt: "Your contact image goes here",
    page: "Screen",
  },
  bm: {
    current: "Kini di",
    past: "Sebelum ini",
    introEyebrow: "Sedikit tentang saya",
    introTitle: "Mereka bentuk perkara berguna. Membinanya juga.",
    introBody:
      "Saya gabungkan pemikiran produk dan kemahiran membina untuk menjadikan masalah kompleks lebih jelas dan berguna.",
    exploreEyebrow: "Folder kerja",
    exploreTitle: "Beberapa perkara yang saya reka dan bina.",
    close: "Tutup panel",
    openFolder: "Buka folder",
    playEyebrow: "Jom bermain",
    playTitle: "Bina menara.",
    playBody: "Cabaran membina kecil untuk idea besar.",
    contactEyebrow: "Hubungi saya",
    contactTitle: "Mari berbual.",
    contactBody:
      "Saya terbuka untuk berbual tentang kerja produk, kerjasama dan idea baharu.",
    name: "Nama anda",
    email: "E-mel anda",
    message: "Apa yang ingin anda sampaikan?",
    send: "Hantar mesej",
    emailNeeded: "Tambah alamat e-mel anda untuk mengaktifkan borang ini.",
    location: profile.location,
    photoSlot: "Potret 3D anda akan diletakkan di sini",
    contactArt: "Imej hubungan anda akan diletakkan di sini",
    page: "Skrin",
  },
} as const;

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`project-preview ${project.color}`} aria-hidden="true">
      <div className="phone-frame">
        <div className="phone-speaker" />
        <div className="phone-screen">
          <div className="phone-heading">
            <span className="phone-app-mark" />
            <strong>{project.previewLabel}</strong>
          </div>
          {project.previewItems.map((item, index) => (
            <div className="phone-list-item" key={item}>
              <span className={`phone-item-icon item-${index + 1}`} />
              <span>{item}</span>
              <ArrowRight size={10} strokeWidth={2.5} />
            </div>
          ))}
        </div>
      </div>
      <span className="preview-orbit orbit-one" />
      <span className="preview-orbit orbit-two" />
    </div>
  );
}

function WorkPanel({
  folderId,
  language,
  onClose,
}: {
  folderId: FolderId;
  language: Language;
  onClose: () => void;
}) {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedProjectId);
  const selectedFolder = folders.find((item) => item.id === folderId) ?? folders[0];
  const localizedFolder = language === "en"
    ? selectedFolder
    : {
        ...selectedFolder,
        name: folderId === "work" ? "Kerja Terpilih" : folderId === "side-quests" ? "Projek Sampingan" : "Tentang Saya",
        description: folderId === "work" ? "Beberapa perkara yang saya reka dan bina." : folderId === "side-quests" ? "Eksperimen, alat dan idea yang sedang diteroka." : "Sedikit tentang cara saya bekerja dan perkara yang saya hargai.",
      };
  const copy = sectionCopy[language];

  return (
    <aside className="work-panel" aria-label={`${localizedFolder.name} panel`}>
      <div className="panel-heading">
        <div className="panel-title-wrap">
          <FolderOpen className="panel-folder-icon" size={30} strokeWidth={1.8} />
          <div>
            <h3>{localizedFolder.name}</h3>
            <p>{localizedFolder.description}</p>
          </div>
        </div>
        <button className="icon-button close-panel" onClick={onClose} aria-label={copy.close}>
          <X size={19} />
        </button>
      </div>

      <div className="panel-rule" />

      {folderId === "work" && (
        <div className="project-list">
          {projects.map((project, index) => (
            <button
              className={`project-row ${selectedProjectId === project.id ? "is-selected" : ""}`}
              key={project.id}
              onClick={() => setSelectedProjectId((current) => current === project.id ? null : project.id)}
              aria-expanded={selectedProjectId === project.id}
            >
              <ProjectPreview project={project} />
              <span className="project-row-copy">
                <span className="project-index">0{index + 1} / {project.category}</span>
                <strong>{project.title}</strong>
                <span className="project-summary">{project.summary}</span>
              </span>
              <span className="project-arrow"><ArrowRight size={18} /></span>
              {selectedProjectId === project.id && (
                <span className="project-detail">
                  <span className="detail-kicker">Selected project</span>
                  <span>{project.summary}</span>
                  <span className="detail-note">Case study details can be added here.</span>
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {folderId === "side-quests" && (
        <div className="simple-list">
          {sideQuests.map((item) => (
            <article className="simple-row" key={item.title}>
              <span className="simple-row-icon">{item.icon}</span>
              <div><span className="project-index">{item.category}</span><h4>{item.title}</h4><p>{item.summary}</p></div>
              <ArrowRight size={18} />
            </article>
          ))}
        </div>
      )}

      {folderId === "about" && (
        <div className="simple-list">
          {aboutNotes.map((item) => (
            <article className="simple-row" key={item.title}>
              <span className="simple-row-icon note-icon">{item.icon}</span>
              <div><span className="project-index">{item.category}</span><h4>{item.title}</h4><p>{item.summary}</p></div>
              <ArrowRight size={18} />
            </article>
          ))}
        </div>
      )}

      {selectedProject && <span className="sr-only">{selectedProject.title} selected</span>}
    </aside>
  );
}

export function SiteExperience() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("intro");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("en");
  const [activeFolder, setActiveFolder] = useState<FolderId>("work");
  const [panelOpen, setPanelOpen] = useState(true);
  const [builderStarted, setBuilderStarted] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const screens = useMemo(() => ["intro", "explore", "play", "contact"] as const, []);
  const screenRefs = useRef<Record<ScreenId, HTMLElement | null>>({
    intro: null,
    explore: null,
    play: null,
    contact: null,
  });
  const copy = sectionCopy[language];

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "ms";
  }, [language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];
        const id = visible?.target.id as ScreenId | undefined;
        if (id) {
          setActiveScreen(id);
          if (id === "play") setBuilderStarted(true);
        }
      },
      { rootMargin: "-34% 0px -42% 0px", threshold: [0, 0.2, 0.5, 0.8] },
    );

    screens.forEach((screen) => {
      const element = screenRefs.current[screen];
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [screens]);

  function setScreen(screen: ScreenId) {
    if (screen === "play") setBuilderStarted(true);
    screenRefs.current[screen]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormMessage(copy.emailNeeded);
  }

  return (
    <main className="portfolio-shell">
      <header className="browser-chrome" aria-label="Portfolio browser bar">
        <div className="browser-left">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
          <span className="browser-divider" />
          <span className="browser-location"><MapPin size={16} strokeWidth={2.2} /><span>{copy.location}</span></span>
        </div>
        <div className="browser-controls">
          <button
            className="language-switch"
            onClick={() => setLanguage((current) => current === "en" ? "bm" : "en")}
            aria-label={language === "en" ? "Switch language to Bahasa Melayu" : "Switch language to English"}
            title={language === "en" ? "Bahasa Melayu" : "English"}
          >
            {language === "en" ? "EN" : "BM"}<ChevronDown size={13} />
          </button>
          <span className="browser-divider control-divider" />
          <button className="theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`} onClick={toggleTheme} aria-label="Toggle light and dark theme" aria-pressed={theme === "dark"}>
            <span />
          </button>
          <button className="theme-button moon-button" onClick={toggleTheme} aria-label="Toggle theme"><Moon size={17} /></button>
          <span className="browser-divider control-divider last-divider" />
          <span className="browser-menu-dots" aria-hidden="true">•••</span>
        </div>
      </header>

      <div className="browser-page-hint"><span className="browser-page-dot" /> {copy.page} {String(screens.indexOf(activeScreen) + 1).padStart(2, "0")} / 04</div>

      <section
        className="screen intro-screen"
        id="intro"
        aria-labelledby="intro-title"
        ref={(element) => { screenRefs.current.intro = element; }}
      >
        <div className="id-card">
          <div className="lanyard-anchor" aria-hidden="true"><span /></div>
          <div className="portrait-stage">
            <div className="portrait-placeholder" role="img" aria-label={copy.photoSlot}>
              <span className="portrait-orbit portrait-orbit-a" />
              <span className="portrait-orbit portrait-orbit-b" />
              <div className="portrait-silhouette"><span className="portrait-head" /><span className="portrait-body" /></div>
              <span className="portrait-slot-label">3D PORTRAIT</span>
            </div>
          </div>
          <div className="card-content">
            <div className="availability-badge"><span className="availability-dot" />{copy.current} <strong>TUG</strong></div>
            <p className="card-eyebrow">{copy.introEyebrow}</p>
            <h1 id="intro-title">{profile.name}</h1>
            <p className="profile-role">{profile.role}</p>
            <p className="profile-description">{copy.introBody}</p>
            <div className="profile-history">
              <span>{copy.past}</span><strong>ThoughtFull <i /> DKS</strong>
            </div>
            <p className="card-current-copy">{profile.current} {profile.past}</p>
          </div>
          <span className="card-serial">ID · 01</span>
        </div>
        <p className="screen-caption">{profile.role} <span>·</span> {copy.location}</p>
      </section>

      <section
        className="screen explore-screen"
        id="explore"
        aria-labelledby="explore-title"
        ref={(element) => { screenRefs.current.explore = element; }}
      >
        <div className="section-heading explore-heading">
          <span className="section-eyebrow"><span className="eyebrow-icon">✳</span>{copy.exploreEyebrow}</span>
          <h2 id="explore-title">{copy.exploreTitle}</h2>
        </div>
        <div className={`explore-workspace ${panelOpen ? "panel-visible" : ""}`}>
          <div className="folder-grid" role="group" aria-label="Portfolio folders">
          {folders.map((folder, index) => {
              const localizedFolder = language === "en"
                ? folder
                : {
                    ...folder,
                    name: folder.id === "work" ? "Kerja Terpilih" : folder.id === "side-quests" ? "Projek Sampingan" : "Tentang Saya",
                    description: folder.id === "work" ? "Beberapa perkara yang saya reka dan bina." : folder.id === "side-quests" ? "Eksperimen, alat dan idea yang sedang diteroka." : "Sedikit tentang cara saya bekerja dan perkara yang saya hargai.",
                  };
              const isSelected = activeFolder === folder.id && panelOpen;
              return (
                <button
                  className={`folder-card ${folder.color} ${isSelected ? "is-selected" : ""}`}
                  key={folder.id}
                  id={`folder-tab-${folder.id}`}
                  onClick={() => {
                    if (activeFolder === folder.id && panelOpen) setPanelOpen(false);
                    else { setActiveFolder(folder.id); setPanelOpen(true); }
                  }}
                  aria-expanded={isSelected}
                  aria-controls="folder-panel"
                >
                  <span className="folder-art" aria-hidden="true">
                    {isSelected ? <FolderOpen size={78} strokeWidth={1.3} /> : <Folder size={78} strokeWidth={1.3} />}
                    <span className="folder-art-cursor">↖</span>
                  </span>
                  <strong>{localizedFolder.name}</strong>
                  <span className="folder-description">{localizedFolder.description}</span>
                  <span className="folder-number">0{index + 1}</span>
                </button>
              );
            })}
          </div>
          {panelOpen && <div id="folder-panel" className="folder-panel-wrap"><WorkPanel folderId={activeFolder} language={language} onClose={() => {
            setPanelOpen(false);
            window.requestAnimationFrame(() => document.getElementById(`folder-tab-${activeFolder}`)?.focus());
          }} /></div>}
        </div>
      </section>

      <section
        className="screen play-screen"
        id="play"
        aria-labelledby="play-title"
        ref={(element) => { screenRefs.current.play = element; }}
      >
        <div className="section-heading play-heading">
          <span className="section-eyebrow"><span className="eyebrow-icon">✦</span>{copy.playEyebrow} <span aria-hidden="true">🎮</span></span>
          <h2 id="play-title">{copy.playTitle}</h2>
          <p>{copy.playBody}</p>
        </div>
        {builderStarted && <TowerBuilder language={language} theme={theme} />}
      </section>

      <section
        className="screen contact-screen"
        id="contact"
        aria-labelledby="contact-title"
        ref={(element) => { screenRefs.current.contact = element; }}
      >
        <div className="contact-layout">
          <div className="contact-copy">
            <span className="section-eyebrow"><span className="eyebrow-icon">↗</span>{copy.contactEyebrow} <span aria-hidden="true">👋</span></span>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p className="contact-description">{copy.contactBody}</p>
            <form className="contact-form" onSubmit={submitContact}>
              <label>{copy.name}<input name="name" type="text" autoComplete="name" required placeholder="Alex Morgan" /></label>
              <label>{copy.email}<input name="email" type="email" autoComplete="email" required placeholder="alex@example.com" /></label>
              <label>{copy.message}<textarea name="message" required rows={3} placeholder="Tell me a little about it…" /></label>
              <button className="send-button" type="submit">{copy.send}<ArrowUpRight size={17} /></button>
              {formMessage && <p className="form-status" role="status">{formMessage}</p>}
              <p className="form-setup-note">Contact delivery will be wired to your preferred email address.</p>
            </form>
          </div>
          <div className="contact-artwork" role="img" aria-label={copy.contactArt}>
            <div className="contact-image-slot">
              <span className="contact-image-stamp">IMAGE / 04</span>
              <span className="contact-image-shape shape-a" />
              <span className="contact-image-shape shape-b" />
              <span className="contact-image-shape shape-c" />
              <div className="contact-art-caption"><span className="availability-dot" />{copy.contactArt}</div>
            </div>
            <div className="contact-art-note"><span>LET’S MAKE SOMETHING USEFUL</span><ArrowRight size={17} /></div>
          </div>
        </div>
      </section>

      <nav className="screen-switcher" aria-label="Portfolio screens">
        {screens.map((screen, index) => (
          <button
            className={`screen-switch ${activeScreen === screen ? "is-active" : ""}`}
            key={screen}
            onClick={() => setScreen(screen)}
            aria-current={activeScreen === screen ? "page" : undefined}
          >
            <span className="switch-number">0{index + 1}</span>
            <span>{screenCopy[language][screen]}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}
