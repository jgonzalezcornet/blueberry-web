<template>
  <div v-if="showError" class="boxContainer">
    <div class="boxWrapper">
      <div class="box">
        <v-icon class="boxButton" icon="mdi-close-circle-outline" @click="closeError"/>
        <v-alert color="error" :title="title" :text="text" />
      </div>
    </div>
  </div>
</template>

<style>
  .boxContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100000;
    pointer-events: none;
  }

  .boxWrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .boxButton {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 32px;
    height: 32px;
    z-index: 10000000;
    color: #FFFFFF;
    cursor: pointer;
  }

  .box {
    position: absolute;
    bottom: 24px;
    right: 24px;
    min-width: 400px;
    border-radius: 8px;
    overflow: hidden;
    pointer-events: visible;
  }
</style>

<script setup>
  import { computed } from 'vue';
  import { useStore } from '../stores/app';

  const store = useStore();

  const showError = computed(() => {
    return store.showError();
  });

  const error = computed(() => {
    return store.getError();
  });

  const text = computed(() => {
    return error.value.message;
  });

  const title = computed(() => {
    return "ERROR " + error.value.status;
  });

  const closeError = () => {
    store.closeError();
  };
</script>