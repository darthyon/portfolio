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

export interface LocalizedProjectContent {
  summary: string;
  category: string;
  story: CaseStudyStory | null;
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
    previewItems: { en: ["Trips", "Status", "Earnings"], bm: ["Perjalanan", "Status", "Pendapatan"] },
    content: {
      en: {
        summary: "A focused mobile experience for drivers in the field.",
        category: "Logistics · Mobile product design",
        story: {
          problem: "How can drivers understand trip status quickly while work is moving and interruptible?",
          situation: "A desktop-derived workflow carried too much administrative detail into mobile use. Drivers needed quick status and earnings comprehension in conditions where attention and interaction time are limited.",
          insights: ["Drivers need fast status comprehension.", "Earnings and status matter more than admin detail.", "Mobile interaction must survive movement and interruption."],
          decisions: [
            { title: "Simplify trip cards", explanation: "Reduced each card to the information needed for the next action." },
            { title: "Strengthen status hierarchy", explanation: "Made trip status and earnings easier to find." },
            { title: "Make detail collapsible", explanation: "Used scroll and collapse behaviour to reduce noise without hiding detail entirely." },
          ],
          artifact: "Trip state lifecycle",
          resultBefore: "Desktop-derived workflow",
          resultAfter: "Focused field-use experience",
        },
      },
      bm: {
        summary: "Pengalaman mudah alih yang fokus untuk pemandu di lapangan.",
        category: "Logistik · Reka bentuk produk mudah alih",
        story: {
          problem: "Bagaimana pemandu boleh memahami status perjalanan dengan cepat ketika kerja bergerak dan sering terganggu?",
          situation: "Aliran kerja yang berasal dari desktop membawa terlalu banyak butiran pentadbiran ke telefon. Pemandu perlu memahami status dan pendapatan dengan cepat ketika masa dan perhatian terhad.",
          insights: ["Pemandu perlu memahami status dengan cepat.", "Pendapatan dan status lebih penting daripada butiran pentadbiran.", "Interaksi mudah alih mesti tahan pergerakan dan gangguan."],
          decisions: [
            { title: "Permudah kad perjalanan", explanation: "Setiap kad dikurangkan kepada maklumat untuk tindakan seterusnya." },
            { title: "Kuatkan hierarki status", explanation: "Status perjalanan dan pendapatan lebih mudah dicari." },
            { title: "Jadikan butiran boleh dilipat", explanation: "Tatal dan lipat mengurangkan gangguan tanpa membuang butiran sepenuhnya." },
          ],
          artifact: "Kitaran keadaan perjalanan",
          resultBefore: "Aliran kerja turunan desktop",
          resultAfter: "Pengalaman fokus untuk kegunaan di lapangan",
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
