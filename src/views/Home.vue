<template>
  <v-container fluid class="pa-6">
    <!-- Header Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <div>
            <h1 class="text-h4 font-weight-bold">Content Analytics Dashboard</h1>
            <p class="text-subtitle2 text-grey mt-1">Monitor your content performance across all platforms</p>
          </div>
          <div class="d-flex gap-2">
            <v-btn @click="refreshData" icon size="small">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn @click="exportData" icon size="small">
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Filter Section -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="2">
        <v-select 
          v-model="selectedYear" 
          :items="yearOptions" 
          label="Year" 
          variant="outlined" 
          density="compact"
          @update:modelValue="applyFilters"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-select 
          v-model="selectedDateRange" 
          :items="dateRangeOptions" 
          item-title="title"
          item-value="value"
          label="Date Range" 
          variant="outlined" 
          density="compact"
          @update:modelValue="applyFilters"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-select 
          v-model="selectedPlatforms" 
          :items="platformOptions" 
          item-title="title"
          item-value="value"
          label="Platforms" 
          variant="outlined" 
          multiple 
          density="compact"
          @update:modelValue="applyFilters"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-select 
          v-model="selectedContentType" 
          :items="contentTypeOptions" 
          item-title="title"
          item-value="value"
          label="Content Type" 
          variant="outlined" 
          density="compact"
          @update:modelValue="applyFilters"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn @click="refreshData" block color="primary" variant="tonal">Refresh</v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="2">
        <v-btn @click="resetFilters" block color="secondary" variant="tonal">Reset</v-btn>
      </v-col>
    </v-row>

    <!-- KPI Cards Row -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="2.4">
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-subtitle2 text-grey">Total Views</p>
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.totalViews) }}</p>
              </div>
              <v-icon size="32" color="primary">mdi-eye</v-icon>
            </div>
            <v-progress-linear :value="85" color="primary" class="mt-2" height="4"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="2.4">
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-subtitle2 text-grey">Followers</p>
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.totalFollowers) }}</p>
              </div>
              <v-icon size="32" color="primary">mdi-account-multiple</v-icon>
            </div>
            <v-chip size="small" color="success" text-color="white" class="mt-2">+2.3% MoM</v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="2.4">
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-subtitle2 text-grey">Engagement Rate</p>
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ metrics.totalEngagementRate.toFixed(2) }}%</p>
              </div>
              <v-icon size="32" color="primary">mdi-heart</v-icon>
            </div>
            <v-chip size="small" color="success" text-color="white" class="mt-2">+0.45% MoM</v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="2.4">
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-subtitle2 text-grey">Ad Revenue</p>
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">${{ formatNumber(metrics.totalAdRevenue) }}</p>
              </div>
              <v-icon size="32" color="success">mdi-chart-line</v-icon>
            </div>
            <v-chip size="small" color="success" text-color="white" class="mt-2">+12.5% YoY</v-chip>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="2.4">
        <v-card elevation="2">
          <v-card-text>
            <div class="d-flex align-center justify-space-between">
              <div>
                <p class="text-subtitle2 text-grey">Watch Time</p>
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.avgWatchTimeHours) }}h</p>
              </div>
              <v-icon size="32" color="info">mdi-clock</v-icon>
            </div>
            <v-progress-linear :value="72" color="info" class="mt-2" height="4"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 1 -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Views Trend (Monthly)</v-card-title>
          <v-card-text>
            <canvas id="viewsChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Subscriber Growth</v-card-title>
          <v-card-text>
            <canvas id="subscriberChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 2 -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Revenue Trend</v-card-title>
          <v-card-text>
            <canvas id="revenueChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Engagement Breakdown</v-card-title>
          <v-card-text>
            <canvas id="engagementChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 3 -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Content Performance by Type</v-card-title>
          <v-card-text>
            <canvas id="contentTypeChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-card-title>Platform Performance</v-card-title>
          <v-card-text>
            <canvas id="platformChart" height="80"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top Content Table -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>Top 10 Performing Content</v-card-title>
          <v-data-table
            :headers="topContentHeaders"
            :items="topContent"
            :items-per-page="10"
            class="elevation-0"
          >
            <template v-slot:item.views="{ item }">
              {{ formatNumber(item.views) }}
            </template>
            <template v-slot:item.engagementRate="{ item }">
              <v-chip :color="item.engagementRate > 4 ? 'success' : 'warning'" text-color="white" size="small">
                {{ item.engagementRate.toFixed(1) }}%
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler } from 'chart.js'
import metricsData from '../data/metrics.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler)

const selectedYear = ref(2026)
const selectedDateRange = ref('all')
const selectedPlatforms = ref(['YouTube', 'TikTok', 'Instagram'])
const selectedContentType = ref('all')

const yearOptions = [2024, 2025, 2026]

const dateRangeOptions = [
  { title: 'Last 7 Days', value: '7' },
  { title: 'Last 30 Days', value: '30' },
  { title: 'Last 90 Days', value: '90' },
  { title: 'All Time', value: 'all' }
]

const platformOptions = [
  { title: 'YouTube', value: 'YouTube' },
  { title: 'TikTok', value: 'TikTok' },
  { title: 'Instagram', value: 'Instagram' },
  { title: 'Twitter', value: 'Twitter' }
]

const contentTypeOptions = [
  { title: 'All Types', value: 'all' },
  { title: 'Educational Tutorials', value: 'Educational Tutorials' },
  { title: 'Behind-the-Scenes', value: 'Behind-the-Scenes' },
  { title: 'Quick Tips', value: 'Quick Tips' },
  { title: 'Trending Content', value: 'Trending Content' },
  { title: 'Live Streams', value: 'Live Streams' }
]

const topContentHeaders = [
  { title: 'Title', key: 'title', width: '30%' },
  { title: 'Platform', key: 'platform', width: '15%' },
  { title: 'Views', key: 'views', width: '15%' },
  { title: 'Engagement', key: 'engagementRate', width: '15%' },
  { title: 'Date', key: 'date', width: '15%' },
  { title: 'Likes', key: 'likes', width: '10%' }
]

const metrics = ref(metricsData.overview)
const monthlyData = ref(metricsData.monthlyData.filter(m => m.year === selectedYear.value))
const topContent = ref(metricsData.topContent)
const platformPerformance = metricsData.platformPerformance
const contentTypePerformance = metricsData.contentTypePerformance

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toFixed(0)
}

const applyFilters = () => {
  monthlyData.value = metricsData.monthlyData.filter(m => m.year === selectedYear.value)
  
  if (selectedContentType.value !== 'all') {
    topContent.value = metricsData.topContent.filter(c => c.type === selectedContentType.value)
  } else {
    topContent.value = metricsData.topContent
  }
  
  if (selectedPlatforms.value.length > 0) {
    topContent.value = topContent.value.filter(c => selectedPlatforms.value.includes(c.platform))
  }
  
  console.log('Filters applied:', { year: selectedYear.value, dateRange: selectedDateRange.value, platforms: selectedPlatforms.value, contentType: selectedContentType.value })
  
  // Redraw charts
  setTimeout(() => {
    drawCharts()
  }, 100)
}

const resetFilters = () => {
  selectedYear.value = 2026
  selectedDateRange.value = 'all'
  selectedPlatforms.value = ['YouTube', 'TikTok', 'Instagram']
  selectedContentType.value = 'all'
  applyFilters()
}

const refreshData = () => {
  console.log('Refreshing data...')
  applyFilters()
}

const exportData = () => {
  console.log('Exporting data...')
}

let charts: any = {}

const drawCharts = () => {
  // Destroy existing charts
  Object.values(charts).forEach((chart: any) => {
    if (chart) chart.destroy()
  })
  charts = {}

  const monthLabels = monthlyData.value.map(m => m.month)
  
  // Views Trend Chart
  const viewsCtx = document.getElementById('viewsChart') as HTMLCanvasElement
  if (viewsCtx) {
    charts['viewsChart'] = new ChartJS(viewsCtx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Views',
            data: monthlyData.value.map(m => m.views),
            borderColor: '#3f51b5',
            backgroundColor: 'rgba(63, 81, 181, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }

  // Subscriber Growth Chart
  const subscriberCtx = document.getElementById('subscriberChart') as HTMLCanvasElement
  if (subscriberCtx) {
    charts['subscriberChart'] = new ChartJS(subscriberCtx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Followers',
            data: monthlyData.value.map(m => m.followers),
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }

  // Revenue Trend Chart
  const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement
  if (revenueCtx) {
    charts['revenueChart'] = new ChartJS(revenueCtx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Ad Revenue',
            data: monthlyData.value.map(m => m.adRevenue),
            backgroundColor: '#FF9800'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }

  // Engagement Distribution Chart
  const engagementCtx = document.getElementById('engagementChart') as HTMLCanvasElement
  if (engagementCtx && monthlyData.value.length > 0) {
    const lastMonth = monthlyData.value[monthlyData.value.length - 1]
    charts['engagementChart'] = new ChartJS(engagementCtx, {
      type: 'doughnut',
      data: {
        labels: ['Likes', 'Comments', 'Shares'],
        datasets: [
          {
            data: [lastMonth.likes, lastMonth.comments, lastMonth.shares],
            backgroundColor: ['#3f51b5', '#FF9800', '#4CAF50']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }

  // Content Type Chart
  const contentTypeCtx = document.getElementById('contentTypeChart') as HTMLCanvasElement
  if (contentTypeCtx) {
    charts['contentTypeChart'] = new ChartJS(contentTypeCtx, {
      type: 'bar',
      data: {
        labels: contentTypePerformance.map(ct => ct.type),
        datasets: [
          {
            label: 'Views',
            data: contentTypePerformance.map(ct => ct.views / 1000000),
            backgroundColor: '#2196F3'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }

  // Platform Chart
  const platformCtx = document.getElementById('platformChart') as HTMLCanvasElement
  if (platformCtx) {
    charts['platformChart'] = new ChartJS(platformCtx, {
      type: 'bar',
      data: {
        labels: Object.keys(platformPerformance),
        datasets: [
          {
            label: 'Followers',
            data: Object.values(platformPerformance).map(p => p.followers),
            backgroundColor: '#3f51b5'
          },
          {
            label: 'Engagement %',
            data: Object.values(platformPerformance).map(p => p.engagement),
            backgroundColor: '#4CAF50'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true } }
      }
    })
  }
}

onMounted(() => {
  monthlyData.value = metricsData.monthlyData.filter(m => m.year === selectedYear.value)
  drawCharts()
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
