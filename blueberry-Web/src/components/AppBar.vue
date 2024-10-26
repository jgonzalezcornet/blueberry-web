<template>
  <v-app-bar :elevation="2" class="bg-primary">
    <template v-slot:prepend>
      <router-link :to="targetRoute" class="d-flex align-center gap-2">
        <img title="Blueberry icon" class="size-12 ml-4 -mr-3" src="/img/blueberry-shadow.png"/>
        <v-app-bar-title class="app-title ml-2" translate="no">Blueberry</v-app-bar-title>
      </router-link>
    </template>
    <v-spacer></v-spacer>

    <v-tooltip text="Por cualquier duda o inconveniente contactarse con blueberry@gmail.com">
      <template v-slot:activator="{ props }">
        <v-btn  v-bind="props" icon="mdi-headphones" class="mr-3" density="compact" />
      </template>
    </v-tooltip>
    <v-btn prepend-icon="mdi-account" variant="tonal" :to="'/(main)/perfil'" class="font-varela text-capitalize font-bold mr-5" v-if="isLogged">
      {{ username }}
    </v-btn>
    <SoportePopUp v-if="popuptrigger" :closepopup="triggerSoporte"/>
  </v-app-bar>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from '../stores/app';
  import ErrorHandler from '../utils/ErrorHandler';
  
  const store = useStore();
  const route = useRoute();
  
  const username = computed(() => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se encuentra un usuario ingresado actualmente." });
      return;
    }
    return response?.data?.name + " " + response?.data?.lastname;
  });

  const isLogged = computed(() => {
    const response = store.getLoggedUser();
    if(!response.ok){
      return false;
    }
    return route.path.startsWith('/(main)');
  });
  
</script>

<style scoped>
  .app-title {
    font-family: 'Varela Round', sans-serif;
    font-size: 180%;
  }
</style>
