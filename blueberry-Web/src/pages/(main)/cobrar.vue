<template>
  <div class="header-container">
    <router-link :to="{ path: '/(main)/inicio' }">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Cobrar mediante un link de pago</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg" title="Para generar un link de pago, ingrese el monto a cobrar:">
      <v-text-field placeholder="10000" prepend-icon="mdi-currency-usd" v-model="monto"/>
      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" block>Generar</v-btn>
    </v-card>
  </div>
</template>
  

<script setup>
  import ExitButton from '../../components/ExitButton.vue';
  import { ref } from 'vue';

  const monto = ref('');

</script>

<style scoped>

</style>