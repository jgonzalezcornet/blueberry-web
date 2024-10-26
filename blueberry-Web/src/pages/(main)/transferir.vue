<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg account-card">
      <h1 class="page-title mb-5">Tipo de cuenta</h1>

      <div class="button-group">
        <v-btn
          v-for="option in accountTypes"
          :key="option"
          :class="{ 'text-capitalize font-weight-bold btn-selected': picked === option, 'text-capitalize btn-default': picked !== option }"
          @click="picked = option"
        >
          {{ option }}
        </v-btn>
      </div>
      
      <v-text-field :label="inputLabel" :prepend-icon="inputIcon"  v-model="inputValue" type="text" @keypress="handleKeyPress" />
      <v-text-field v-if="inputLabel != 'Link de pago'" label="Monto" prepend-icon="mdi-currency-usd" v-model="monto" type="text" @keypress="validateMontoInput"/>

      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" :to="'./transferir2'">
        Continuar
      </v-btn>
    </v-card>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import ExitButton from '../../components/ExitButton.vue';

  const picked = ref('Alias');
  const monto = ref('');
  const alias = ref('');
  const cvuCbu = ref('');
  const linkPago = ref('');
  const router = useRouter();

  const accountTypes = ['Alias', 'CVU/CBU', 'Link de pago'];

  const inputLabel = computed(() => picked.value);

  const inputIcon = computed(() => {
    switch (picked.value) {
      case 'Alias':
        return 'mdi-account';
      case 'CVU/CBU':
        return 'mdi-bank';
      case 'Link de pago':
        return 'mdi-link-variant';
      default:
        return '';
    }
  });

  const inputValue = computed({
    get() {
      switch (picked.value) {
        case 'Alias':
          return alias.value;
        case 'CVU/CBU':
          return cvuCbu.value;
        case 'Link de pago':
          return linkPago.value;
        default:
          return '';
      }
    },
    set(value) {
      switch (picked.value) {
        case 'Alias':
          alias.value = value;
          break;
        case 'CVU/CBU':
          cvuCbu.value = value;
          break;
        case 'Link de pago':
          linkPago.value = value;
          break;
      }
    }
  });

  const continuar = () => {
    //router.push('/(main)/transferir/destinatario');
  };

  const validateMontoInput = (event) => {
    const key = event.key;
    const isNumeric = /^[0-9\.]$/.test(key); // ver si dejamos el punto o ponemos coma
    if (!isNumeric && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  const validateNumericInput = (event) => {
    const key = event.key;
    const isNumeric = /^[0-9]$/.test(key); // ver si dejamos el punto o ponemos coma
    if (!isNumeric && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  const validateTextInput = (event) => {
    const key = event.key;
    const isText = /^[a-zA-Z0-9\.]$/.test(key); // Allow letters only
    if (!isText && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  };

  // Unified keypress handler
  const handleKeyPress = (event) => {
    if (inputLabel.value === 'CVU/CBU') {
      validateNumericInput(event);
    } else if (inputLabel.value === 'Alias' || inputLabel.value === 'Link de pago') {
      validateTextInput(event);
    }
  };
</script>

<style scoped>
  .account-card {
    width: 50%;
    text-align: center;
  }

  .button-group {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .btn-selected {
    background-color: #00294D;
    color: white;
  }

  .btn-default {
    background-color: #e0e0e0;
    color: black;
  }

  .v-btn {
    width: 30%;
  }
</style>
