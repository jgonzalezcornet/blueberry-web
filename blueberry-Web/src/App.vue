<template>
  <ErrorBox />
  <SuccessBox />
  <v-app>
    <AppBar />
    <SideTabs v-if="isMainRoute" />
      <v-main class="z-1 d-flex flex-col">
        <v-container class="background-overlay flex-grow-1">
          <router-view />
        </v-container>
        <AppFooter />
      </v-main>
  </v-app>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import AppBar from './components/AppBar.vue';
  import AppFooter from './components/AppFooter.vue';
  import SideTabs from './components/SideTabs.vue';
  import ErrorBox from './components/ErrorBox.vue';
  import SuccessBox from './components/SuccessBox.vue';
  
  const route = useRoute();
  
  const isMainRoute = computed(() => {
    return route.path.startsWith('/(main)');
  });
</script>

<style>
  .z-1 {
    z-index: 1;
  }
  
  .background-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('https://media.istockphoto.com/id/488253130/vector/business-seamless-pattern-vector-background.jpg?s=612x612&w=0&k=20&c=O0gqacOysdDQqCsIH6mdHj0VKRcNsWjxR_raNyvRGmk=');
    background-repeat: repeat;
    background-size: 250px;
    opacity: 0.3;
    z-index: -1;
  }
</style>
