# Afnan Workspace — Product & UX Suggestions

> Analysis date: November 2026 · Branch: `feature/recruiter-quick-view`
>
> This document audits the portfolio from three visitor perspectives — **recruiter**, **layman**, and **engineer** — then proposes the single highest-leverage feature to add next, plus the UI/UX fixes that should ship with it.

---

## 1. What already works

- **Strong identity.** The VS Code framing is memorable and consistent across both modes.
- **Real proof, not fluff.** The case studies contain measurable outcomes (98.75–99.6% faster letter generation, 34 hours/month saved, 25+ production bugs fixed, 31 framework tests, zero runtime dependencies).
- **Solid engineering hygiene.** Code-split command palette, idle cover preload, service-worker caching, privacy-first analytics, JSON-LD, Open Graph, sitemap, and robots.txt are all in place.
- **Two audiences served.** Terminal mode rewards engineers; Standard mode gives everyone else a familiar editor.
- **Good performance.** Local hashed assets and an offline-first service worker keep repeat visits fast.

The gaps are not about craft. They are about **time-to-value for a first-time visitor**.

---

## 2. Who visits, and what they need in the first 10 seconds

| Visitor | Arrives from | Wants first | Current first screen |
|---|---|---|---|
| **Recruiter** | LinkedIn, email, application | Role, resume, contact, 2–3 proof points | Desktop: ASCII terminal. Mobile: `profile.ts` |
| **Layman / non-technical** | Shared link, social | “Who is this, what do they do, what do I click?” | Terminal with a blinking cursor |
| **Engineer** | GitHub, peer referral | Code quality, projects, source links | Terminal — this audience is well served |

The engineer experience is already good. The recruiter and layman experiences are where the portfolio loses people.

---

## 3. Recruiter issues

### R1 — Resume and contact disappear on mobile
`src/components/Header.tsx` hides email, LinkedIn, GitHub, and the resume download below `sm` (lines 85–123). At 390 px the header only shows the hostname, theme toggle, and a mode arrow. Most recruiters open portfolio links inside LinkedIn’s in-app browser, so the primary conversion action is missing exactly where it matters.

### R2 — Projects are buried on mobile
`MobileStandardView` builds its bottom tabs from `AFNAN_FILES.slice(0, 4)` (`StandardView.tsx` lines 645–649), so the first tabs are profile, experience, education, and certifications. All six project case studies sit behind “More”. For a recruiter, projects are the main evidence — they should be one tap away.

### R3 — No scannable summary
The strongest numbers live inside long case-study text. A recruiter scanning for 30 seconds will not read 40 lines of terminal output to find “98.75–99.6% faster” or “34 hours/month saved”. There is no single surface that puts identity, proof, projects, skills, and contact in one view.

### R4 — The resume CTA is almost invisible
On desktop terminal mode the only resume affordance is a tiny footer link rendered inside a container at `opacity: 0.35` (`TerminalView.tsx` lines 526–547). The header icon is visible, but it is a 14 px icon with no label.

### R5 — Contact requires a command or an icon
There is no “copy email” action. A recruiter must run `contact`, read a code block, select the address, and copy it manually — or find the hidden mail icon in the header.

### R6 — Project links are unstructured
Source URLs exist as plain text inside long case studies. There is no per-project action row (source, live demo, case study), so even an interested recruiter has to hunt.

---

## 4. Layman issues

### L1 — The terminal assumes command knowledge
The welcome message says “Type `help`”, but a non-technical visitor has no reason to trust that. The only hint is a ghost line that appears after **4 seconds** and is permanently dismissed on the first keystroke (`TerminalView.tsx` lines 122–129 and 469–476). After that, the empty terminal offers no visible next step.

### L2 — The ASCII banner is unreadable on a phone
On a 390 px viewport the banner wraps into broken blocks (verified in a mobile screenshot). It consumes most of the first screen and communicates less than a one-line headline would.

### L3 — Code is clipped on mobile
`TypeScriptRenderer` uses `whiteSpace: "pre"` inside an `overflow-x-auto` flex child without `min-w-0` (`EditorComponents.tsx` lines 567–589). On mobile, long lines are cut off at the right edge with no visible scrollbar. In the screenshot, `profile.ts` line 12 and line 16 are truncated mid-word.

### L4 — Dead ends feel unfinished
The Activity Bar’s Source Control and Extensions icons open a panel that says “No content yet” (`StandardView.tsx` lines 460–500). The Account icon does nothing (lines 300–306). For a layman, these read as broken features rather than intentional placeholders.

### L5 — The mobile “More” sheet is a catch-all
Everything that is not one of the first four profile files — including every project and the resume — is hidden in one unlabeled list. There is no separation between “more profile files” and “project case studies”.

---

## 5. UI/UX and accessibility issues

### U1 — No visible primary CTA in terminal mode
The first screen has no button. A visitor who does not type leaves with nothing.

### U2 — Low-contrast footer
The copyright container’s `opacity: 0.35` also dims the “View Resume” link, reducing an already small target.

### U3 — Popup focus management
`PersonalWindow` sets `role="dialog"`, `aria-modal="true"`, and handles Escape (`PersonalWindow.tsx` lines 30–66), but it does not move focus into the dialog, trap focus, or restore focus on close. Keyboard and screen-reader users can tab into the page behind the overlay.

### U4 — Icon-only controls rely on `title`
Header icon buttons use `title` but no `aria-label`. `title` is inconsistent across screen readers; an explicit accessible name is safer.

### U5 — No live region for terminal output
The terminal is keyboard-first, but new command output is not announced to screen readers. A `role="log"` / `aria-live="polite"` region would make the core interaction usable with assistive technology.

### U6 — Mobile navigation prioritizes the wrong files
Education and certifications appear before projects and contact. The order reflects the file tree, not visitor intent.

### U7 — Placeholder panels
Source Control and Extensions look like real navigation but lead nowhere. Either implement a small, honest panel or remove the icons until they do something.

### U8 — No per-project visual identity
All six projects are text files. Screenshots or a visual gallery would help recruiters recognize the work before reading.

---

## 6. Recommended feature: **Recruiter Quick View**

### Why this feature

It is the shortest path between a recruiter’s click and the four things they need: **who, proof, work, contact**. It also gives laymen a visible, no-typing entry point. It reuses existing content and adds no dependencies.

### What it is

A single, polished overlay — `recruiter://quick-view` — containing:

1. **Identity** — name, role, location, one-line pitch.
2. **Primary actions** — Download resume, Copy email (with confirmation), Email, LinkedIn, GitHub.
3. **Proof strip** — four measurable outcomes pulled from the case studies.
4. **Featured projects** — four cards, each with tagline, stack chips, one proof point, and actions:
   - “Case study” opens the existing project file in Standard view.
   - “Source” opens the GitHub repository where one exists.
5. **Skills** — four compact groups.
6. **Education** — one line, plus certification count.
7. **Footer** — “Prefer the terminal? Run `hire`.”

### Entry points

| Surface | Action |
|---|---|
| Header | Persistent **Hire** button, visible on mobile and desktop |
| Terminal | `hire` (alias: `recruiter`) |
| Standard menubar | Help → Recruiter Quick View |
| Command palette | “Profile: Open Recruiter Quick View” |
| Terminal quick actions | “Recruiter view” chip |

### Why it fits the existing architecture

- Reuses `PersonalWindow` for the draggable window frame, Escape handling, and `role="dialog"` semantics.
- Reads from a single structured data file, so content stays editable in one place.
- Uses `downloadResume()` and the existing `RESUME_URL`, so the GitHub Pages base path keeps working.
- Opens project case studies through the existing `onOpenInStandard` flow — no new routing.
- No new npm packages.

---

## 7. Supporting fixes to ship with it

| Fix | Why |
|---|---|
| **Terminal quick-action chips** | Gives laymen clickable About / Projects / Skills / Contact / Resume / Hire actions instead of a blank prompt |
| **Mobile header resume + Hire** | Restores the two conversion actions currently hidden below `sm` |
| **Mobile code wrapping** | Ends clipped lines; hides the line-number gutter below 768 px so wrapped code stays readable |
| **Mobile Projects tab** | Puts the six case studies one tap from the bottom nav instead of inside “More” |
| **Popup focus management** | Focus the close button on open and restore the previous element on close |
| **Header `aria-label`s** | Makes icon-only controls reliably announced |
| **Footer contrast** | Dim only the copyright, not the resume link |

---

## 8. Implementation plan (one file per commit)

| # | File | Change |
|---|---|---|
| 1 | `suggestion.md` | This document |
| 2 | `src/data/recruiter.ts` | Structured quick-view content |
| 3 | `src/lib/clipboard.ts` | Clipboard helper with legacy fallback |
| 4 | `src/components/RecruiterWindow.tsx` | The overlay itself |
| 5 | `src/components/terminal/QuickCommands.tsx` | Clickable terminal onboarding |
| 6 | `src/components/terminal/TerminalView.tsx` | `hire` command, quick actions, footer contrast |
| 7 | `src/data/content.ts` | Command registry, help text, `ls` tree |
| 8 | `src/App.tsx` | Recruiter state and wiring |
| 9 | `src/components/Header.tsx` | Hire CTA, mobile resume, aria-labels |
| 10 | `src/components/standard/StandardView.tsx` | Menubar/palette wiring, mobile Projects tab |
| 11 | `src/components/standard/Menubar.tsx` | Help menu entry |
| 12 | `src/components/standard/CommandPalette.tsx` | Palette entry |
| 13 | `src/components/standard/EditorComponents.tsx` | Mobile code wrapping classes |
| 14 | `src/components/terminal/PersonalWindow.tsx` | Focus management |
| 15 | `src/index.css` | Responsive grids, chips, mobile code rules |
| 16 | `src/data/recruiter.test.ts` | Data integrity test |
| 17 | `README.md` | Document the feature and command |

---

## 9. Backlog — worth doing later, not in this branch

1. **Project screenshots / visual gallery** — the single biggest remaining visual upgrade.
2. **Real Source Control and Extensions panels** — or remove the icons until they exist.
3. **Contact form** with spam protection — useful for visitors without a mail client.
4. **Per-project URLs** (`#project=afnkit`) with dedicated OG images — better sharing and SEO.
5. **Terminal command palette** (`Ctrl+K`) — discoverability for engineers too.
6. **Screen-reader live region** for terminal output.
7. **Availability flag** in `recruiter.ts` so “open to roles” can be toggled without touching UI code.
8. **Analytics events** for resume downloads, email copies, and quick-view opens (the analytics helper already supports custom events).

---

## 10. Success measures

- Recruiter can reach the resume in **one tap** from any screen.
- Recruiter can reach a project case study in **one tap** on mobile.
- Layman can run the six most useful commands **without typing**.
- No clipped code on a 390 px viewport.
- No regression in build, tests, or existing terminal commands.
