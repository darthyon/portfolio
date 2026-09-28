"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CaseStudyScreenshot } from "@/app/portfolio-data";
import type { SectionCopy } from "./copy";

interface NarrativeGalleryProps {
  screens: readonly [CaseStudyScreenshot, ...CaseStudyScreenshot[]];
  copy: SectionCopy;
}

export function NarrativeGallery({ screens, copy }: NarrativeGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreen = screens[activeIndex] ?? screens[0];

  function move(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + screens.length) % screens.length);
  }

  return (
    <div className="narrative-gallery" role="group" aria-label={copy.caseStudyGalleryLabel}>
      <div className="narrative-gallery-stage">
        <Button type="button" variant="default" size="icon" className="narrative-gallery-arrow" onClick={() => move(-1)} aria-label={copy.caseStudyPreviousScreenshot}>
          <ChevronLeft aria-hidden="true" color="#fff" />
        </Button>
        <a
          className="narrative-gallery-link"
          href={activeScreen.src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${copy.caseStudyOpenScreenshot}: ${activeScreen.label}`}
        >
          <Image src={activeScreen.src} alt={activeScreen.alt} width={activeScreen.width} height={activeScreen.height} sizes="166px" unoptimized />
        </a>
        <Button type="button" variant="default" size="icon" className="narrative-gallery-arrow" onClick={() => move(1)} aria-label={copy.caseStudyNextScreenshot}>
          <ChevronRight aria-hidden="true" color="#fff" />
        </Button>
      </div>
      <div className="narrative-gallery-position" aria-live="polite">
        <strong>{activeScreen.label}</strong>
        <span>{activeIndex + 1} / {screens.length}</span>
      </div>
      <div className="narrative-gallery-selectors" role="group" aria-label={copy.caseStudyGalleryScreens}>
        {screens.map((screen, index) => (
          <Button
            key={screen.src}
            type="button"
            variant="ghost"
            size="sm"
            className="narrative-gallery-selector"
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          >
            {screen.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
