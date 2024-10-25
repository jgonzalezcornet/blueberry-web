<template>
  <div class="header-container">
    <router-link :to="'/(main)/tarjetas'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Agregar tarjeta</h1>
  </div>

  <div class="page-content">
    <div class="card-preview-container">
      <div class="card-preview" :class="{ flipped: isFlipped }">
        <div class="card-side front">
          <img v-if="cardLogo" :src="cardLogo" class="card-logo" alt="Card Logo" />
          <p class="card-number">{{ number || 'XXXX XXXX XXXX XXXX' }}</p>
          <p class="card-holder">{{ name || 'John Doe' }}</p>
          <p class="card-expiration">{{ expiration.month || 'MM' }}/{{ expiration.year || 'AA' }}</p>
        </div>
        <div class="card-side back">
          <p class="cvv-label">CVV</p>
          <p class="cvv">{{ cvv }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="form-container">
      <v-text-field
        label="Número de tarjeta"
        placeholder="0123 4567 8910 1112"
        v-model="number"
        @input="formatCardNumber"
        maxlength="19"
        class="w-100"
      />
      <v-text-field
        label="Nombre del titular"
        placeholder="Juan Pérez"
        v-model="owner"
        @keypress="validateTextInput"
        class="w-100 pb-3"
      />
      <v-row class="d-flex flex-row ga-3 align-center justify-start w-100">
        <v-text-field
          label="Mes"
          placeholder="01"
          v-model="expiration.month"
          maxlength="2"
          @keypress="validateTwoDigitInput"
          class="flex-1"
        />
        <v-text>/</v-text>
        <v-text-field
          label="Año"
          placeholder="26"
          v-model="expiration.year"
          maxlength="2"
          @keypress="validateTwoDigitInput"
          class="flex-2"
        />
      </v-row>
      <v-text-field
        label="CVV"
        placeholder="123"
        v-model="cvv"
        maxlength="3"
        @focus="isFlipped = true"
        @blur="isFlipped = false"
        class="w-100"
      />
      <v-btn type="submit" class="text-capitalize bg-primary mt-5" :disabled="loading">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          <v-text class="font-montserrat font-bold font-large">Agregar</v-text>
        </template>
      </v-btn>
    </form>
  </div>
</template>


<script setup>
  import Loading from '../../components/Loading.vue';
  import { useStore } from '../../stores/app';
  import { useRouter } from 'vue-router';
  import ErrorHandler from '../../utils/ErrorHandler';
  import getLoggedUserId from '../../utils/getLoggedUserId';
  
  const store = useStore();
  const router = useRouter();

  const number = ref("");
  const owner = ref("");
  const expiration = ref({
    month: "",
    year: ""
  });
  const loading = ref(false);

  function handleSubmit() {
    loading.value = true;
    const id = getLoggedUserId();
    if(!id){
      return;
    }
    const response = store.addCard(id.id, { number: number.value.replace(/\s/g, ""), owner: owner.value, expiration: expiration.value });
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
    router.push("/(main)/tarjetas");
  };

  const cvv = ref('');
  const isFlipped = ref(false);

  // Format card number with spaces every 4 digits
  const formatCardNumber = () => {
    const cleanNumber = number.value.replace(/\D/g, '').slice(0, 16);
    number.value = cleanNumber.match(/.{1,4}/g)?.join(' ') || '';
  };

  // Detect card type based on the card number prefix
  const cardType = computed(() => {
    if (/^4/.test(number.value)) return 'Visa';
    if (/^5[1-5]/.test(number.value)) return 'Mastercard';
    if (/^3[47]/.test(number.value)) return 'American Express';
    return 'Unknown';
  });

  // Dynamically set the card logo
  const cardLogo = computed(() => {
    switch (cardType.value) {
      case 'Visa':
        return '/img/visa.png';
      case 'Mastercard':
        return '/img/mastercard.png';
      case 'American Express':
        return '/img/americanexpress.png';
      default:
        return null; // No logo for unknown cards
    }
  });

  // Validate input as alphabetic text only
  const validateTextInput = (event) => {
    const char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z\s]*$/.test(char)) event.preventDefault();
  };

  // Ensure only two-digit input for month/year fields
  const validateTwoDigitInput = (event) => {
    if (!/^\d$/.test(event.key)) event.preventDefault();
  };
</script>



<style scoped>

  .card-preview-container {
    perspective: 1000px;
    margin-bottom: 20px;
  }

  .card-preview {
    width: 300px;
    height: 180px;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }

  .card-preview.flipped {
    transform: rotateY(180deg);
  }

  .card-side {
    position: absolute;
    width: 100%;
    height: 100%;
    align-items: bottom;
    backface-visibility: hidden;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .front {
    background-color: black;
    color: white;
  }

  .back {
    background-color: #2e2e2e;
    color: white;
    transform: rotateY(180deg);
  }

  .card-logo {
    width: 50px;
    margin-bottom: 10px;
  }

  .card-number {
    font-size: 1.2rem;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }

  .card-holder,
  .card-expiration {
    margin-top: 10px;
  }

  .cvv-label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 400px;
  }
</style>


