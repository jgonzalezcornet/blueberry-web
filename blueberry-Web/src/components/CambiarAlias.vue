<template>
  <div class="page-content popup-backdrop">
    <v-card elevation="2" class="font-montserrat px-6 py-6 rounded-lg w-2/5 align-center">
      <v-row class="d-flex align-center justify-between">
        <v-spacer></v-spacer>
        <span class="text-xl justify-center font-extrabold">Cambiar alias</span>
        <v-spacer></v-spacer>
        <v-icon icon="mdi-close-circle-outline" @click="closepopup"/>
      </v-row>
      <v-row class="justify-center">
        <h3>Recordá que solo puede llevar letras, números y puntos. </h3> 
      </v-row>
      <v-row class="justify-center pb-5">
        <h3 class="justify-center">No incluir la ñ ni otros caracteres especiales.</h3>
      </v-row>
      <v-row class="mt-3 px-3 d-flex align-center">
        <v-text-field placeholder="nuevoalias123" v-model="nuevoalias" type="text" @keypress="validateTextInput"/>
      </v-row>
      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="confirmAlias" block>Confirmar</v-btn>
    </v-card>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';

  defineProps(['closepopup', 'alias']);
  const emit = defineEmits(['update-alias']);
  const nuevoalias = ref('');

  const confirmAlias = () => {
    if (nuevoalias.value) {
      emit('update-alias', nuevoalias.value);
    }
  };

  const validateTextInput = (event) => {
    const key = event.key;
    const isNumeric = /^[a-zA-Z0-9\.]$/.test(key);  // Allow digits and decimal point
    if (!isNumeric && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault(); // Prevent non-numeric input
    }
  };

</script>

<style scoped>
  .popup-backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2; /* por las dudas */
  }
</style>