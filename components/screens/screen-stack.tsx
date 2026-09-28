"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type PanInfo, type Transition } from "motion/react";
import type { CaseStudyShowcase } from "@/app/portfolio-data";
import type { SectionCopy } from "./copy";

interface ScreenStackProps {
  showcase: CaseStudyShowcase;
  copy: SectionCopy;
}

const stackSpring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 };
const visibleDepth = 3;

export function ScreenStack({ showcase, copy }: ScreenStackProps) {
  const { steps } = showcase;
  const [activeIndex, setActiveIndex] = useState(0);
  const draggedRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : stackSpring;
  const activeStep = steps[activeIndex] ?? steps[0];

  function move(direction: -1 | 1) {
    setActiveIndex((index) => (index + direction + steps.length) % steps.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
  }

  function handleDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) {
    const threshold = 80;
    if (info.offset.x < -threshold || info.velocity.x < -500) move(1);
    else if (info.offset.x > threshold || info.velocity.x > 500) move(-1);
    window.setTimeout(() => { draggedRef.current = false; }, 0);
  }

  return (
    <div className="screen-stack">
      <div className="screen-stack-deck" role="group" aria-roledescription="carousel" aria-label={copy.caseStudyStackLabel} tabIndex={0} onKeyDown={handleKeyDown}>
        {steps.map((step, index) => {
          const position = (index - activeIndex + steps.length) % steps.length;
          const depth = Math.min(position, visibleDepth);
          const isFront = position === 0;

          return (
            <motion.div
              key={step.screen.src}
              className="screen-stack-card"
              style={{ zIndex: steps.length - position }}
              initial={false}
              animate={{ x: 0, y: depth * 14, scale: 1 - depth * 0.05, opacity: position > visibleDepth ? 0 : 1 }}
              transition={transition}
              drag={isFront ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragStart={() => { draggedRef.current = true; }}
              onDragEnd={handleDragEnd}
              whileDrag={{ rotate: -2, cursor: "grabbing" }}
              aria-hidden={!isFront}
            >
              <a
                className="screen-stack-link"
                href={step.screen.src}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isFront ? 0 : -1}
                aria-label={`${copy.caseStudyOpenScreenshot}: ${step.screen.label}`}
                draggable={false}
                onClick={(event) => { if (draggedRef.current) event.preventDefault(); }}
              >
                <Image src={step.screen.src} alt={step.screen.alt} width={step.screen.width} height={step.screen.height} sizes="(max-width: 760px) 92vw, 760px" draggable={false} unoptimized />
              </a>
            </motion.div>
          );
        })}
      </div>

      <ol className="screen-stack-steps" aria-label={showcase.stepsLabel}>
        {steps.map((step, index) => (
          <li key={step.label}>
            <button type="button" className="screen-stack-step" aria-current={index === activeIndex ? "step" : undefined} aria-label={step.label} onClick={() => setActiveIndex(index)}>
              <small>{index + 1}</small>
              <b>{step.label}</b>
            </button>
          </li>
        ))}
      </ol>
      <div className="screen-stack-caption" aria-live="polite">
        <p className="screen-stack-current">{activeIndex + 1}. {activeStep.label}</p>
        <p className="screen-stack-reason">{activeStep.reason}</p>
      </div>
      <p className="screen-stack-cue">{showcase.cue}</p>
    </div>
  );
}
