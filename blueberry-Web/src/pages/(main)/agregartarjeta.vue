<template>
  <div class="header-container">
    <router-link :to="'/(main)/tarjetas'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Agregar tarjeta</h1>
  </div>
  <div class="page-content">
    <form @submit.prevent="handleSubmit" elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66 d-flex flex-col align-center bg-white">
      <img src="/img/card.png" class="pb-5 card-image"/>
      <v-text-field
        label="Número de tarjeta"
        placeholder="0123 4567 8910 1112"
        v-model="number"
        @input="formatCardNumber"
        class="w-100"
      />
      <v-text-field
        label="Nombre del titular"
        placeholder="Juan Pérez"
        v-model="name"
        @keypress="validateTextInput"
        class="w-100 pb-3"
      />
      <v-row class="d-flex flex-row ga-3 align-center justify-start w-100">
        <v-text-field
          label="Mes"
          placeholder="01"
          v-model="expiration.month"
          @keypress="validateTwoDigitInput($event, 'month')" 
          @input="validateOnInput('month')" 
          class="flex-1"
        />
        <v-text class="font-montserrat font-bold font-large">/</v-text>
        <v-text-field
          label="Año"
          placeholder="26"
          v-model="expiration.year"
          @keypress="validateTwoDigitInput($event, 'year')" 
          @input="validateOnInput('year')" 
          class="flex-2"
          max-length="2"
        />
      </v-row>
      <v-btn type="submit" class="text-capitalize bg-primary mt-5">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          <v-text class="font-montserrat font-bold font-large">Agregar</v-text>
        </template>
      </v-btn>
    </form>
  </div>
</template>
  
  
<script setup>
  import Loading from '../../components/Loading.vue';

  const number = ref("");
  const name = ref("");
  const expiration = ref({
    month: "",
    year: ""
  });
  const loading = ref(false);

  async function handleSubmit() {
    loading.value = true;
  }

  const formatCardNumber = (event) => {
    const input = event.target.value.replace(/\D/g, '');
    if (input.length > 19) {
      cardNumber.value = input.slice(0, 16).match(/.{1,4}/g)?.join(' ') || ''; // Trim and format
      return;
    }
    const formatted = input.match(/.{1,4}/g)?.join(' ') || '';
    number.value = formatted;
  };

  const validateTextInput = (event) => {
    if (input.length == 2) {
      event.preventDefault();
    }
    const key = event.key;
    const isText = /^[a-zA-Z\ ]$/.test(key); // Allow letters only
    if (!isText && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  const validateOnInput = (field) => {
    if (field === 'month' && expiration.month.value.length > 2) {
      expiration.month.value = expiration.month.value.slice(0, 2); // Truncate to 2 characters
    } else if (field === 'year' && expiration.year.value.length > 2) {
      expiration.year.value = expiration.year.value.slice(0, 2); // Truncate to 2 characters
    }
  };


  // Function to validate input for month and year
const validateTwoDigitInput = (event, field) => {
  const key = event.key;

  // Allow only numbers and restrict the input to two characters
  if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
    event.preventDefault();
  }

  
};

</script>

<style scoped>
  .card-image {
    width: 45vh;
    height: auto;
  }
</style>