<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-7 pt-7 pb-5 rounded-lg account-card w-3/5">
      <v-row class="d-flex align-center pb-3">
        <h1 class="text-xl">Monto a transferir:</h1>
        <span class="font-extrabold text-xl">{{ dinero }}</span>
      </v-row>
      <v-row class="d-flex align-center pb-3">
        <h1 class="text-xl">Destino:</h1>
        <span class="font-extrabold text-xl">{{ destinatario }}</span>
      </v-row>
      <div class="py-5">
        <h3 class="font-montserrat ">Seleccionar método de pago</h3>
        
      </div>
      <div>
      <v-row class="d-flex flex-row justify-between pb-5 h-fit">
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary opacity-90 text-capitalize flex-grow-1 mr-1 ml-3" :to="'./transferir'">
          Editar datos
        </v-btn>
        <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-inactive opacity-90 text-capitalize flex-grow-1 ml-1 mr-3" :to="'./inicio'">
          Cancelar
        </v-btn>
      </v-row>
      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="transferir" block >
        Realizar transferencia
      </v-btn>
    </div>
    </v-card>
  </div>
</template>

<script>
  

</script>