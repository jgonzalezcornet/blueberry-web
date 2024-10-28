<template>
    <v-card class="pa-5 mb-5 d-flex flex-column ga-2" :width="cardWidth">
      <p class="font-montserrat text-xl">Dinero en cuenta</p>
      <div class="d-flex align-center">
        <span v-if="hiddenBalance" class="font-montserrat font-extrabold text-xl">$****</span>
        <span v-else class="font-montserrat font-extrabold text-xl">{{ formattedAmount }}</span>
        <v-icon :icon="hiddenBalance ? 'mdi-eye-off-outline' : 'mdi-eye-outline'" class="ml-2" color="darkgrey" @click="toggleBalance"/>
      </div>
      <div class="d-flex flex-row justify-space-between">
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleIngresar">Ingresar</v-btn>
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleTransferir">Transferir</v-btn>
      </div>
    </v-card>
  </template>
  
<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../stores/app';
  import ErrorHandler from '../utils/ErrorHandler';
  
  const router = useRouter();
  const store = useStore();
  
  const props = defineProps({
    width: {
      type: String,
      default: '100%'
    }
  });

  const formattedAmount = computed(() => {
    const str = (dinero.value < 0 ? "-" : "");
    return str + "$" + Math.abs(dinero.value);
  });
  
  const cardWidth = computed(() => props.width);
  
  const dinero = computed(() => {
    const response = store.getLoggedUser();
    if (!response.ok) {
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return 0;
    }
    const response2 = store.getBalance(response?.data?.id);
    if (!response2.ok) {
      ErrorHandler({ status: 400, message: "No se ha podido extraer el balance del usuario ingresado." });
      return 0;
    }
    return response2?.data?.balance;
  });
  
  const handleIngresar = () => {
    router.push('/(main)/ingresar');
  };
  
  const handleTransferir = () => {
    router.push('/(main)/transferir');
  };
  
  const hiddenBalance = ref(true);
  
  const toggleBalance = () => {
    hiddenBalance.value = !hiddenBalance.value;
  };
  </script>
  
  <style scoped>
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .v-btn {
    min-width: 35%;
  }
  </style>