<template>
  <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg" title="Para generar un link de pago, ingrese el monto a cobrar:">
    <v-text-field placeholder="10000" prepend-icon="mdi-currency-usd" v-model="monto1" type="text" @keypress="validateNumericInput"/>
    <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="togglePopup" block>Generar</v-btn>
  </v-card>
  <LinkdePago v-if="popuptrigger" :closepopup="togglePopup" :monto="monto1"/>
</template>

<script setup>
  import LinkdePago from './LinkDePago.vue';
  import { ref } from 'vue';
  
  const monto1 = ref('');   /* tuve que ponerle monto1 porque si se llamaba monto como la prop de linkdepago se rompe todo */
  const popuptrigger = ref(false);

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

