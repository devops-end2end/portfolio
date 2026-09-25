# Portfolio Implementation Task List

This document tracks the tasks required to implement the portfolio website based on the approved implementation plan.

## 1. Project Configuration & Setup
- [ ] Update `next.config.ts` to include `basePath: '/portfolio'` and `output: 'export'`.
- [ ] Install required dependencies: `@react-pdf/renderer`, `framer-motion`, `mermaid`, `cmdk`, and necessary Radix UI primitives.
- [ ] Create `.github/workflows/deploy.yml` for automated GitHub Pages deployment.
- [ ] Move the existing System Topology page from `app/page.tsx` to `app/topology/page.tsx` so it can be integrated as a separate route.

## 2. Data Layer
- [ ] Create `data/career.ts` and parse the content from `career.master.record.txt` into structured TypeScript objects (Roles, Experience, Skills, Case Studies).

## 3. Core UI Components (Shadcn)
- [ ] Scaffold base UI components (Button, Card, Badge, Dialog, Tabs) in `components/ui/`.
- [ ] Configure `components/CommandPalette.tsx` using `cmdk` to allow global navigation (`Cmd + K`).

## 4. Feature Components
- [ ] Implement `Hero.tsx` with role switching logic (Manager | Architect | Master).
- [ ] Implement `CaseStudies.tsx` with interactive modals and Mermaid.js architecture diagrams.
- [ ] Implement `CareerTimeline.tsx` with expandable sections and domain tags.
- [ ] Implement `SkillMatrix.tsx` grouped by technical domains.
- [ ] Implement `ResumeGenerator.tsx` using `@react-pdf/renderer` to generate custom PDFs on the client-side based on the selected role.

## 5. Layout & Page Assembly
- [ ] Update `app/layout.tsx` to include global providers, Command Palette, and a navigation header (linking to the Portfolio and the System Topology viewer).
- [ ] Build the new `app/page.tsx` landing page combining all feature components and wiring up the role-switching context.

## 6. Verification
- [ ] Run `npm run build` to verify SSG output.
- [ ] Serve the static export locally (`npx serve out`) and verify all interactions (modals, role switching, PDF generation).
- [ ] Document the successful verification in a Walkthrough Artifact.
