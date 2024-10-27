<template>
  <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg" :width="cardWidth" title="Para generar un link de pago, ingrese el monto a cobrar:">
    <v-text-field placeholder="Monto" prepend-icon="mdi-currency-usd" v-model="monto1" type="text" @keypress="validateNumericInput"/>
    <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleSubmit" block>Generar</v-btn>
  </v-card>
  <LinkdePago v-if="popuptrigger" :closepopup="togglePopup" :monto="monto1" :link="linkurl"/>
</template>

<script setup>
  import LinkdePago from './LinkDePago.vue';
  import { ref } from 'vue';
  import { useStore } from '../stores/app';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';
  
  const store = useStore();

  const monto1 = ref('');
  const popuptrigger = ref(false);
  const linkurl = ref("");

  const props = defineProps({
  width: {
    type: String,
    default: '65%'
  }
  });

  const handleSubmit = () => {
    const id = getLoggedUserId();
    if(!id?.id){
      ErrorHandler({ status: 400, message: "No se ha encontrado el id del usuario ingresado." });
      return;
    }
    const response = store.addLink(id.id, { amount: monto1.value });
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
    linkurl.value = response.data.url;
    togglePopup();
  }

  const cardWidth = computed(() => props.width);

  const togglePopup = () => {
    popuptrigger.value = !popuptrigger.value;
  };

  const validateNumericInput = (event) => {
    const key = event.key;
    const isNumeric = /^[0-9\.]$/.test(key);  // ver si dejamos el punto o ponemos coma
    if (!isNumeric && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };
</script>

<style scoped>

</style>

