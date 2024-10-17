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
      <v-text-field no-gutters
        label="Numero de tarjeta"
        v-model="number"
        class="w-100"
        pattern="[0-9]{16}"
      />
      <v-text-field no-gutters
        label="Nombre del titular"
        v-model="name"
        class="w-100"
        pattern="[a-zA-Z ]{6..30}"
      />
      <v-row class="d-flex flex-row ga-3 align-center justify-start w-100">
        <v-text-field
          label="Mes"
          v-model="expiration.month"
          style="flex: 1"
          pattern="{1..12}"
        />
        <v-text-field
          label="Ano"
          v-model="expiration.year"
          style="flex: 2"
          pattern="[0-9]{4}"
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
</script>

<style scoped>
  .card-image {
    width: 45vh;
    height: auto;
  }
</style>