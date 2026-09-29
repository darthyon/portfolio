"use client";

import { useEffect, useRef, useState } from "react";

type LoadState = "loading" | "ready" | "failed";

interface ResumePagesProps {
  src: string;
  loadingLabel: string;
  failedLabel: string;
  openLabel: string;
}

// Draws the PDF with pdf.js for browsers without a built-in PDF viewer (most phones).
export function ResumePages({ src, loadingLabel, failedLabel, openLabel }: ResumePagesProps) {
  const pagesRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    const host = pagesRef.current;
    if (!host) return;
    let cancelled = false;
    let destroy: (() => void) | null = null;

    async function render(container: HTMLDivElement) {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
      const task = pdfjs.getDocument({ url: src });
      destroy = () => void task.destroy();
      const pdf = await task.promise;
      // The dialog opens in the parent's effect, so measure after the next frame.
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
      const width = container.clientWidth || window.innerWidth;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2.5);

      for (let number = 1; number <= pdf.numPages; number += 1) {
        if (cancelled) return;
        const page = await pdf.getPage(number);
        const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
        const canvas = document.createElement("canvas");
        canvas.className = "resume-page";
        canvas.width = Math.floor(viewport.width * pixelRatio);
        canvas.height = Math.floor(viewport.height * pixelRatio);
        canvas.setAttribute("aria-hidden", "true");
        // Draw at device resolution, display at container width.
        canvas.style.width = "100%";
        await page.render({ canvas, viewport, transform: [pixelRatio, 0, 0, pixelRatio, 0, 0] }).promise;
        if (cancelled) return;
        container.append(canvas);
        if (number === 1) setState("ready");
      }
    }

    render(host).catch(() => {
      if (!cancelled) setState("failed");
    });

    return () => {
      cancelled = true;
      destroy?.();
      host.replaceChildren();
    };
  }, [src]);

  return (
    <div className="resume-scroll">
      <div className="resume-pages" ref={pagesRef} />
      {state === "loading" && <p className="resume-message" role="status">{loadingLabel}</p>}
      {state === "failed" && (
        <p className="resume-message" role="alert">
          {failedLabel} <a href={src} target="_blank" rel="noopener noreferrer">{openLabel}</a>
        </p>
      )}
    </div>
  );
}
