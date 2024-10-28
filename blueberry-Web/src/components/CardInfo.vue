<template>
  <div class="header-container">
    <router-link :to="'/(main)/tarjetas'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Tarjeta</h1>
  </div>
  <div class="page-content">
    <form @submit.prevent="handleSubmit" elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66 d-flex flex-column align-center ga-8 bg-white">
      <Card :owner="tarjeta.owner" :number="tarjeta.number" :cardID="tarjeta.id" :brand="getCardBrand(tarjeta.number)" :fullNumber="true" />
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
  import Card from '../components/Card.vue';
  import { useStore } from '../stores/app';
  import { useRoute, useRouter } from 'vue-router';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';
  import SuccessHandler from '../utils/SuccessHandler';
  import getCardBrand from '../utils/getCardBrand';

  const store = useStore();
  const route = useRoute();
  const router = useRouter();

  const loading = ref(false);

  let loadData = true;

  const tarjeta = computed(() => {
    if(!loadData){
      return;
    }
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
  
  async function handleSubmit() {
    loading.value = true;
    loadData = false;
    const response = store.removeCard(tarjeta.value.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      loadData = true;
      return;
    }
    SuccessHandler({ message: "Se ha eliminado la tarjeta de su cuenta de forma exitosa." });
    router.push("/(main)/tarjetas");
  }
</script>

<style scoped>
</style>