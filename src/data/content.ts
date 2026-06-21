export const TERMINAL_COMMANDS = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "languages",
  "certifications",
  "contact",
  "resume",
  "open thinktrack",
  "open codeglow",
  "clear",
  "sounds",
  "ls",
  "snake",
  "tetris",
];

export const WELCOME_MESSAGE = `Initializing Afnan Workspace Runtime Engine v2.0.0...

[OK] Subsystem allocation: JetBrains Mono typography loaded.
[OK] Core routing protocol: Standard View cross-layer synchronization initialized.
[OK] Latency handshake: Open-Meteo API uplink synchronized to Mumbai, India.
[OK] Verification: Normalizing relational data structures to 3NF schema layer.

----------------------------------------------------------------------
Welcome to the interactive environment of Afnan Khan.
----------------------------------------------------------------------
I am a Frontend Developer transitioning into Full-Stack Systems.
This shell exposes direct parameters to inspect my architectural logic,
underlying technology choices, and project lifecycles.

Type 'help' to audit the environment or to list active commands.
Prefer a structural document view? Toggle 'Standard View' in the top right.

Shortcuts: Ctrl+T, Ctrl+E, Alt+F4. Try hidden commands! 🥚`;

export const PROMPT = "afnan@workspace:~$ ";

export const commandOutputs: Record<string, string> = {
  help: `
Available commands:

  about           Who I am and what I build
  experience      Work history and responsibilities
  projects        Projects overview
  skills          Technical skills by category
  education       Academic background
  languages       Spoken languages
  certifications  Credentials and courses
  contact         How to reach me
  resume          Download my resume

  open thinktrack    Deep-dive into ThinkTrack
  open codeglow      Deep-dive into CodeGlow

  sounds             Toggle workspace audio on/off

  snake              Launch retro Snake arcade game
  tetris             Launch retro Tetris arcade game

  clear           Clear the terminal
  ls              List all the commands

Type any command to run it.
`,

  about: `
Afnan Khan — Personal Workspace Runtime

I am a Frontend Developer transitioning into Full-Stack Engineering, currently based in Mumbai, India. My passion lies in building highly practical software products, advanced productivity systems, developer tooling, and modern full-stack web applications backed by deliberate architecture decisions. 

My primary philosophy revolves around systems thinking: completely understanding why an engineered problem exists before writing a single line of code, establishing clear architectural structures, and engineering clean, optimized software that remains easily maintainable for the next developer down the line. I am currently spending my cycles deeply exploring backend distributed architecture, advanced database design optimization, relational normalization methodologies, and shipping specialized tools that developers genuinely want to use.

→ Type 'contact' to get in touch | Type 'resume' to view credentials | Type 'projects' to audit active builds
`,

  ls: `
CORE NAVIGATION
 ├── help          ├── about         ├── experience
 ├── projects      ├── skills        ├── education
 ├── languages     ├── certifications└── contact
 └── resume

 PROJECT ACTIONS
 └── open thinktrack                 └── open codeglow

 ARCADE GAMES
 ├── snake                           └── tetris

 SYSTEM UTILITIES
 └── sounds                          └── clear
  `,

  experience: `
Work History & Engineering Professional Experience

Freelance Web Developer | Self-Employed Workstation
Period: 2023 – Present
• Designed, architected, and deployed robust full-stack web software installations for diverse businesses and engineering clients.
• Fabricated high-performance responsive landing systems and highly integrated e-commerce transactional applications.
• Successfully owned end-to-end technical requirements gathering, development sprint timelines, and iterative feedback lifecycles.
`,

  projects: `
Active Project Repositories & Software Implementations

 ThinkTrack — Collaborative Learning and Group Productivity Platform
• Architecture Focus: Normalization, Access Control Matrices, Transactional Lifecycles
• Core Stack: PHP, MySQL, Native JavaScript, Google OAuth Integration, PHPMailer
• Execution Parameter: Type 'open thinktrack' to audit the full structural lifecycle logs.
 → open thinktrack


 CodeGlow — Persistent Visual Code Highlighting Workspace Extension
• Architecture Focus: Content Hashing Algorithms, State Sync, Extension Engine Lifecycles
• Core Stack: TypeScript, Node.js runtime environment, VS Code Extension Engine API
• Execution Parameter: Type 'open codeglow' to audit the full structural lifecycle logs.
 → open codeglow
`,

  "open thinktrack": `
────────────────────────────────────────────────────────────────────────────────────────
ThinkTrack — Architectural Case Study & Systems Breakdown
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
Traditional study groups lack unified memory tracking systems. Valuable session notes remain isolated in local personal folders, individual progress metrics are completely fragmented, and group project accountability breaks down entirely due to the absence of a shared, transparent system state visualization layer.

The Engineered Solution:
A comprehensive web platform that enables structured engineering study groups to seamlessly share workspace learning sessions, track performance velocity transparently across all active members, and maintain team accountability using real-time progress visibility matrices instead of superficial gamified design patterns.

Source Registry: [github.com/afnanlabs/thinktrack]

Core Architectural Decisions:
• Implemented Role-Based Access Control (RBAC) securely at the application root from day zero. Every route, feature flag, and mutation was built around defensive permission checks.
• Fully normalized the underlying MySQL database schema into Third Normal Form (3NF) before writing a single line of procedural PHP logic to ensure strict data validation boundaries.
• Standardized on Google OAuth identity protocols to minimize internal storage surfaces, eliminate password vulnerability risks, and provide optimized authentication flows.
• Orchestrated transactional email notifications utilizing PHPMailer to handle automated session invites, weekly group progress digests, and event warnings asynchronously.

Key Engineering Metrics & Learnings:
RBAC is never simply an additive system feature; it is an foundational architectural decision that impacts every single query execution plan, routing protocol, and front-end interface layer. Retrofitting access controls late in a development cycle costs triple compared to building it first.
`,

  "open codeglow": `
────────────────────────────────────────────────────────────────────────────────────────
CodeGlow — Technical Architecture & Extensibility Breakdown
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
The native visual highlighting subsystem within modern IDEs is strictly session-based. Closing a file buffer instantly purges user highlights. During deep code reviews, intensive debugging loops, or initial codebase onboarding, this limitation forces developers to waste cognitive cycles reconstructing context every time they reopen a file.

The Engineered Solution:
A robust desktop editor extension that persists developer visual contexts securely across runtime sessions. The tracking mechanism links highlighting indices specifically to file paths and stable line text contents rather than highly volatile absolute line positions, ensuring highlights survive manual updates and large file refactors.

Source Registry: [github.com/afnanlabs/CodeGlow-exe]

Core Architectural Decisions:
• Built a specialized line content hashing parser to replace fragile absolute line number markers. Line numbers drift constantly during edits, whereas cryptographic hashes persist until code blocks change.
• Leveraged the extension architecture's internal 'globalState' context tracking layer to provide fast, reliable client-side persistence with zero external database dependencies.
• Decoupled highlighting computation code clean away from UI compilation routines using the native IDE Decoration rendering APIs for optimized performance.

Key Engineering Metrics & Learnings:
While extensible editor APIs are incredibly powerful, managing state mutations across a running editor viewport lifecycle has distinct performance constraints. Building direct developer tooling means your core audience notices every microsecond of rendering layout latency immediately.
`,

  skills: `
Frontend
  HTML5 · CSS3 · JavaScript · TypeScript · React · Tailwind CSS

Backend
  REST APIs · PHP

Database
  MySQL

Tools
  Git · GitHub · Docker · Vercel

Core CS
  DBMS · OOP · Operating Systems · Computer Networks
`,

  education: `
Academic Background

  Bachelor of Science in Information Technology (BSc IT)
  D.G. Ruparel College, Mumbai
  2023 – 2026
    · CGPI: 6.83 / 10.00

  Relevant coursework:
    · Database Management Systems
    · Object-Oriented Programming
    · Operating Systems
    · Computer Networks 

  Higher Secondary Certificate (HSC) — Commerce
  Lala Lajpatrai Institute of Management, Mumbai
  2021 – 2023
    · Aggregate Percentage: 72.83%

  Secondary School Certificate (SSC) — Maharashtra State Board
  Sacred Heart High School, Mumbai
  Class of 2021
    · Aggregate Percentage: 87.40%

`,

  languages: `
Spoken Languages

  English    Professional working proficiency
  Hindi      Native
  Urdu       Native
  Marathi    Native
`,

  certifications: JSON.stringify([
    {
      title: "Docker Essentials: A Developer Introduction",
      issuer: "IBM / Cognitive Class",
      year: 2026,
      url: "https://courses.cognitiveclass.ai/certificates/f59b4e19579741cfaaaed5d024f1ca01",
    },

    {
      title: "SQL and Relational Databases 101",
      issuer: "IBM Skills Network",
      year: 2026,
      url: "https://courses.cognitiveclass.ai/certificates/2e6fa7a8100c4c42a499db89cb7dd36b",
    },

    {
      title: "Claude Code 101",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/det4i2mxn2gx",
    },

    {
      title: "Claude 101",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/c9zpbmug7qrv",
    },

    {
      title: "Claude Code in Action",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/kontttnmh9w5",
    },

    {
      title: "Introduction to Agent Skill",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/s542sj62st5o",
    },

    {
      title: "Introduction to Claude Cowork",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/xjt83iky8pzf",
    },

    {
      title: "Claude Platform 101",
      issuer: "Anthropic",
      year: 2026,
      url: "https://verify.skilljar.com/c/9fix4umqz8u8",
    },

    {
      title: "Basics of Informational Visuals",
      issuer: "Cambridge Int. / UniAthena",
      year: 2026,
      url: "https://docs.uniathena.com/prod/course/certificate/345_1777894534_certificate.jpg",
    },

    {
      title: "Basics of Python",
      issuer: "Cambridge Int. / UniAthena",
      year: 2026,
      url: "https://docs.uniathena.com/prod/course/certificate/323_1777897137_certificate.jpg",
    },

    {
      //AI for Beginners - Ratan Tata Maharashtra State Skills University (2026)
      title: "AI for Beginners",
      issuer: "Ratan Tata Maharashtra State Skills University (2026)",
      year: 2026,
      url: "http://apps.mssu.ac.in/stc/TrainingPartner/StudentCertificateValidation?SrNo=2500005235",
    },
  ]),

  contact: `
Email      [khanafnan1108@gmail.com]
LinkedIn   [linkedin.com/in/afnankhan1108-dev]
GitHub     [github.com/afnanlabs]
Blog       []
X          []
LeetCode   [leetcode.com/afnankhan110805]
Resume     → resume (downloads PDF)
`,

  resume: "__DOWNLOAD_RESUME__",

  sounds: "__SOUNDS_TOGGLE__",

  snake: "__LAUNCH_SNAKE__",
  tetris: "__LAUNCH_TETRIS__",
};

// Standard view file definitions
export type FileType = "md" | "ts" | "json" | "pdf" | "webp" | "js";

export interface FileEntry {
  id: string;
  name: string;
  extension: FileType;
  displayName: string;
}

export interface FolderEntry {
  name: string;
  files: FileEntry[];
}

export const AFNAN_FILES: FileEntry[] = [
  {
    id: "profile",
    name: "profile",
    extension: "ts",
    displayName: "profile.ts",
  },
  {
    id: "experience",
    name: "experience",
    extension: "ts",
    displayName: "experience.ts",
  },
  {
    id: "education",
    name: "education",
    extension: "json",
    displayName: "education.json",
  },
  {
    id: "certifications",
    name: "certifications",
    extension: "ts",
    displayName: "certifications.ts",
  },
  {
    id: "contact",
    name: "contact",
    extension: "ts",
    displayName: "contact.ts",
  },
  {
    id: "skills",
    name: "skills",
    extension: "json",
    displayName: "skills.json",
  },
];

export const PROJECTS_FILES: FileEntry[] = [
  {
    id: "thinktrack",
    name: "thinktrack",
    extension: "ts",
    displayName: "thinktrack.ts",
  },
  {
    id: "codeglow",
    name: "codeglow",
    extension: "ts",
    displayName: "codeglow.ts",
  },
];

export const ASSETS_FILES: FileEntry[] = [
  { id: "resume", name: "resume", extension: "pdf", displayName: "resume.pdf" },
  {
    id: "profile",
    name: "profile",
    extension: "webp",
    displayName: "profile.webp",
  },
];

export const EXPLORER_FOLDERS: FolderEntry[] = [
  { name: "AFNAN", files: AFNAN_FILES },
  { name: "PROJECTS", files: PROJECTS_FILES },
  { name: "ASSETS", files: ASSETS_FILES },
];

export const ALL_FILES: FileEntry[] = [
  ...AFNAN_FILES,
  ...PROJECTS_FILES,
  ...ASSETS_FILES,
];

export const fileContents: Record<string, string> = {
  profile: `// profile.ts
// Afnan Khan — Personal Profile

interface Profile {
  name: string;
  role: string;
  location: string;
  focus: string[];
  currentlyExploring: string[];
}

const profile: Profile = {
  name: "Afnan Khan",
  role: "Frontend Developer → Full-Stack Engineer",
  location: "Mumbai, India",
  focus: [
    "Practical software products",
    "Productivity systems",
    "Developer tooling",
    "Full-stack web applications with deliberate architecture",
  ],
  currentlyExploring: [
    "Backend architecture",
    "Database design",
    "Building tools that developers actually want to use",
  ],
};

export default profile;`,

  experience: `// experience.ts
// Afnan Khan — Work History

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const experience: Experience[] = [
  {
    role: "Freelance Web Developer",
    company: "Self-employed",
    location: "Remote",
    period: "2023 – Present",
    responsibilities: [
      "Designed and developed full-stack web applications for clients",
      "Built responsive landing pages and e-commerce storefronts",
      "Managed client requirements, timelines, and feedback cycles",
      "Delivered projects using React, PHP, and MySQL",
    ],
  },
];

export default experience;`,

  education: `{
  "education": [
    {
      "degree": "Bachelor of Science in Information Technology (BSc IT)",
      "institution": "D.G. Ruparel College, Mumbai",
      "period": "2023 – 2026",
      "performance": "CGPI: 6.83 / 10.00",
      "coursework": [
        "Database Management Systems",
        "Object-Oriented Programming",
        "Operating Systems",
        "Computer Networks"
      ]
    },
    {
      "degree": "Higher Secondary Certificate (HSC) — Commerce",
      "institution": "Lala Lajpatrai Institute of Management, Mumbai",
      "period": "2021 – 2023",
      "performance": "Aggregate Percentage: 72.83%",
      "coursework": []
    },
    {
      "degree": "Secondary School Certificate (SSC) — Maharashtra State Board",
      "institution": "Sacred Heart High School, Mumbai",
      "period": "Class of 2021",
      "performance": "Aggregate Percentage: 87.40%",
      "coursework": []
    }
  ]
}`,

  certifications: `// certifications.ts
// Credentials

interface Certification {
  name: string;
  issuer: string;
  year: number;
  certId: string; // Unique tracking ID for dynamic click/view logic
  description?: string;
}

const certifications: Certification[] = [
  {
    name: "Docker Essentials: A Developer Introduction",
    issuer: "IBM / Cognitive Class",
    year: 2026,
    certId: "ibm-docker-2026",
  },
  {
    name: "SQL and Relational Databases 101",
    issuer: "IBM Skills Network",
    year: 2026,
    certId: "ibm-sql-2026",
  },
  {
    name: "Claude Code 101",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-cc101",
  },
  {
    name: "Claude 101",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-c101",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-ccia",
  },
  {
    name: "Introduction to Agent Skill",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-ias",
  },
  {
    name: "Introduction to Claude Cowork",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-icc",
  },
  {
    name: "Claude Platform 101",
    issuer: "Anthropic",
    year: 2026,
    certId: "anthropic-cp101",
  },
  {
    name: "Basics of Informational Visuals",
    issuer: "Cambridge Int. / UniAthena",
    year: 2026,
    certId: "athena-visuals",
  },
  {
    name: "Basics of Python",
    issuer: "Cambridge Int. / UniAthena",
    year: 2026,
    certId: "athena-python",
  },
  {
    name: "AI for Beginners",
    issuer: "Ratan Tata Maharashtra State Skills University",
    year: 2026,
    certId: "rtmssu-aibeginner",
  }
];

export default certifications;`,

  contact: `// contact.ts
// Afnan Khan — Contact Information

interface Contact {
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

const contact: Contact = {
  email: "khanafnan1108@gmail.com",
  linkedin: "linkedin.com/in/afnankhan1108-dev",
  github: "github.com/afnanlabs",
  resume: "/resume.pdf",
};

export default contact;`,

  skills: `{
  "frontend": [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Tailwind CSS"
  ],
  "backend": [
    "REST APIs",
    "PHP"
  ],
  "database": [
    "MySQL"
  ],
  "tools": [
    "Git",
    "GitHub",
    "Docker",
    "Vercel"
  ],
  "core_cs": [
    "DBMS",
    "OOP",
    "Operating Systems",
    "Computer Networks"
  ]
}`,

  thinktrack: `// thinktrack.ts
// ThinkTrack — Collaborative Learning Platform

interface ThinkTrackProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const thinktrack: ThinkTrackProject = {
  name: "ThinkTrack",
  tagline: "Collaborative learning and productivity platform",

  problem: \`Study groups have no shared memory. Notes live in personal
folders. Progress tracking is individual. Accountability breaks down
because nobody can see the group's state.\`,

  solution: \`A web platform where study groups share structured learning
sessions, track progress across members, and hold each other
accountable through visibility — not gamification.\`,

  architecture: [
    "Role-based access control from day one, not bolted on",
    "MySQL schema normalised to 3NF before writing any PHP",
    "Google OAuth for authentication — no password storage",
    "PHPMailer for transactional email — session invites, progress digests",
  ],

  learnings: [
    "RBAC is a structural decision that shapes every query and route",
    "Building RBAC in late costs 3x as much as building it first",
  ],

  stack: ["PHP", "MySQL", "JavaScript", "Google OAuth", "PHPMailer"],
};

export default thinktrack;`,

  codeglow: `// codeglow.ts
// CodeGlow — VS Code Persistent Highlight Extension

interface CodeGlowProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const codeglow: CodeGlowProject = {
  name: "CodeGlow",
  tagline: "VS Code extension for persistent code highlighting",

  problem: \`VS Code's built-in highlighting is session-only. Close the file,
lose the highlights. For code review, debugging, or navigating unfamiliar
codebases, this forces you to rebuild context every time you return.\`,

  solution: \`An extension that persists highlights across sessions using
content hashing rather than line numbers — so highlights survive edits.\`,

  architecture: [
    "Line content hashing instead of line number anchoring",
    "VS Code ExtensionContext.globalState for zero-setup persistence",
    "Decoration API for clean separation of logic and display",
  ],

  learnings: [
    "VS Code Extension API has sharp edges around state persistence",
    "Developer tooling users notice every rough edge in the experience",
  ],

  stack: ["TypeScript", "VS Code Extension API"],
};

export default codeglow;`,
};
