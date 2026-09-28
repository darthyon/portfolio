"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  MapPin,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ExploreScreen } from "@/components/screens/explore-screen";
import { IntroScreen } from "@/components/screens/intro-screen";
import { PlayScreen } from "@/components/screens/play-screen";
import { screenCopy, screens, sectionCopy, type Language, type ScreenId } from "@/components/screens/copy";
import { type FolderId, type PortfolioProjectId } from "./portfolio-data";

const screenIndex = (screen: ScreenId) => screens.indexOf(screen);

export function SiteExperience() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("intro");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState<Language>("en");
  const [activeFolder, setActiveFolder] = useState<FolderId | null>(null);
  const [caseStudyProjectId, setCaseStudyProjectId] = useState<PortfolioProjectId | null>(null);
  const [builderStarted, setBuilderStarted] = useState(false);
  const lastWheelNavigation = useRef(0);
  const copy = sectionCopy[language];

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
      if (target?.closest("dialog[open]")) return;
      if (target?.closest("[data-case-study-scroll]")) return;
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
      if (target?.closest("dialog[open], input, textarea, select, .builder-canvas, [data-case-study-scroll], [contenteditable='true']")) {
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
      if (target?.closest("dialog[open]")) return;
      if (target?.closest("[data-case-study-scroll]")) return;
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

      <IntroScreen active={activeScreen === "intro"} copy={copy} language={language} />
      <ExploreScreen
        active={activeScreen === "explore"}
        activeFolder={activeFolder}
        caseStudyProjectId={caseStudyProjectId}
        copy={copy}
        language={language}
        onCaseStudyBack={() => setCaseStudyProjectId(null)}
        onFolderClose={() => setActiveFolder(null)}
        onFolderSelect={setActiveFolder}
        onProjectSelect={setCaseStudyProjectId}
      />
      <PlayScreen
        active={activeScreen === "play"}
        builderStarted={builderStarted}
        copy={copy}
        language={language}
        theme={theme}
      />
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
