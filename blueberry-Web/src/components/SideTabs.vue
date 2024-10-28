<template>
  <v-navigation-drawer app permanent :elevation="2" class="d-flex flex-col h-screen -mt-2">
    <v-list class="h-auto">
      <v-list-item 
        v-for="item in topMenuItems"
        :key="item.title"
        :to="generateTo(item.route)"
        exact
        class="font-varela"
        :active-class="'active-menu-item'"
        :exact-active-class="'active-menu-item'"
        @click="item.action">
        <v-icon class="mr-3">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const topMenuItems = [
    { title: 'Inicio', route: '/(main)/inicio', icon: "mdi-home" },
    { title: 'Transferir', route: '/(main)/transferir', icon: "mdi-credit-card-fast-outline" },
    { title: 'Ingresar dinero', route: '/(main)/ingresar', icon: "mdi-cash-plus" },
    { title: 'Actividad', route: '/(main)/actividad', icon: "mdi-history" },
    { title: 'Tarjetas', route: '/(main)/tarjetas', icon: "mdi-wallet-bifold-outline" },
    { title: 'Cobrar por link', route: '/(main)/cobrar', icon: "mdi-link-variant" },
  ];

  // Function to ensure routes match even with query params
  const generateTo = (baseRoute) => {
    return { path: baseRoute, query: route.query };
  };
</script>

<style>
  .active-menu-item {
    background-color: #E85389 !important;
    color: white !important;
    font-weight: bolder;
  }
</style>
