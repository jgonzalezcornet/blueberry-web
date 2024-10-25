<template>
  <router-link :to="`/(main)/tarjetas/${cardID}`" class="w-100 d-flex">
    <v-row :style="{ backgroundColor: getCardBackground(brand), color: '#FFFFFF' }" class="d-flex flex-column align-center ga-4 w-100 rounded-lg overflow-hidden px-3 pb-1 pt-3 text--white">
      <div class="d-flex w-100 justify-end">
        <img :src="`/img/${brand}.png`" :style="{ height: '25px' }" />
      </div>
      <div class="d-flex align-center justify-between w-100">
        <p class="font-montserrat">•••• {{ number }}</p>
        <v-icon icon="mdi-chevron-right" />
      </div>
    </v-row>
  </router-link>
</template>

<script setup>
  import getCardBackground from '../utils/getCardBackground';

  defineProps({
    number: Number,
    cardID: String,
    brand: String
  });
</script>