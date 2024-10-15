<template>
  <v-app-bar :elevation="2" class="bg-primary">
    <template v-slot:prepend>
      <img title="Blueberry icon" class="size-12 ml-4 -mr-3" src="../assets/images/blueberry-shadow.png"/>
    </template>
    <v-app-bar-title class="app-title">Blueberry</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-account" variant="tonal" :to="'/(main)/perfil'" class="font-varela text-capitalize font-bold mr-5 " v-if="isMainRoute">
      Manuel Ahumada
    </v-btn>
  </v-app-bar>
</template>

<script>
import { useRoute } from 'vue-router';
  export default {
    name: 'AppBar',
    setup() {
      const route = useRoute();
      
      const isMainRoute = computed(() => {
        return route.path.startsWith('/(main)');
      });

      return {
        isMainRoute,
      };
    },
  };
</script>

<style scoped>
  .app-title {
    font-family: 'Varela Round', sans-serif;
    font-size: 180%;
  }
</style>