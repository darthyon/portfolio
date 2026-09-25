export type FolderId = "work" | "side-quests" | "about";

export interface PortfolioProject {
  id: string;
  title: string;
  summary: string;
  category: string;
  color: "green" | "violet" | "amber";
  previewLabel: string;
  previewItems: readonly string[];
}

export interface FolderContent {
  id: FolderId;
  name: string;
  description: string;
  color: "blue" | "yellow" | "slate";
}

export const folders: readonly FolderContent[] = [
  {
    id: "work",
    name: "Selected Work",
    description: "A few things I’ve designed and built.",
    color: "blue",
  },
  {
    id: "side-quests",
    name: "Side Quests",
    description: "Experiments, tools, and ideas in progress.",
    color: "yellow",
  },
  {
    id: "about",
    name: "About",
    description: "A little about how I work and what matters to me.",
    color: "slate",
  },
];

export const projects: readonly PortfolioProject[] = [
  {
    id: "mysubsidi",
    title: "MySubsidi",
    summary: "A government subsidy tracker for Malaysians.",
    category: "Public services · Product design",
    color: "green",
    previewLabel: "MySubsidi",
    previewItems: ["BUDI MADANI", "SARA", "eKasih"],
  },
  {
    id: "welluber",
    title: "WellUber",
    summary: "On-demand healthcare transportation.",
    category: "Healthcare · Product design",
    color: "violet",
    previewLabel: "WellUber",
    previewItems: ["Book a ride", "Find a clinic", "Your trips"],
  },
  {
    id: "mylorry",
    title: "MyLorry",
    summary: "A logistics platform connecting businesses and truckers.",
    category: "Logistics · Product design",
    color: "amber",
    previewLabel: "MyLorry",
    previewItems: ["Find a truck", "Track delivery", "Instant quote"],
  },
];

export const sideQuests = [
  {
    title: "Little tools",
    summary: "Small utilities made to remove everyday friction.",
    category: "Build in progress",
    icon: "✳",
  },
  {
    title: "Interaction studies",
    summary: "Motion and interface details explored in code.",
    category: "Design experiments",
    icon: "↗",
  },
] as const;

export const aboutNotes = [
  {
    title: "Product thinking",
    summary: "Start with the problem, listen closely, then make the next step clear.",
    category: "How I work",
    icon: "01",
  },
  {
    title: "Design to delivery",
    summary: "I enjoy shaping an idea and working with a team to make it real.",
    category: "What I value",
    icon: "02",
  },
] as const;

export const profile = {
  name: "Youn Yusuff",
  role: "Product designer / builder",
  current: "Currently leading product design at TUG.",
  past: "Previously at ThoughtFull and DKS.",
  introduction:
    "I bring product thinking and hands-on making together to turn complex problems into clear, useful experiences.",
  location: "Kuala Lumpur, Malaysia",
} as const;
