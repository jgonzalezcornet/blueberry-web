<template>
    <div class="header-container">
    <router-link :to="'/(login)/login'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Términos y Condiciones</h1>
  </div>
</template>
  
  
  <script setup>
    import ExitButton from '../../components/ExitButton.vue';
  </script>
  