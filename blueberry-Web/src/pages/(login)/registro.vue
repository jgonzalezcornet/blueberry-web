<template>
    <div class="register-container">
      <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg register-card">
        <h1 class="page-title mb-5">Crear tu cuenta</h1>
        <v-text-field
          label="Nombre"
          v-model="nombre"
          prepend-icon="mdi-account"
        />
        <v-text-field
          label="Apellido"
          v-model="apellido"
          prepend-icon="mdi-account"
        />
        <v-text-field
          label="Correo electrónico"
          v-model="email"
          prepend-icon="mdi-email"
        />
        <v-text-field
          label="DNI"
          v-model="dni"
          prepend-icon="mdi-card-account-details"
          translate="no"
        />
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
          :to='"/(main)/inicio"'
        >
          Registrarse
        </v-btn>
        <div class="mt-5">
            <p>¿Ya tienes una cuenta? <router-link :to="'/(login)/login' " class="blue-btn">Iniciar sesión</router-link></p>
        </div>
      </v-card>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  
  const nombre = ref('');
  const apellido = ref('');
  const email = ref('');
  const dni = ref('');
  const password = ref('');
  const confirmPassword = ref('');

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
  .register-container {
    display: flex;
    justify-content: center;
    height: 100vh;
    padding-top: 1rem;
  }
  
  .register-card {
    width: 50%;
    text-align: center;
    height: fit-content;
  }
</style>
  