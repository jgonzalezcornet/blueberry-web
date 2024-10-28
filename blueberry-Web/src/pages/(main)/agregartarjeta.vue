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
          <p class="card-number">{{ number || 'xxxx xxxx xxxx xxxx' }}</p>
          <p class="card-holder line-clamp-1">{{ owner || 'Juan Perez' }}</p>
          <p class="card-expiration">{{ expiration.month || 'MM' }}/{{ expiration.year || 'AA' }}</p>
          <div class="d-flex justify-end">
            <img v-if="cardLogo" :src="cardLogo" class="w-14" alt="Card Logo" />
          </div>
          
        </div>
        <div class="card-side back">
          <p class="cvv-label">CVV</p>
          <p class="cvv">{{ cvv || '***' }}</p>
        </div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="d-flex flex-col w-2/4 ">
      <v-text-field
        label="Número de tarjeta"
        placeholder="0123 4567 8910 1112"
        v-model="number"
        @input="formatCardNumber"
        maxlength="19"
        minlenght="19"
      />
      <v-text-field
        label="Nombre del titular"
        placeholder="Juan Pérez"
        v-model="owner"
        @keypress="validateTextInput"
        minlength="5"
      />
      <div class="d-flex flex-row">
        <v-text-field
          label="Mes de vencimiento"
          placeholder="01"
          v-model="expiration.month"
          maxlength="2"
          @keypress="validateTwoDigitInput"
          class="mr-3"
          minlenght="2"
        />
        <v-text-field
          label="Año de vencimiento"
          placeholder="26"
          v-model="expiration.year"
          maxlength="2"
          @keypress="validateTwoDigitInput"
          minlenght="2"
        />
      </div>
      <v-text-field
        label="CVV"
        placeholder="123"
        v-model="cvv"
        maxlength="4"
        @focus="isFlipped = true"
        @blur="isFlipped = false"
      />
      <v-btn type="submit" class="text-capitalize bg-primary mt-3" :disabled="loading">
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
  import SuccessHandler from '../../utils/SuccessHandler';
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
      ErrorHandler({ status: 400, message: "No se han podido obtener los datos del usuario ingresado." });
      loading.value = false;
      return;
    }
    const response = store.addCard(id.id, { number: number.value.replace(/\s/g, ""), owner: owner.value, expiration: expiration.value });
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      loading.value = false;
      return;
    }
    SuccessHandler({ message: "Se ha agregado una nueva tarjeta a su cuenta." });
    router.push("/(main)/tarjetas");
  };

  const cvv = ref('');
  const isFlipped = ref(false);

  const formatCardNumber = () => {
    const cleanNumber = number.value.replace(/\D/g, '').slice(0, 16);
    number.value = cleanNumber.match(/.{1,4}/g)?.join(' ') || '';
  };

  const cardType = computed(() => {
    if (/^4/.test(number.value)) return 'Visa';
    if (/^5[1-5]/.test(number.value)) return 'Mastercard';
    if (/^3[47]/.test(number.value)) return 'American Express';
    return 'Unknown';
  });

  const cardLogo = computed(() => {
    switch (cardType.value) {
      case 'Visa':
        return '/img/visa.png';
      case 'Mastercard':
        return '/img/mastercard.png';
      case 'American Express':
        return '/img/americanexpress.png';
      default:
        return null;
    }
  });

  const validateTextInput = (event) => {
    const char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z\s]*$/.test(char)) event.preventDefault();
  };

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
    background-color: gray;
    color: white;
  }

  .back {
    background-color: gray;
    color: white;
    transform: rotateY(180deg);
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
    
  }
</style>


