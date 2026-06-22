# Social Media Dashboard

A Vue 3 + Vuetify + Chart.js analytics dashboard for social content insights.

## What Is Included
The current dashboard includes:
- Full-width responsive layout.
- Header with theme toggle (light/dark), notifications icon, and account icon.
- Filter controls:
  - Year
  - Date Range
- KPI cards:
  - Followers
  - Engagement Rate
  - Ad Revenue
  - Total Views
  - Total Watch Time
  - Total Likes
- Charts:
  - Revenue Trend (bar)
  - Subscriber Churn (line)
  - Engagement Breakdown (donut)
  - Content Performance by Type (horizontal bar)
- Top 10 Performing Content table:
  - Exactly 10 rows
  - No pagination
  - Column/header alignment enforced

## Dark Mode
Dark mode is implemented with an app-bar toggle and persisted in localStorage.

Dark-mode behavior:
- Uses Vuetify dark theme tokens for surface/background colors.
- Chart axis labels, legends, and grids adapt for readability.
- Card and footer surfaces use theme-aware colors.

## Tech Stack
- Vue 3
- TypeScript
- Vuetify
- Chart.js
- Vue Router
- Vite

## Project Structure

```text
src/
  App.vue                Root app shell, app bar, footer, theme toggle
  main.ts                Vuetify + router setup and light/dark theme config
  style.css              Global variables and theme-aware styling
  data/
    metrics.json         Sample metrics dataset
  views/
    Home.vue             Main dashboard UI, charts, table, filters
```

## Local Development
Prerequisites:
- Node.js 18+
- npm

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Data Source
The app currently uses local JSON data from src/data/metrics.json.

Important data groups:
- overview
- monthlyData
- contentTypePerformance
- topContent

## Notes
- This repository currently renders a single dashboard route.
- Platform Performance chart has been removed from the UI.
- Top 10 table is based on highest-view content and intentionally not paginated.
