<template>
  <v-card elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-50 d-flex flex-column align-center ga-8">
    <Card number="7778" cardID="1" background="#16193C" brand="visa" />
    <Card number="1595" cardID="2" background="#AF9B30" brand="visa" />
    <Card number="8481" cardID="3" brand="mastercard" />
  </v-card>
</template>

<script setup>
  import Card from './Card.vue';
</script>