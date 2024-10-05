<template>
  <v-app>
    <AppBar />
    <SideTabs />
      <v-main class="main-content">
        <v-container class="background-overlay">
          <router-view />
        </v-container>
      </v-main>
    <AppInfo />
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
import AppInfo from './components/AppInfo.vue';
import SideTabs from './components/SideTabs.vue';

  export default {
    name: 'App',
    components: {
      AppBar,
      SideTabs,
      AppInfo,
    },
  };
</script>

<style>
  html, body, #app {
    height: 100%;
  }

  .v-application {
    min-height: 100vh;
  }

  .main-content {
    display: flex;
    position: relative; /* Make the layout a positioned element */
    height: 100%;
    z-index: 1; /* Ensure it appears above the background image */
  }

  /* Background overlay */
  .background-overlay {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 0; /* Ensure it's behind the text */
  }

  /* Pseudo-element for the background image */
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
    opacity: 0.3; /* Only the background image has opacity */
    z-index: -1; /* Make sure it's behind all other elements */
  }
</style>
