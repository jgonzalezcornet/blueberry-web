<template>
  <div class="header-container">
    <h1 class="page-title">Inicio</h1>
  </div>
  <div class="page-content">
    <v-container fluid class="pa-10">
      <v-row>
        <v-col cols="12" md="5">
          <Tarjetas />
          <Cobrar />
        </v-col>
        <v-col cols="12" md="5">
          <Actividad />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script setup>
  import Tarjetas from '@/components/Tarjetas.vue'
  import Cobrar from '@/components/Cobrar.vue'
  import Actividad from '@/components/Actividad.vue'
</script>
