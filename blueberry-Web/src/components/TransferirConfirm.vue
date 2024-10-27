<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-7 pt-7 pb-5 rounded-lg account-card w-3/5">
      <v-row class="d-flex align-center pb-2 ga-2">
        <p class="text-xl">Monto a transferir:</p>
        <span class="font-extrabold text-xl">${{ amount }}</span>
      </v-row>
      <v-row class="d-flex align-center pb-2 ga-2">
        <p class="text-xl">Destino:</p>
        <span class="font-extrabold text-xl">{{ to }}</span>
      </v-row>
      <div class="py-5">
        <h3 class="font-montserrat ">Seleccionar método de pago</h3>
      </div>
      <div class="d-flex flex-column ga-1">
      <!-- <v-row class="d-flex flex-row justify-between pb-5 h-fit"> -->
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary opacity-80" @click="handleBack" block>
          Editar datos
        </v-btn>
        <!-- <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-inactive opacity-90 text-capitalize flex-grow-1 ml-1 mr-3" @click="setConfirmed">
          Cancelar
        </v-btn> -->
      <!-- </v-row> -->
      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="handleSubmit" block >
        Realizar transferencia
      </v-btn>
    </div>
    </v-card>
  </div>
</template>

<script setup>
  const props = defineProps([ "amount", "to" ]);
  const emit = defineEmits([ "back" ]);

  const handleBack = () => {
    emit("back");
  }

  const handleSubmit = () => {
    emit("submit");
  }
</script>