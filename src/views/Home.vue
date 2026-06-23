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
    </v-row>

    <!-- KPI Cards: 2-up on mobile, 3-up on desktop -->
    <v-row class="mb-6" align="stretch">
      <v-col cols="12" sm="6" md="4">
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
              <v-chip size="small" color="rgba(23,215,166,0.15)" style="color: #17D7A6;">{{ percentageChanges.followers > 0 ? '+' : '' }}{{ percentageChanges.followers.toFixed(1) }}% YoY</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
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
              <v-chip size="small" color="rgba(255,165,0,0.15)" style="color: #FFA500;">{{ percentageChanges.engagement > 0 ? '+' : '' }}{{ percentageChanges.engagement.toFixed(2) }}% YoY</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
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
              <v-chip size="small" color="rgba(255,107,84,0.15)" style="color: #FF6B54;">{{ percentageChanges.revenue > 0 ? '+' : '' }}{{ percentageChanges.revenue.toFixed(1) }}% YoY</v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="4">
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

      <v-col cols="12" sm="6" md="4">
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

      <v-col cols="12" sm="6" md="4">
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
        <v-card elevation="1" class="chart-card chart-card-fixed">
          <v-card-title class="chart-card-title">Revenue Trend</v-card-title>
          <v-card-text class="chart-card-text">
            <div class="chart-panel chart-panel-line">
              <canvas id="revenueChart" height="120"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="1" class="chart-card chart-card-fixed">
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
        <v-card elevation="1" class="chart-card chart-card-fixed">
          <v-card-title class="chart-card-title">Engagement Breakdown</v-card-title>
          <v-card-text class="chart-card-text donut-card-text">
            <div class="chart-panel chart-panel-donut">
              <canvas id="engagementChart" height="100"></canvas>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" class="chart-card chart-card-fixed">
          <v-card-title class="chart-card-title">Content Performance by Type</v-card-title>
          <v-card-text class="chart-card-text content-type-card-text">
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
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler } from 'chart.js'
import metricsData from '../data/metrics.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, DoughnutController, Filler)

const selectedYear = ref(2026)
const selectedContentType = ref('all')

const yearOptions = [2024, 2025, 2026]

const topContentHeaders = [
  { title: 'Title', key: 'title', width: '30%', align: 'start' as const },
  { title: 'Platform', key: 'platform', width: '15%', align: 'start' as const },
  { title: 'Views', key: 'views', width: '15%', align: 'end' as const },
  { title: 'Engagement', key: 'engagementRate', width: '15%', align: 'end' as const },
  { title: 'Date', key: 'date', width: '15%', align: 'start' as const },
  { title: 'Likes', key: 'likes', width: '10%', align: 'end' as const }
]

const metrics = ref(metricsData.overview)
const totalLikes = ref(0)
const monthlyData = ref(metricsData.monthlyData.filter(m => m.year === selectedYear.value))
const topContent = ref(
  metricsData.topContent
    .filter(c => c.platform === 'TikTok' && new Date(c.date).getFullYear() === selectedYear.value)
    .sort((left, right) => right.views - left.views)
    .slice(0, 10)
)
const contentTypePerformance = metricsData.contentTypePerformance
const yearMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const firstHalfMonths = ['January', 'February', 'March', 'April', 'May', 'June']
type MonthlyMetricKey = 'views' | 'followers' | 'adRevenue' | 'churnRate'

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toFixed(0)
}

const buildOverviewFromMonthlyData = (filteredMonthlyData: any[]) => {
  if (!filteredMonthlyData.length) {
    return {
      ...metricsData.overview,
      totalFollowers: 0,
      totalViews: 0,
      totalEngagementRate: 0,
      totalAdRevenue: 0,
      avgWatchTimeHours: 0
    }
  }

  const lastMonth = filteredMonthlyData[filteredMonthlyData.length - 1]
  const totalViews = filteredMonthlyData.reduce((sum: number, month: any) => sum + (month.views || 0), 0)
  const totalAdRevenue = filteredMonthlyData.reduce((sum: number, month: any) => sum + (month.adRevenue || 0), 0)
  const totalWatchTime = filteredMonthlyData.reduce((sum: number, month: any) => sum + (month.watchTimeHours || 0), 0)
  const avgEngagementRate = filteredMonthlyData.reduce((sum: number, month: any) => sum + (month.engagementRate || 0), 0) / filteredMonthlyData.length

  return {
    ...metricsData.overview,
    totalFollowers: lastMonth.followers || 0,
    totalViews,
    totalEngagementRate: avgEngagementRate,
    totalAdRevenue,
    avgWatchTimeHours: totalWatchTime
  }
}

const calculatePercentageChange = (currentYear: number) => {
  const previousYear = currentYear - 1
  
  // Get previous year data
  const previousYearData = metricsData.monthlyData.filter(m => m.year === previousYear)
  const previousMetrics = buildOverviewFromMonthlyData(previousYearData)
  
  // Current year is already in metrics.value
  const currentMetrics = metrics.value
  
  // Calculate percentage changes
  const followerChange = previousMetrics.totalFollowers > 0 
    ? ((currentMetrics.totalFollowers - previousMetrics.totalFollowers) / previousMetrics.totalFollowers) * 100 
    : 0
  
  const engagementChange = previousMetrics.totalEngagementRate > 0
    ? ((currentMetrics.totalEngagementRate - previousMetrics.totalEngagementRate) / previousMetrics.totalEngagementRate) * 100
    : 0
  
  const revenueChange = previousMetrics.totalAdRevenue > 0
    ? ((currentMetrics.totalAdRevenue - previousMetrics.totalAdRevenue) / previousMetrics.totalAdRevenue) * 100
    : 0
  
  return {
    followers: followerChange,
    engagement: engagementChange,
    revenue: revenueChange
  }
}

const percentageChanges = ref({ followers: 0, engagement: 0, revenue: 0 })

const applyFilters = () => {
  const yearData = metricsData.monthlyData.filter(m => m.year === selectedYear.value)
  monthlyData.value = yearData
  metrics.value = buildOverviewFromMonthlyData(monthlyData.value)
  totalLikes.value = monthlyData.value.reduce((sum: number, month: any) => sum + (month.likes || 0), 0)
  
  // Calculate percentage changes
  if (selectedYear.value === 2024) {
    // Sample data for 2024 since there's no previous year
    percentageChanges.value = { followers: 8.5, engagement: 3.2, revenue: 15.8 }
  } else {
    percentageChanges.value = calculatePercentageChange(selectedYear.value)
  }
  
  let filteredContent = [...metricsData.topContent].filter(c => c.platform === 'TikTok' && new Date(c.date).getFullYear() === selectedYear.value)
  
  if (selectedContentType.value !== 'all') {
    filteredContent = filteredContent.filter(c => c.type === selectedContentType.value)
  }
  
  topContent.value = filteredContent
    .sort((left, right) => right.views - left.views)
    .slice(0, 10)
  
  // Redraw charts after reactive data updates are flushed.
  nextTick(() => {
    drawCharts()
  })
}

const refreshData = () => {
  console.log('Refreshing data...')
  applyFilters()
}

const exportData = () => {
  // Prepare CSV data
  let csvContent = 'TikTok Analytics Report\n'
  csvContent += `Year: ${selectedYear.value}\n\n`
  
  // Add metrics section
  csvContent += 'KPI Metrics\n'
  csvContent += 'Metric,Value\n'
  csvContent += `Total Followers,${metrics.value.totalFollowers}\n`
  csvContent += `Total Views,${metrics.value.totalViews}\n`
  csvContent += `Engagement Rate,${metrics.value.totalEngagementRate.toFixed(2)}%\n`
  csvContent += `Ad Revenue,$${metrics.value.totalAdRevenue.toFixed(2)}\n`
  csvContent += `Total Watch Time,${metrics.value.avgWatchTimeHours}h\n`
  csvContent += `Total Likes,${totalLikes.value}\n\n`
  
  // Add top content section
  csvContent += 'Top 10 Performing Content\n'
  csvContent += 'Title,Views,Engagement Rate,Likes,Date\n'
  topContent.value.forEach((content: any) => {
    csvContent += `"${content.title}",${content.views},${content.engagementRate}%,${content.likes},${content.date}\n`
  })
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tiktok-analytics-${selectedYear.value}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
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

  const monthLabels = selectedYear.value === 2026 ? [...firstHalfMonths] : [...yearMonths]
  const getMonthlySeries = (metricKey: MonthlyMetricKey) => {
    return monthLabels.map((monthLabel) => {
      const monthEntry = monthlyData.value.find((month) => month.month === monthLabel)
      return monthEntry ? monthEntry[metricKey] : null
    })
  }
  
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
            data: getMonthlySeries('views'),
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
            data: getMonthlySeries('followers'),
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
            data: getMonthlySeries('adRevenue'),
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
        maintainAspectRatio: false,
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
            data: getMonthlySeries('churnRate'),
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
        maintainAspectRatio: false,
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
  applyFilters()
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
  display: flex;
  flex-direction: column;
}

.chart-card-fixed {
  height: 320px;
}

.chart-card-text {
  width: 100%;
  flex: 1;
  min-height: 0;
}

.chart-panel {
  position: relative;
  width: 100%;
}

.chart-panel-line {
  width: 100%;
  height: 220px;
}

.chart-panel-line canvas,
.chart-panel-bar canvas {
  width: 100% !important;
}

.chart-panel-line canvas {
  height: 220px !important;
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
  height: 220px;
}

.chart-panel-bar canvas {
  height: 220px !important;
}

.content-type-card-text {
  padding-top: 8px;
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
