<template>
  <v-container class="py-8">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-8">Social Media Dashboard</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Followers Growth</v-card-title>
          <v-card-text>
            <canvas id="followersChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-4">
          <v-card-title>Engagement Rate</v-card-title>
          <v-card-text>
            <canvas id="engagementChart"></canvas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Posts</v-card-title>
          <v-card-text class="text-h4">1,234</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Followers</v-card-title>
          <v-card-text class="text-h4">56,789</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Engagement</v-card-title>
          <v-card-text class="text-h4">8.5%</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LineController, BarController } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, LineController, BarController)

onMounted(() => {
  // Followers Chart
  const followersCtx = document.getElementById('followersChart') as HTMLCanvasElement
  new ChartJS(followersCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Followers',
          data: [12000, 19000, 25000, 32000, 41000, 56789],
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  })

  // Engagement Chart
  const engagementCtx = document.getElementById('engagementChart') as HTMLCanvasElement
  new ChartJS(engagementCtx, {
    type: 'bar',
    data: {
      labels: ['Post 1', 'Post 2', 'Post 3', 'Post 4', 'Post 5', 'Post 6'],
      datasets: [
        {
          label: 'Engagement %',
          data: [5.2, 7.8, 6.4, 9.1, 8.5, 7.9],
          backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336', '#00BCD4']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  })
})
</script>

<style scoped>
</style>
