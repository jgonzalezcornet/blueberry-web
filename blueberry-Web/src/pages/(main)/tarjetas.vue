<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Tarjetas</h1>
  </div>
  <div class="page-content">
    <Tarjetas />
    <v-btn class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" :to="'/(main)/agregartarjeta'">
      <v-row class="d-flex align-center justify-center mr-3">
        <v-icon icon="mdi-plus-thick ml-4 mr-2"></v-icon>
        <span>Agregar</span>
      </v-row>
    </v-btn>

  </div>
</template>
  
  
<script setup>
  import Tarjetas from '../../components/Tarjetas.vue';
  import ExitButton from '../../components/ExitButton.vue';
</script>

<style scoped>
  .card {
    width: 100%;
    min-height: 80px;
    padding: 8px;
    background-color: #CCCCCC;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  }
</style>