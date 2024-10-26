<template>
<div class="page-content popup-backdrop">
    <v-card elevation="2" class="font-montserrat px-6 py-6 rounded-lg w-2/5 align-center">
      <v-row class="d-flex align-center justify-between pb-1">
        <v-spacer></v-spacer>
        <span class="text-xl justify-center font-extrabold">Link de pago generado</span>
        <v-spacer></v-spacer>
        <v-icon icon="mdi-close-circle-outline" @click="closepopup"/>
      </v-row>
      <v-row class="justify-center pb-1">
        <h3>Monto: ${{ monto }}</h3> 
      </v-row>
      <v-row class="px-2 d-flex align-center justify-between">
        <span class="flex-grow-1 pa-3 text-primary bg-gray-100 rounded-lg">{{ link }}</span>
        <v-icon icon="mdi-content-copy" class="ml-2" color="active" size="small" @click="copyToClipboard(link)"></v-icon>
      </v-row>
    </v-card>
  </div>
  <v-snackbar v-model="snackbar.show" :timeout="2000" color="primary">
    {{ snackbar.message }}
  </v-snackbar>
</template>

<script setup>
  import { ref } from 'vue';

  defineProps(['closepopup', 'monto']);

  const link = ref('https://blueberry.com.ar/linkdepago');
  const snackbar = ref({ show: false, message: '' });  // Snackbar state

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar('Copiado a la papelera');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const showSnackbar = (message, color = 'success') => {
    snackbar.value = { show: true, message, color };
  };
</script>

<style scoped>
  .popup-backdrop {
    position: absolute;
    width: 100%;
    height: 125%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2; /* por las dudas */
  }
</style>