<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-7 pt-7 pb-5 rounded-lg account-card w-3/5">
      <v-row class="d-flex align-center pb-2 ga-2">
        <p class="text-xl">Monto a transferir:</p>
        <span class="font-extrabold text-xl">${{ amount }}</span>
      </v-row>
      <v-row class="d-flex align-center pb-2 ga-2">
        <p class="text-xl">Destino:</p>
        <span class="font-extrabold text-xl">{{ to }}</span>
      </v-row>
      <v-row class="pt-2 d-flex flex-column ga-4">
        <p class="font-montserrat">Seleccionar método de pago</p>
        <div class="d-flex flex-column ga-2 pl-2 pr-2">
          <CardAccountBalance :selected="selectedCard == 0" @select-card="selectCard" />
          <CardSelector v-for="tarjeta in tarjetas" :selected="selectedCard == tarjeta.id" @select-card="selectCard" :number="tarjeta.number % 10000" :cardID="tarjeta.id" :brand="getCardBrand(tarjeta.number)" />
        </div>
      </v-row>
      <div class="d-flex flex-column ga-2 pt-8">
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary opacity-80" @click="handleBack" block>
          Editar datos
        </v-btn>
      <v-btn :disabled="selectedCard == -1" class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleSubmit" block >
        Realizar transferencia
      </v-btn>
    </div>
    </v-card>
  </div>
</template>

<script setup>
  import CardSelector from './CardSelector.vue';
  import CardAccountBalance from './CardAccountBalance.vue';
  import { useStore } from '../stores/app';
  import { computed } from 'vue';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';
  import getCardBrand from '../utils/getCardBrand';

  const store = useStore();

  const props = defineProps([ "amount", "to" ]);
  const emit = defineEmits([ "back", "submit" ]);

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

  const selectedCard = ref(-1);

  const selectCard = ({ id }) => {
    selectedCard.value = id;
  };

  const handleBack = () => {
    emit("back");
  }

  const handleSubmit = () => {
    emit("submit", { fromBalance: selectedCard.value == 0 });
  }
</script>