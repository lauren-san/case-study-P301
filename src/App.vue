<template>
  <v-app class="app-shell">
    <v-app-bar app color="primary" class="d-flex align-center">
      <v-icon color="white" class="ml-4 mr-3">mdi-comment</v-icon>
      <span class="dashboard-title font-weight-bold text-white">Social Media Dashboard</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggleTheme"
      >
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="app-main">
      <router-view />
    </v-main>

    <v-footer app class="app-footer">
      <v-spacer></v-spacer>
      <span>&copy; 2026 Social Media Dashboard</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === 'dark')

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
  localStorage.setItem('dashboard-theme', theme.global.name.value)
  window.dispatchEvent(new CustomEvent('app-theme-change'))
}

onMounted(() => {
  const storedTheme = localStorage.getItem('dashboard-theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme.global.name.value = storedTheme
    window.dispatchEvent(new CustomEvent('app-theme-change'))
  }
})
</script>

<style scoped>
.dashboard-title {
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.2;
  text-align: left;
  width: 100%;
}

.app-footer {
  background: var(--dashboard-card-bg);
  color: var(--text-h);
}

.app-shell {
  background: var(--bg);
  color: var(--text-h);
}

.app-main {
  background: var(--bg);
}
</style>
