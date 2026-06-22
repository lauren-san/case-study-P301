<template>
  <v-container fluid class="pa-6" style="display: flex; flex-direction: column; height: 100%;">
    <!-- Header Section -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex align-center justify-space-between">
          <div class="text-left">
            <h1 class="font-weight-bold" style="font-size: 1.55rem; line-height: 1.2; color: var(--text-h); margin: 0; font-weight: 700; letter-spacing: 0.03em;">TikTok Analytics</h1>
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
    <v-row class="mb-0 filter-row">
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
    </v-row>

    <!-- KPI Cards Row 1: Followers, Engagement Rate, Ad Revenue -->
    <v-row class="mb-4" align="stretch">
      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-teal">
                <v-icon size="22" color="white">mdi-account-multiple</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Followers</span>
                <p class="text-h6 kpi-value">{{ formatNumber(metrics.totalFollowers) }}</p>
              </div>
            </div>
            <div class="d-flex justify-end mt-auto pt-2" style="width: 100%;">
              <v-chip size="small" color="rgba(23,215,166,0.15)" style="color: #17D7A6;">+2.3% MoM</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-orange">
                <v-icon size="22" color="white">mdi-heart</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Engagement Rate</span>
                <p class="text-h6 kpi-value">{{ metrics.totalEngagementRate.toFixed(2) }}%</p>
              </div>
            </div>
            <div class="d-flex justify-end mt-auto pt-2" style="width: 100%;">
              <v-chip size="small" color="rgba(255,165,0,0.15)" style="color: #FFA500;">+0.45% MoM</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-coral">
                <v-icon size="22" color="white">mdi-chart-line</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Ad Revenue</span>
                <p class="text-h6 kpi-value">${{ formatNumber(metrics.totalAdRevenue) }}</p>
              </div>
            </div>
            <div class="d-flex justify-end mt-auto pt-2" style="width: 100%;">
              <v-chip size="small" color="rgba(255,107,84,0.15)" style="color: #FF6B54;">+12.5% YoY</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- KPI Cards Row 2: Total Views, Watch Time, Likes -->
    <v-row class="mb-6" align="stretch">
      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-purple">
                <v-icon size="22" color="white">mdi-eye</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Total Views</span>
                <p class="text-h6 kpi-value">{{ formatNumber(metrics.totalViews) }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-cyan">
                <v-icon size="22" color="white">mdi-clock</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Total Watch Time</span>
                <p class="text-h6 kpi-value">{{ formatNumber(metrics.avgWatchTimeHours) }}h</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4" style="flex: 1; min-width: 0;">
        <v-card elevation="1" class="kpi-card">
          <v-card-text class="kpi-card-text">
            <div class="kpi-header-row">
              <div class="icon-circle icon-likes">
                <v-icon size="22" color="white">mdi-thumb-up</v-icon>
              </div>
              <div class="kpi-copy">
                <span class="text-caption font-weight-bold">Total Likes</span>
                <p class="text-h6 kpi-value">{{ formatNumber(totalLikes) }}</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Charts Row 2 -->
    <v-row class="mb-6" align="stretch">
      <v-col cols="12" md="6">
        <v-card elevation="1" class="chart-card">
          <v-card-title class="chart-card-title">Revenue Trend</v-card-title>
          <v-card-text class="chart-card-text">
            <div class="chart-panel chart-panel-line">
              <canvas id="revenueChart" height="120"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="1" class="chart-card">
          <v-card-title class="chart-card-title">Subscriber Churn</v-card-title>
          <v-card-text class="chart-card-text">
            <div class="chart-panel chart-panel-line">
              <canvas id="subscriberChurnChart" height="120"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 3 -->
    <v-row class="mb-6" align="stretch">
      <v-col cols="12" md="6">
        <v-card elevation="1" style="height: 280px;">
          <v-card-title class="chart-card-title">Engagement Breakdown</v-card-title>
          <v-card-text class="donut-card-text">
            <div class="chart-panel chart-panel-donut">
              <canvas id="engagementChart" height="100"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" class="content-type-card">
          <v-card-title class="chart-card-title">Content Performance by Type</v-card-title>
          <v-card-text class="content-type-card-text">
            <div class="chart-panel chart-panel-bar">
              <canvas id="contentTypeChart"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Top Content Table -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card elevation="1">
          <v-card-title class="chart-card-title">Top 10 Performing Content</v-card-title>
          <v-data-table
            :headers="topContentHeaders"
            :items="topContent"
            :items-per-page="-1"
            hide-default-footer
            class="elevation-0 top-content-table"
          >
            <template v-slot:item.title="{ item }">
              <div class="cell-start">{{ item.title }}</div>
            </template>
            <template v-slot:item.platform="{ item }">
              <div class="cell-start">{{ item.platform }}</div>
            </template>
            <template v-slot:item.views="{ item }">
              <div class="cell-end">{{ formatNumber(item.views) }}</div>
            </template>
            <template v-slot:item.engagementRate="{ item }">
              <div class="cell-end">
                <v-chip :color="item.engagementRate > 4 ? 'success' : 'warning'" text-color="white" size="small">
                  {{ item.engagementRate.toFixed(1) }}%
                </v-chip>
              </div>
            </template>
            <template v-slot:item.date="{ item }">
              <div class="cell-start">{{ item.date }}</div>
            </template>
            <template v-slot:item.likes="{ item }">
              <div class="cell-end">{{ formatNumber(item.likes) }}</div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler } from 'chart.js'
import metricsData from '../data/metrics.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler)

const selectedYear = ref(2026)
const selectedDateRange = ref('all')
const selectedContentType = ref('all')

const yearOptions = [2024, 2025, 2026]

const dateRangeOptions = [
  { title: 'Last 7 Days', value: '7' },
  { title: 'Last 30 Days', value: '30' },
  { title: 'Last 90 Days', value: '90' },
  { title: 'All Time', value: 'all' }
]

const topContentHeaders = [
  { title: 'Title', key: 'title', width: '30%', align: 'start' as const },
  { title: 'Platform', key: 'platform', width: '15%', align: 'start' as const },
  { title: 'Views', key: 'views', width: '15%', align: 'end' as const },
  { title: 'Engagement', key: 'engagementRate', width: '15%', align: 'end' as const },
  { title: 'Date', key: 'date', width: '15%', align: 'start' as const },
  { title: 'Likes', key: 'likes', width: '10%', align: 'end' as const }
]

const metrics = ref(metricsData.overview)
const totalLikes = metricsData.monthlyData.reduce((sum: number, m: any) => sum + (m.likes || 0), 0)
const monthlyData = ref(metricsData.monthlyData.filter(m => m.year === selectedYear.value))
const topContent = ref(
  metricsData.topContent
    .sort((left, right) => right.views - left.views)
    .slice(0, 10)
)
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
  
  let filteredContent = [...metricsData.topContent]
  
  if (selectedContentType.value !== 'all') {
    filteredContent = filteredContent.filter(c => c.type === selectedContentType.value)
  }
  
  topContent.value = filteredContent
    .sort((left, right) => right.views - left.views)
    .slice(0, 10)
  
  // Redraw charts
  setTimeout(() => {
    drawCharts()
  }, 100)
}

const refreshData = () => {
  console.log('Refreshing data...')
  applyFilters()
}

const exportData = () => {
  console.log('Exporting data...')
}

let charts: any = {}

const getChartPalette = () => {
  const themeRoot = (document.querySelector('.v-application') as HTMLElement | null) || document.documentElement
  const rootStyles = getComputedStyle(themeRoot)

  return {
    text: rootStyles.getPropertyValue('--dashboard-chart-text').trim() || '#3f4756',
    grid: rootStyles.getPropertyValue('--dashboard-grid').trim() || 'rgba(15, 23, 42, 0.12)',
    legend: rootStyles.getPropertyValue('--dashboard-chart-text').trim() || '#3f4756'
  }
}

const drawCharts = () => {
  // Destroy existing charts
  Object.values(charts).forEach((chart: any) => {
    if (chart) chart.destroy()
  })
  charts = {}
  const palette = getChartPalette()

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
            borderColor: '#6B5BFF',
            backgroundColor: 'rgba(107, 91, 255, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true, labels: { color: palette.legend } } },
        scales: {
          x: {
            ticks: { color: palette.text },
            grid: { color: palette.grid }
          },
          y: {
            ticks: { color: palette.text },
            grid: { color: palette.grid }
          }
        }
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
            borderColor: '#17D7A6',
            backgroundColor: 'rgba(23, 215, 166, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: true, labels: { color: palette.legend } } },
        scales: {
          x: {
            ticks: { color: palette.text },
            grid: { color: palette.grid }
          },
          y: {
            ticks: { color: palette.text },
            grid: { color: palette.grid }
          }
        }
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
            backgroundColor: '#FF9800',
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 18,
            maxBarThickness: 22
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` $${Number(context.parsed.y).toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxRotation: 0, color: palette.text }
          },
          y: {
            beginAtZero: true,
            grid: { color: palette.grid },
            ticks: {
              color: palette.text,
              callback: (value) => `$${Number(value).toLocaleString()}`
            }
          }
        }
      }
    })
  }

  // Subscriber Churn Chart
  const churnCtx = document.getElementById('subscriberChurnChart') as HTMLCanvasElement
  if (churnCtx) {
    charts['subscriberChurnChart'] = new ChartJS(churnCtx, {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Churn Rate',
            data: monthlyData.value.map(m => m.churnRate),
            borderColor: '#EF5350',
            backgroundColor: 'rgba(239, 83, 80, 0.14)',
            pointBackgroundColor: '#EF5350',
            pointRadius: 3,
            pointHoverRadius: 4,
            borderWidth: 2,
            tension: 0.35,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${Number(context.parsed.y).toFixed(2)}%`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { maxRotation: 0, color: palette.text }
          },
          y: {
            beginAtZero: true,
            grid: { color: palette.grid },
            ticks: {
              color: palette.text,
              callback: (value) => `${Number(value).toFixed(2)}%`
            }
          }
        }
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
            backgroundColor: ['#6B5BFF', '#FF9800', '#17D7A6']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '58%',
        layout: {
          padding: {
            top: 4,
            bottom: 36
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              font: {
                size: 10
              },
              color: palette.legend,
              boxWidth: 12,
              boxHeight: 12,
              usePointStyle: true,
              padding: 12
            }
          }
        }
      }
    })
  }

  // Content Type Chart
  const contentTypeCtx = document.getElementById('contentTypeChart') as HTMLCanvasElement
  if (contentTypeCtx) {
    const topContentTypes = [...contentTypePerformance]
      .sort((left, right) => right.views - left.views)
      .slice(0, 3)

    charts['contentTypeChart'] = new ChartJS(contentTypeCtx, {
      type: 'bar',
      data: {
        labels: topContentTypes.map(ct => ct.type),
        datasets: [
          {
            label: 'Views',
            data: topContentTypes.map(ct => ct.views / 1000000),
            backgroundColor: '#00D4FF'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => ` ${Number(context.parsed.x).toFixed(1)}M views`
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: palette.grid },
            ticks: {
              color: palette.text,
              callback: (value) => `${value}M`
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: palette.text }
          }
        }
      }
    })
  }

}

const handleThemeChange = () => {
  setTimeout(() => {
    drawCharts()
  }, 0)
}

onMounted(() => {
  monthlyData.value = metricsData.monthlyData.filter(m => m.year === selectedYear.value)
  drawCharts()
  window.addEventListener('app-theme-change', handleThemeChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('app-theme-change', handleThemeChange)
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}

.kpi-card {
  border-radius: 12px;
  background: var(--dashboard-card-bg);
  height: 100%;
}

.kpi-card-text {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.kpi-header-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.kpi-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.kpi-value {
  font-weight: 600;
  margin: 0;
}

.chart-card-title {
  font-weight: 700 !important;
  font-size: 1rem !important;
  line-height: 1.25;
  text-align: left;
  justify-content: flex-start;
}

.chart-card {
  height: 100%;
}

.chart-card-text {
  width: 100%;
}

.chart-panel {
  position: relative;
  width: 100%;
}

.chart-panel-line {
  width: 100%;
}

.chart-panel-line canvas,
.chart-panel-bar canvas {
  width: 100% !important;
}

.chart-panel-donut {
  max-width: 250px;
  margin: 0 auto;
}

.donut-card-text {
  padding-top: 0;
  padding-bottom: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.chart-panel-bar {
  height: 100%;
}

.chart-panel-bar canvas {
  height: 100% !important;
}

.content-type-card {
  height: 280px;
  display: flex;
  flex-direction: column;
}

.content-type-card-text {
  flex: 1;
  min-height: 0;
}

:deep(.filter-row .v-col) {
  padding-bottom: 6px;
}

:deep(.top-content-table th),
:deep(.top-content-table td) {
  vertical-align: middle;
}

:deep(.top-content-table th:nth-child(1)),
:deep(.top-content-table th:nth-child(2)),
:deep(.top-content-table th:nth-child(5)),
:deep(.top-content-table td:nth-child(1)),
:deep(.top-content-table td:nth-child(2)),
:deep(.top-content-table td:nth-child(5)) {
  text-align: left;
}

:deep(.top-content-table th:nth-child(3)),
:deep(.top-content-table th:nth-child(4)),
:deep(.top-content-table th:nth-child(6)),
:deep(.top-content-table td:nth-child(3)),
:deep(.top-content-table td:nth-child(4)),
:deep(.top-content-table td:nth-child(6)) {
  text-align: right;
}

.cell-start {
  text-align: left;
}

.cell-end {
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

.icon-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-purple { background: #6B5BFF; }
.icon-teal   { background: #17D7A6; }
.icon-orange { background: #FFA500; }
.icon-coral  { background: #FF6B54; }
.icon-cyan   { background: #00D4FF; }
.icon-likes  { background: #FF4757; }
</style>
