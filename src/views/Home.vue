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
      <v-col cols="12" sm="6" md="3">
        <v-select v-model="selectedDateRange" :items="dateRangeOptions" label="Date Range" variant="outlined" density="compact"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select v-model="selectedPlatforms" :items="platformOptions" label="Platforms" variant="outlined" multiple density="compact"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-select v-model="selectedContentType" :items="contentTypeOptions" label="Content Type" variant="outlined" density="compact"></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-btn @click="applyFilters" block color="primary" variant="tonal">Apply Filters</v-btn>
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
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.overview.totalViews) }}</p>
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
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.overview.totalFollowers) }}</p>
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
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ metrics.overview.totalEngagementRate.toFixed(2) }}%</p>
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
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">${{ formatNumber(metrics.overview.totalAdRevenue) }}</p>
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
                <p class="text-h5 font-weight-bold" style="color: #3f51b5">{{ formatNumber(metrics.overview.avgWatchTimeHours) }}h</p>
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
            :items="metrics.topContent"
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

    <!-- Detailed Analytics Section -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-expansion-panels>
          <!-- Demographics Panel -->
          <v-expansion-panel>
            <v-expansion-panel-title>Audience Demographics</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12" md="6">
                  <p class="font-weight-bold mb-4">Age Distribution</p>
                  <canvas id="ageChart" height="100"></canvas>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="font-weight-bold mb-4">Gender Distribution</p>
                  <canvas id="genderChart" height="100"></canvas>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Publishing Times Panel -->
          <v-expansion-panel>
            <v-expansion-panel-title>Top Performing Hours & Days</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Avg Views</th>
                    <th>Engagement Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="time in metrics.bestPublishingTimes.slice(0, 5)" :key="time.day + time.time">
                    <td>{{ time.day }}</td>
                    <td>{{ time.time }}</td>
                    <td>{{ formatNumber(time.avgViews) }}</td>
                    <td>
                      <v-chip color="success" text-color="white" size="small">{{ time.engagementRate.toFixed(2) }}%</v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Geographic Performance Panel -->
          <v-expansion-panel>
            <v-expansion-panel-title>Geographic Performance</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Followers</th>
                    <th>Views</th>
                    <th>Engagement Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="geo in metrics.geographicPerformance" :key="geo.country">
                    <td>{{ geo.country }}</td>
                    <td>{{ formatNumber(geo.followers) }}</td>
                    <td>{{ formatNumber(geo.views) }}</td>
                    <td>
                      <v-chip color="info" text-color="white" size="small">{{ geo.engagementRate.toFixed(2) }}%</v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Churn Analysis Panel -->
          <v-expansion-panel>
            <v-expansion-panel-title>Churn Analysis</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col cols="12">
                  <canvas id="churnChart" height="100"></canvas>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, Filler } from 'chart.js'
import metrics from '../data/metrics.json'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, LineController, BarController, Filler)

const selectedDateRange = ref('all')
const selectedPlatforms = ref(['YouTube', 'TikTok', 'Instagram'])
const selectedContentType = ref('all')

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
  console.log('Filters applied:', { selectedDateRange: selectedDateRange.value, selectedPlatforms: selectedPlatforms.value, selectedContentType: selectedContentType.value })
}

const refreshData = () => {
  console.log('Refreshing data...')
}

const exportData = () => {
  console.log('Exporting data...')
}

onMounted(() => {
  // Views Trend Chart
  const viewsCtx = document.getElementById('viewsChart') as HTMLCanvasElement
  new ChartJS(viewsCtx, {
    type: 'line',
    data: {
      labels: metrics.monthlyData.map(m => m.month.split(' ')[0]),
      datasets: [
        {
          label: 'Views',
          data: metrics.monthlyData.map(m => m.views),
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
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Subscriber Growth Chart
  const subscriberCtx = document.getElementById('subscriberChart') as HTMLCanvasElement
  new ChartJS(subscriberCtx, {
    type: 'line',
    data: {
      labels: metrics.monthlyData.map(m => m.month.split(' ')[0]),
      datasets: [
        {
          label: 'Followers',
          data: metrics.monthlyData.map(m => m.followers),
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
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Revenue Trend Chart
  const revenueCtx = document.getElementById('revenueChart') as HTMLCanvasElement
  new ChartJS(revenueCtx, {
    type: 'bar',
    data: {
      labels: metrics.monthlyData.map(m => m.month.split(' ')[0]),
      datasets: [
        {
          label: 'Ad Revenue',
          data: metrics.monthlyData.map(m => m.adRevenue),
          backgroundColor: '#FF9800'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Engagement Distribution Chart
  const engagementCtx = document.getElementById('engagementChart') as HTMLCanvasElement
  const lastMonth = metrics.monthlyData[metrics.monthlyData.length - 1]
  new ChartJS(engagementCtx, {
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
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Content Type Chart
  const contentTypeCtx = document.getElementById('contentTypeChart') as HTMLCanvasElement
  new ChartJS(contentTypeCtx, {
    type: 'bar',
    data: {
      labels: metrics.contentTypePerformance.map(ct => ct.type),
      datasets: [
        {
          label: 'Views',
          data: metrics.contentTypePerformance.map(ct => ct.views / 1000000),
          backgroundColor: '#2196F3'
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Platform Chart
  const platformCtx = document.getElementById('platformChart') as HTMLCanvasElement
  new ChartJS(platformCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(metrics.platformPerformance),
      datasets: [
        {
          label: 'Followers',
          data: Object.values(metrics.platformPerformance).map(p => p.followers),
          backgroundColor: '#3f51b5'
        },
        {
          label: 'Engagement %',
          data: Object.values(metrics.platformPerformance).map(p => p.engagement),
          backgroundColor: '#4CAF50'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Age Distribution Chart
  const ageCtx = document.getElementById('ageChart') as HTMLCanvasElement
  new ChartJS(ageCtx, {
    type: 'pie',
    data: {
      labels: metrics.demographicsBreakdown.ageGroups.map(ag => ag.range),
      datasets: [
        {
          data: metrics.demographicsBreakdown.ageGroups.map(ag => ag.percentage),
          backgroundColor: ['#3f51b5', '#2196F3', '#4CAF50', '#FF9800', '#F44336', '#9C27B0']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Gender Distribution Chart
  const genderCtx = document.getElementById('genderChart') as HTMLCanvasElement
  new ChartJS(genderCtx, {
    type: 'doughnut',
    data: {
      labels: metrics.demographicsBreakdown.gender.map(g => g.gender),
      datasets: [
        {
          data: metrics.demographicsBreakdown.gender.map(g => g.percentage),
          backgroundColor: ['#FF9800', '#2196F3', '#9C27B0']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })

  // Churn Rate Chart
  const churnCtx = document.getElementById('churnChart') as HTMLCanvasElement
  new ChartJS(churnCtx, {
    type: 'line',
    data: {
      labels: metrics.monthlyData.map(m => m.month.split(' ')[0]),
      datasets: [
        {
          label: 'Churn Rate %',
          data: metrics.monthlyData.map(m => m.churnRate * 100),
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: true }
      }
    }
  })
})
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>
