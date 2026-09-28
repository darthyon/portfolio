"use client";

import { motion, type Transition, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export interface FolderCardData {
  number: string;
  title: string;
  description: string;
  backgroundColor: string;
  folderColor: string;
  borderColor: string;
  textColor?: string;
  subTextColor?: string;
  artwork: ReactNode;
}

export interface CardFolderProps {
  id: string;
  card: FolderCardData;
  isOpen: boolean;
  ariaLabel: string;
  className?: string;
  onSelect: () => void;
}

const gpuSpringTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.75,
  restDelta: 0.0005,
  restSpeed: 0.0005,
};

export function CardFolder({ id, card, isOpen, ariaLabel, className, onSelect }: CardFolderProps) {
  const textColor = card.textColor ?? "#09090b";
  const subTextColor = card.subTextColor ?? "rgba(9, 9, 11, 0.65)";
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion ? { duration: 0 } : gpuSpringTransition;

  return (
    <div className={`card-folder-wrap ${className ?? ""}`}>
      <motion.button
        id={id}
        type="button"
        className="card-folder group relative block h-full w-full cursor-pointer select-none overflow-hidden rounded-[30px] transform-gpu [backface-visibility:hidden] [contain:paint] [perspective:1000px]"
        style={{
          border: `6px solid ${card.borderColor}`,
          boxSizing: "border-box",
          backgroundColor: card.backgroundColor,
        }}
        onClick={onSelect}
        aria-label={ariaLabel}
        aria-pressed={isOpen}
        initial="initial"
        whileHover="hover"
        whileFocus="hover"
        animate={isOpen ? "hover" : "initial"}
      >
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden transform-gpu will-change-[transform]"
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.09 },
          }}
          transition={transition}
        />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-[28%] z-10 flex w-[78%] -translate-x-1/2 justify-center transform-gpu will-change-[transform]"
          variants={{
            initial: { y: 0, scale: 0.96 },
            hover: { y: "-18%", scale: 1.08 },
          }}
          transition={transition}
        >
          <motion.div
            animate={prefersReducedMotion ? { y: 0, rotate: 0 } : { y: [0, -6, 0], rotate: [0, 1.5, -1.5, 0] }}
            transition={prefersReducedMotion ? { duration: 0 } : {
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="card-folder-art flex items-center justify-center"
          >
            {card.artwork}
          </motion.div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[20%] z-20 h-[95%] transform-gpu will-change-[transform]"
          variants={{
            initial: { y: 0 },
            hover: { y: "26%" },
          }}
          transition={transition}
        >
          <svg
            viewBox="0 0 280 380"
            fill="none"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full drop-shadow-[0_-10px_20px_rgba(0,0,0,0.15)]"
          >
            <path
              d="M 0,20 C 0,9 9,0 20,0 L 122,0 C 133,0 140,5.5 143.5,15 C 147,24.5 154,30 164,30 L 262,30 C 272,30 280,38 280,48 L 280,380 L 0,380 Z"
              fill={card.folderColor}
            />
          </svg>

          <div
            className="card-folder-number absolute left-[7%] top-[4%] font-mono font-bold tabular-nums leading-none tracking-tighter select-none"
            style={{ color: textColor }}
          >
            {card.number}
          </div>

          <motion.div
            className="absolute right-6 top-[46px] flex h-6 w-6 transform-gpu items-center justify-center will-change-[transform]"
            variants={{
              initial: { x: 0, scale: 1 },
              hover: { x: 4, scale: 1.15 },
            }}
            transition={transition}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={textColor}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none h-5 w-5"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.div>
        </motion.div>

        <div
          className="card-folder-copy pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 p-[7%]"
          style={{ color: textColor }}
        >
          <h3
            className="select-none font-sans text-base font-semibold leading-7 tracking-tight"
            style={{ color: textColor }}
          >
            {card.title}
          </h3>
          <p
            className="select-none font-sans text-sm font-normal leading-relaxed opacity-80"
            style={{ color: subTextColor }}
          >
            {card.description}
          </p>
        </div>
      </motion.button>
    </div>
  );
}
