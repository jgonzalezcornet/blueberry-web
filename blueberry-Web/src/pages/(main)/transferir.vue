<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
</template>
  
  
<script setup>
  import ExitButton from '../../components/ExitButton.vue';
</script>