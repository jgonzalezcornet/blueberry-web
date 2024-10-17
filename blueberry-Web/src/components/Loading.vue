<template>
  <img src="/img/loading.png" class="loader" />
</template>

<style scoped>
  @keyframes spin {
    0% { transform: rotate(0deg) };
    100% { transform: rotate(360deg) };
  }

  .loader {
    width: 24px;
    height: 24px;
    animation: spin 1.2s linear forwards infinite;
  }
</style>