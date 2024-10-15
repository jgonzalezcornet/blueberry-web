<template>
  <v-app-bar :elevation="2" class="bg-primary">
    <template v-slot:prepend>
      <img title="Blueberry icon" class="size-12 ml-4 -mr-3" src="../assets/images/blueberry-shadow.png"/>
    </template>
    <v-app-bar-title class="app-title">Blueberry</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-account" variant="tonal" :to="'/(main)/perfil'" class="font-varela text-capitalize font-bold mr-5 ">
      Manuel Ahumada
    </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'AppBar',
  };
</script>

<style scoped>
  .app-title {
    font-family: 'Varela Round', sans-serif;
    font-size: 180%;
  }
</style>