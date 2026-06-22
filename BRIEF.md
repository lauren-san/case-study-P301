# Social Media & Content Dashboard

## What is This?

A comprehensive analytics dashboard for Content Strategy and Audience Insights Managers to monitor, analyze, and optimize their digital content performance across multiple channels. The dashboard provides real-time metrics, trend analysis, and actionable insights to help content creators and strategists make data-driven decisions about content production, distribution, and audience engagement.

## Data

Generate a fake dataset as a JSON file (src/data/metrics.json). 12 months of data containing the below key metrics.

### Key Metrics

**Content Performance:**
- Content Views (daily/monthly/yearly trends)
- Watch Time / Read Time (in hours)
- Content Impressions
- Click-Through Rate (CTR)
- Share Count

**Audience Metrics:**
- Total Subscribers/Followers
- Subscriber Growth Rate
- Subscriber Churn Rate
- New Followers (daily/weekly)
- Audience Retention Rate
- Demographics breakdown (age, location, gender)

**Engagement Metrics:**
- Engagement Rate (%)
- Likes/Reactions Count
- Comments Count
- Shares Count
- Save Rate

**Revenue Metrics:**
- Ad Revenue (daily/monthly)
- Revenue per 1,000 Views (RPM)
- Revenue per Subscriber
- Sponsorship Income
- Estimated Earnings

**Channel Performance:**
- Performance by platform (YouTube, TikTok, Instagram, etc.)
- Top Performing Content Types
- Best Publishing Times
- Geographic Performance

## Layout (Vuetify)

### Dashboard Structure

**Header Section (`v-app-bar`):**
- `v-app-bar`: Main navigation bar with title
- `v-text-field`: Date range picker/search
- `v-select`: Platform filter dropdown
- `v-btn`: Refresh and settings buttons

**Key Metrics Row (`v-row` + `v-col` + `v-card`):**
- `v-card` components for each KPI:
  - Total Views Card
  - Subscribers Card
  - Engagement Rate Card
  - Ad Revenue Card
  - Watch Time Card
- Each card contains `v-card-title`, `v-card-text`, and trend indicators

**Charts Section (`v-container` + `v-row` + `v-col`):**
- `v-row` with responsive breakpoints (md=6, lg=4 as needed)
- `v-col` wrappers for each chart
- `v-card` containers with `v-card-title` headers:
  - Views Trend (Chart.js Line Chart)
  - Subscriber Growth (Chart.js Area Chart)
  - Revenue Trend (Chart.js Bar Chart)
  - Engagement Distribution (Chart.js Pie Chart)
  - Content Performance by Type (Chart.js Horizontal Bar)
  - Platform Performance (Chart.js Grouped Bar)
  - Watch Time vs Content (Chart.js Scatter)
  - Top 10 Content (`v-data-table`)

**Detailed Analytics Section:**
- `v-expansion-panels` for collapsible sections:
  - Audience Demographics
  - Top Performing Hours/Days (heatmap)
  - Churn Analysis
  - Traffic Sources Breakdown
- Each panel contains relevant charts

**Sidebar Navigation (`v-navigation-drawer`):**
- `v-navigation-drawer` (permanent or temporary based on screen size)
- `v-list` with navigation items
- `v-list-item` for each dashboard view
- `v-divider` for section separation
- `v-btn` for export functionality

**Bottom Layout:**
- `v-footer` with pagination or additional info
- `v-main` wrapper for main content area

### Component Breakdown

- `v-app`: Root wrapper for the entire app
- `v-app-bar`: Top navigation bar
- `v-container`: Main content container with padding
- `v-row`: Horizontal layout grid
- `v-col`: Vertical grid columns (responsive with breakpoints)
- `v-card`: Data container cards with shadows
- `v-card-title`: Card headers
- `v-card-text`: Card body content
- `v-data-table`: Table for top content with sorting/filtering
- `v-select`: Dropdown filters
- `v-text-field`: Date picker and search inputs
- `v-btn`: Action buttons with icons
- `v-icon`: Icons from Material Design Icons
- `v-chip`: Tags and badges for data labels
- `v-progress-linear`: Progress indicators for percentages
- `v-navigation-drawer`: Side menu for filters
- `v-menu`: Dropdown menus for quick actions
- `v-tooltip`: Hover tooltips on data points
- `v-expansion-panels`: Collapsible detailed sections
- `v-divider`: Visual separators
- `v-footer`: Bottom footer section
- `v-main`: Main content wrapper
- `v-spacer`: Flexible spacing element

## Interaction

**User Actions:**
- Date range picker to filter data (last 7 days, 30 days, 90 days, custom range)
- Platform filter (show/hide specific social platforms)
- Content type filter (videos, images, text, etc.)
- Drill-down: Click on charts to view detailed breakdown
- Hover over data points to see tooltips with precise values
- Export data as CSV/PDF
- Toggle between different metric views (current vs comparison period)
- Sort tables by column headers
- Search/filter content items in tables

**Real-time Updates:**
- Auto-refresh capability (every 5, 15, 30 minutes)
- Manual refresh button
- Live notification badges for new data

## Style

**Color Scheme:**
- Primary: Indigo (#3f51b5)
- Success: Green (#4CAF50)
- Warning: Orange (#FF9800)
- Danger: Red (#F44336)
- Info: Blue (#2196F3)
- Accent: Purple (#9C27B0)
- Neutral: Light Gray backgrounds

**Typography:**
- Headers: Bold, large font sizes
- Data values: Highlighted in primary color
- Percentages: Color-coded (green for positive, red for negative)
- Labels: Subtle, smaller font size

**Visual Elements:**
- Material Design consistent spacing
- Rounded corners on cards
- Shadow effects for depth
- Icons for quick visual recognition (chart icons, user icons, trending icons)
- Loading skeletons for data-heavy sections
- Empty states with helpful messages

## Tech

**Frontend Framework:**
- Vue 3 with TypeScript
- Vite (build tool)
- Vue Router (navigation between dashboard views)

**UI Framework:**
- Vuetify 3 (Material Design components)
- Material Design Icons (@mdi/js)

**Data Visualization:**
- Chart.js (charting library)
- Vue-ChartJS (Vue wrapper for Chart.js)

**Additional Libraries:**
- Axios (for API calls)
- Dayjs/Moment.js (date handling)
- Pinia (state management - optional)

**Project Structure:**
- `/src/views/`: Dashboard pages
- `/src/components/`: Reusable chart and card components
- `/src/services/`: API service layer
- `/src/stores/`: State management (if using Pinia)
- `/src/types/`: TypeScript interfaces
- `/src/utils/`: Helper functions and data formatters
