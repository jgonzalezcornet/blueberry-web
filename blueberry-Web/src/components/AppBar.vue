<template>
  <v-app-bar :elevation="2" class="bg-primary">
    <template v-slot:prepend>
      <router-link :to="targetRoute" class="d-flex align-center gap-2">
        <img title="Blueberry icon" class="size-12 ml-4 -mr-3" src="/img/blueberry-shadow.png"/>
        <v-app-bar-title class="app-title ml-2" translate="no">Blueberry</v-app-bar-title>
      </router-link>
    </template>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-account" variant="tonal" :to="'/(main)/perfil'" class="font-varela text-capitalize font-bold mr-5" v-if="isMainRoute">
      Manuel Ahumada
    </v-btn>
  </v-app-bar>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  
  const isMainRoute = computed(() => {
    return route.path.startsWith('/(main)');
  });

  const targetRoute = computed(() => {
    return isMainRoute.value ? '/(main)/inicio' : '/(landing)/landingpage'
  });
</script>

<style scoped>
  .app-title {
    font-family: 'Varela Round', sans-serif;
    font-size: 180%;
  }
</style>
