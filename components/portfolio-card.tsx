import * as React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface PortfolioCardProps extends React.ComponentProps<typeof Card> {
  /** Raised for primary surfaces; subtle for cards nested inside them. */
  elevation?: "raised" | "subtle";
}

/** Shared portfolio surface built on the local shadcn Card. */
export function PortfolioCard({
  className,
  elevation = "raised",
  ...props
}: PortfolioCardProps) {
  return (
    <Card
      data-elevation={elevation}
      className={cn("portfolio-card", className)}
      {...props}
    />
  );
}
