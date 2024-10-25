<template>
  <v-container class="d-flex flex-row page-content">
    <v-container class="d-flex flex-col">
      <span class="main-text">Bienvenido a tu nueva billetera virtual</span>
      <v-row class="pl-4">
        <v-btn variant="tonal" :to="'/(login)/login'" class="font-varela text-capitalize font-weight-bold mr-5">
        Iniciar sesión
        </v-btn>
        <v-btn variant="tonal" :to="'/(login)/registro'" class="font-varela text-capitalize font-weight-bold mr-5">
          Crear tu cuenta
        </v-btn>
      </v-row>
    </v-container>
    <img title="landingimage" class="w-100 h-auto" src="/img/landingimage.png"/>
  </v-container>
</template>

<script setup>

</script>

<style scoped>
  .app-title {
    font-family: 'Varela Round', sans-serif;
    font-size: 200%;
  }

  .main-text {
    font-family: 'Montserrat', sans-serif;
    font-size: 5.3rem;
    font-weight: 500;
    line-height: 1;
    letter-spacing: -0.015625rem;
    color: #001D3D;
    padding-bottom: 4rem;
  }
</style>