<template>
  <div class="header-container">
    <router-link :to="{ path: '/(main)/inicio' }">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Cobrar mediante un link de pago</h1>
  </div>
  <div class="page-content">
    <Cobrar/>
  </div>
</template>
  

<script setup>
  import Cobrar from '../../components/Cobrar.vue';
  import ExitButton from '../../components/ExitButton.vue';
</script>

<style scoped>

</style>