<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Ingresar dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66">
      <v-row class="d-flex align-center pb-3">
        <v-card-title class="text-xl">Dinero en cuenta</v-card-title>
        <v-spacer></v-spacer>
        <span class="font-extrabold text-xl">$14.637,50</span>
        <v-icon icon="mdi-eye-off-outline ml-2 mr-2 cursor-pointer" color="darkgrey" />
      </v-row>
      <v-divider class="border-opacity-100 pb-2" color="info" />
      <span class="text-lg overflow-auto">Para ingresar dinero a tu cuenta, transferí desde cualquier banco a tu alias o CVU</span>
      <v-row class="mt-3 px-3 d-flex align-center">
        <span class="mr-1 text-lg">CVU</span>
        <v-icon icon="mdi-content-copy" class="ml-2 cursor-pointer" color="active" size="small"></v-icon>
        <v-spacer></v-spacer>
        <span class="text-lg">2000000000500001234500</span>
      </v-row>
      <v-row class="d-flex align-center px-3">
        <span class="text-lg mr-1">Alias</span>
        <v-icon icon="mdi-content-copy" class="ml-2 cursor-pointer" color="active" size="small"></v-icon>
        <v-spacer></v-spacer>
        <span class="text-lg" translate="no">jlategana.blueberry</span>
      </v-row>
    </v-card>
    <v-btn class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" color="primary">Cambiar alias</v-btn>
  </div>
</template>


<script setup>
  import ExitButton from '../../components/ExitButton.vue';
</script>
