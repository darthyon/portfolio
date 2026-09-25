"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PortfolioCard } from "@/components/portfolio-card";
import { PortfolioInfoCard } from "@/components/portfolio-info-card";
import {
  aboutNotes,
  folders,
  profile,
  projects,
  sideQuests,
  type FolderContent,
  type FolderId,
} from "./portfolio-data";
import { TowerBuilder } from "./tower-builder";

type ScreenId = "intro" | "explore" | "play" | "contact";
type Language = "en" | "bm";
const screens: readonly ScreenId[] = ["intro", "explore", "play", "contact"];
const screenIndex = (screen: ScreenId) => screens.indexOf(screen);
const CONTACT_EMAIL = "";

const screenCopy: Record<Language, Record<ScreenId, string>> = {
  en: { intro: "Intro", explore: "Explore", play: "Play", contact: "Contact" },
  bm: { intro: "Mula", explore: "Teroka", play: "Main", contact: "Hubungi" },
};

const bmFolders: Record<FolderId, Pick<FolderContent, "name" | "description">> = {
  work: { name: "Kerja Terpilih", description: "Beberapa perkara yang saya reka dan bina." },
  "side-quests": { name: "Projek Sampingan", description: "Eksperimen, alat dan idea yang sedang diteroka." },
  about: { name: "Tentang Saya", description: "Sedikit tentang cara saya bekerja dan perkara yang saya hargai." },
};

function localizeFolder(folder: FolderContent, language: Language): FolderContent {
  return language === "en" ? folder : { ...folder, ...bmFolders[folder.id] };
}

const sectionCopy = {
  en: {
    current: "Current hyperfixation: building an ESP32 Walkman",
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
    emailReady: "Your email app should open with this draft.",
    location: profile.location,
    photoSlot: "Your 3D portrait goes here",
    contactArt: "Your contact image goes here",
  },
  bm: {
    current: "Hyperfokus kini: membina Walkman ESP32",
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
    emailReady: "Aplikasi e-mel anda sepatutnya dibuka dengan draf ini.",
    location: profile.location,
    photoSlot: "Potret 3D anda akan diletakkan di sini",
    contactArt: "Imej hubungan anda akan diletakkan di sini",
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

function EmployerMark({ name, monogram }: { name: string; monogram: string }) {
  return (
    <span className="employer-mention">
      <span className="employer-mark" aria-hidden="true">{monogram}</span>
      <span>{name}</span>
    </span>
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
  const localizedFolder = localizeFolder(selectedFolder, language);
  const copy = sectionCopy[language];

  return (
    <PortfolioCard className="work-panel" role="complementary" aria-label={`${localizedFolder.name} panel`}>
      <CardHeader className="panel-heading">
        <div className="panel-title-wrap">
          <FolderOpen className="panel-folder-icon" size={30} strokeWidth={1.8} />
          <div>
            <CardTitle><h3>{localizedFolder.name}</h3></CardTitle>
            <CardDescription><p>{localizedFolder.description}</p></CardDescription>
          </div>
        </div>
        <Button variant="outline" size="icon" className="icon-button close-panel" onClick={onClose} aria-label={copy.close}>
          <X size={19} />
        </Button>
      </CardHeader>

      <Separator className="panel-rule" />

      <CardContent className="panel-body">
      {folderId === "work" && (
        <div className="project-list">
          {projects.map((project, index) => {
            const summary = language === "en" ? project.summary : project.id === "mysubsidi"
              ? "Penjejak subsidi kerajaan untuk rakyat Malaysia."
              : project.id === "welluber"
                ? "Pengangkutan penjagaan kesihatan atas permintaan."
                : "Platform logistik yang menghubungkan perniagaan dan pemandu lori.";
            const category = language === "en" ? project.category : project.id === "mysubsidi"
              ? "Perkhidmatan awam · Reka bentuk produk"
              : project.id === "welluber"
                ? "Penjagaan kesihatan · Reka bentuk produk"
                : "Logistik · Reka bentuk produk";
            return (
              <Button
                variant="outline"
                className={`project-row ${selectedProjectId === project.id ? "is-selected" : ""}`}
                key={project.id}
                onClick={() => setSelectedProjectId((current) => current === project.id ? null : project.id)}
                aria-expanded={selectedProjectId === project.id}
              >
                <ProjectPreview project={project} />
                <span className="project-row-copy">
                  <span className="project-index">0{index + 1} / {category}</span>
                  <strong>{project.title}</strong>
                  <span className="project-summary">{summary}</span>
                </span>
                <span className="project-arrow"><ArrowRight size={18} /></span>
                {selectedProjectId === project.id && (
                  <span className="project-detail">
                    <span className="detail-kicker">{language === "en" ? "Selected project" : "Projek terpilih"}</span>
                    <span>{summary}</span>
                    <span className="detail-note">{language === "en" ? "Case study details can be added here." : "Butiran kajian kes boleh ditambah di sini."}</span>
                  </span>
                )}
              </Button>
            );
          })}
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

      {selectedProject && <span className="sr-only">{selectedProject.title} selected</span>}
      </CardContent>
    </PortfolioCard>
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
  const lastWheelNavigation = useRef(0);
  const copy = sectionCopy[language];
  const displayRole = language === "en" ? profile.role : "Pereka produk / pembina";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "ms";
  }, [language]);

  function setScreen(screen: ScreenId) {
    if (screen === "play") setBuilderStarted(true);
    setActiveScreen(screen);
  }

  useEffect(() => {
    let touchStartY: number | null = null;
    let touchTarget: EventTarget | null = null;

    function moveScreen(direction: -1 | 1) {
      const next = screens[screenIndex(activeScreen) + direction];
      if (!next) return;
      setScreen(next);
    }

    function handleWheel(event: WheelEvent) {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      event.preventDefault();
      if (Math.abs(event.deltaY) < 24 || Date.now() - lastWheelNavigation.current < 760) return;
      lastWheelNavigation.current = Date.now();
      moveScreen(event.deltaY > 0 ? 1 : -1);
    }

    function handleTouchStart(event: TouchEvent) {
      touchStartY = event.touches[0]?.clientY ?? null;
      touchTarget = event.target;
    }

    function handleTouchEnd(event: TouchEvent) {
      if (touchStartY === null) return;
      const target = touchTarget instanceof HTMLElement ? touchTarget : null;
      if (target?.closest("input, textarea, select, .builder-canvas, [contenteditable='true']")) {
        touchStartY = null;
        touchTarget = null;
        return;
      }

      const delta = touchStartY - (event.changedTouches[0]?.clientY ?? touchStartY);
      if (Math.abs(delta) > 48) {
        event.preventDefault();
        moveScreen(delta > 0 ? 1 : -1);
      }
      touchStartY = null;
      touchTarget = null;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target instanceof HTMLElement ? event.target : null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;
      if (event.key === "PageDown" || event.key === "ArrowDown" || event.key === " ") {
        event.preventDefault();
        moveScreen(1);
      } else if (event.key === "PageUp" || event.key === "ArrowUp") {
        event.preventDefault();
        moveScreen(-1);
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeScreen]);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!CONTACT_EMAIL) {
      setFormMessage(copy.emailNeeded);
      return;
    }
    const values = new FormData(event.currentTarget);
    const name = String(values.get("name") ?? "");
    const email = String(values.get("email") ?? "");
    const message = String(values.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setFormMessage(copy.emailReady);
  }

  return (
    <main className="portfolio-shell">
      <header className="browser-chrome" aria-label="Portfolio browser bar">
        <div className="browser-left">
          <div className="traffic-lights" aria-hidden="true"><i /><i /><i /></div>
          <Separator orientation="vertical" className="browser-divider" />
          <span className="browser-location"><MapPin size={16} strokeWidth={2.2} /><span>{copy.location}</span></span>
        </div>
        <div className="browser-controls">
          <Button
            variant="ghost"
            className="language-switch"
            onClick={() => setLanguage((current) => current === "en" ? "bm" : "en")}
            aria-label={language === "en" ? "Switch language to Bahasa Melayu" : "Switch language to English"}
            title={language === "en" ? "Bahasa Melayu" : "English"}
          >
            {language === "en" ? "EN" : "BM"}<ChevronDown size={13} />
          </Button>
          <Separator orientation="vertical" className="browser-divider control-divider" />
          <span className="theme-icon" aria-hidden="true">{theme === "dark" ? <Moon size={17} /> : <Sun size={18} />}</span>
          <Switch
            className="theme-toggle"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label={language === "en" ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : (theme === "dark" ? "Tukar ke tema cerah" : "Tukar ke tema gelap")}
          />
        </div>
      </header>

      <section
        className="screen intro-screen"
        id="intro"
        aria-labelledby="intro-title"
        data-active={activeScreen === "intro"}
        aria-hidden={activeScreen !== "intro"}
        inert={activeScreen !== "intro"}
      >
        <PortfolioCard className="id-card">
          <div className="portrait-stage">
            <div className="portrait-placeholder" role="img" aria-label={copy.photoSlot} />
          </div>
          <CardContent className="card-content">
            <Badge variant="outline" className="availability-badge"><span className="availability-dot" />{copy.current}</Badge>
            <h1 id="intro-title">{profile.name}</h1>
            <p className="profile-role">{displayRole}</p>
            <div className="card-work-summary">
              <Separator />
              <p>
                {language === "en" ? "Currently leading product design at" : "Kini menerajui reka bentuk produk di"}{" "}
                <EmployerMark name="TUG" monogram="T" />.
              </p>
              <p>
                {language === "en" ? "Previously at" : "Sebelum ini di"}{" "}
                <EmployerMark name="ThoughtFull" monogram="TF" /> {language === "en" ? "and" : "dan"}{" "}
                <EmployerMark name="DKS" monogram="DKS" />.
              </p>
            </div>
          </CardContent>
        </PortfolioCard>
      </section>

      <section
        className="screen explore-screen"
        id="explore"
        aria-labelledby="explore-title"
        data-active={activeScreen === "explore"}
        aria-hidden={activeScreen !== "explore"}
        inert={activeScreen !== "explore"}
      >
        <div className="section-heading explore-heading">
          <span className="section-eyebrow"><span className="eyebrow-icon">✳</span>{copy.exploreEyebrow}</span>
          <h2 id="explore-title">{copy.exploreTitle}</h2>
        </div>
        <div className={`explore-workspace ${panelOpen ? "panel-visible" : ""}`}>
          <div className="folder-grid" role="group" aria-label="Portfolio folders">
          {folders.map((folder, index) => {
              const localizedFolder = localizeFolder(folder, language);
              const isSelected = activeFolder === folder.id && panelOpen;
              return (
                <Button
                  variant="ghost"
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
                </Button>
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
        data-active={activeScreen === "play"}
        aria-hidden={activeScreen !== "play"}
        inert={activeScreen !== "play"}
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
        data-active={activeScreen === "contact"}
        aria-hidden={activeScreen !== "contact"}
        inert={activeScreen !== "contact"}
      >
        <div className="contact-layout">
          <div className="contact-copy">
            <span className="section-eyebrow"><span className="eyebrow-icon">↗</span>{copy.contactEyebrow} <span aria-hidden="true">👋</span></span>
            <h2 id="contact-title">{copy.contactTitle}</h2>
            <p className="contact-description">{copy.contactBody}</p>
            <form className="contact-form" onSubmit={submitContact}>
              <Field className="contact-field">
                <FieldLabel htmlFor="contact-name">{copy.name}</FieldLabel>
                <Input id="contact-name" name="name" type="text" autoComplete="name" required placeholder="Alex Morgan" />
              </Field>
              <Field className="contact-field">
                <FieldLabel htmlFor="contact-email">{copy.email}</FieldLabel>
                <Input id="contact-email" name="email" type="email" autoComplete="email" required placeholder="alex@example.com" />
              </Field>
              <Field className="contact-field contact-message-field">
                <FieldLabel htmlFor="contact-message">{copy.message}</FieldLabel>
                <Textarea id="contact-message" name="message" required rows={3} placeholder="Tell me a little about it…" />
              </Field>
              <Button className="send-button" type="submit">{copy.send}<ArrowUpRight size={17} /></Button>
              {formMessage && <Alert variant={CONTACT_EMAIL ? "default" : "destructive"} className="form-status"><AlertDescription>{formMessage}</AlertDescription></Alert>}
              <FieldDescription className="form-setup-note">{language === "en" ? "Contact delivery will be wired to your preferred email address." : "Mesej akan dihantar ke alamat e-mel pilihan anda."}</FieldDescription>
            </form>
          </div>
          <div className="contact-artwork" role="img" aria-label={copy.contactArt}>
            <PortfolioCard className="contact-image-slot">
              <span className="contact-image-stamp">IMAGE / 04</span>
              <span className="contact-image-shape shape-a" />
              <span className="contact-image-shape shape-b" />
              <span className="contact-image-shape shape-c" />
              <Badge variant="outline" className="contact-art-caption"><span className="availability-dot" />{copy.contactArt}</Badge>
            </PortfolioCard>
            <PortfolioCard elevation="subtle" className="contact-art-note"><span>LET’S MAKE SOMETHING USEFUL</span><ArrowRight size={17} /></PortfolioCard>
          </div>
        </div>
      </section>

      <nav className="screen-switcher" aria-label="Portfolio screens">
        {screens.map((screen, index) => (
          <Button
            variant="ghost"
            className={`screen-switch ${activeScreen === screen ? "is-active" : ""}`}
            key={screen}
            onClick={() => setScreen(screen)}
            aria-current={activeScreen === screen ? "location" : undefined}
          >
            <span className="switch-number">0{index + 1}</span>
            <span>{screenCopy[language][screen]}</span>
          </Button>
        ))}
      </nav>
    </main>
  );
}
