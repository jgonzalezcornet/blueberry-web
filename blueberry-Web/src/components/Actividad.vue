<template>
  <v-card class="font-montserrat pt-1 pb-3 px-2 rounded-lg align-middle justify-center" elevation="2" :width="cardWidth">
    <p v-if="useTitle" class="font-montserrat text-xl pl-4 pt-4">Actividad</p>
    <p v-if="activity.length == 0" class="font-montserrat text-lg pl-4 pt-4 pb-2 font-bold">No hay movimientos</p>
    <v-container v-for="card in activity" class="d-flex flex-column align-center ga-3">
      <CartaActividad :card="card" />
      <div class="separator"></div>
    </v-container>
  </v-card>
</template>

<script setup>
  import CartaActividad from '../components/CartaActividad.vue';
  import { computed } from 'vue';
  import { useStore } from '../stores/app';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';

  const store = useStore();

  const props = defineProps({
    width: {
      type: String,
      default: '55vw'
    },
    useTitle: {
      type: Boolean
    }
  });
  
  const cardWidth = computed(() => props.width);

  const activity = computed(() => {
    const id = getLoggedUserId();
    if(!id){
      return [];
    }
    const response = store.getMovements(id.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return [];
    }
    return response.data.movements;
  });
</script>

<style>
  .separator {
    height: 2px;
    width: 100%;
    border-radius: 1px;
    background-color: #DDDDDD;
  }
</style>