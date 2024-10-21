<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Actividad</h1>
  </div>
  <div class="page-content">
    <Actividad />
  </div>
</template>
  
  
<script setup>
  import ExitButton from '../../components/ExitButton.vue';
  import Actividad from '../../components/Actividad.vue';
</script>

<style scoped>

</style>