<template>
  <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg" :width="cardWidth">
    <p v-if="inMainpage" class="font-montserrat text-xl pb-4 pt-2">Cobrar por link</p>
    <p v-else class="font-montserrat text-xl pb-4">Para generar un link de pago, ingrese el monto a cobrar:</p>
    <v-text-field placeholder="Monto" prepend-icon="mdi-currency-usd" v-model="monto1" type="text" @keypress="validateNumericInput"/>
    <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleSubmit" block>Generar</v-btn>
  </v-card>
  <LinkdePago v-if="popuptrigger" :closepopup="togglePopup" :monto="monto1" :link="linkurl"/>
</template>

<script setup>
  import LinkdePago from './LinkDePago.vue';
  import { ref, defineProps } from 'vue';
  import { useStore } from '../stores/app';
  import { useRouter, useRoute } from 'vue-router';
  import getLoggedUserId from '../utils/getLoggedUserId';
  import ErrorHandler from '../utils/ErrorHandler';
  
  const store = useStore();
  const router = useRouter();
  const route = useRoute();

  const monto1 = ref('');
  const popuptrigger = ref(false);
  const linkurl = ref("");

  const props = defineProps({
    width: {
      type: String,
      default: '65%'
    },
    inMainpage: Boolean
  });

  const handleSubmit = () => {
    if(props.inMainpage){
      router.push(`/(main)/cobrar?monto=${monto1.value}`);
      return;
    }
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
    const isNumeric = /^[0-9\.]$/.test(key); 
    if (!isNumeric && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  onMounted(() => {
    monto1.value = route.query.monto || '';
  });
</script>

<style scoped>

</style>

