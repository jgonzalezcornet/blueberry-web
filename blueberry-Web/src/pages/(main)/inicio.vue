<template>
  <div class="header-container">
    <h1 class="page-title">Inicio</h1>
  </div>
  <div class="page-content pt-0">
    <v-container class="pa-5 fill-width">
      <v-row justify="center">
        <v-col cols="12" xl="10">
          <v-row>
            <v-col cols="12" md="6">
              <Saldo width="100%" />
              <Tarjetas width="100%"/>
              <Cobrar width="100%" />
            </v-col>
            <v-col cols="12" md="6">
              <Actividad width="100%" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import Saldo from '@/components/Saldo.vue';
  import Tarjetas from '@/components/Tarjetas.vue';
  import Cobrar from '@/components/Cobrar.vue';
  import Actividad from '@/components/Actividad.vue';
</script>

<style scoped>

</style>