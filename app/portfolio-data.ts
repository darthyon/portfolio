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

export type CaseStudyNarrativeVisual =
  | { kind: "pending"; caption: string }
  | { kind: "journey"; caption: string; steps: readonly [string, string, string, string] }
  | { kind: "screens"; caption: string; screens: readonly [CaseStudyScreenshot, ...CaseStudyScreenshot[]] };

export interface CaseStudyNarrativeBeat {
  title: string;
  text: string;
  visual: CaseStudyNarrativeVisual;
}

export interface CaseStudyNarrative {
  beats: readonly [CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat, CaseStudyNarrativeBeat];
  closing: string;
}

export interface LocalizedProjectContent {
  summary: string;
  category: string;
  story: CaseStudyStory | null;
  narrative?: CaseStudyNarrative;
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

export const projects: readonly PortfolioProject[] = [
  {
    id: "welluber",
    title: "WellUber",
    previewItems: { en: ["Employer", "Balance", "Vouchers"], bm: ["Majikan", "Baki", "Baucar"] },
    content: {
      en: {
        summary: "An employer-aware benefits experience.",
        category: "Benefits · Product design and engineering",
        story: {
          problem: "How can a benefits product make employer context and usable balance clear?",
          situation: "Benefits are tied to an employer, while a generic benefits interface can hide that context. The experience needed to make available balance and unallocated or empty states understandable.",
          insights: ["Benefits are employer-scoped.", "Usable balance matters more than historical usage.", "Empty states are real product states."],
          decisions: [
            { title: "Lead with employer context", explanation: "Reframed Home around the employer that defines the benefits." },
            { title: "Prioritise usable balance", explanation: "Simplified the balance hierarchy around what can be used now." },
            { title: "Design the missing states", explanation: "Defined allocation and voucher states, including when nothing is available." },
          ],
          artifact: "Employer → allocation → balance → voucher state model",
          resultBefore: "Generic benefits UI",
          resultAfter: "Employer-aware product system",
        },
      },
      bm: {
        summary: "Pengalaman manfaat yang memahami konteks majikan.",
        category: "Manfaat · Reka bentuk dan kejuruteraan produk",
        story: {
          problem: "Bagaimana produk manfaat boleh menjelaskan konteks majikan dan baki yang boleh digunakan?",
          situation: "Manfaat terikat kepada majikan, tetapi antara muka yang umum boleh menyembunyikan konteks itu. Pengalaman ini perlu menjelaskan baki yang tersedia serta keadaan tanpa peruntukan atau kandungan.",
          insights: ["Manfaat bergantung pada majikan.", "Baki yang boleh digunakan lebih penting daripada sejarah penggunaan.", "Keadaan kosong ialah keadaan produk yang sebenar."],
          decisions: [
            { title: "Mulakan dengan konteks majikan", explanation: "Halaman Utama dibingkaikan semula mengikut majikan yang menyediakan manfaat." },
            { title: "Utamakan baki yang boleh digunakan", explanation: "Hierarki baki dipermudah mengikut jumlah yang boleh digunakan sekarang." },
            { title: "Reka keadaan yang tiada", explanation: "Keadaan peruntukan dan baucar ditentukan, termasuk apabila tiada yang tersedia." },
          ],
          artifact: "Model keadaan majikan → peruntukan → baki → baucar",
          resultBefore: "Antara muka manfaat umum",
          resultAfter: "Sistem produk yang memahami majikan",
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
        summary: "An operations workspace for planning trips and handling exceptions.",
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
        summary: "Ruang kerja operasi untuk merancang perjalanan dan menangani pengecualian.",
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
        summary: "A driver app shaped around the workday.",
        category: "Logistics · Mobile product design",
        story: null,
        narrative: {
          beats: [
            {
              title: "The old app split the workday into screens",
              text: "The old app was organised around Check-In, History, Trips and Account. Each feature worked, but drivers still had to piece together what came next.",
              visual: {
                kind: "screens", caption: "The old app separated the work into four destinations",
                screens: [
                  { ...myLorryDriverScreens.oldCheckIn, label: "Check-In", alt: "Old Check-In screen showing completed driver and vehicle checklists" },
                  { ...myLorryDriverScreens.oldHistory, label: "Check-In History", alt: "Old Check-In History screen showing rejected and pending checklists" },
                  { ...myLorryDriverScreens.oldTrips, label: "Trips", alt: "Old Trips screen showing an ongoing trip and ready-to-start trips" },
                  { ...myLorryDriverScreens.oldAccount, label: "Account", alt: "Old Account screen showing achievements, rank and monthly record" },
                ],
              },
            },
            {
              title: "The workday became the model",
              text: "The redesign followed the rhythm of a driver's day: prepare, drive, arrive, improve. That sequence connected tasks that had previously lived in separate screens.",
              visual: { kind: "journey", caption: "A driver's day", steps: ["Prepare", "Drive", "Arrive", "Improve"] },
            },
            {
              title: "Home surfaced the next action",
              text: "Home became a live state rather than a dashboard. It surfaces shift status, the current trip, the checklist and the next waypoint when each matters.",
              visual: {
                kind: "screens", caption: "Home responds to the driver's shift",
                screens: [
                  { ...myLorryDriverScreens.homeEmpty, label: "Not clocked in", alt: "MyLorry Driver Home showing a clock-in prompt above the current trip" },
                  { ...myLorryDriverScreens.homeOnShift, label: "On shift", alt: "MyLorry Driver Home showing the active shift and a pending vehicle checklist" },
                ],
              },
            },
            {
              title: "Location showed journey progress",
              text: "Existing trip location data became a way to show where the driver is, what comes next, the ETA and how the journey is progressing.",
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
              text: "The redesign turned achievements and rank into driving insights tied to what happened on the road: route adherence, idle time, harsh braking and trip events.",
              visual: {
                kind: "screens", caption: "Profile context and Driver Score detail",
                screens: [
                  { ...myLorryDriverScreens.profile, label: "Profile", alt: "Driver Profile showing score, points and rank above personal information" },
                  { ...myLorryDriverScreens.driverScore, label: "Driver Score", alt: "Driver Score showing performance breakdown, driving insights and a score trend" },
                ],
              },
            },
          ],
          closing: "The redesign didn’t remove the operational complexity. It reorganised it around the driver’s current state.",
        },
      },
      bm: {
        summary: "Aplikasi pemandu yang disusun mengikut hari kerja.",
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
              title: "Hari kerja menjadi model baharu",
              text: "Reka bentuk semula ini mengikut rentak hari kerja pemandu: bersedia, memandu, tiba dan tambah baik. Urutan itu menghubungkan tugas yang sebelum ini terpisah antara skrin.",
              visual: { kind: "journey", caption: "Hari kerja pemandu", steps: ["Bersedia", "Memandu", "Tiba", "Tambah baik"] },
            },
            {
              title: "Home menjelaskan tindakan seterusnya",
              text: "Home menjadi paparan keadaan semasa, bukan sekadar papan pemuka. Status syif, perjalanan semasa, senarai semak dan hentian seterusnya muncul apabila diperlukan.",
              visual: {
                kind: "screens", caption: "Home berubah mengikut keadaan syif pemandu",
                screens: [
                  { ...myLorryDriverScreens.homeEmpty, label: "Belum mula syif", alt: "Home MyLorry Driver memaparkan gesaan mula syif di atas perjalanan semasa" },
                  { ...myLorryDriverScreens.homeOnShift, label: "Sedang bertugas", alt: "Home MyLorry Driver memaparkan syif aktif dan senarai semak kenderaan yang belum selesai" },
                ],
              },
            },
            {
              title: "Lokasi menunjukkan kemajuan perjalanan",
              text: "Data lokasi sedia ada dalam Trips digunakan untuk menunjukkan kedudukan pemandu, destinasi seterusnya, anggaran masa ketibaan dan kemajuan perjalanan.",
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
              text: "Reka bentuk semula ini mengubah pencapaian dan kedudukan menjadi gambaran pemanduan yang berkait dengan tingkah laku sebenar: pematuhan laluan, masa melahu, brek mengejut dan peristiwa perjalanan.",
              visual: {
                kind: "screens", caption: "Konteks profil dan butiran Skor Pemandu",
                screens: [
                  { ...myLorryDriverScreens.profile, label: "Profil", alt: "Profil pemandu menunjukkan skor, mata dan kedudukan di atas maklumat peribadi" },
                  { ...myLorryDriverScreens.driverScore, label: "Skor Pemandu", alt: "Skor Pemandu menunjukkan pecahan prestasi, gambaran pemanduan dan trend skor" },
                ],
              },
            },
          ],
          closing: "Reka bentuk semula ini tidak menghapuskan kerumitan operasi. Ia menyusunnya semula mengikut keadaan semasa pemandu.",
        },
      },
    },
  },
  {
    id: "counselai",
    title: "CounselAI",
    previewItems: { en: ["Matter", "Evidence", "Response"], bm: ["Perkara", "Bukti", "Respons"] },
    content: {
      en: {
        summary: "A structured legal AI workflow prototype.",
        category: "Legal technology · 0→1 product exploration",
        story: {
          problem: "How can legal AI help someone form a matter without reducing the work to a chatbot?",
          situation: "The initial idea was broad: AI for lawyers. A useful experience needed to organise the matter and its evidence while making the AI's limits and provenance legible.",
          insights: ["Legal AI needs structure, provenance, and restraint.", "Users need help forming a case or problem, not just a chatbot.", "Trust must be designed into the interaction."],
          decisions: [
            { title: "Shape the product model", explanation: "Organised the work around a matter rather than an open-ended chat." },
            { title: "Structure legal context", explanation: "Gave evidence and context a place in the workflow." },
            { title: "Constrain the AI interaction", explanation: "Explored a response flow with clearer boundaries." },
          ],
          artifact: "User → matter → evidence/context → AI response flow",
          resultBefore: "“AI for lawyers” idea",
          resultAfter: "Coherent legal workflow prototype",
        },
      },
      bm: {
        summary: "Prototaip aliran kerja AI guaman yang berstruktur.",
        category: "Teknologi guaman · Penerokaan produk 0→1",
        story: {
          problem: "Bagaimana AI guaman boleh membantu membentuk sesuatu perkara tanpa menjadikannya sekadar chatbot?",
          situation: "Idea awalnya luas: AI untuk peguam. Pengalaman yang berguna perlu menyusun perkara dan buktinya sambil menjelaskan batasan serta asal usul respons AI.",
          insights: ["AI guaman memerlukan struktur, asal usul dan batasan.", "Pengguna perlu bantuan membentuk kes atau masalah, bukan sekadar chatbot.", "Kepercayaan mesti direka dalam interaksi."],
          decisions: [
            { title: "Bentuk model produk", explanation: "Kerja disusun mengikut perkara, bukan perbualan tanpa arah." },
            { title: "Susun konteks guaman", explanation: "Bukti dan konteks diberi tempat dalam aliran kerja." },
            { title: "Hadkan interaksi AI", explanation: "Aliran respons diteroka dengan sempadan yang lebih jelas." },
          ],
          artifact: "Aliran pengguna → perkara → bukti/konteks → respons AI",
          resultBefore: "Idea ‘AI untuk peguam’",
          resultAfter: "Prototaip aliran kerja guaman yang koheren",
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
        summary: "A deliberately bounded reflective AI experience.",
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
        summary: "Pengalaman AI reflektif dengan batasan yang disengajakan.",
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
      en: { summary: "Learning Web3 onboarding and wallet mechanics through exploration.", category: "Web3 · Learning project", story: null },
      bm: { summary: "Meneroka cara onboarding Web3 dan dompet digital berfungsi.", category: "Web3 · Projek pembelajaran", story: null },
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
