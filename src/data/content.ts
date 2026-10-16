export const TERMINAL_COMMANDS = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "languages",
  "certs",
  "contact",
  "resume",
  "open hrms",
  "open thinktrack",
  "open afnkit",
  "open codeglow",
  "open somnus",
  "open fitscore",
  "clear",
  "sounds",
  "snake",
  "tetris",
  "whoami",
  "neofetch",
  "ls",
  "ascii",
  "fortune",
  "cowsay",
  "history",
  "stats",
  "coffee",
  "uptime",
  "date",
];

export const WELCOME_MESSAGE = `Initializing Afnan Workspace Runtime Engine v2.0.0...

[OK] Typography subsystem loaded.
[OK] Environment synchronized: Mumbai, India.
[OK] Workspace ready. 
                                
       ▄████▄   ████████  ███    ██▄   ▄████▄   ███    ██▄
      ██▓  ▓██  ██▓       ████   ███  ██▓  ▓██  ████   ███
      ████████  ██████    ██▓██  ███  ████████  ██▓██  ███
      ██▓  ▓██  ██▓       ███ ██ ███  ██▓  ▓██  ███ ██ ███
      ██▓  ▓██  ██▓       ███  █████  ██▓  ▓██  ███  █████

    ██   ██  ██████  ██████  ██   ██  ███████ ██████   ▄████▄    ██████ ████████
    ██   ██ ██    ██ ██   ██ ██  ██   ██      ██   ██ ██▓  ▓██  ██      ██▓
    ██ █ ██ ██    ██ ██████  █████    ███████ ██████  ████████ ██       ██████
    ███████ ██    ██ ██   ██ ██  ██        ██ ██      ██▓  ▓██ ██       ██▓
     ██  ██  ██████  ██   ██ ██   ██  ███████ ██      ██▓  ▓██  ██████  ████████
                              
  Type 'help' to explore available commands.  
  Shortcuts: Ctrl+T, Ctrl+E, Alt+F4. Try hidden commands!`;

export const PROMPT = "afnan@workspace:~$ ";

const CERTIFICATIONS = [
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
];

export const FORTUNES = [
  `"The best error message is the one that never shows up."
                         — Thomas Fuchs`,

  `"Programs must be written for people to read,
and only incidentally for machines to execute."
                         — Harold Abelson`,

  `"First, solve the problem.
Then, write the code."
                         — John Johnson`,

  `"Talk is cheap.
Show me the code."
                         — Linus Torvalds`,

  `"Code never lies,
comments sometimes do."
                         — Ron Jeffries`,

  `"Any fool can write code that a computer can understand.
Good programmers write code that humans can understand."
                         — Martin Fowler`,

  `"Simplicity is the soul of efficiency."
                         — Austin Freeman`,

  `"Experience is the name everyone gives to their mistakes."
                         — Oscar Wilde`,

  `"The only way to learn a new programming language
is by writing programs in it."
                         — Dennis Ritchie`,

  `"Make it work.
Make it right.
Make it fast."
                         — Kent Beck`,
];
export const commandOutputs: Record<string, string> = {
  ascii: `
        ▄████▄   ████████  ███    ██▄   ▄████▄   ███    ██▄
      ██▓  ▓██  ██▓       ████   ███  ██▓  ▓██  ████   ███
      ████████  ██████    ██▓██  ███  ████████  ██▓██  ███
      ██▓  ▓██  ██▓       ███ ██ ███  ██▓  ▓██  ███ ██ ███
      ██▓  ▓██  ██▓       ███  █████  ██▓  ▓██  ███  █████
`,

  cowsay: `
 _______________________
< Keep shipping. 🚀 >
 -----------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`,

  history: `Use arrow keys (↑ ↓) to navigate command history`,

  help: `
Available Commands:

  Portfolio:
    about               Who I am and what I build
    experience          Work history and impact
    projects            What I've shipped
    skills              Technical stack by category
    education           Academic background
    languages           Spoken languages
    certs               Credentials and training
    contact             How to reach me
    resume              Download resume PDF

    open hrms           Architecture deep-dive: HRMS
    open thinktrack     Architecture deep-dive: ThinkTrack
    open afnkit         Architecture deep-dive: Afnkit
    open codeglow       Architecture deep-dive: CodeGlow
    open somnus         Architecture deep-dive: Somnus
    open fitscore       Architecture deep-dive: FitScore

  Fun:
    sounds              Toggle workspace audio on/off
    ascii               Display my name in ASCII art
    fortune             Show a random programming quote
    cowsay              ASCII cow delivers wisdom
    coffee              Brew a virtual coffee
    snake               Retro Snake arcade
    tetris              Retro Tetris arcade

  System:
    whoami              Identity probe
    neofetch            System information
    history             Show command history
    uptime              Portfolio uptime
    date                Current system date & time
    stats               Portfolio statistics

  Utility:
    ls                  List available commands
    help                Show available commands
    clear               Clear the terminal

Type any command to run it.
`,

  whoami: `
afnan

uid=1000(afnan)
gid=1000(developers)
groups=4(adm),24(cdrom),27(sudo),46(plugdev),1000(developers)

Role:      Full Stack Engineer
Location:  Mumbai, India
Focus:     Full-Stack Development & Developer Tools

→ Run 'about' for full profile
`,
  neofetch: `
             .            afnan@workspace
           .o8.           ──────────────────────────────
         .o8888.          Environment: Portfolio v2.0
       .o88888888.        Host:        portfolio.local
      o8888888888888.     Shell:       afnan-sh
      88888888888888P'    Role:        Full Stack Developer
      '988888888888'      Location:    Mumbai, India
         'Y888P'          Stack:       JavaScript · TypeScript · React · Node.js
            '             Tools:       Git · Docker · Postman · Burp Suite · Jira
                          Focus:       Developer Tools & Practical Software
                          Building:    Since 2025
                          GitHub:      github.com/afnanlabs
                          Contact:     → run 'contact'
`,

  about: `
Afnan Khan

Full Stack Developer Intern · Mumbai, India

I build software that solves real problems — productivity systems, developer tooling, and full-stack web applications with deliberate architecture.

My focus is systems thinking: understanding why a problem exists before deciding how to solve it, making explicit architecture decisions, and writing code that makes sense to the next person who reads it.

Currently deepening: backend architecture, database design, and building tools developers actually want to use.

2+ years building. 10+ shipped products. Always learning.

→ experience    → projects    → contact
`,

  ls: `
CORE NAVIGATION
 ├── help          ├── about         ├── experience
 ├── projects      ├── skills        ├── education
 ├── languages     ├── certs         ├── contact
 └── resume

PROJECT ACTIONS
 ├── open hrms       ├── open thinktrack   ├── open afnkit
 ├── open codeglow   ├── open somnus       └── open fitscore

FUN & EASTER EGGS
 ├── ascii        ├── fortune        ├── cowsay
 ├── coffee       ├── snake          └── tetris

SYSTEM
 ├── whoami       ├── neofetch       ├── uptime
 ├── date         ├── stats          ├── history
 └── sounds

UTILITY
 ├── help         ├── ls
 └── clear
`,

  stats: `
Portfolio Statistics

  Projects          : 10+
  Technologies      : 15+
  Certificates      : 14
  Languages         : 5
  Experience        : 1+ Years

  Current Focus
  → Node.js
  → Express.js
  → PostgreSQL
`,

  coffee: `
        ( (
         ) )
      ........
      |      |]
      \\      /
       \`----'

Brewing coffee...

Error: Coffee machine not connected ☕
`,

  experience: `
Full-Stack Developer Intern | Marcos Quay Sporting Excellence Pvt Ltd
Period: July 2026 - Oct 2026
Location: Mumbai, India

• Led the Human Resources Management System (HRMS) project as the sole developer,
developing recruitment automation functionality to enable HR to manage hiring workflows and track
candidates throughout the recruitment process.
• Contributed to the company’s main website-to-mobile conversion project, implementing and integrating
mobile app features with existing authentication APIs and navigation workflows.
• Developed and maintained full-stack features across HRMS, Coach, School Management, and
administrative platforms using Vue.js, Node.js, Express.js, MariaDB/MySQL, and REST APIs.
• Resolved 15+ bugs and integration issues through systematic debugging, SQL analysis, and backend
troubleshooting.
• Delivered PDF generation, email automation, responsive UI improvements, and role-based
administrative workflows across internal applications.`,

  projects: `
Active Project Repositories & Software Implementations

 HRMS — Human Resource Management System
• Full-stack internal HR platform: employee administration, document management, and automated letter generation (offers, contracts, commitments, appointments)
• Core Stack: Vue.js, Vite, Node.js, Express.js, MariaDB
• Execution Parameter: Type 'open hrms' to audit the full structural lifecycle logs.
 → open hrms

 ThinkTrack — Collaborative Learning and Group Productivity Platform
• Architecture Focus: Normalization, Access Control Matrices, Transactional Lifecycles
• Core Stack: PHP, MySQL, Native JavaScript, Google OAuth Integration, PHPMailer
• Execution Parameter: Type 'open thinktrack' to audit the full structural lifecycle logs.
 → open thinktrack

 Afnkit — Express-Inspired HTTP Framework
• Engineered Afnkit, an original Express-inspired HTTP framework in strict TypeScript on Node.js
native HTTP APIs with zero runtime dependencies, using a layered Application / Router /
Route / Layer architecture driven by a single next() dispatch closure.
• Implemented method-aware routing and ordered middleware chaining via next() that runs exactly
one handler per call, with error propagation for synchronous throws and rejected async handlers and
deliberate 404, 405 (with Allow), and 500 responses.
• Built developer-facing res.status(), res.send(), and res.json() helpers with correct content types and
per-request request/response prototype extension, plus 31 automated tests authored with Node’s
built-in node:test against real HTTP servers; published on npm as afnkit@0.1.0 (npm i afnkit).
• Execution Parameter: Type 'open afnkit' to audit the full structural lifecycle logs.
 → open afnkit

 CodeGlow — Persistent Visual Code Highlighting Workspace Extension
• Developed a TypeScript VS Code extension providing persistent color-coded code annotations through
native Command Palette and editor context menu integrations.
• Engineered highlight tracking using serialized range data structures and VS Code event APIs, maintaining
annotation accuracy across code edits and undo/redo operations.
• Built a lightweight architecture using the VS Code Decoration API with zero backend dependencies and
packaged the extension as a production-ready VSIX build.
• Execution Parameter: Type 'open codeglow' to audit the full structural lifecycle logs.
 → open codeglow

 Somnus — Sleep Quality Analyzer
• Web application that presents sleep-related information through an accessible, readable interface
• Core Focus: user experience, application flow, and data presentation
• Deployment: Vercel
• Execution Parameter: Type 'open somnus' to audit the full structural lifecycle logs.
 → open somnus

 FitScore — Resume Match Analyzer
• Web application that compares a resume against a job opportunity and presents the alignment result
• Core Focus: translating a practical problem into an application workflow users can act on
• Deployment: publicly deployed
• Execution Parameter: Type 'open fitscore' to audit the full structural lifecycle logs.
 → open fitscore
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
  "open afnkit": `
────────────────────────────────────────────────────────────────────────────────────────
Afnkit — Express-Inspired HTTP Framework
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
Express is the de-facto standard for Node HTTP servers, yet its middleware pipeline, routing, and error propagation are effectively a black box to anyone learning backend engineering. At the other extreme, Node's native http module is honest but low-level — every project re-implements routing, method dispatch, and response helpers from scratch. Developers are stuck choosing between "too magic" and "too raw," with no readable, type-safe middle ground.

The Engineered Solution:
An original HTTP framework that faithfully reproduces Express's programming model — the express() factory, app.get / app.post / app.use, a real next() middleware chain, and Router / Layer / Route — built directly on Node's native http APIs in strict TypeScript. The entire request lifecycle is explicit and type-checked, so the framework doubles as a working server and a reference implementation of how Express-style routing actually works.

Source Registry: [github.com/afnanlabs/afnkit-core]

Core Architectural Decisions:
- Explicit middleware advancement over nested callbacks. Middleware is modeled as a linear Layer stack advanced by a next() function, making request flow — including the transition into error-handling layers — deterministic and individually testable. This design also exposes and fixes the classic "handler forgets to call next()" failure mode where a request hangs.
- Correct HTTP semantics at the router boundary. The router distinguishes path existence from method support, returning 404 for unknown paths but 405 Method Not Allowed with a proper Allow header when a path exists without the requested method — instead of collapsing both cases into 404.
- Prototype enrichment instead of wrapper objects. Node's IncomingMessage / ServerResponse are augmented via prototype chaining (Object.setPrototypeOf) to add status(), send(), and json() helpers plus correct content handling (Content-Length, Buffer → application/octet-stream) — no wrapping or copying, so native performance and object identity are preserved.

Key Engineering Metrics & Learnings:
Achieved zero runtime dependencies (TypeScript and @types/node are dev-only), compiled under strict TypeScript with no any or @ts-ignore, and validated by 31 tests written against Node's native node:test runner — no test framework dependency. The package is MIT-licensed and containerized with a multi-stage, non-root Docker image. Building an API that other developers compose on top of turns every "edge case" into a contract you must honor; a forensic audit that surfaced and fixed nine latent defects (method dispatch, hang-on-missing-route, double-send, error-handler arity, and more) demonstrated just how much real correctness lives in the seams between abstractions.
`,

  "open hrms": `

────────────────────────────────────────────────────────────────────────────────────────
HRMS — Human Resource Management System
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
HR operations run on documents. Offers, contracts, commitment letters and appointment letters each follow their own rules and approvals, and producing them by hand is slow, repetitive and easy to get wrong. Employee records scattered across spreadsheets make the process harder to audit and keep consistent.

The Engineered Solution:
An internal HR management system covering employee-related administrative processes and document management. It generates offer, contract, commitment and appointment letters from structured employee data, supported by dedicated backend routes, a relational schema and administrative interfaces. Built during my internship at Marcos Quay Sporting Excellence.

Source Registry: [internal platform — Marcos Quay Sporting Excellence]

Core Architectural Decisions:
• Separation of concerns across the stack: Vue + Vite for the administrative interfaces, Express for the API layer, MariaDB for persistence.
• Document generation treated as a backend concern — letters are produced from structured data rather than hand-edited files, keeping records and documents consistent.
• Schema-first design: employee, department and document tables modelled before the administrative workflows were wired on top of them.
• Workflow-oriented implementation — one complete path from an HR admin action in the UI, through the API route, into the database write and the generated document.

Key Engineering Metrics & Learnings:
Working on real HR requirements showed that the hard part of business software is modelling the workflow correctly, not the code itself. It also made clear why frontend components, backend routes and database operations have to agree on a single definition of the data — and why an action that touches several tables needs to be thought through as one transaction.

Stack: Vue.js · Vite · Node.js · Express.js · MariaDB
`,

  "open somnus": `

────────────────────────────────────────────────────────────────────────────────────────
Somnus — Sleep Quality Analyzer
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
Sleep data is easy to record but hard to read. Raw numbers and logs don't tell a person whether their sleep was actually good, or what changed between one night and the next.

The Engineered Solution:
A web application built to present sleep-related information in a genuinely useful way. The focus is on the user experience and application flow — taking sleep data in and returning it in a form a user can understand and act on. Deployed on Vercel, which took the project from local development to a publicly accessible deployment.

Source Registry: [available on request]

Core Architectural Decisions:
• Application flow designed first: input the sleep data, derive the quality signal, present the result in a readable interface.
• Information hierarchy kept deliberately simple so the sleep signals are understandable without any interpretation effort from the user.
• Deployed to Vercel as part of the project, treating "reaching a public URL" as part of the deliverable rather than an afterthought.

Key Engineering Metrics & Learnings:
Presenting data well is a separate skill from producing it. Building Somnus reinforced that the interface is where a project's value actually becomes visible to the person using it, and that shipping to a public deployment exposes issues local development never does.

Stack: Web Application · Vercel
`,

  "open fitscore": `

────────────────────────────────────────────────────────────────────────────────────────
FitScore — Resume Match Analyzer
────────────────────────────────────────────────────────────────────────────────────────

The Problem Space:
There's no easy way to tell how well a resume actually lines up with a specific job opportunity. Job seekers end up guessing, re-reading both documents, and applying without a clear sense of where they align and where they don't.

The Engineered Solution:
A web application that compares a resume against job requirements and presents the alignment as a result a user can understand. It focuses on making resume-to-role comparison accessible through a straightforward web interface instead of a manual, error-prone read-through.

Source Registry: [deployed — link available on request]

Core Architectural Decisions:
• Problem-first scope: the workflow was defined around the single question "how well does this resume match this role?" before any implementation.
• Result presentation kept legible — the outcome is shown in a way users can act on rather than as an opaque score.
• Written as a deployed web application, keeping the full path from local development to a public URL inside the project scope.

Key Engineering Metrics & Learnings:
FitScore was an exercise in translating a practical problem into an application workflow, and in deciding what a result must look like to be useful. The matching logic is deliberately explicit, and I'm happy to walk through how it works.

Stack: Web Application
`,

  skills: `
Technical Stack

Languages
  JavaScript (ES6+) · TypeScript · Python · C++

Frontend
  React · React Native · Next.js · Vue.js · Tailwind CSS

Backend
  Node.js · Express.js · REST APIs

Database
  MySQL · PostgreSQL · Redis

Tools
  Git · GitHub · Postman · Burp Suite · Jira · Docker

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

  certs: `
${CERTIFICATIONS.map(
  (cert) => `[${cert.title}](${cert.url}) — ${cert.issuer} · ${cert.year}`,
).join("\n\n")}
`,

  contact: `
Email      [khanafnan1108@gmail.com]
LinkedIn   [linkedin.com/in/afnankhan1108-dev]
GitHub     [github.com/afnanlabs]
Blog       [afnan-log.vercel.app]
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
    id: "hrms",
    name: "hrms",
    extension: "ts",
    displayName: "hrms.ts",
  },
  {
    id: "thinktrack",
    name: "thinktrack",
    extension: "ts",
    displayName: "thinktrack.ts",
  },
  {
    id: "afnkit",
    name: "afnkit",
    extension: "ts",
    displayName: "afnkit.ts",
  },
  {
    id: "codeglow",
    name: "codeglow",
    extension: "ts",
    displayName: "codeglow.ts",
  },
  {
    id: "somnus",
    name: "somnus",
    extension: "ts",
    displayName: "somnus.ts",
  },
  {
    id: "fitscore",
    name: "fitscore",
    extension: "ts",
    displayName: "fitscore.ts",
  },
];

export const ASSETS_FILES: FileEntry[] = [
  { id: "resume", name: "resume", extension: "pdf", displayName: "Afnan_Khan_Resume.pdf" },
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
// Afnan Khan — Technical Contributions

interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

const experience: Experience[] = [
  {
    role: "Full-Stack Software Engineer (Independent Labs)",
    company: "Self-Directed Architecture",
    location: "Mumbai, India",
    period: "2024 – Present",
    responsibilities: [
      "Architected modular full-stack web architectures utilizing modern tech stacks including React, Node.js, and procedural PHP with MySQL backends.",
      "Engineered a secure academic productivity engine featuring custom Role-Based Access Control (RBAC) and third-party Google OAuth integration.",
      "Designed fully normalized relational database schemas down to Third Normal Form (3NF) to enforce high data integrity and optimize execution runtime.",
      "Managed local codebases systematically using Git version control, implementing atomic commits and descriptive documentation practices.",
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
  resume: "/Afnan_Khan_Resume.pdf",
};

export default contact;`,

  skills: `{
  "languages": [
    "JavaScript (ES6+)",
    "TypeScript",
    "Python",
    "C++"
  ],
  "frontend": [
    "React",
    "React Native",
    "Next.js",
    "Vue.js",
    "Tailwind CSS"
  ],
  "backend": [
    "Node.js",
    "Express.js",
    "REST APIs"
  ],
  "database": [
    "MySQL",
    "PostgreSQL",
    "Redis"
  ],
  "tools": [
    "Git",
    "GitHub",
    "Postman",
    "Burp Suite",
    "Jira",
    "Docker"
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

  afnkit: `// afnkit.ts
// Afnkit — Express-Inspired HTTP Framework

interface AfnkitProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const afnkit: AfnkitProject = {
  name: "Afnkit",
  tagline: "Express-inspired HTTP framework in strict TypeScript",

  problem: \`Express is the de-facto standard for Node HTTP servers, yet its
middleware pipeline, routing and error propagation read like a black box.
Node's native http module is honest but low-level, so every project
re-implements routing, method dispatch and response helpers from scratch.
There is no readable, type-safe middle ground.\`,

  solution: \`An HTTP framework that reproduces Express's programming model —
the express() factory, app.get / app.post / app.use, a real next() middleware
chain, and Router / Layer / Route — built directly on Node's native http APIs
in strict TypeScript with zero runtime dependencies.\`,

  architecture: [
    "Layered Application / Router / Route / Layer design advanced by a single next() dispatch closure",
    "Correct HTTP semantics: 404 for unknown paths, 405 + Allow header for unsupported methods",
    "Prototype enrichment (Object.setPrototypeOf) for status(), send() and json() helpers",
    "Error propagation for synchronous throws and rejected async handlers",
  ],

  learnings: [
    "A framework turns every edge case into a contract you have to honour",
    "Explicit middleware advancement beats nested callbacks for readability",
  ],

  stack: ["TypeScript", "Node.js", "node:test"],
};

export default afnkit;`,

  hrms: `// hrms.ts
// HRMS — Human Resource Management System

interface HrmsProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const hrms: HrmsProject = {
  name: "HRMS",
  tagline: "Internal HR platform with automated letter generation",

  problem: \`HR operations run on documents — offers, contracts,
commitment letters and appointment letters — each with its own rules and
approvals. Handled manually they are slow to produce and easy to get wrong,
and employee records spread across spreadsheets are hard to keep consistent.\`,

  solution: \`An internal HR management system covering employee-related
administrative processes and document management, generating offer,
contract, commitment and appointment letters from structured employee data
instead of hand-edited files.\`,

  architecture: [
    "Vue + Vite administrative interfaces for HR workflows",
    "Express API routes dedicated to employee and document operations",
    "MariaDB relational schema modelled before the workflows built on top",
    "Letter generation treated as a backend concern driven by structured data",
  ],

  learnings: [
    "Modelling the business workflow correctly matters more than the code",
    "Frontend, API and database must agree on one definition of the data",
  ],

  stack: ["Vue.js", "Vite", "Node.js", "Express.js", "MariaDB"],
};

export default hrms;`,

  somnus: `// somnus.ts
// Somnus — Sleep Quality Analyzer

interface SomnusProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const somnus: SomnusProject = {
  name: "Somnus",
  tagline: "Sleep quality analyzer that makes sleep data readable",

  problem: \`Sleep data is easy to record but hard to read. Raw numbers and
logs do not tell a person whether their sleep was actually good, or what
changed between one night and the next.\`,

  solution: \`A web application that presents sleep-related information in a
useful way, focused on the user experience and application flow — sleep data
goes in, an understandable quality signal comes out. Deployed on Vercel.\`,

  architecture: [
    "Application flow designed first: input data, derive quality, present result",
    "Information hierarchy kept simple so sleep signals need no interpretation",
    "Deployed on Vercel — public deployment treated as part of the deliverable",
  ],

  learnings: [
    "Presenting data well is a separate skill from producing it",
    "Shipping publicly exposes issues local development never surfaces",
  ],

  stack: ["Web Application", "Vercel"],
};

export default somnus;`,

  fitscore: `// fitscore.ts
// FitScore — Resume Match Analyzer

interface FitScoreProject {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  architecture: string[];
  learnings: string[];
  stack: string[];
}

const fitscore: FitScoreProject = {
  name: "FitScore",
  tagline: "Resume match analyzer for comparing a resume against a role",

  problem: \`There is no easy way to tell how well a resume lines up with a
specific job opportunity. Job seekers re-read both documents, guess at the
overlap, and apply without a clear picture of where they align.\`,

  solution: \`A web application that compares a resume against job
requirements and presents the alignment as a result the user can understand —
making resume-to-role comparison accessible instead of a manual read-through.\`,

  architecture: [
    "Scope defined around one question: how well does this resume match this role",
    "Result presented legibly so the outcome is actionable, not just a number",
    "Built and deployed as a web application end to end",
  ],

  learnings: [
    "Translating a practical problem into a workflow is a design decision",
    "A result is only useful if the person reading it knows what to do next",
  ],

  stack: ["Web Application"],
};

export default fitscore;`,
};
