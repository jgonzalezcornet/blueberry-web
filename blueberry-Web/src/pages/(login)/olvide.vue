<template>
    <div class="recover-container">
      <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg recover-card">
        <h1 class="page-title" style="margin-bottom: 20px">Recuperar contraseña</h1>
        <p class="description">
          Ingrese su correo electrónico para recibir un link a un formulario para recuperar su contraseña.
        </p>
        <v-text-field
          label="Correo electrónico"
          v-model="email"
          prepend-icon="mdi-email"
        />
        <div class="button-group">
          <v-btn
            class="font-montserrat text-capitalize font-weight-bold font-large bg-primary"
            @click="enviar"
          >
            Enviar
          </v-btn>
          <v-btn
            class="font-montserrat text-capitalize font-weight-bold font-large"
            @click="cancelar"
            color="grey"
          >
            Cancelar
          </v-btn>
        </div>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const email = ref('');
  const router = useRouter();
  
  const enviar = () => {
    router.push('/(login)/login');
  };
  
  const cancelar = () => {
    router.push('/(login)/login');
  };
  </script>
  
  <style scoped>
  .recover-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .recover-card {
    width: 50%;
    text-align: center;
  }
  
  .description {
    margin-bottom: 15px;
    font-size: 14px;
    color: #666;
  }
  
  .button-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
  }
  </style>
  