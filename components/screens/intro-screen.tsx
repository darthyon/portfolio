"use client";

import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ContactRound,
  Download,
  FileText,
  Mail,
  MessageCircle,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { contactChannels, linkedinUrl, profile, resumeUrl, type ContactChannelKind } from "@/app/portfolio-data";
import type { Language, SectionCopy } from "./copy";
import { PortfolioCard } from "@/components/portfolio-card";
import { ResumePages } from "./resume-pages";

interface IntroScreenProps {
  active: boolean;
  copy: SectionCopy;
  language: Language;
}

function EmployerMark({ name, logoSrc }: { name: string; logoSrc: string }) {
  return (
    <span className="employer-mention">
      <span className="employer-mark" aria-hidden="true">
        <Image src={logoSrc} alt="" width={28} height={28} unoptimized draggable={false} />
      </span>
      <span>{name}</span>
    </span>
  );
}

function ContactChannelIcon({ kind }: { kind: ContactChannelKind }) {
  switch (kind) {
    case "linkedin":
      return <span className="linkedin-mark" aria-hidden="true">in</span>;
    case "email":
      return <Mail size={17} aria-hidden="true" />;
    default:
      return <ArrowUpRight size={17} aria-hidden="true" />;
  }
}

export function IntroScreen({ active, copy, language }: IntroScreenProps) {
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const contactDialogRef = useRef<HTMLDialogElement>(null);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [resumeMode, setResumeMode] = useState<"native" | "drawn">("native");
  const resumeDialogRef = useRef<HTMLDialogElement>(null);
  const displayRole = language === "en" ? profile.role : "Pereka produk / pembina";

  useEffect(() => {
    const dialog = contactDialogRef.current;
    if (!dialog) return;

    if (isContactDialogOpen && !dialog.open) dialog.showModal();
    if (!isContactDialogOpen && dialog.open) dialog.close();
  }, [isContactDialogOpen, portalTarget]);

  useEffect(() => {
    const dialog = resumeDialogRef.current;
    if (!dialog) return;

    if (isResumeDialogOpen && !dialog.open) dialog.showModal();
    if (!isResumeDialogOpen && dialog.open) dialog.close();
  }, [isResumeDialogOpen, portalTarget]);

  function handleResumeClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    // Phones either can't show PDFs inline or show them badly, so pdf.js draws it there.
    const native = navigator.pdfViewerEnabled && !window.matchMedia("(hover: none)").matches;
    setResumeMode(native ? "native" : "drawn");
    setPortalTarget(document.body);
    setIsResumeDialogOpen(true);
  }

  function handleCardPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--card-tilt-x", `${-vertical * 9}deg`);
    event.currentTarget.style.setProperty("--card-tilt-y", `${horizontal * 11}deg`);
    event.currentTarget.style.setProperty("--card-lift", "-5px");
    event.currentTarget.style.setProperty("--card-glare-x", `${(horizontal + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--card-glare-y", `${(vertical + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--card-glare", "1");
  }

  function resetCardTilt(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--card-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--card-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--card-lift", "0px");
    event.currentTarget.style.setProperty("--card-glare", "0");
  }

  return (
    <section
      className="screen intro-screen"
      id="intro"
      aria-labelledby="intro-title"
      data-active={active}
      aria-hidden={!active}
      inert={!active}
    >
      <PortfolioCard
        className="id-card"
        onPointerMove={handleCardPointerMove}
        onPointerLeave={resetCardTilt}
      >
        <svg className="lanyard-mask-defs" aria-hidden="true">
          <defs>
            <mask id="id-card-lanyard-face" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
              <rect width="1" height="1" fill="white" />
              <rect x="0.4575" y="0.027" width="0.085" height="0.02" rx="0.0125" ry="0.008" fill="black" />
            </mask>
          </defs>
        </svg>
        <div className="id-card-surface" aria-hidden="true" />
        <div className="id-card-lanyard-slot" aria-hidden="true" />
        <div className="portrait-stage">
          <div className="portrait-backdrop" aria-hidden="true" />
          <Image
            className="portrait-image"
            src="/portrait-yon.png"
            alt={copy.portraitAlt}
            width={1254}
            height={1254}
            fetchPriority="high"
            preload
            unoptimized
            draggable={false}
          />
        </div>
        <CardContent className="card-content">
          <Badge variant="outline" className="availability-badge"><span className="availability-dot" />{copy.current}</Badge>
          <h1 id="intro-title">{profile.name}</h1>
          <p className="profile-role">{displayRole}</p>
          <div className="card-work-summary">
            <p>
              {language === "en" ? "Currently leading product design at" : "Kini menerajui reka bentuk produk di"}{" "}
              <EmployerMark name="TUG" logoSrc="/logos/tug.png" />.
            </p>
            <p>
              {language === "en" ? "Previously at" : "Sebelum ini di"}{" "}
              <EmployerMark name="ThoughtFull" logoSrc="/logos/thoughtfull.png" /> {language === "en" ? "and" : "dan"}{" "}
              <EmployerMark name="DKSH" logoSrc="/logos/dksh.jpg" />.
            </p>
          </div>
          <nav className="intro-contact-actions" aria-label={language === "en" ? "Contact options" : "Pilihan hubungan"}>
            <Button
              className="intro-add-contact"
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isContactDialogOpen}
              onClick={() => {
                setPortalTarget(document.body);
                setIsContactDialogOpen(true);
              }}
            >
              <MessageCircle size={16} strokeWidth={1.9} />
              {copy.needToTalk}
            </Button>
            <Button asChild className="intro-view-resume">
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" aria-label={copy.viewResumeLabel} onClick={handleResumeClick}>
                <FileText size={16} strokeWidth={1.9} />
                {copy.viewResume}
              </a>
            </Button>
          </nav>
        </CardContent>
      </PortfolioCard>
      {portalTarget && createPortal(
        <dialog
          ref={contactDialogRef}
          className="contact-dialog"
          aria-labelledby="contact-dialog-title"
          aria-describedby="contact-dialog-description"
          onCancel={(event) => {
            event.preventDefault();
            setIsContactDialogOpen(false);
          }}
          onClose={() => setIsContactDialogOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setIsContactDialogOpen(false);
          }}
        >
          <div className="contact-dialog-surface">
            <header className="contact-dialog-header">
            <span className="contact-dialog-icon" aria-hidden="true"><ContactRound size={19} /></span>
            <div className="contact-dialog-heading">
              <h2 id="contact-dialog-title">{copy.contactDialogTitle}</h2>
                <span id="contact-dialog-description">{copy.contactDialogDescription}</span>
              </div>
              <Button
                className="contact-dialog-close"
                variant="ghost"
                size="icon"
                type="button"
                aria-label={copy.closeContactDialog}
                onClick={() => setIsContactDialogOpen(false)}
              >
                <X size={17} />
              </Button>
            </header>
            <div className="contact-method-list">
              {contactChannels.map((channel) => (
                <a
                  className="contact-method"
                  href={channel.href}
                  key={channel.kind}
                  target={channel.kind === "email" ? undefined : "_blank"}
                  rel={channel.kind === "email" ? undefined : "noreferrer"}
                >
                  <span className="contact-method-icon"><ContactChannelIcon kind={channel.kind} /></span>
                  <span className="contact-method-copy">
                    <strong>{channel.label}</strong>
                    <span>{channel.value}</span>
                  </span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
            <div className="contact-note">
              <p>
                {copy.phoneRequestPrefix}
                <a href={linkedinUrl} target="_blank" rel="noreferrer">{copy.phoneRequestLink}</a>
                {copy.phoneRequestSuffix}
              </p>
            </div>
          </div>
        </dialog>,
        portalTarget,
      )}
      {portalTarget && createPortal(
        <dialog
          ref={resumeDialogRef}
          className="resume-dialog"
          aria-labelledby="resume-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            setIsResumeDialogOpen(false);
          }}
          onClose={() => setIsResumeDialogOpen(false)}
        >
          <header className="resume-bar">
            <Button
              className="resume-back"
              variant="ghost"
              type="button"
              onClick={() => setIsResumeDialogOpen(false)}
            >
              <ArrowLeft size={17} />
              {copy.closeResumeDialog}
            </Button>
            <h2 id="resume-dialog-title">{copy.resumeDialogTitle}</h2>
            {resumeMode === "drawn" && (
              <Button asChild variant="ghost" className="resume-back resume-download">
                <a href={resumeUrl} download>
                  <Download size={17} />
                  {copy.downloadResume}
                </a>
              </Button>
            )}
          </header>
          {isResumeDialogOpen && (resumeMode === "native" ? (
            <iframe className="resume-frame" src={`${resumeUrl}#view=FitH`} title={copy.resumeDialogTitle} />
          ) : (
            <ResumePages src={resumeUrl} loadingLabel={copy.resumeLoading} failedLabel={copy.resumeFailed} openLabel={copy.resumeOpen} />
          ))}
        </dialog>,
        portalTarget,
      )}
    </section>
  );
}
