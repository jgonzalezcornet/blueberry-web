<template>
  <div class="header-container">
    <router-link :to="'/(main)/tarjetas'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Agregar tarjeta</h1>
  </div>
  <div class="page-content">
    <form @submit.prevent="handleSubmit" elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66 d-flex flex-column align-center ga-8 bg-white">
      <img src="/img/card.png" />
      <v-text-field
        label="Numero de tarjeta"
        v-model="number"
        class="w-100"
        pattern="[0-9]{16}"
      />
      <v-text-field
        label="Nombre del titular"
        v-model="name"
        class="w-100"
        pattern="[a-zA-Z ]{6..30}"
      />
      <v-row class="d-flex flex-row ga-2 align-center justify-start w-100">
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
      <v-btn type="submit" class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" color="primary">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          Agregar
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
  .card {
    width: 100%;
    min-height: 80px;
    padding: 8px;
    background-color: #CCCCCC;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
  }
</style>