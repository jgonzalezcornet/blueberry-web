<template>
  <v-card v-if="tarjetas.length" elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-50 d-flex flex-column align-center ga-8">
    <Card v-for="tarjeta in tarjetas" :number="tarjeta.number % 10000" :cardID="tarjeta.id" :brand="getCardBrand(tarjeta.number)" />
  </v-card>
</template>

<script setup>
  import Card from './Card.vue';
  import { useStore } from '../stores/app';
  import { computed } from 'vue';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';
  import getCardBrand from '../utils/getCardBrand';
  
  const store = useStore();

  const tarjetas = computed(() => {
    const id = getLoggedUserId();
    if(!id){
      return [];
    }
    const response = store.getCards(id.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return [];
    }
    return response.data.cards;
  });
</script>
