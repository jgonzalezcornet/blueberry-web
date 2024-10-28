<template>
  <div @click="selectCard(0)" class="w-100 d-flex pb-6">
    <v-row :style="{ backgroundColor: '#AAAAAA', color: '#FFFFFF', border: selected ? 'green 6px solid' : 'none' }" class="d-flex flex-column align-center ga-4 w-100 rounded-lg overflow-hidden px-3 pb-1 pt-3 text--white">
      <div class="d-flex w-100 justify-end">
        <img :src="`/img/unknown.png`" :style="{ height: '25px' }" />
      </div>
      <div class="d-flex align-center justify-between w-100">
        <p class="font-montserrat">Dinero en cuenta</p>
      </div>
    </v-row>
  </div>
</template>

<script setup>
  const emit = defineEmits([ "select-card" ]);

  defineProps({
    selected: Boolean
  });

  const selectCard = (id) => {
    emit("select-card", { id });
  };
</script>