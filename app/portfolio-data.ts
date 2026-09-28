export type PortfolioProjectId = "welluber" | "mylorry" | "mylorry-driver" | "counselai" | "identity-wallet" | "crafter";

export interface CaseStudyDecision {
  title: string;
  explanation: string;
}

export interface CaseStudyStory {
  problem: string;
  situation: string;
  insights: readonly [string, string, string];
  decisions: readonly [CaseStudyDecision, CaseStudyDecision, CaseStudyDecision];
  artifact: string;
  resultBefore: string;
  resultAfter: string;
}

export interface CaseStudyScreenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
}

export interface CaseStudyModelStep {
  title: string;
  detail: string;
}

export type CaseStudyNarrativeVisual =
  | { kind: "pending"; caption: string }
  | { kind: "journey"; caption: string; steps: readonly [string, string, string, string] }
  | { kind: "screens"; caption: string; screens: readonly [CaseStudyScreenshot, ...CaseStudyScreenshot[]]; layout?: "wide" }
  | { kind: "model"; caption: string; steps: readonly [CaseStudyModelStep, CaseStudyModelStep, CaseStudyModelStep]; screens: readonly [CaseStudyScreenshot, CaseStudyScreenshot] };

export interface CaseStudyNarrativeBeat {
  title: string;
  text: string;
  visual?: CaseStudyNarrativeVisual;
}

export interface CaseStudyNarrative {
  beats: readonly [CaseStudyNarrativeBeat, ...CaseStudyNarrativeBeat[]];
  closing: string;
}

export interface CaseStudyShowcaseStep {
  label: string;
  reason: string;
  screen: CaseStudyScreenshot;
}

export interface CaseStudyShowcase {
  lede: string;
  stepsLabel: string;
  cue: string;
  steps: readonly [CaseStudyShowcaseStep, ...CaseStudyShowcaseStep[]];
  closing: string;
}

export interface CaseStudyComingSoon {
  /** Fluent Emoji 3D image for the empty state. */
  emoji: string;
  title: string;
  text: string;
}

export interface LocalizedProjectContent {
  summary: string;
  category: string;
  story: CaseStudyStory | null;
  narrative?: CaseStudyNarrative;
  showcase?: CaseStudyShowcase;
  comingSoon?: CaseStudyComingSoon;
}

export interface PortfolioProject {
  id: PortfolioProjectId;
  title: string;
  /** Fluent Emoji 3D image shown on the folder sheet (MIT, see public/projects/emoji/LICENSE.txt). */
  folderEmoji: string;
  previewItems: Record<"en" | "bm", readonly [string, string, string]>;
  content: Record<"en" | "bm", LocalizedProjectContent>;
}

export type ContactChannelKind = "email" | "linkedin";

export interface ContactChannel {
  kind: ContactChannelKind;
  label: string;
  value: string;
  href: string;
}

export const linkedinUrl = "https://www.linkedin.com/in/yon-yusuff/";
export const resumeUrl = "/resume/yon-yusuff-resume.pdf";

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

const myLorryDriverScreens = {
  oldCheckIn: { src: "/projects/mylorry-driver/old-check-in.webp", width: 780, height: 1688 },
  oldHistory: { src: "/projects/mylorry-driver/old-check-in-history.webp", width: 780, height: 1614 },
  oldTrips: { src: "/projects/mylorry-driver/old-trips.webp", width: 780, height: 1614 },
  oldAccount: { src: "/projects/mylorry-driver/old-account.webp", width: 390, height: 1126 },
  homeEmpty: { src: "/projects/mylorry-driver/home-not-clocked-in.webp", width: 393, height: 852 },
  homeOnShift: { src: "/projects/mylorry-driver/home-on-shift.webp", width: 393, height: 852 },
  trips: { src: "/projects/mylorry-driver/trips.webp", width: 393, height: 852 },
  tripDetail: { src: "/projects/mylorry-driver/trip-detail.webp", width: 393, height: 852 },
  profile: { src: "/projects/mylorry-driver/profile.webp", width: 393, height: 852 },
  driverScore: { src: "/projects/mylorry-driver/driver-score.webp", width: 393, height: 1470 },
} as const;

const wellUberScreens = {
  benefitPolicyPool: { src: "/projects/welluber/benefit-policy-pool.webp", width: 2940, height: 1604 },
  benefitPolicyServices: { src: "/projects/welluber/benefit-policy-services.webp", width: 2940, height: 1604 },
  benefits: { src: "/projects/welluber/benefits.webp", width: 393, height: 852 },
  home: { src: "/projects/welluber/home.webp", width: 393, height: 852 },
  profile: { src: "/projects/welluber/profile.webp", width: 393, height: 852 },
  voucherCode: { src: "/projects/welluber/voucher-code.webp", width: 393, height: 852 },
  voucherDetail: { src: "/projects/welluber/voucher-detail.webp", width: 393, height: 852 },
} as const;

const myLorryScreens = {
  appointmentCalendar: { src: "/projects/mylorry/appointment-calendar.webp", width: 2000, height: 1091 },
  createAppointment: { src: "/projects/mylorry/create-appointment.webp", width: 2000, height: 1091 },
  tripPlanner: { src: "/projects/mylorry/trip-planner.webp", width: 2000, height: 1091 },
} as const;

const identityWalletScreens = {
  home: { src: "/projects/identity-wallet/home.webp", width: 645, height: 1398 },
  authorize: { src: "/projects/identity-wallet/authorize.webp", width: 645, height: 1398 },
  recoveryPhrase: { src: "/projects/identity-wallet/recovery-phrase.webp", width: 645, height: 1398 },
  deleteAccount: { src: "/projects/identity-wallet/delete-account.webp", width: 645, height: 1398 },
  avatar: { src: "/projects/identity-wallet/avatar.webp", width: 645, height: 1398 },
  settings: { src: "/projects/identity-wallet/settings.webp", width: 645, height: 1398 },
} as const;

const counselAiScreens = {
  intelligenceHome: { src: "/projects/counselai/intelligence-home.webp", width: 2000, height: 1357 },
  caseOverview: { src: "/projects/counselai/case-overview.webp", width: 2000, height: 1091 },
  investigation: { src: "/projects/counselai/investigation.webp", width: 2000, height: 1091 },
  outcomeRecommendation: { src: "/projects/counselai/outcome-recommendation.webp", width: 2000, height: 1091 },
  outcomeRevision: { src: "/projects/counselai/outcome-revision.webp", width: 2000, height: 1091 },
} as const;

export const projects: readonly PortfolioProject[] = [
  {
    id: "mylorry-driver",
    title: "MyLorry Driver",
    folderEmoji: "/projects/emoji/truck.webp",
    previewItems: { en: ["Shift", "Trips", "Driver Score"], bm: ["Syif", "Perjalanan", "Skor Pemandu"] },
    content: {
      en: {
        summary: "A driver app for the workday.",
        category: "Logistics · Mobile product design",
        story: null,
        narrative: {
          beats: [
            {
              title: "The old app split the workday into screens",
              text: "The old app was organised around Check-In, History, Trips and Account. Each feature worked, but drivers still had to piece together what came next.",
              visual: {
                kind: "screens", caption: "The old app split the work into four sections",
                screens: [
                  { ...myLorryDriverScreens.oldCheckIn, label: "Check-In", alt: "Old Check-In screen showing completed driver and vehicle checklists" },
                  { ...myLorryDriverScreens.oldHistory, label: "Check-In History", alt: "Old Check-In History screen showing rejected and pending checklists" },
                  { ...myLorryDriverScreens.oldTrips, label: "Trips", alt: "Old Trips screen showing an ongoing trip and ready-to-start trips" },
                  { ...myLorryDriverScreens.oldAccount, label: "Account", alt: "Old Account screen showing achievements, rank and monthly record" },
                ],
              },
            },
            {
              title: "The redesign follows a driver’s day",
              text: "The new app follows the order of a driver’s day: get ready, drive, arrive, then see how it went. Tasks that used to sit on separate screens now come up in that order.",
              visual: { kind: "journey", caption: "A driver's day", steps: ["Prepare", "Drive", "Arrive", "Improve"] },
            },
            {
              title: "Home shows what to do next",
              text: "Home changes with the driver’s shift. It shows whether they’ve clocked in, their current trip, their checklist and the next stop, each when it’s needed.",
              visual: {
                kind: "screens", caption: "Home responds to the driver's shift",
                screens: [
                  { ...myLorryDriverScreens.homeEmpty, label: "Not clocked in", alt: "MyLorry Driver Home showing a clock-in prompt above the current trip" },
                  { ...myLorryDriverScreens.homeOnShift, label: "On shift", alt: "MyLorry Driver Home showing the active shift and a pending vehicle checklist" },
                ],
              },
            },
            {
              title: "Trips show where the driver is",
              text: "The app already tracked trip locations. The redesign uses that to show where the driver is, the next stop, the expected arrival time and how far along the trip is.",
              visual: {
                kind: "screens", caption: "Trip progress across overview and detail",
                screens: [
                  { ...myLorryDriverScreens.trips, label: "Trips", alt: "Trips screen showing an active trip, waypoint progress and an upcoming trip" },
                  { ...myLorryDriverScreens.tripDetail, label: "Trip Detail", alt: "Trip Detail screen showing the route, ETA, cargo and waypoint timeline" },
                ],
              },
            },
            {
              title: "Performance became easier to understand",
              text: "Badges and rankings became feedback on real driving: sticking to the route, time spent idling, harsh braking and events during the trip.",
              visual: {
                kind: "screens", caption: "Profile and Driver Score",
                screens: [
                  { ...myLorryDriverScreens.profile, label: "Profile", alt: "Driver Profile showing score, points and rank above personal information" },
                  { ...myLorryDriverScreens.driverScore, label: "Driver Score", alt: "Driver Score showing performance breakdown, driving insights and a score trend" },
                ],
              },
            },
          ],
          closing: "The redesign didn’t make the job simpler. It arranged the app around what the driver is doing right now.",
        },
      },
      bm: {
        summary: "Aplikasi pemandu ikut hari kerja.",
        category: "Logistik · Reka bentuk produk mudah alih",
        story: null,
        narrative: {
          beats: [
            {
              title: "Aplikasi lama pecahkan hari kerja ikut skrin",
              text: "Aplikasi lama disusun ikut Check-In, History, Trips dan Account. Setiap ciri berfungsi, tapi pemandu masih kena fikir sendiri apa nak buat seterusnya.",
              visual: {
                kind: "screens", caption: "Aplikasi lama pecahkan kerja kepada empat bahagian",
                screens: [
                  { ...myLorryDriverScreens.oldCheckIn, label: "Check-In", alt: "Skrin Check-In lama menunjukkan senarai semak pemandu dan kenderaan yang selesai" },
                  { ...myLorryDriverScreens.oldHistory, label: "Check-In History", alt: "Skrin Check-In History lama menunjukkan senarai semak ditolak dan menunggu kelulusan" },
                  { ...myLorryDriverScreens.oldTrips, label: "Trips", alt: "Skrin Trips lama menunjukkan perjalanan yang sedang berlangsung dan yang sedia dimulakan" },
                  { ...myLorryDriverScreens.oldAccount, label: "Account", alt: "Skrin Account lama menunjukkan pencapaian, kedudukan dan rekod bulanan" },
                ],
              },
            },
            {
              title: "Reka bentuk baharu ikut hari pemandu",
              text: "Aplikasi baharu ikut susunan hari seorang pemandu: bersedia, memandu, sampai, kemudian tengok prestasi. Tugas yang dulu duduk di skrin berasingan kini muncul ikut susunan itu.",
              visual: { kind: "journey", caption: "Hari kerja pemandu", steps: ["Bersedia", "Memandu", "Tiba", "Tambah baik"] },
            },
            {
              title: "Home tunjuk apa nak buat seterusnya",
              text: "Home berubah ikut syif pemandu. Ia tunjuk sama ada pemandu dah mula syif, trip semasa, senarai semak dan hentian seterusnya, bila setiap satu diperlukan.",
              visual: {
                kind: "screens", caption: "Home berubah ikut syif pemandu",
                screens: [
                  { ...myLorryDriverScreens.homeEmpty, label: "Belum mula syif", alt: "Home MyLorry Driver memaparkan gesaan mula syif di atas perjalanan semasa" },
                  { ...myLorryDriverScreens.homeOnShift, label: "Sedang bertugas", alt: "Home MyLorry Driver memaparkan syif aktif dan senarai semak kenderaan yang belum selesai" },
                ],
              },
            },
            {
              title: "Trips tunjuk di mana pemandu berada",
              text: "Aplikasi memang dah rekod lokasi trip. Reka bentuk baharu guna data itu untuk tunjuk kedudukan pemandu, hentian seterusnya, anggaran masa sampai dan sejauh mana trip dah bergerak.",
              visual: {
                kind: "screens", caption: "Kemajuan trip dalam senarai dan butiran",
                screens: [
                  { ...myLorryDriverScreens.trips, label: "Trips", alt: "Skrin Trips menunjukkan perjalanan aktif, kemajuan hentian dan perjalanan akan datang" },
                  { ...myLorryDriverScreens.tripDetail, label: "Trip Detail", alt: "Skrin Trip Detail menunjukkan laluan, anggaran ketibaan, muatan dan garis masa hentian" },
                ],
              },
            },
            {
              title: "Prestasi jadi lebih senang difahami",
              text: "Lencana dan ranking ditukar jadi maklum balas tentang pemanduan sebenar: ikut laluan, masa melahu, brek mengejut dan kejadian sepanjang trip.",
              visual: {
                kind: "screens", caption: "Profil dan Skor Pemandu",
                screens: [
                  { ...myLorryDriverScreens.profile, label: "Profil", alt: "Profil pemandu menunjukkan skor, mata dan kedudukan di atas maklumat peribadi" },
                  { ...myLorryDriverScreens.driverScore, label: "Skor Pemandu", alt: "Skor Pemandu menunjukkan pecahan prestasi, gambaran pemanduan dan trend skor" },
                ],
              },
            },
          ],
          closing: "Reka bentuk baharu tak jadikan kerja lebih mudah. Ia susun aplikasi ikut apa yang pemandu tengah buat sekarang.",
        },
      },
    },
  },
  {
    id: "counselai",
    title: "CounselAI",
    folderEmoji: "/projects/emoji/balance-scale.webp",
    previewItems: { en: ["Report", "Case", "Decision"], bm: ["Laporan", "Kes", "Keputusan"] },
    content: {
      en: {
        summary: "HR issues into traceable cases.",
        category: "HR technology · 0→1 product exploration",
        story: null,
        showcase: {
          lede: "Helps HR teams handle workplace issues, from the first report to the final decision. The AI does the organising; people make the decisions.",
          stepsLabel: "How a case moves",
          cue: "Tap a step or swipe the screen to follow a case.",
          steps: [
            {
              label: "Someone reports it",
              reason: "Workplace problems rarely come neatly labelled. So the first step is simply describing what happened, in everyday words.",
              screen: { ...counselAiScreens.intelligenceHome, alt: "CounselAI home asking what situation the user needs to handle, with a free-text box and quick actions.", label: "Home" },
            },
            {
              label: "It becomes a case",
              reason: "Instead of chatting back, CounselAI sorts the description into who is involved, what is alleged and how serious it is.",
              screen: { ...counselAiScreens.caseOverview, alt: "Case overview with an AI summary, risk tags and a list of verified people involved.", label: "Case overview" },
            },
            {
              label: "HR investigates",
              reason: "The AI suggests the next step, like collecting evidence. A person decides when to move on.",
              screen: { ...counselAiScreens.investigation, alt: "Investigation steps with done and in-progress states, next to an AI message asking the user to confirm before continuing.", label: "Investigation" },
            },
            {
              label: "AI suggests an outcome",
              reason: "A suggestion is only useful if you can see why it was made, so each one shows the evidence behind it.",
              screen: { ...counselAiScreens.outcomeRecommendation, alt: "AI outcome suggestion with a confidence score, five weighted factors, written reasoning and a flagged risk.", label: "Outcome suggestion" },
            },
            {
              label: "HR decides",
              reason: "The AI never has the final say. HR can reject its suggestion and choose a different outcome.",
              screen: { ...counselAiScreens.outcomeRevision, alt: "Outcome tab showing an approver's rejection and HR's decision options, beside the case files.", label: "Final decision" },
            },
          ],
          closing: "The goal wasn't to build a smarter chatbot. It was to give messy workplace situations a clear path from the first report to a fair decision.",
        },
      },
      bm: {
        summary: "Isu HR jadi kes boleh dijejak.",
        category: "Teknologi HR · Penerokaan produk 0→1",
        story: null,
        showcase: {
          lede: "Bantu pasukan HR uruskan isu di tempat kerja, dari laporan pertama sampai keputusan akhir. AI susun maklumat; manusia yang buat keputusan.",
          stepsLabel: "Macam mana kes bergerak",
          cue: "Tekan satu langkah atau leret skrin untuk ikut perjalanan kes.",
          steps: [
            {
              label: "Seseorang buat laporan",
              reason: "Masalah di tempat kerja jarang datang dengan label yang kemas. Jadi langkah pertama cuma ceritakan apa yang berlaku, guna bahasa biasa.",
              screen: { ...counselAiScreens.intelligenceHome, alt: "Halaman utama CounselAI yang bertanya situasi yang perlu dikendalikan, dengan ruang teks bebas dan tindakan pantas.", label: "Halaman utama" },
            },
            {
              label: "Ia jadi kes",
              reason: "CounselAI bukan sekadar berbual. Cerita itu disusun kepada siapa yang terlibat, apa yang didakwa dan seberapa serius.",
              screen: { ...counselAiScreens.caseOverview, alt: "Gambaran kes dengan ringkasan AI, tag risiko dan senarai pihak terlibat yang disahkan.", label: "Gambaran kes" },
            },
            {
              label: "HR menyiasat",
              reason: "AI cadangkan langkah seterusnya, macam kumpul bukti. Manusia yang tentukan bila nak teruskan.",
              screen: { ...counselAiScreens.investigation, alt: "Langkah siasatan dengan status selesai dan sedang berjalan, di sebelah mesej AI yang meminta pengesahan sebelum meneruskan.", label: "Siasatan" },
            },
            {
              label: "AI cadangkan keputusan",
              reason: "Cadangan cuma berguna kalau anda nampak sebabnya, jadi setiap cadangan tunjuk bukti di belakangnya.",
              screen: { ...counselAiScreens.outcomeRecommendation, alt: "Cadangan keputusan AI dengan skor keyakinan, lima faktor berwajaran, alasan bertulis dan risiko yang ditandakan.", label: "Cadangan keputusan" },
            },
            {
              label: "HR buat keputusan",
              reason: "AI tak pernah buat keputusan muktamad. HR boleh tolak cadangannya dan pilih keputusan lain.",
              screen: { ...counselAiScreens.outcomeRevision, alt: "Tab keputusan yang menunjukkan penolakan pelulus dan pilihan keputusan HR, di sebelah fail kes.", label: "Keputusan akhir" },
            },
          ],
          closing: "Matlamatnya bukan nak bina chatbot yang lebih pandai. Ia bagi situasi rumit di tempat kerja satu laluan yang jelas, dari laporan pertama sampai keputusan yang adil.",
        },
      },
    },
  },
  {
    id: "welluber",
    title: "WellUber",
    folderEmoji: "/projects/emoji/wrapped-gift.webp",
    previewItems: { en: ["Employer", "Balance", "Vouchers"], bm: ["Majikan", "Baki", "Baucar"] },
    content: {
      en: {
        summary: "Benefits shaped per employer.",
        category: "Benefits · Product design and engineering",
        story: null,
        narrative: {
          beats: [
            {
              title: "Benefits meant paying first and claiming later",
              text: "Many company benefits still worked the same way: pay out of pocket, submit a claim, then wait for HR. WellUber shows employees what they’re covered for before they use a benefit. HR only steps in for unusual cases.",
            },
            {
              title: "One balance wasn't enough",
              text: "Showing one balance sounds simple. But some questions come first: who can use the benefit, whether family members share it, which employer pays, and whether it comes as a voucher or is paid directly. Those rules had to be set up before anything else.",
              visual: {
                kind: "model", caption: "The rules behind the balance",
                steps: [
                  { title: "Company rules", detail: "Who qualifies · shared budget · services" },
                  { title: "What each person gets", detail: "Just for them or shared with family" },
                  { title: "What employees see", detail: "Balance · what’s covered · what to pay" },
                ],
                screens: [
                  { ...wellUberScreens.benefitPolicyPool, label: "Pools & dependants", alt: "WellUber admin policy form showing eligible dependants, shared pool options and allocation mode" },
                  { ...wellUberScreens.benefitPolicyServices, label: "Groups & services", alt: "WellUber admin policy form showing selected fitness services and service amounts" },
                ],
              },
            },
            {
              title: "Each employer, a different set of benefits",
              text: "An employee can be linked to more than one employer. Switch between them and everything changes with it: balance, what’s covered, vouchers, even the Home screen.",
              visual: {
                kind: "screens", caption: "Employer and family members",
                screens: [
                  { ...wellUberScreens.profile, label: "Organisation", alt: "WellUber Profile showing the selected employer and linked dependants" },
                  { ...wellUberScreens.benefits, label: "Shared benefits", alt: "WellUber Benefits showing dependant selection, shared allocation and category balances" },
                ],
              },
            },
            {
              title: "The employee view stayed simple",
              text: "Employees see the answers they need in one place: what’s available, what’s covered, what it costs, and which vouchers they already have. Labels like “Fully covered” and “Amount to pay” do the explaining.",
              visual: {
                kind: "screens", caption: "What employees can use",
                screens: [
                  { ...wellUberScreens.home, label: "Home", alt: "WellUber Home showing employer balance, active vouchers and recommendations with coverage labels" },
                  { ...wellUberScreens.voucherDetail, label: "Voucher detail", alt: "WellUber voucher detail showing full coverage and RM 0 amount to pay" },
                  { ...wellUberScreens.voucherCode, label: "Voucher code", alt: "WellUber owned voucher showing a redemption code, available locations and instructions" },
                ],
              },
            },
            {
              title: "The rules handle the everyday cases",
              text: "Most requests follow the same path, from handing out budgets to using them and settling up. The rules take care of that path, and HR steps in when a case doesn’t fit.",
            },
          ],
          closing: "The complexity didn’t go away. It moved into the system, so employees and HR don’t have to deal with it themselves.",
        },
      },
      bm: {
        summary: "Manfaat mengikut majikan.",
        category: "Manfaat · Reka bentuk dan kejuruteraan produk",
        story: null,
        narrative: {
          beats: [
            {
              title: "Manfaat selalunya bayar dulu, tuntut kemudian",
              text: "Banyak manfaat syarikat masih berjalan macam ni: bayar sendiri, hantar tuntutan, lepas tu tunggu HR. WellUber tunjuk apa yang dilindungi sebelum pekerja guna manfaat. HR cuma masuk campur untuk kes luar biasa.",
            },
            {
              title: "Satu baki tak cukup",
              text: "Tunjuk satu baki nampak mudah. Tapi ada soalan yang kena jawab dulu: siapa boleh guna manfaat itu, ahli keluarga kongsi atau tak, majikan mana yang bayar, dan ia datang sebagai baucar atau dibayar terus. Peraturan ini kena tetapkan dulu.",
              visual: {
                kind: "model", caption: "Peraturan di sebalik baki",
                steps: [
                  { title: "Peraturan syarikat", detail: "Siapa layak · bajet dikongsi · perkhidmatan" },
                  { title: "Apa setiap orang dapat", detail: "Untuk sendiri atau dikongsi dengan keluarga" },
                  { title: "Apa pekerja nampak", detail: "Baki · apa dilindungi · apa perlu dibayar" },
                ],
                screens: [
                  { ...wellUberScreens.benefitPolicyPool, label: "Dana & tanggungan", alt: "Borang polisi admin WellUber menunjukkan tanggungan layak, pilihan dana bersama dan mod peruntukan" },
                  { ...wellUberScreens.benefitPolicyServices, label: "Kumpulan & perkhidmatan", alt: "Borang polisi admin WellUber menunjukkan perkhidmatan kecergasan terpilih dan jumlah untuk setiap perkhidmatan" },
                ],
              },
            },
            {
              title: "Setiap majikan, manfaat yang berbeza",
              text: "Seorang pekerja boleh dipautkan kepada lebih dari satu majikan. Tukar majikan, semuanya ikut berubah: baki, perlindungan, baucar, malah skrin Home.",
              visual: {
                kind: "screens", caption: "Majikan dan ahli keluarga",
                screens: [
                  { ...wellUberScreens.profile, label: "Organisasi", alt: "Profil WellUber menunjukkan majikan yang dipilih dan tanggungan yang dipautkan" },
                  { ...wellUberScreens.benefits, label: "Manfaat dikongsi", alt: "Skrin Benefits WellUber menunjukkan pemilihan tanggungan, peruntukan bersama dan baki mengikut kategori" },
                ],
              },
            },
            {
              title: "Paparan pekerja kekal ringkas",
              text: "Pekerja nampak semua jawapan di satu tempat: apa yang ada, apa yang dilindungi, berapa kosnya, dan baucar mana yang dah dimiliki. Label macam “Fully covered” dan “Amount to pay” terus terangkan semuanya.",
              visual: {
                kind: "screens", caption: "Apa yang pekerja boleh gunakan",
                screens: [
                  { ...wellUberScreens.home, label: "Home", alt: "Home WellUber menunjukkan baki majikan, baucar aktif dan cadangan dengan label perlindungan" },
                  { ...wellUberScreens.voucherDetail, label: "Butiran baucar", alt: "Butiran baucar WellUber menunjukkan perlindungan penuh dan jumlah RM 0 yang perlu dibayar" },
                  { ...wellUberScreens.voucherCode, label: "Kod baucar", alt: "Baucar milik pengguna menunjukkan kod penebusan, lokasi tersedia dan arahan" },
                ],
              },
            },
            {
              title: "Peraturan mengurus kes harian",
              text: "Kebanyakan permintaan ikut laluan yang sama, dari agih bajet sampai guna dan selesaikan akaun. Peraturan uruskan laluan itu, dan HR masuk campur bila ada kes yang tak kena.",
            },
          ],
          closing: "Kerumitan itu tak hilang. Ia dipindahkan ke dalam sistem, jadi pekerja dan HR tak perlu uruskannya sendiri.",
        },
      },
    },
  },
  {
    id: "mylorry",
    title: "MyLorry Schedule",
    folderEmoji: "/projects/emoji/spiral-calendar.webp",
    previewItems: { en: ["Calendar", "Timeline", "Trips"], bm: ["Kalendar", "Garis masa", "Trip"] },
    content: {
      en: {
        summary: "Fleet schedules and live trips.",
        category: "Logistics · B2B product design",
        story: null,
        narrative: {
          beats: [
            {
              title: "Not every schedule is the same problem",
              text: "Fleet teams plan around two very different kinds of time: fixed dates they can’t move, like vehicle inspections, and trucks that are out on the road all day. MyLorry had to support both without squeezing everything into one calendar.",
            },
            {
              title: "Keep outside appointments in view",
              text: "Vehicle inspections at PUSPAKOM, Malaysia’s vehicle testing centre, are booked outside MyLorry. The job wasn’t to book them again. It was to make sure the team could plan around them, so each appointment stays linked to its vehicle, date, service and documents like the booking receipt or licence.",
              visual: {
                kind: "screens", layout: "wide", caption: "Booked elsewhere, planned for here",
                screens: [
                  { ...myLorryScreens.appointmentCalendar, label: "Calendar", alt: "Monthly calendar of vehicle appointments and due dates, with one PUSPAKOM appointment open showing its time, status, notes and related licence." },
                  { ...myLorryScreens.createAppointment, label: "New appointment", alt: "Create appointment form with vehicle, service type, date, time, notes and related documents." },
                ],
              },
            },
            {
              title: "See every truck across the day",
              text: "Planning trips needs a different view. Dispatchers need to see which trucks are moving, who is driving, how far each trip has got, which ones are paused, what’s coming up, and which trips still have no truck or driver. A timeline shows all of that at once.",
              visual: {
                kind: "screens", layout: "wide", caption: "A trip list tells you what exists. A timeline tells you what can happen next.",
                screens: [{ ...myLorryScreens.tripPlanner, label: "Trip planner", alt: "Timeline of trucks across the day, showing each driver’s trips, stops completed, a paused trip, upcoming trips and trips still waiting for a driver." }],
              },
            },
            {
              title: "Same product, different decisions",
              text: "The calendar helps teams remember and plan around fixed dates. The timeline helps them coordinate trucks and drivers while they’re moving. Each screen follows the question the team is trying to answer.",
            },
          ],
          closing: "The design follows the question people are asking, not a favourite layout.",
        },
      },
      bm: {
        summary: "Jadual armada dan trip semasa.",
        category: "Logistik · Reka bentuk produk B2B",
        story: null,
        narrative: {
          beats: [
            {
              title: "Tak semua jadual masalah yang sama",
              text: "Pasukan armada merancang ikut dua jenis masa yang sangat berbeza: tarikh tetap yang tak boleh dianjak, macam pemeriksaan kenderaan, dan lori yang di jalan sepanjang hari. MyLorry perlu sokong kedua-duanya tanpa paksa semuanya masuk satu kalendar.",
            },
            {
              title: "Temu janji luar kekal nampak",
              text: "Pemeriksaan kenderaan di PUSPAKOM ditempah di luar MyLorry. Tujuannya bukan nak tempah sekali lagi, tapi pastikan pasukan boleh merancang sekelilingnya. Jadi setiap temu janji kekal terikat pada kenderaan, tarikh, perkhidmatan dan dokumen macam resit tempahan atau lesen.",
              visual: {
                kind: "screens", layout: "wide", caption: "Ditempah di luar, dirancang di sini",
                screens: [
                  { ...myLorryScreens.appointmentCalendar, label: "Kalendar", alt: "Kalendar bulanan temu janji dan tarikh akhir kenderaan, dengan satu temu janji PUSPAKOM dibuka menunjukkan masa, status, nota dan lesen berkaitan." },
                  { ...myLorryScreens.createAppointment, label: "Temu janji baharu", alt: "Borang cipta temu janji dengan kenderaan, jenis perkhidmatan, tarikh, masa, nota dan dokumen berkaitan." },
                ],
              },
            },
            {
              title: "Nampak setiap lori sepanjang hari",
              text: "Rancang trip perlukan paparan yang lain. Penghantar perlu nampak lori mana tengah bergerak, siapa yang pandu, sejauh mana setiap trip, mana yang terhenti, apa yang akan datang, dan trip mana yang masih tak ada lori atau pemandu. Garis masa tunjuk semuanya sekali gus.",
              visual: {
                kind: "screens", layout: "wide", caption: "Senarai trip tunjuk apa yang ada. Garis masa tunjuk apa yang boleh jadi seterusnya.",
                screens: [{ ...myLorryScreens.tripPlanner, label: "Perancang perjalanan", alt: "Garis masa lori sepanjang hari, menunjukkan perjalanan setiap pemandu, hentian yang selesai, perjalanan yang terhenti, perjalanan akan datang dan perjalanan yang masih menunggu pemandu." }],
              },
            },
            {
              title: "Produk sama, keputusan berbeza",
              text: "Kalendar bantu pasukan ingat dan rancang ikut tarikh tetap. Garis masa bantu mereka selaraskan lori dan pemandu yang tengah bergerak. Setiap skrin ikut soalan yang pasukan cuba jawab.",
            },
          ],
          closing: "Reka bentuk ini ikut soalan yang ditanya, bukan susun atur kegemaran.",
        },
      },
    },
  },
  {
    id: "identity-wallet",
    title: "Digital Identity Wallet",
    folderEmoji: "/projects/emoji/identification-card.webp",
    previewItems: { en: ["Credentials", "Consent", "Recovery"], bm: ["Kelayakan", "Kebenaran", "Pemulihan"] },
    content: {
      en: {
        summary: "Digital ID people can act on.",
        category: "Digital identity · Mobile product design",
        story: null,
        narrative: {
          beats: [
            {
              title: "Identity without the jargon",
              text: "Owning your digital identity comes with ideas most people never want to learn: credentials, recovery phrases, verification, permissions and actions you can’t undo. The app had to make those ideas clear without showing the machinery underneath.",
              visual: {
                kind: "screens", caption: "Your ID and verified documents, up front",
                screens: [{ ...identityWalletScreens.home, label: "Home", alt: "Wallet home showing a verified digital ID card, verified passport and ID card credentials, and incoming requests." }],
              },
            },
            {
              title: "Trust had to be spelled out",
              text: "People needed to know not just who they are in the app, but what an app is asking for and why. Instead of a vague “Connect” button, the approval screen lists exactly what will be shared, so people can choose whether to go ahead.",
              visual: {
                kind: "screens", caption: "Approve with the details in front of you",
                screens: [{ ...identityWalletScreens.authorize, label: "Approve an app", alt: "Approval screen listing a login check and the profile details the requesting app will receive, with Cancel and Authorize buttons." }],
              },
            },
            {
              title: "Risky actions should slow you down",
              text: "Losing your recovery phrase or deleting your account has real consequences. These steps deliberately slow people down, explain what could be lost, and ask them to confirm before they continue.",
              visual: {
                kind: "screens", caption: "Backup and deletion ask for a clear yes",
                screens: [
                  { ...identityWalletScreens.recoveryPhrase, label: "Recovery phrase", alt: "Recovery phrase screen showing 12 numbered words, a reminder to keep them offline, and two checkboxes to confirm before continuing." },
                  { ...identityWalletScreens.deleteAccount, label: "Delete account", alt: "Delete account screen listing what will be permanently removed before the Confirm button." },
                ],
              },
            },
            {
              title: "Familiar on the outside",
              text: "Avatars, a profile checklist and ordinary settings kept the app approachable. The harder parts, like credentials, consent and recovery, sit underneath until they’re needed.",
              visual: {
                kind: "screens", caption: "Everyday patterns for the parts people touch most",
                screens: [
                  { ...identityWalletScreens.avatar, label: "Avatar", alt: "Avatar picker with six illustrated avatars and a Confirm button." },
                  { ...identityWalletScreens.settings, label: "Settings", alt: "Settings screen with a profile checklist for details, email and mobile number, above account options." },
                ],
              },
            },
          ],
          closing: "The challenge wasn’t making digital identity look simple. It was making trust, consent and ownership clear enough for people to act on.",
        },
      },
      bm: {
        summary: "ID digital yang mudah difahami.",
        category: "Identiti digital · Reka bentuk produk mudah alih",
        story: null,
        narrative: {
          beats: [
            {
              title: "Identiti tanpa istilah teknikal",
              text: "Ada identiti digital sendiri datang dengan konsep yang ramai orang tak nak belajar: kelayakan, frasa pemulihan, pengesahan, kebenaran dan tindakan yang tak boleh diundur. Aplikasi ini kena jadikan semuanya jelas tanpa tunjuk jentera di belakangnya.",
              visual: {
                kind: "screens", caption: "ID dan dokumen yang disahkan, di hadapan",
                screens: [{ ...identityWalletScreens.home, label: "Utama", alt: "Halaman utama dompet menunjukkan kad ID digital yang disahkan, pasport dan kad pengenalan yang disahkan, serta permintaan masuk." }],
              },
            },
            {
              title: "Kepercayaan kena dijelaskan",
              text: "Pengguna perlu tahu bukan saja siapa mereka dalam aplikasi, tapi apa yang aplikasi lain minta dan kenapa. Daripada butang “Sambung” yang kabur, skrin kelulusan senaraikan apa yang akan dikongsi, jadi pengguna boleh pilih nak teruskan atau tak.",
              visual: {
                kind: "screens", caption: "Luluskan dengan butiran di hadapan anda",
                screens: [{ ...identityWalletScreens.authorize, label: "Luluskan aplikasi", alt: "Skrin kelulusan yang menyenaraikan semakan log masuk dan butiran profil yang akan diterima aplikasi, dengan butang Cancel dan Authorize." }],
              },
            },
            {
              title: "Tindakan berisiko patut buat anda berhenti sekejap",
              text: "Hilang frasa pemulihan atau padam akaun ada akibat sebenar. Langkah ini sengaja buat pengguna perlahan sikit, terangkan apa yang boleh hilang, dan minta pengesahan sebelum teruskan.",
              visual: {
                kind: "screens", caption: "Sandaran dan padam akaun perlukan persetujuan yang jelas",
                screens: [
                  { ...identityWalletScreens.recoveryPhrase, label: "Frasa pemulihan", alt: "Skrin frasa pemulihan menunjukkan 12 perkataan bernombor, peringatan untuk menyimpannya di luar talian, dan dua kotak semak sebelum meneruskan." },
                  { ...identityWalletScreens.deleteAccount, label: "Padam akaun", alt: "Skrin padam akaun yang menyenaraikan apa yang akan dibuang secara kekal sebelum butang Confirm." },
                ],
              },
            },
            {
              title: "Biasa dari luar",
              text: "Avatar, senarai semak profil dan tetapan yang biasa buat aplikasi rasa mesra. Bahagian yang lebih susah, macam kelayakan, kebenaran dan pemulihan, duduk di bawah sampai diperlukan.",
              visual: {
                kind: "screens", caption: "Corak biasa untuk bahagian yang paling kerap diguna",
                screens: [
                  { ...identityWalletScreens.avatar, label: "Avatar", alt: "Pemilih avatar dengan enam avatar berilustrasi dan butang Confirm." },
                  { ...identityWalletScreens.settings, label: "Tetapan", alt: "Skrin tetapan dengan senarai semak profil untuk butiran, e-mel dan nombor telefon, di atas pilihan akaun." },
                ],
              },
            },
          ],
          closing: "Cabarannya bukan nak buat identiti digital nampak mudah. Tapi nak buat kepercayaan, kebenaran dan pemilikan cukup jelas sampai pengguna yakin untuk bertindak.",
        },
      },
    },
  },
  {
    id: "crafter",
    title: "Crafter",
    folderEmoji: "/projects/emoji/hammer-and-pick.webp",
    previewItems: { en: ["Recipes", "Materials", "Notes"], bm: ["Resipi", "Bahan", "Nota"] },
    content: {
      en: {
        summary: "Crafting notes for cosy gamers.",
        category: "Game companion",
        story: null,
        comingSoon: {
          emoji: "/projects/emoji/hatching-chick.webp",
          title: "Still hatching",
          text: "A crafting notebook for cosy games like Stardew Valley. Coming soon.",
        },
      },
      bm: {
        summary: "Nota kraf untuk game santai.",
        category: "Teman main game",
        story: null,
        comingSoon: {
          emoji: "/projects/emoji/hatching-chick.webp",
          title: "Masih menetas",
          text: "Buku nota kraf untuk game santai macam Stardew Valley. Akan datang tak lama lagi.",
        },
      },
    },
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
