<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Tarjetas</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66 d-flex flex-column align-center ga-8">
      <Card number="7778" cardID="1" background="#16193C" brand="visa" />
      <Card number="1595" cardID="2" background="#AF9B30" brand="visa" />
      <Card number="8481" cardID="3" brand="mastercard" />
    </v-card>
    <v-btn class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" :to="'/(main)/agregartarjeta'">Agregar tarjeta</v-btn>
  </div>
</template>
  
  
<script setup>
  import ExitButton from '../../components/ExitButton.vue';
  import Card from '../../components/Card.vue';
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