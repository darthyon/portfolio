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
    backFolders: "Back to folders",
    caseStudy: "Case study",
    caseStudyBack: "Back to projects",
    caseStudyRole: "Role",
    caseStudyYear: "Year",
    caseStudyScope: "Scope",
    caseStudyPending: "To add",
    caseStudyConceptPreview: "Concept preview; project screenshot to add",
    caseStudySituation: "The situation",
    caseStudySituationPending: "The context, constraints, and open questions will go here.",
    caseStudyInsights: "What became clear",
    caseStudyInsightPending: "Insight to add",
    caseStudyDecisions: "What I changed",
    caseStudyDecisionPending: "Decision",
    caseStudyExplanationPending: "Short explanation to add.",
    caseStudyVisualPending: "Project visual to add",
    caseStudySystem: "From interface to system",
    caseStudyArtifactPending: "One system artifact to add",
    caseStudyResult: "Result",
    caseStudyResultPending: "Before → after, with a real outcome or a material change to add.",
    caseStudyContactLabel: "Get in touch",
    caseStudyContactTitle: "Want the messy version?",
    caseStudyContactAction: "Let's talk on LinkedIn",
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
    backFolders: "Kembali ke folder",
    caseStudy: "Kajian kes",
    caseStudyBack: "Kembali ke projek",
    caseStudyRole: "Peranan",
    caseStudyYear: "Tahun",
    caseStudyScope: "Skop",
    caseStudyPending: "Akan ditambah",
    caseStudyConceptPreview: "Pratonton konsep; tangkap layar projek akan ditambah",
    caseStudySituation: "Situasi",
    caseStudySituationPending: "Konteks, kekangan dan persoalan terbuka akan diletakkan di sini.",
    caseStudyInsights: "Apa yang menjadi jelas",
    caseStudyInsightPending: "Penemuan akan ditambah",
    caseStudyDecisions: "Apa yang saya ubah",
    caseStudyDecisionPending: "Keputusan",
    caseStudyExplanationPending: "Penjelasan ringkas akan ditambah.",
    caseStudyVisualPending: "Visual projek akan ditambah",
    caseStudySystem: "Daripada antara muka kepada sistem",
    caseStudyArtifactPending: "Satu artifak sistem akan ditambah",
    caseStudyResult: "Hasil",
    caseStudyResultPending: "Sebelum → selepas, dengan hasil sebenar atau perubahan yang jelas.",
    caseStudyContactLabel: "Hubungi saya",
    caseStudyContactTitle: "Nak tahu cerita di sebaliknya?",
    caseStudyContactAction: "Jom berbual di LinkedIn",
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
  mysubsidi: { name: "MySubsidi", description: "Penjejak subsidi kerajaan untuk rakyat Malaysia." },
  welluber: { name: "WellUber", description: "Pengangkutan penjagaan kesihatan atas permintaan." },
  mylorry: { name: "MyLorry", description: "Platform logistik yang menghubungkan perniagaan dan pemandu lori." },
  "little-tools": { name: "Alat kecil", description: "Utiliti ringkas untuk mengurangkan kesukaran harian." },
  "interaction-studies": { name: "Kajian interaksi", description: "Gerakan dan butiran antara muka yang diteroka dalam kod." },
  about: { name: "Tentang Saya", description: "Sedikit tentang cara saya bekerja dan perkara yang saya hargai." },
};

export function localizeFolder(folder: FolderContent, language: Language): FolderContent {
  return language === "en" ? folder : { ...folder, ...bmFolders[folder.id] };
}
