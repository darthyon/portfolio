export type PortfolioProjectId = "mysubsidi" | "welluber" | "mylorry";
export type FolderId = PortfolioProjectId | "little-tools" | "interaction-studies" | "about";
export type FolderContentKind = "project" | "side-quest" | "about";

export interface PortfolioProject {
  id: PortfolioProjectId;
  title: string;
  summary: string;
  category: string;
  color: "green" | "violet" | "amber";
  previewLabel: string;
  previewItems: readonly string[];
}

export interface FolderContent {
  id: FolderId;
  kind: FolderContentKind;
  name: string;
  description: string;
}

export interface PortfolioSideQuest {
  id: "little-tools" | "interaction-studies";
  title: string;
  summary: string;
  category: string;
  icon: string;
}

export type ContactChannelKind = "email" | "linkedin";

export interface ContactChannel {
  kind: ContactChannelKind;
  label: string;
  value: string;
  href: string;
}

export const linkedinUrl = "https://www.linkedin.com/in/yon-yusuff/";

export const contactChannels: readonly ContactChannel[] = [
  {
    kind: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/yon-yusuff",
    href: linkedinUrl,
  },
  {
    kind: "email",
    label: "Email",
    value: "yooneggy8@gmail.com",
    href: "mailto:yooneggy8@gmail.com",
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

export const sideQuests: readonly PortfolioSideQuest[] = [
  {
    id: "little-tools",
    title: "Little tools",
    summary: "Small utilities made to remove everyday friction.",
    category: "Build in progress",
    icon: "✳",
  },
  {
    id: "interaction-studies",
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

export const folders: readonly FolderContent[] = [
  ...projects.map<FolderContent>((project) => ({
    id: project.id,
    kind: "project",
    name: project.title,
    description: project.summary,
  })),
  ...sideQuests.map<FolderContent>((item) => ({
    id: item.id,
    kind: "side-quest",
    name: item.title,
    description: item.summary,
  })),
  {
    id: "about",
    kind: "about",
    name: "About",
    description: "A little about how I work and what matters to me.",
  },
];

export const profile = {
  name: "Yon Yusuff",
  role: "Product designer / builder",
  current: "Currently leading product design at TUG.",
  past: "Previously at ThoughtFull and DKSH.",
  introduction:
    "I bring product thinking and hands-on making together to turn complex problems into clear, useful experiences.",
  location: "Kuala Lumpur, Malaysia",
} as const;
