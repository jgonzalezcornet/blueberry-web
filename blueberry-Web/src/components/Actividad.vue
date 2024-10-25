<template>
  <v-card class="font-montserrat pt-1 pb-3 px-2 rounded-lg align-middle justify-center" elevation="2" :width="cardWidth">
    <v-container>
      <h5 class="pb-2">Hoy</h5>
      <v-row class="justify-between flex-auto align-middle" no-gutters>
        <v-col cols="auto">
          <v-icon class="mt-1 mr-3" icon="mdi-credit-card-check-outline" />
        </v-col> 
        <v-col class="d-flex flex-col justify-center">
          <v-row no-gutters>
            <h3 class="font-weight-bold font-montserrat">{{  }}</h3>
          </v-row>
          <v-row no-gutters>
            <h6 class="text-grey font-montserrat">Transferencia enviada</h6>
          </v-row>
        </v-col>
        <v-col cols="auto">
          <h6 class="text-red font-montserrat font-weight-bold">-$3000</h6>
        </v-col>
      </v-row>
    </v-container>
    <v-divider class="border-opacity-100" color="info"></v-divider> 
  </v-card>
</template>

<script setup>
  import { computed } from 'vue';
  import { useStore } from '../stores/app';
  const store = useStore();

  const props = defineProps({
    width: {
      type: String,
      default: '60vw'
    }
  });
  
  const cardWidth = computed(() => props.width);

</script>