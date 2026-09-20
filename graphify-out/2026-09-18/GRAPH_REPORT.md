# Graph Report - SyncWard-Technologies  (2026-09-18)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 253 nodes · 284 edges · 50 communities (8 shown, 39 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `57b6bb59`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- common/HeroSection.jsx
- Core Project Dependencies
- app/page.js
- button.jsx
- components.json
- Build and Development Tools
- API Routes and Database
- Next.js
- layout.js
- compilerOptions
- imagekit-auth/route.js
- ProjectGallery.jsx
- middleware.js
- eslint.config.mjs
- GEMINI.md
- next.config.mjs
- postcss.config.mjs
- About Hero Background
- Contact Hero Background
- Industries Hero Background
- Legal Hero Background
- Licensed Technology Background
- Services Hero Background
- Tech Hero Background
- Work Hero Background
- Hero Background Isometric
- SyncWard Technology Logo
- Hero Background Isometric Duplicate
- MongoDB Logo
- Full-Stack Engineer Avatar
- Tech Lead Avatar
- Project Manager Avatar
- UI/UX Designer Avatar
- AWS Logo
- Docker Logo
- Figma Logo
- Firebase Logo
- Git Logo
- GraphQL Logo
- Kubernetes Logo
- Node.js Logo
- PostgreSQL Logo
- Python Logo
- React Logo
- Redis Logo
- TypeScript Logo
- Why Choose SyncWard UI

## God Nodes (most connected - your core abstractions)
1. `HeroSection()` - 15 edges
2. `Button()` - 14 edges
3. `connectDB()` - 11 edges
4. `CTASection()` - 10 edges
5. `aliases` - 6 edges
6. `tailwind` - 6 edges
7. `scripts` - 5 edges
8. `ServicesSection()` - 3 edges
9. `IndustriesSection()` - 3 edges
10. `TechnologiesSection()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Tailwind CSS Logo` --references--> `tailwindcss`  [INFERRED]
  public/tech/tailwind-css.svg → package.json
- `About Banner` --references--> `tailwindcss`  [EXTRACTED]
  public/about-banner.jpg → package.json
- `GET()` --calls--> `connectDB()`  [EXTRACTED]
  src/app/api/contact/route.js → src/lib/mongodb.js
- `POST()` --calls--> `connectDB()`  [EXTRACTED]
  src/app/api/contact/route.js → src/lib/mongodb.js
- `GET()` --calls--> `connectDB()`  [EXTRACTED]
  src/app/api/projects/route.js → src/lib/mongodb.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Core Technology Stack** — nextjs_framework, mongodb_database, tailwindcss [EXTRACTED 1.00]

## Communities (50 total, 39 thin omitted)

### Community 0 - "common/HeroSection.jsx"
Cohesion: 0.08
Nodes (16): metadata, teamMembers, metadata, offerings, offerings, offerings, offerings, offerings (+8 more)

### Community 1 - "Core Project Dependencies"
Cohesion: 0.06
Nodes (31): @base-ui/react, class-variance-authority, cn, framer-motion, imagekit, imagekitio-react, lucide-react, mongoose (+23 more)

### Community 2 - "app/page.js"
Cohesion: 0.11
Nodes (12): metadata, metadata, HeroSection(), industries, IndustriesSection(), ProcessSection(), steps, StatsBar() (+4 more)

### Community 3 - "button.jsx"
Cohesion: 0.13
Nodes (7): AdminDashboard(), metadata, ContactForm(), projects, services, Button(), buttonVariants

### Community 4 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Build and Development Tools"
Cohesion: 0.11
Nodes (17): babel-plugin-react-compiler, eslint, eslint-config-next, devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, @tailwindcss/postcss (+9 more)

### Community 6 - "API Routes and Database"
Cohesion: 0.20
Nodes (11): GET(), POST(), GET(), POST(), POST(), getProjects(), metadata, WorkPage() (+3 more)

### Community 7 - "Next.js"
Cohesion: 0.17
Nodes (9): MongoDB, Next.js, tailwindcss, About Banner, Our Story UI, MongoDB Logo, Next.js Logo, Tailwind CSS Logo (+1 more)

## Knowledge Gaps
- **113 isolated node(s):** `metadata`, `metadata`, `offerings`, `offerings`, `offerings` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 154 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Core Project Dependencies` to `Build and Development Tools`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `Button()` connect `button.jsx` to `common/HeroSection.jsx`, `app/page.js`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Build and Development Tools` to `Next.js`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `metadata`, `metadata`, `offerings` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `common/HeroSection.jsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07897793263646923 - nodes in this community are weakly interconnected._
- **Should `Core Project Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `app/page.js` be split into smaller, more focused modules?**
  _Cohesion score 0.10666666666666667 - nodes in this community are weakly interconnected._