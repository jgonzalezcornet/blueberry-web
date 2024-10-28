<template>
    <div class="recover-container">
      <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg recover-card">
        <h1 class="page-title mb-5">Recuperar contraseña</h1>
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
            @click="handleSubmit"
          >
            Enviar
          </v-btn>
          <v-btn
            class="font-montserrat text-capitalize font-weight-bold font-large"
            :to="'/(login)/login'"
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
  import SuccessHandler from '../../utils/SuccessHandler';

  const router = useRouter();
  
  const email = ref('');

  const handleSubmit = () => {
    SuccessHandler({ message: "Se ha enviado un email a la casilla especificada." });
    router.push("/(login)/login");
  }

  </script>
  
  <style scoped>
  .recover-container {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    padding-top: 3rem;
  }
  
  .recover-card {
    width: 50%;
    text-align: center;
    height: fit-content;
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
  