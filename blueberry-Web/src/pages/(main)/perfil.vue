<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Perfil</h1>
  </div>
  <!-- Agregar datos de nombre, apellido, correo, dni -->
  <div class="modify-password-container">
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg modify-password-card">
      <h1 class="page-title mb-5">Modificar contraseña</h1>
      <v-text-field
        label="Contraseña"
        v-model="password"
        prepend-icon="mdi-lock"
        :type="passwordFieldType" 
        :append-icon='passwordIcon' @click:append="togglePasswordVisibility"
      />
      <v-text-field
        label="Confirmar contraseña"
        v-model="confirmPassword"
        prepend-icon="mdi-lock-check"
        :type="confirmPasswordFieldType" 
        :append-icon='confirmPasswordIcon' @click:append="toggleConfirmPasswordVisibility" 
      />
      <v-btn
        class="font-montserrat text-capitalize font-weight-bold font-large bg-primary"
        block
        @click="modificarPassword"
      >
        Modificar
      </v-btn>
    </v-card>
  </div>
</template>
  
  
<script setup>
  import ExitButton from '../../components/ExitButton.vue';
  import { ref } from 'vue';
  import { useStore } from '../../stores/app';

  const password = ref('');
  const confirmPassword = ref('');
  
  const modificarPassword = () => {
    //Agregar validacion de contraseñas
    console.log(password.value);
    console.log(confirmPassword.value);
  }

  const isPasswordVisible = ref(false);
  const isConfirmPasswordVisible = ref(false);

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
  };

  const passwordFieldType = computed(() => 
    isPasswordVisible.value ? 'text' : 'password'
  );

  const passwordIcon = computed(() => 
  isPasswordVisible.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
  );

  const confirmPasswordFieldType = computed(() => 
    isConfirmPasswordVisible.value ? 'text' : 'password'
  );

  const confirmPasswordIcon = computed(() => 
    isConfirmPasswordVisible.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
  );
  
</script>

<style scoped>
  .modify-password-container {
    display: flex;
    justify-content: center;
    height: 100vh;
    padding-top: 1rem;
  }
  
  .modify-password-card {
    width: 50%;
    text-align: center;
    height: fit-content;
  }
</style>