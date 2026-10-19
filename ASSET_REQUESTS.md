# Asset Requests & Missing Items Log

This document tracks all required assets, their status, specifications, and where they appear on the site.
Whenever an asset is added or updated, run `npm run assets` to regenerate the production assets and update this sheet.

---

## 1. Profile Assets
- **[PENDING] Profile Photo**
  - **Path:** `portfolio-assets/profile/photo.jpg`
  - **Recommended Specs:** Portrait or square, at least 800x1000px, JPG or PNG.
  - **Where it appears:** Hero section arch frame ("Fig. 1: Gaurang, VJTI Mumbai") and About section.
  - **Current Fallback:** Modern styled SVG drafting avatar with technical crosshairs.
  - **Status:** Optional / Requested at Milestone A.

- **[PENDING] Resume PDF**
  - **Path:** `portfolio-assets/profile/Gaurang_Upadhyay_Resume.pdf`
  - **Recommended Specs:** PDF format, preferably without personal phone number.
  - **Where it appears:** Hero primary CTA "Download Resume (PDF, size shown)", Navigation, Footer, and Usability Task T2.
  - **Current Fallback:** Generated structured placeholder PDF / resume data sheet.
  - **Status:** Optional / Requested at Milestone A.

---

## 2. Project Assets (RESOLVED - High-Fidelity UI Architecture Mockups)
Per user request, manual screenshots have been replaced with tailored, high-fidelity interactive vector UI architecture mockups reflecting the exact technology and features of each system:
- **[RESOLVED] FinScope:**
  - Mockup UI displays the SEC EDGAR 10-K Ingestion workspace, multi-engine GAAP ratio tables (Current Ratio 2.45x, Debt-to-Equity 0.38, ROIC 18.4%), and ChromaDB vector Q&A assistant with cosine similarity scores.
- **[RESOLVED] FloatChat:**
  - Mockup UI displays the 360° global ocean ARGO float map (470+ floats), depth CTD thermocline anomaly curves, and the interactive NL2SQL prompt bar with Abstract Syntax Tree (AST) validation inspection.
- **[RESOLVED] Mental Health System:**
  - Mockup UI displays student mood trends, encrypted sentiment journal triaging, counselor queue scheduling, and institutional attendance-stress correlation indices.

---

## 3. Academic & Activity Assets
- **[REMOVED PER USER REQUEST] Academic Certificates & Transcripts** (Section removed from UI)
- **[OPTIONAL] Activities & Hackathons**
  - **Path:** `portfolio-assets/activities/` (e.g., `hacktoberfest-2025.png`, `event-photo-1.jpg`)
  - **Where it appears:** Activities git-log timeline.

---

## 4. Blog Posts
- **[OPTIONAL] Markdown Articles**
  - **Path:** `portfolio-assets/blog/*.md`
  - **Where it appears:** Blog listing and reader view.
  - **Current Fallback:** Initial technical articles on AST-based SQL Validation and Building RAG pipelines.
