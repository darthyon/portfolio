import { TowerBuilder } from "@/app/tower-builder";
import type { Language, SectionCopy } from "./copy";

interface PlayScreenProps {
  active: boolean;
  builderStarted: boolean;
  copy: SectionCopy;
  language: Language;
  theme: "light" | "dark";
}

export function PlayScreen({ active, builderStarted, copy, language, theme }: PlayScreenProps) {
  return (
    <section
      className="screen play-screen"
      id="play"
      aria-labelledby="play-title"
      data-active={active}
      aria-hidden={!active}
      inert={!active}
    >
      <div className="section-heading play-heading">
        <h2 id="play-title">{copy.playTitle}</h2>
        <p>{copy.playBody}</p>
      </div>
      {builderStarted && <TowerBuilder language={language} theme={theme} />}
    </section>
  );
}
