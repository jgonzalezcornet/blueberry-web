<template>
  <div @click="selectCard(cardID)" class="w-100 d-flex pb-6">
    <v-row :style="{ backgroundColor: getCardBackground(brand), color: '#FFFFFF', border: selected ? 'green 6px solid' : 'none' }" class="d-flex flex-column align-center ga-4 w-100 rounded-lg overflow-hidden px-3 pb-1 pt-3 text--white">
      <div class="d-flex w-100 justify-end">
        <img :src="`/img/${brand}.png`" :style="{ height: fullNumber ? '40px' : '25px' }" />
      </div>
      <p v-if="fullNumber" class="w-100 text-xl">{{ owner }}</p>
      <div class="d-flex align-center justify-between w-100">
        <p v-if="fullNumber" class="font-montserrat text-xl">{{ number }}</p>
        <p v-else="fullNumber" class="font-montserrat">•••• {{ number }}</p>
      </div>
    </v-row>
  </div>
</template>

<script setup>
  import getCardBackground from '../utils/getCardBackground';

  const emit = defineEmits([ "select-card" ]);

  defineProps({
    number: Number,
    cardID: String,
    brand: String,
    fullNumber: Boolean,
    owner: String,
    selected: Boolean
  });

  const selectCard = (id) => {
    emit("select-card", { id });
  };

</script>