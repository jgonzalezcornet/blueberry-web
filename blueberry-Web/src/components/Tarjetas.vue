<template>
  <v-card elevation="2" class="font-montserrat px-6 pt-6 pb-6 rounded-lg mb-5" :width="cardWidth">
    <p v-if="inMainpage" class="font-montserrat text-xl pb-4">Tarjetas</p>
    <div v-if="tarjetas.length" class="d-flex flex-column align-center ga-8 pt-2">
      <Card v-for="tarjeta in tarjetas" :number="tarjeta.number % 10000" :cardID="tarjeta.id" :brand="getCardBrand(tarjeta.number)" />
    </div>
    <p v-else class="font-montserrat text-lg font-bold">No hay tarjetas</p>
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

  const props = defineProps({
    width: {
      type: String,
      default: '50vw'
    },
    inMainpage: Boolean
  });
  
  const cardWidth = computed(() => props.width);

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