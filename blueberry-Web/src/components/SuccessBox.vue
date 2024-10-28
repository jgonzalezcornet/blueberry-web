<template>
  <div v-if="showSuccess" class="boxContainer">
    <div class="boxWrapper">
      <div class="box">
        <v-icon class="boxButton" icon="mdi-close-circle-outline" @click="closeSuccess"/>
        <v-alert color="success" title="Operacion exitosa" :text="text" />
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

  const showSuccess = computed(() => {
    return store.showSuccess();
  });

  const success = computed(() => {
    return store.getSuccess();
  });

  const text = computed(() => {
    return success.value.message;
  });

  const closeSuccess = () => {
    store.closeSuccess();
  };
</script>