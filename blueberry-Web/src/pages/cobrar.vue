<template>
    <div class="header-container">
      <router-link :to="{ path: '/inicio' }">
        <v-icon class="exit-btn">mdi-chevron-left</v-icon>
      </router-link>
      <span class="page-title">Cobrar mediante un link de pago</span>
    </div>
    <div class="page-content">
        <v-card elevation="2" rounded=large class ="font-montserrat px-7 pt-3 py-5" title="Para generar un link de pago, ingrese el monto a cobrar:">
            <v-text-field placeholder="10000" prepend-icon="mdi-currency-usd"></v-text-field>
            <v-btn class="font-montserrat" style="text-transform: capitalize; font-weight: bold; font-size: large;" color="#001D3D" block>Generar</v-btn>
        </v-card>
    </div>
</template>
  

<script setup>

</script>

<style scoped>
.input-field {
  flex: 1; /* Makes the input take the remaining space */
}
</style>