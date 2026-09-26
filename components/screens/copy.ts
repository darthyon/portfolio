import { profile, type FolderContent, type FolderId } from "@/app/portfolio-data";

export type Language = "en" | "bm";
export type ScreenId = "intro" | "explore" | "play";

export const screens: readonly ScreenId[] = ["intro", "explore", "play"];

export const screenCopy: Record<Language, Record<ScreenId, string>> = {
  en: { intro: "Intro", explore: "Explore", play: "Play" },
  bm: { intro: "Mula", explore: "Teroka", play: "Main" },
};

export const sectionCopy = {
  en: {
    current: "Bought a new Smiski",
    exploreTitle: "A few things I’ve designed and built.",
    backFolders: "All folders",
    caseStudy: "Case study",
    caseStudyBack: "Back to projects",
    openFolder: "Open folder",
    playTitle: "Build the towers.",
    playBody: "A small building challenge for bigger ideas.",
    needToTalk: "Need to talk?",
    contactDialogTitle: "Let’s talk.",
    contactDialogDescription: "Pick the way that works for you.",
    closeContactDialog: "Close contact options",
    phoneRequestPrefix: "If you need my phone number, hit me up on ",
    phoneRequestLink: "LinkedIn",
    phoneRequestSuffix: ".",
    location: profile.location,
    portraitAlt: "3D portrait of Yon Yusuff",
  },
  bm: {
    current: "Beli Smiski baharu",
    exploreTitle: "Beberapa perkara yang saya reka dan bina.",
    backFolders: "Semua folder",
    caseStudy: "Kajian kes",
    caseStudyBack: "Kembali ke projek",
    openFolder: "Buka folder",
    playTitle: "Bina menara.",
    playBody: "Cabaran membina kecil untuk idea besar.",
    needToTalk: "Nak berbual?",
    contactDialogTitle: "Jom berbual.",
    contactDialogDescription: "Pilih cara yang sesuai untuk anda.",
    closeContactDialog: "Tutup pilihan hubungan",
    phoneRequestPrefix: "Jika anda perlukan nombor telefon saya, hubungi saya di ",
    phoneRequestLink: "LinkedIn",
    phoneRequestSuffix: ".",
    location: profile.location,
    portraitAlt: "Potret 3D Yon Yusuff",
  },
} as const;

export type SectionCopy = (typeof sectionCopy)[Language];

const bmFolders: Record<FolderId, Pick<FolderContent, "name" | "description">> = {
  work: { name: "Kerja Terpilih", description: "Beberapa perkara yang saya reka dan bina." },
  "side-quests": { name: "Projek Sampingan", description: "Eksperimen, alat dan idea yang sedang diteroka." },
  about: { name: "Tentang Saya", description: "Sedikit tentang cara saya bekerja dan perkara yang saya hargai." },
};

export function localizeFolder(folder: FolderContent, language: Language): FolderContent {
  return language === "en" ? folder : { ...folder, ...bmFolders[folder.id] };
}
