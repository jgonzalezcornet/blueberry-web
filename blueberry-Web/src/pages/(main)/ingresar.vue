<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Ingresar dinero</h1>
  </div>

  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-6 pb-7 rounded-lg w-66">
      <v-row class="d-flex align-center pb-3">
        <v-card-title class="text-xl">Dinero en cuenta</v-card-title>
        <v-spacer></v-spacer>
        <span v-if="hiddenBalance" class="font-extrabold text-xl">$****</span>
        <span v-else="hiddenBalance" class="font-extrabold text-xl">${{ dinero.toFixed(2) }}</span>
        <v-icon icon="mdi-eye-off-outline ml-2 mr-2 cursor-pointer" color="darkgrey" @click="hideBalance" />
      </v-row>

      <v-divider class="border-opacity-100 pb-2" color="info" />

      <span class="text-lg overflow-auto">
        Para ingresar dinero a tu cuenta, transferí desde cualquier banco a tu alias o CVU
      </span>

      <v-row class="mt-3 px-3 d-flex align-center">
        <span class="mr-1 text-lg">CVU</span>
        <v-icon 
          icon="mdi-content-copy" 
          class="ml-2" 
          color="active" 
          size="small" 
          @click="copyToClipboard(cvu)" 
        />
        <v-spacer></v-spacer>
        <span class="text-lg">{{ cvu }}</span>
      </v-row>

      <v-row class="d-flex align-center px-3">
        <span class="text-lg mr-1">Alias</span>
        <v-icon 
          icon="mdi-content-copy" 
          class="ml-2" 
          color="active" 
          size="small" 
          @click="copyToClipboard(alias)" 
        />
        <v-spacer></v-spacer>
        <span class="text-lg" translate="no">{{ alias }}</span>
      </v-row>
    </v-card>

    <v-btn 
      class="text-capitalize font-montserrat font-weight-bold font-large bg-primary mt-5" 
      color="primary" 
      @click="togglePopup"
    >
      Cambiar alias
    </v-btn>

    <CambiarAlias 
      v-if="popuptrigger" 
      :closepopup="togglePopup" 
      :alias="alias" 
      @update-alias="updateAlias" 
    />

    <v-snackbar v-model="snackbar.show" :timeout="2000" color="primary">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script setup>
  import { computed, ref } from 'vue';
  import CambiarAlias from '../../components/CambiarAlias.vue';
  import ExitButton from '../../components/ExitButton.vue';
  import { useStore } from '../../stores/app';
  import ErrorHandler from '../../utils/ErrorHandler';
  const store = useStore();

  const dinero = computed(() => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return 0;
    }
    const response2 = store.getBalance(response?.data?.id);
    if(!response2.ok){
      ErrorHandler({ status: 400, message: "No se ha podido extraer el balance del usuario ingresado." });
      return 0;
    }
    return response2?.data?.balance;
  });

  const cvu = computed(() => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return 0;
    }
    console.log(response.data.id)
    const response2 = store.getCVU(response?.data?.id);
    if(!response2.ok){
      ErrorHandler({ status: 400, message: "No se ha podido extraer el cvu del usuario ingresado." });
      return 0;
    }
    return response2?.data?.cvu;
  });

  const alias = computed(() => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return 0;
    }
    const response2 = store.getAlias(response?.data?.id);
    if(!response2.ok){
      ErrorHandler({ status: 400, message: "No se ha podido extraer el alias del usuario ingresado." });
      return 0;
    }
    return response2?.data?.alias;
  });

  const snackbar = ref({ show: false, message: '' });  // Snackbar state

  const popuptrigger = ref(false);

  const hiddenBalance = ref(true);

  const hideBalance = () => {
    hiddenBalance.value = !hiddenBalance.value;
  }

  const togglePopup = () => {
    popuptrigger.value = !popuptrigger.value;
  };

  const updateAlias = (newAlias) => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return;
    }
    const response2 = store.setAlias(response?.data?.id, newAlias);
    if(!response2.ok){
      ErrorHandler({ status: 400, message: "No se ha podido actualizar el alias" });
      return;
    }

    alias.value = newAlias;
    popuptrigger.value = false;  // Close popup after updating alias
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar('Copiado a la papelera');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const showSnackbar = (message, color = 'success') => {
    snackbar.value = { show: true, message, color };
  };

  // Computed properties for icon and dinero visibility
  const dineroIcon = computed(() =>
    isDineroVisible.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
  );

  // Snackbar and popup states
  const snackbar = ref({ show: false, message: '' });
  const popuptrigger = ref(false);

  const togglePopup = () => {
    popuptrigger.value = !popuptrigger.value;
  };

  const updateAlias = (newAlias) => {
    alias.value = newAlias;
    popuptrigger.value = false;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showSnackbar('Copiado a la papelera');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const showSnackbar = (message, color = 'success') => {
    snackbar.value = { show: true, message, color };
  };
</script>

<style scoped>

</style>