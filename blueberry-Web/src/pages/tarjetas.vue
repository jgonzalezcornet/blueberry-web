<template>
  <div class="header-container">
    <router-link :to="{ path: '/inicio' }">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Tarjetas</h1>
  </div>
</template>
  
  
<script setup>
  import ExitButton from '../components/ExitButton.vue';
</script>