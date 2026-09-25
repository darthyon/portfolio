import * as React from "react";

import { PortfolioCard } from "@/components/portfolio-card";

export interface PortfolioInfoCardProps {
  category: string;
  title: string;
  summary: string;
  icon: React.ReactNode;
  iconStyle?: "symbol" | "note";
}

/** Static information card used by the Side Quests and About folders. */
export function PortfolioInfoCard({
  category,
  title,
  summary,
  icon,
  iconStyle = "symbol",
}: PortfolioInfoCardProps) {
  return (
    <PortfolioCard elevation="subtle" className="simple-row" role="article">
      <span className={`simple-row-icon ${iconStyle === "note" ? "note-icon" : ""}`} aria-hidden="true">{icon}</span>
      <div>
        <span className="project-index">{category}</span>
        <h4>{title}</h4>
        <p>{summary}</p>
      </div>
    </PortfolioCard>
  );
}
