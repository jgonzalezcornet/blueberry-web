<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Transferir dinero</h1>
  </div>
  <div class="page-content">
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg account-card">
      <h1 class="page-title" style="margin-bottom: 20px;">Tipo de cuenta</h1>

      <div class="button-group">
        <v-btn
          v-for="option in accountTypes"
          :key="option"
          :class="{ 'btn-selected': picked === option, 'btn-default': picked !== option }"
          @click="picked = option"
        >
          {{ option }}
        </v-btn>
      </div>

      <v-text-field
        :label="inputLabel"
        :prepend-icon="inputIcon"
        v-model="inputValue"
      />

      <v-text-field
        label="Monto"
        prepend-icon="mdi-currency-usd"
        v-model="monto"
      />

      <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" @click="continuar">
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
