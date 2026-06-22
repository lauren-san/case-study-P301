# Social Media Dashboard Brief

## Product Goal
Build a single-page analytics dashboard for social content performance that is fast to scan, visually clear, and usable in both light and dark themes.

## Current Scope
The current app is a TikTok-focused dashboard backed by local sample data in src/data/metrics.json.

### Core Dashboard Areas
- Header with Social Media Dashboard title and action icons.
- Year and date-range filters.
- KPI cards:
  - Followers
  - Engagement Rate
  - Ad Revenue
  - Total Views
  - Total Watch Time
  - Total Likes
- Charts:
  - Revenue Trend
  - Subscriber Churn
  - Engagement Breakdown (donut)
  - Content Performance by Type (horizontal bar)
- Top 10 Performing Content table.

## Data Behavior
- Year filter updates all chart visualizations.
- Top 10 table is non-paginated and always capped to exactly 10 rows.
- Top 10 rows are sorted by highest views.

## UX and Visual Direction
- Full-width dashboard layout.
- Card-based, high-legibility presentation.
- Left-aligned chart headers with consistent title styling.
- Reduced spacing between filter controls and content for denser scanning.
- Accessible dark mode toggle in the app bar.

## Accessibility Expectations
- Dark mode and light mode use contrast-safe text and surface colors.
- Chart axis, grid, and legend colors adapt to theme.
- Theme choice persists between sessions.

## Tech Stack
- Vue 3 + TypeScript
- Vuetify 3
- Chart.js
- Vue Router
- Vite

## Out of Scope (Current)
- Live API integration.
- Auth and role-based access.
- Multi-page navigation beyond the main dashboard view.
- Automated reporting workflows.

## Success Criteria
- Dashboard loads and builds without errors.
- Metrics and charts are readable in both themes.
- The main content can be scanned quickly on desktop and mobile widths.
- Top 10 table shows exactly 10 aligned rows without pagination.
