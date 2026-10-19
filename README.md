# Gaurang Upadhyay | Technical Portfolio & Field Notes

An interactive personal profile and engineering showcase for **Gaurang Upadhyay**, third-year Computer Engineering undergraduate at **Veermata Jijabai Technological Institute (VJTI)**, Mumbai.

Built end-to-end adhering to established **Human-Computer Interaction (HCI)** principles, the **"Field Notes"** visual identity, and **WCAG 2.2 Level AA** accessibility standards.

---

## 🛠️ Technology Stack
- **Core Framework:** React 18 + TypeScript + Vite
- **Styling:** Vanilla Tailwind CSS with CSS Variables for theme tokens
- **Typography:** Self-hosted Google Fonts via `@fontsource` (*Fraunces* serif, *Inter* body, *JetBrains Mono* code & tags)
- **Routing:** React Router (`HashRouter` for zero-configuration GitHub Pages hosting)
- **Icons & Graphics:** Hand-crafted technical drafting SVGs + Lucide React
- **Data Architecture:** 100% decoupled content in `src/data/*.json`
- **Testing:** Native Node.js test runner verifying SUS psychometric scoring algorithms

---

## 🚀 Quickstart & Local Development

### 1. Prerequisites
- Node.js LTS (v20+ or v24+)
- npm (v10+)

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The site will be live at `http://localhost:5173/` (or `http://127.0.0.1:5173/`).

### 4. Run Asset Pipeline
```bash
npm run assets
```
This script:
- Scans `portfolio-assets/` for new files
- Generates high-fidelity vector blueprints if source screenshots are missing
- Enforces sensitive file warnings (e.g. phone numbers, identity documents)
- Syncs assets into `public/assets/`
- Updates `ASSET_REQUESTS.md`

### 5. Run Unit Tests
```bash
npm test
```
Executes test suites for the System Usability Scale (SUS) scoring calculations.

### 6. Build Production Bundle
```bash
npm run build
```
Generates the fully optimized, minified bundle in `dist/`.

---

## 📁 Adding Projects and Blog Posts

### Adding a Project
1. Create a new folder in `portfolio-assets/projects/<slug>/`
2. Add your `cover.png` and `screenshot-1.png`... (at least 1280px wide)
3. Optionally add an `info.md` file overriding fields:
   ```markdown
   ---
   title: Project Name
   year: 2026
   tagline: One sentence summary
   liveDemo: https://demo-link.com
   ---
   ```
4. Run `npm run assets`

### Adding a Blog Post
1. Add a new Markdown file in `portfolio-assets/blog/my-post.md`
2. Run `npm run assets`

---

## 🌐 GitHub Pages Deployment

The repository includes a ready-to-run GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To deploy:
1. Push this repository to GitHub.
2. In your GitHub repository settings, navigate to **Settings > Pages**.
3. Under **Build and deployment > Source**, select **GitHub Actions**.
4. Every commit to `main` will automatically build, test, and deploy the portfolio to GitHub Pages.

---

## 📚 HCI Documentation & Architecture
- **Design Rationale & Theoretical Framework:** [`docs/design-rationale.md`](docs/design-rationale.md)
- **Formal Usability Evaluation & Statistical Report:** [`docs/usability-report.md`](docs/usability-report.md)
- **Missing Asset Log & Requests:** [`ASSET_REQUESTS.md`](ASSET_REQUESTS.md)
- **Truth Cross-Check & Development Log:** [`TODO.md`](TODO.md)
