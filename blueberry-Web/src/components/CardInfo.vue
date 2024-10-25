<template>
  <div class="header-container">
    <router-link :to="'/(main)/tarjetas'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Tarjeta</h1>
  </div>
  <div class="page-content">
    <form @submit.prevent="handleSubmit" elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66 d-flex flex-column align-center ga-8 bg-white">
      <img src="/img/card.png" />
      <v-btn :disabled="loading" type="submit" class="text-capitalize font-montserrat font-weight-bold font-large bg-primary">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          <v-row class="d-flex align-center justify-center mr-3">
            <v-icon icon="mdi-trash-can-outline ml-4 mr-2"></v-icon>
            <span>Eliminar tarjeta</span>
          </v-row>
        </template>
      </v-btn>
    </form>
  </div>
</template>
  
  
<script setup>
  import { computed } from 'vue';
  import Loading from '../components/Loading.vue';
  import { useStore } from '../stores/app';
  import { useRoute, useRouter } from 'vue-router';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const loading = ref(false);

  const tarjeta = computed(() => {
    const id = getLoggedUserId();
    if(!id){
      return [];
    }
    const response = store.getCard(route.params.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return [];
    }
    return response.data.card;
  });

  console.log(tarjeta.value)

  async function handleSubmit() {
    loading.value = true;
    const response = store.removeCard(tarjeta.value.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
    router.push("/(main)/tarjetas");
  }
</script>

<style scoped>
</style>