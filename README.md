# Social Media & Content Dashboard

A comprehensive analytics dashboard for Content Strategy and Audience Insights Managers to monitor, analyze, and optimize digital content performance across multiple platforms.

![Vue 3](https://img.shields.io/badge/Vue-3.5-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue) ![Vite](https://img.shields.io/badge/Vite-8.0-purple) ![Vuetify](https://img.shields.io/badge/Vuetify-4.1-teal)

## 🎯 Overview

The Social Media & Content Dashboard provides real-time metrics, trend analysis, and actionable insights for content creators and strategists. Track performance across YouTube, TikTok, Instagram, Twitter and more with interactive visualizations and detailed analytics.

### ✨ Key Features

- **Real-time Analytics** - Live metrics for content performance, audience growth, and engagement
- **Multi-Platform Support** - Track content across YouTube, TikTok, Instagram, Twitter and more
- **Interactive Charts** - 7+ visualization types powered by Chart.js
- **Responsive Design** - Material Design UI that works on desktop, tablet, and mobile
- **Data Filtering** - Filter by date range, platform, and content type
- **Geographic Insights** - Performance breakdown by country
- **Demographic Analysis** - Audience age and gender distribution
- **Content Performance** - Detailed metrics for top 10 performing content
- **Publishing Analytics** - Best times and days to publish content
- **Revenue Tracking** - Ad revenue, RPM, and sponsorship income metrics
- **Churn Analysis** - Monitor subscriber retention and churn rates
- **Export Functionality** - Download data for further analysis

## 📊 Dashboard Sections

### KPI Cards (5 Key Metrics)
- Total Views
- Followers
- Engagement Rate
- Ad Revenue
- Watch Time

### Analytics Charts
1. **Views Trend** (Line Chart) - Monthly views with trends
2. **Subscriber Growth** (Area Chart) - Follower growth over time
3. **Revenue Trend** (Bar Chart) - Ad revenue by month
4. **Engagement Breakdown** (Pie Chart) - Likes vs Comments vs Shares
5. **Content Performance** (Horizontal Bar) - Views by content type
6. **Platform Performance** (Grouped Bar) - Metrics by platform
7. **Demographics** (Pie & Doughnut Charts) - Age and gender distribution

### Data Tables & Panels
- **Top 10 Content** - Sortable table with views, engagement, and metrics
- **Audience Demographics** - Age groups and gender breakdown
- **Publishing Times** - Best performing hours and days
- **Geographic Performance** - Country-level metrics
- **Churn Analysis** - Subscriber churn trends

## 🛠 Tech Stack

### Frontend Framework
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool

### UI Framework
- **Vuetify 3** - Material Design component library
- **Material Design Icons** - Comprehensive icon set

### Data Visualization
- **Chart.js** - Powerful charting library
- **Vue-ChartJS** - Vue wrapper for Chart.js

### Build & Deployment
- **npm** - Package manager
- **Vercel** - Deployment platform

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
├── data/               # Static data files
│   └── metrics.json    # Dashboard metrics dataset
├── views/              # Page components
│   └── Home.vue        # Main dashboard view
├── main.ts             # Application entry point
├── App.vue             # Root component
└── style.css           # Global styles

dist/                   # Production build output
public/                 # Static assets
index.html              # HTML entry point
vite.config.ts          # Vite configuration
tsconfig.json           # TypeScript configuration
vercel.json             # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0 or higher
- npm 7.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd case-study-P301
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173/`

## 📝 Available Scripts

### Development
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run preview      # Preview production build locally
```

### Production
```bash
npm run build        # Build for production
                     # Output: dist/ folder
```

## 🎨 Dashboard Usage

### Filtering Data
1. Use the **Date Range** selector to view data for specific periods (7 days, 30 days, 90 days, or all time)
2. Select specific **Platforms** with the multi-select dropdown
3. Filter by **Content Type** (Educational, Behind-the-Scenes, Quick Tips, etc.)
4. Click **Apply Filters** to update all metrics

### Viewing Insights
- **Hover over charts** to see detailed tooltips
- **Click chart elements** to drill down into specific data
- **Sort tables** by clicking column headers
- **Expand panels** to view detailed analytics sections

### Exporting Data
- Click the **Download icon** in the header to export dashboard data
- Data exports include all visible metrics and charts

## 📊 Data Format

Dashboard uses `src/data/metrics.json` containing:

```json
{
  "overview": {
    "totalFollowers": 102450,
    "totalViews": 28500000,
    "totalEngagementRate": 3.24,
    "totalAdRevenue": 185320,
    "avgWatchTimeHours": 68.5
  },
  "monthlyData": [
    {
      "month": "January 2025",
      "followers": 87200,
      "views": 1850000,
      "engagementRate": 2.8,
      "adRevenue": 11200,
      ...
    }
  ],
  "platformPerformance": { ... },
  "contentTypePerformance": [ ... ],
  "topContent": [ ... ],
  ...
}
```

## 🌐 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial dashboard"
   git push origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will automatically detect the configuration
   - Click "Deploy"

Or use Vercel CLI:
```bash
npm install -g vercel
vercel
```

### Build Output
- **Input**: Project source files
- **Output**: `dist/` folder with optimized production build
- **Configuration**: Automatically read from `vercel.json`

## 🎨 Styling & Design

### Color Palette
- **Primary**: Indigo (#3f51b5)
- **Success**: Green (#4CAF50)
- **Warning**: Orange (#FF9800)
- **Danger**: Red (#F44336)
- **Info**: Blue (#2196F3)
- **Accent**: Purple (#9C27B0)

### Component Design
- Material Design principles throughout
- Responsive grid layout with Vuetify
- Card-based dashboard sections
- Consistent spacing and shadows
- Icons for visual recognition

## 🔧 Configuration

### TypeScript
- Configured for Vue 3 components
- Strict type checking enabled
- JSON module resolution enabled for importing metrics.json

### Vite
- Vue 3 plugin enabled
- Optimized build configuration
- Development server with hot module replacement

## 📚 Technologies Used

| Technology | Version | Purpose |
|-----------|---------|---------|
| Vue | 3.5.34 | Progressive framework |
| TypeScript | 6.0.2 | Type safety |
| Vite | 8.0.12 | Build tool |
| Vuetify | 4.1.2 | UI components |
| Chart.js | 4.5.1 | Charts & graphs |
| Vue Router | 5.1.0 | Routing |
| Material Design Icons | 7.4.47 | Icons |

## 📈 Sample Data

The dashboard includes realistic sample data for a 100k follower account with:
- 12 months of historical data
- Multi-platform metrics (YouTube, TikTok, Instagram, Twitter)
- Top 10 content pieces with engagement metrics
- Geographic performance by country
- Audience demographics by age and gender
- Publishing performance by day and time
- Revenue and sponsorship data

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
# Or specify a different port
npm run dev -- --port 3000
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Import Errors
Ensure TypeScript config includes:
```json
"compilerOptions": {
  "resolveJsonModule": true
}
```

## 📝 Notes

- Dashboard uses local JSON data file (can be replaced with API calls)
- All metrics are sample data for demonstration
- Charts are fully responsive and mobile-friendly
- Deployment tested and working on Vercel

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📧 Contact

For questions or support, please create an issue in the repository.

---

**Built with Vue 3 + TypeScript + Vuetify + Chart.js**
