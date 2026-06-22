<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>Social Media Dashboard</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app class="bg-grey-lighten-1">
      <v-spacer></v-spacer>
      <span>&copy; 2026 Social Media Dashboard</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
