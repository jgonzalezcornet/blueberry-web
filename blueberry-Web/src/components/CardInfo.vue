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
      <v-btn type="submit" class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" color="primary">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          Eliminar
        </template>
      </v-btn>
    </form>
  </div>
</template>
  
  
<script setup>
  import Loading from '../components/Loading.vue';

  const loading = ref(false);

  async function handleSubmit() {
    loading.value = true;
  }
</script>

<style scoped>
</style>