# Social Media Dashboard Brief

## Product Goal
Build a single-page analytics dashboard for social content performance that is fast to scan, visually clear, and usable in both light and dark themes.

## Current Scope
The current app is a TikTok-focused dashboard backed by local sample data in src/data/metrics.json.

### Core Dashboard Areas
- Header with TikTok Analytics title and action icons (refresh, export).
- Year filter for 2024, 2025, 2026.
- KPI cards (6 total):
  - Followers (with YoY % change)
  - Engagement Rate (with YoY % change)
  - Ad Revenue (with YoY % change)
  - Total Views
  - Total Watch Time
  - Total Likes
- Charts (4 total):
  - Revenue Trend (line chart)
  - Subscriber Churn (line chart)
  - Engagement Breakdown (doughnut chart)
  - Content Performance by Type (horizontal bar chart)
- Top 10 Performing Content table (TikTok-only, year-filtered).

## Data Behavior
- Year filter updates all KPI metrics, charts, and Top 10 table.
- Top 10 table is non-paginated and always capped to exactly 10 rows.
- Top 10 rows are TikTok platform entries sorted by highest views.
- Percentage chips on KPI cards show year-over-year (YoY) changes compared to the previous year (2024 shows sample data).

## Style & Visual Design

### Color Palette
**Light Theme:**
- Primary accent: #6B5BFF (purple)
- Secondary accent: #FF6B54 (coral/orange)
- Success: #17D7A6 (teal)
- Warning: #FFA500 (orange)
- Error: #FF4757 (red)
- Info: #00D4FF (cyan)
- Background: #ffffff (white)
- Card background: #ffffff
- Text: #3f4756 (dark gray)
- Grid lines: rgba(15, 23, 42, 0.12)

**Dark Theme:**
- Primary accent: #8c83ff (light purple)
- Secondary accent: #ff866e (light coral)
- Success: #2fd9b5 (light teal)
- Warning: #ffb24c (light orange)
- Error: #ff6b7a (light red)
- Info: #53d6ff (light cyan)
- Background: #11141c (very dark)
- Card background: #1a1f2b (dark)
- Text: #f1f5f9 (light gray)
- Grid lines: rgba(226, 232, 240, 0.38)

### Typography
- Font family: Segoe UI, system-ui, Roboto, sans-serif
- Dashboard title: 24px+ bold (TikTok Analytics)
- Heading font weight: 700 bold for chart titles
- Body text: 14px base
- Labels on KPI cards: small caption with bold weight
- KPI values: h6 sized, semi-bold (600)

### Component Styling

**KPI Cards:**
- 12px border-radius (rounded corners)
- Full height, flexbox column layout
- Icon circles: 44px diameter, colored backgrounds (purple, teal, orange, coral, cyan, red)
- Percentage chips: v-chip with themed background color and text color
- Mobile: stack 2 per row (sm="6"), desktop: 3 per row (md="4")

**Chart Cards:**
- Fixed height: 320px
- Chart containers: 220px height
- Flexible content area within card for stable layout

**Table (Top 10 Content):**
- Columns: Title, Platform, Views, Engagement Rate, Date, Likes
- No pagination (`:items-per-page="-1"`)
- Left-aligned: Title, Platform, Date
- Right-aligned: Views, Engagement Rate, Likes
- Minimum 10 rows always displayed

**Spacing:**
- Container padding: 24px (pa-6 in Vuetify)
- Card row margin-bottom: 24px (mb-6)
- Filter row margin-bottom: 0px (mb-0)
- Gap between flex items: 8px (gap-2)

### Responsive Design
- Full-width fluid container
- Mobile-first approach with CSS media queries
- Breakpoints:
  - xs (default): KPI cards full-width (cols="12")
  - sm: KPI cards 2 per row (sm="6")
  - md+: KPI cards 3 per row (md="4")

### Dark Mode Implementation
- Toggle in app bar (sun/moon icon)
- Vuetify theme system integration
- CSS custom properties for light/dark variables
- Theme preference persists in localStorage
- Chart colors dynamically adapt via CSS variable lookup
- Grid and axis colors adjust for readability

## UX and Visual Direction
- Full-width dashboard layout with no fixed width constraints.
- Card-based, high-legibility presentation.
- Left-aligned chart headers with consistent bold title styling.
- Reduced spacing between filter controls and content for denser scanning.
- Accessible dark mode toggle in the app bar.
- Year-over-year percentage changes on key KPI cards for quick trend analysis.

## Accessibility Expectations
- Dark mode and light mode use contrast-safe text and surface colors.
- Chart axis, grid, and legend colors adapt to theme.
- Theme choice persists between sessions (localStorage).
- Icon circles provide visual affordance for KPI metrics.
- Semantic HTML and Vuetify accessible components.

## Tech Stack
- Vue 3 + TypeScript
- Vuetify 3 (Material Design)
- Chart.js 4.5.1 (responsive charts)
- Vue Router
- Vite 8.0.12

## Out of Scope (Current)
- Live API integration.
- Auth and role-based access.
- Multi-page navigation beyond the main dashboard view.
- Automated reporting workflows.
- Date-range filtering.
- Content-type filtering (removed).

## Success Criteria
- Dashboard loads and builds without errors.
- Metrics and charts are readable in both themes.
- The main content can be scanned quickly on desktop and mobile widths.
- Top 10 table shows exactly 10 TikTok entries sorted by views.
- Percentage chips update correctly based on year filter selection.
- Year filter updates all KPI metrics, charts, and content table simultaneously.

