<template>
  <v-row class="justify-between flex-auto align-middle w-100" no-gutters>
    <v-col cols="auto">
      <v-icon class="mt-1 mr-3" icon="mdi-credit-card-check-outline" />
    </v-col> 
    <v-col class="d-flex flex-col justify-center">
      <v-row no-gutters>
        <h3 class="font-weight-bold font-montserrat">{{ card?.from }}</h3>
      </v-row>
      <v-row no-gutters>
        <h6 class="text-grey font-montserrat">Transferencia {{ card?.type }}</h6>
      </v-row>
    </v-col>
    <v-col cols="auto">
      <h6 :class="amountClass(card?.type)" class="text-red font-montserrat font-weight-bold">{{ formattedAmount(card) }}</h6>
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed } from 'vue';

  const props = defineProps([ "card" ]);

  const formattedAmount = (card) => {
    return card?.type == "enviada" ? "-$" + card?.amount : "$" + card?.amount;
  };

  const amountClass = (type) => {
    switch(type){
      case "enviada":
        return "text-red";
      case "recibida":
        return "text-green";
      default:
        return "text-grey";
    }
  };
</script>