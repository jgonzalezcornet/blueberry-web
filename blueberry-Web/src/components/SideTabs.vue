<template>
  <v-navigation-drawer app permanent :elevation="2" class="d-flex flex-column h-screen justify-space-between">
    <v-list dense>
      <v-list-item v-for="item in topMenuItems"
        :key="item.title"
        :to="item.route"
        exact
        class="font-varela"
        :active-class="'active-menu-item'" >
        <v-icon class="mr-3">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-list-item>
    </v-list>
    <v-list dense>
      <v-list-item v-for="item in bottomMenuItems"
        :key="item.title"
        :to="item.route"
        exact
        class="font-varela"
        @click="item.action"
        :active-class="'active-menu-item'" >
        <v-icon class="mr-3">{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useStore } from '../stores/app';
  
  const store = useStore();

  function logout(){
    store.signOut();
  }

  const topMenuItems = [
    { title: 'Inicio', route: '/(main)/inicio', icon: "mdi-home" },
    { title: 'Transferir', route: '/(main)/transferir', icon: "mdi-credit-card-fast-outline" },
    { title: 'Ingresar dinero', route: '/(main)/ingresar', icon: "mdi-cash-plus" },
    { title: 'Actividad', route: '/(main)/actividad', icon: "mdi-history" },
    { title: 'Tarjetas', route: '/(main)/tarjetas', icon: "mdi-wallet-bifold-outline" },
    { title: 'Cobrar por link', route: '/(main)/cobrar', icon: "mdi-link-variant" },
  ];
  
  const bottomMenuItems = [
    { title: 'Soporte', route: '/(main)/soporte', icon: "mdi-headphones" },
    { title: 'Cerrar sesión', route: '/(login)/login', icon: "mdi-account-arrow-right-outline", action: logout },
  ];
</script>

<style>
  .active-menu-item {
    background-color: #E85389 !important;
    color: white !important;
    font-weight: bolder;
  }

</style>
