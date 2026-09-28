export type PortfolioProjectId = "welluber" | "mylorry" | "mylorry-driver" | "counselai" | "mindline" | "sentient";

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
  | { kind: "screens"; caption: string; screens: readonly [CaseStudyScreenshot, ...CaseStudyScreenshot[]] }
  | { kind: "model"; caption: string; steps: readonly [CaseStudyModelStep, CaseStudyModelStep, CaseStudyModelStep]; screens: readonly [CaseStudyScreenshot, CaseStudyScreenshot] };

export interface CaseStudyNarrativeBeat {
  title: string;
  text: string;
  visual?: CaseStudyNarrativeVisual;
}

export interface CaseStudyNarrative {
  beats: readonly [CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat];
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

export interface LocalizedProjectContent {
  summary: string;
  category: string;
  story: CaseStudyStory | null;
  narrative?: CaseStudyNarrative;
  showcase?: CaseStudyShowcase;
}

export interface PortfolioProject {
  id: PortfolioProjectId;
  title: string;
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

const counselAiScreens = {
  intelligenceHome: { src: "/projects/counselai/intelligence-home.webp", width: 2000, height: 1357 },
  caseOverview: { src: "/projects/counselai/case-overview.webp", width: 2000, height: 1091 },
  investigation: { src: "/projects/counselai/investigation.webp", width: 2000, height: 1091 },
  outcomeRecommendation: { src: "/projects/counselai/outcome-recommendation.webp", width: 2000, height: 1091 },
  outcomeRevision: { src: "/projects/counselai/outcome-revision.webp", width: 2000, height: 1091 },
} as const;

export const projects: readonly PortfolioProject[] = [
  {
    id: "welluber",
    title: "WellUber",
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
              title: "Manfaat bermaksud bayar dulu, tuntut kemudian",
              text: "Banyak manfaat syarikat masih berfungsi begini: bayar sendiri, hantar tuntutan, kemudian tunggu HR. WellUber menunjukkan apa yang dilindungi sebelum pekerja menggunakan manfaat. HR hanya masuk campur untuk kes luar biasa.",
            },
            {
              title: "Satu baki tidak cukup",
              text: "Memaparkan satu baki nampak mudah. Tetapi beberapa soalan perlu dijawab dahulu: siapa boleh guna manfaat itu, adakah ahli keluarga berkongsi, majikan mana yang membayar, dan adakah ia datang sebagai baucar atau dibayar terus. Peraturan itu perlu ditetapkan sebelum yang lain.",
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
              text: "Seorang pekerja boleh dipautkan kepada lebih daripada satu majikan. Tukar majikan dan semuanya turut berubah: baki, perlindungan, baucar, malah skrin Home.",
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
              text: "Pekerja nampak jawapan yang diperlukan di satu tempat: apa yang ada, apa yang dilindungi, berapa kosnya, dan baucar mana yang sudah dimiliki. Label seperti “Fully covered” dan “Amount to pay” terus menjelaskannya.",
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
              text: "Kebanyakan permintaan ikut laluan yang sama, daripada pemberian bajet kepada penggunaan dan penyelesaian akaun. Peraturan mengurus laluan itu, dan HR masuk campur apabila sesuatu kes tidak sesuai.",
            },
          ],
          closing: "Kerumitan itu tidak hilang. Ia dipindahkan ke dalam sistem, supaya pekerja dan HR tidak perlu menguruskannya sendiri.",
        },
      },
    },
  },
  {
    id: "mylorry",
    title: "MyLorry",
    previewItems: { en: ["Exceptions", "Trip Planner", "Vehicles"], bm: ["Pengecualian", "Perancang", "Kenderaan"] },
    content: {
      en: {
        summary: "Trip planning and exceptions.",
        category: "Logistics · B2B product design",
        story: {
          problem: "How can a busy logistics workspace help operators act on what needs attention?",
          situation: "The dashboard carried too much information at once. Operators needed to plan around vehicles and drivers while spotting exceptions quickly.",
          insights: ["Operators scan for exceptions, not dashboards.", "Planning revolves around vehicles and drivers.", "The information hierarchy was doing too much."],
          decisions: [
            { title: "Rework the dashboard", explanation: "Made the operational hierarchy easier to scan." },
            { title: "Make Schedule a Trip Planner", explanation: "Put trip planning around vehicles and drivers." },
            { title: "Surface exceptions", explanation: "Brought items needing action into the primary view." },
          ],
          artifact: "Trip planning flow and operational model",
          resultBefore: "Information-heavy dashboard",
          resultAfter: "Action-oriented operations workspace",
        },
      },
      bm: {
        summary: "Rancang trip, urus pengecualian.",
        category: "Logistik · Reka bentuk produk B2B",
        story: {
          problem: "Bagaimana ruang kerja logistik yang sibuk boleh membantu pengendali bertindak pada perkara penting?",
          situation: "Papan pemuka memaparkan terlalu banyak maklumat serentak. Pengendali perlu merancang berdasarkan kenderaan dan pemandu sambil mengenal pasti pengecualian dengan cepat.",
          insights: ["Pengendali mencari pengecualian, bukan meneliti papan pemuka.", "Perancangan berpusat pada kenderaan dan pemandu.", "Hierarki maklumat menanggung terlalu banyak tugas."],
          decisions: [
            { title: "Susun semula papan pemuka", explanation: "Hierarki operasi dijadikan lebih mudah diimbas." },
            { title: "Jadikan Jadual sebagai Perancang Perjalanan", explanation: "Perancangan perjalanan berpusat pada kenderaan dan pemandu." },
            { title: "Tonjolkan pengecualian", explanation: "Perkara yang memerlukan tindakan dibawa ke paparan utama." },
          ],
          artifact: "Aliran perancangan perjalanan dan model operasi",
          resultBefore: "Papan pemuka sarat maklumat",
          resultAfter: "Ruang kerja operasi berorientasikan tindakan",
        },
      },
    },
  },
  {
    id: "mylorry-driver",
    title: "MyLorry Driver",
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
              title: "Aplikasi lama memisahkan hari kerja kepada skrin",
              text: "Aplikasi lama disusun mengikut Check-In, History, Trips dan Account. Setiap ciri berfungsi, tetapi pemandu masih perlu menentukan sendiri apa yang patut dibuat seterusnya.",
              visual: {
                kind: "screens", caption: "Aplikasi lama memisahkan kerja kepada empat bahagian",
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
              text: "Aplikasi baharu mengikut susunan hari seorang pemandu: bersedia, memandu, tiba, kemudian lihat prestasi. Tugas yang dulunya di skrin berasingan kini muncul mengikut susunan itu.",
              visual: { kind: "journey", caption: "Hari kerja pemandu", steps: ["Bersedia", "Memandu", "Tiba", "Tambah baik"] },
            },
            {
              title: "Home menunjukkan apa perlu dibuat seterusnya",
              text: "Home berubah mengikut syif pemandu. Ia menunjukkan sama ada pemandu sudah mula syif, perjalanan semasa, senarai semak dan hentian seterusnya, masing-masing apabila diperlukan.",
              visual: {
                kind: "screens", caption: "Home berubah mengikut keadaan syif pemandu",
                screens: [
                  { ...myLorryDriverScreens.homeEmpty, label: "Belum mula syif", alt: "Home MyLorry Driver memaparkan gesaan mula syif di atas perjalanan semasa" },
                  { ...myLorryDriverScreens.homeOnShift, label: "Sedang bertugas", alt: "Home MyLorry Driver memaparkan syif aktif dan senarai semak kenderaan yang belum selesai" },
                ],
              },
            },
            {
              title: "Trips menunjukkan di mana pemandu berada",
              text: "Aplikasi sudah pun merekod lokasi perjalanan. Reka bentuk baharu menggunakannya untuk menunjukkan kedudukan pemandu, hentian seterusnya, anggaran masa tiba dan sejauh mana perjalanan.",
              visual: {
                kind: "screens", caption: "Kemajuan perjalanan pada paparan senarai dan butiran",
                screens: [
                  { ...myLorryDriverScreens.trips, label: "Trips", alt: "Skrin Trips menunjukkan perjalanan aktif, kemajuan hentian dan perjalanan akan datang" },
                  { ...myLorryDriverScreens.tripDetail, label: "Trip Detail", alt: "Skrin Trip Detail menunjukkan laluan, anggaran ketibaan, muatan dan garis masa hentian" },
                ],
              },
            },
            {
              title: "Prestasi menjadi lebih mudah difahami",
              text: "Lencana dan kedudukan ditukar menjadi maklum balas tentang pemanduan sebenar: ikut laluan, masa melahu, brek mengejut dan kejadian semasa perjalanan.",
              visual: {
                kind: "screens", caption: "Profil dan Skor Pemandu",
                screens: [
                  { ...myLorryDriverScreens.profile, label: "Profil", alt: "Profil pemandu menunjukkan skor, mata dan kedudukan di atas maklumat peribadi" },
                  { ...myLorryDriverScreens.driverScore, label: "Skor Pemandu", alt: "Skor Pemandu menunjukkan pecahan prestasi, gambaran pemanduan dan trend skor" },
                ],
              },
            },
          ],
          closing: "Reka bentuk baharu tidak menjadikan kerja lebih mudah. Ia menyusun aplikasi mengikut apa yang pemandu sedang lakukan sekarang.",
        },
      },
    },
  },
  {
    id: "counselai",
    title: "CounselAI",
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
          lede: "Membantu pasukan HR mengendalikan isu di tempat kerja, daripada laporan pertama hingga keputusan akhir. AI menyusun maklumat; manusia membuat keputusan.",
          stepsLabel: "Bagaimana sesuatu kes bergerak",
          cue: "Tekan satu langkah atau leret skrin untuk mengikuti sesuatu kes.",
          steps: [
            {
              label: "Seseorang melaporkannya",
              reason: "Masalah di tempat kerja jarang datang dengan label yang kemas. Jadi langkah pertama hanyalah menceritakan apa yang berlaku, dalam bahasa biasa.",
              screen: { ...counselAiScreens.intelligenceHome, alt: "Halaman utama CounselAI yang bertanya situasi yang perlu dikendalikan, dengan ruang teks bebas dan tindakan pantas.", label: "Halaman utama" },
            },
            {
              label: "Ia menjadi kes",
              reason: "CounselAI tidak sekadar berbual. Penerangan itu disusun kepada siapa yang terlibat, apa yang didakwa dan sejauh mana seriusnya.",
              screen: { ...counselAiScreens.caseOverview, alt: "Gambaran kes dengan ringkasan AI, tag risiko dan senarai pihak terlibat yang disahkan.", label: "Gambaran kes" },
            },
            {
              label: "HR menyiasat",
              reason: "AI mencadangkan langkah seterusnya, seperti mengumpul bukti. Manusia yang memutuskan bila untuk meneruskan.",
              screen: { ...counselAiScreens.investigation, alt: "Langkah siasatan dengan status selesai dan sedang berjalan, di sebelah mesej AI yang meminta pengesahan sebelum meneruskan.", label: "Siasatan" },
            },
            {
              label: "AI mencadangkan keputusan",
              reason: "Cadangan hanya berguna jika anda nampak sebabnya, jadi setiap cadangan menunjukkan bukti di sebaliknya.",
              screen: { ...counselAiScreens.outcomeRecommendation, alt: "Cadangan keputusan AI dengan skor keyakinan, lima faktor berwajaran, alasan bertulis dan risiko yang ditandakan.", label: "Cadangan keputusan" },
            },
            {
              label: "HR memutuskan",
              reason: "AI tidak pernah membuat keputusan muktamad. HR boleh menolak cadangannya dan memilih keputusan lain.",
              screen: { ...counselAiScreens.outcomeRevision, alt: "Tab keputusan yang menunjukkan penolakan pelulus dan pilihan keputusan HR, di sebelah fail kes.", label: "Keputusan akhir" },
            },
          ],
          closing: "Matlamatnya bukan membina chatbot yang lebih pintar. Ia memberi situasi yang rumit di tempat kerja satu laluan yang jelas, daripada laporan pertama hingga keputusan yang adil.",
        },
      },
    },
  },
  {
    id: "mindline",
    title: "Mindline",
    previewItems: { en: ["Reflect", "Pace", "Boundaries"], bm: ["Refleksi", "Rentak", "Batasan"] },
    content: {
      en: {
        summary: "Reflective AI with boundaries.",
        category: "Sensitive AI · Interaction design",
        story: {
          problem: "How can a conversational AI support reflection without becoming intrusive or authoritative?",
          situation: "A generic AI companion can feel intrusive in a sensitive context. The interaction needed deliberate tone, pacing, and boundaries rather than more interface or implied authority.",
          insights: ["Conversational AI can become intrusive quickly.", "Tone, pacing, and boundaries are product mechanics.", "The interface should support reflection, not simulate authority."],
          decisions: [
            { title: "Set a conversation rhythm", explanation: "Designed a slower pattern for prompts and responses." },
            { title: "Make boundaries visible", explanation: "Treated tone and intervention timing as interaction decisions." },
            { title: "Reduce interface noise", explanation: "Removed unnecessary UI to keep attention on reflection." },
          ],
          artifact: "Conversation state and intervention model",
          resultBefore: "Generic AI companion",
          resultAfter: "Deliberately bounded reflective experience",
        },
      },
      bm: {
        summary: "AI reflektif yang berbatas.",
        category: "AI sensitif · Reka bentuk interaksi",
        story: {
          problem: "Bagaimana AI perbualan boleh menyokong refleksi tanpa menjadi mengganggu atau seolah-olah berautoriti?",
          situation: "Pembantu AI umum boleh terasa mengganggu dalam konteks sensitif. Interaksi ini memerlukan nada, rentak dan batasan yang disengajakan, bukannya lebih banyak antara muka atau gambaran autoriti.",
          insights: ["AI perbualan boleh menjadi mengganggu dengan cepat.", "Nada, rentak dan batasan ialah mekanik produk.", "Antara muka patut menyokong refleksi, bukan meniru autoriti."],
          decisions: [
            { title: "Tetapkan rentak perbualan", explanation: "Corak yang lebih perlahan direka untuk gesaan dan respons." },
            { title: "Jelaskan batasan", explanation: "Nada dan masa intervensi dianggap sebagai keputusan interaksi." },
            { title: "Kurangkan gangguan antara muka", explanation: "UI yang tidak perlu dibuang supaya tumpuan kekal pada refleksi." },
          ],
          artifact: "Model keadaan perbualan dan intervensi",
          resultBefore: "Pembantu AI umum",
          resultAfter: "Pengalaman reflektif dengan batasan yang disengajakan",
        },
      },
    },
  },
  {
    id: "sentient",
    title: "Sentient",
    previewItems: { en: ["Onboarding", "Wallet", "Learning"], bm: ["Pengenalan", "Dompet", "Pembelajaran"] },
    content: {
      en: { summary: "Learning Web3 wallets hands-on.", category: "Web3 · Learning project", story: null },
      bm: { summary: "Meneroka dompet Web3.", category: "Web3 · Projek pembelajaran", story: null },
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
