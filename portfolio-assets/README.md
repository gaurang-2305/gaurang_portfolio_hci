# Portfolio Assets

This directory contains raw and source assets for Gaurang Upadhyay's portfolio website.

## Directory Structure
- `profile/`: Contains `photo.jpg` (portrait photo) and `Gaurang_Upadhyay_Resume.pdf`.
- `projects/`: Subdirectories per project slug:
  - `finscope/`: `cover.png`, `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`, `info.md`
  - `floatchat/`: `cover.png`, `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`, `info.md`
  - `mental-health-system/`: `cover.png`, `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`, `info.md`
- `academic/`: Certificates, grade cards, transcripts.
- `activities/`: Hackathon photos, event photos, club badges.
- `blog/`: Markdown (.md) blog posts with frontmatter.
- `reference/`: Reference inspiration documents.

## Asset Processing
Run:
```bash
npm run assets
```
This script validates, optimizes (WebP + responsive sizes), syncs assets to `public/assets/`, updates JSON/Markdown registries, and reports any missing files in `ASSET_REQUESTS.md`.
