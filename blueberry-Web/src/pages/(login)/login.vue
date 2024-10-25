<template>
    <div class="login-container">
        <v-card elevation="2" class="font-montserrat px-6 py-5 rounded-lg login-card">
            <h1 class="page-title mb-5">Iniciar sesión</h1>
            <v-text-field
              label="Correo electrónico"
              prepend-icon="mdi-email"
              v-model="email"
            />
            <v-text-field
              label="Contraseña"
              prepend-icon="mdi-lock"
              v-model="password"
              :type="passwordFieldType" 
              :append-icon='passwordIcon' @click:append="togglePasswordVisibility"
            />
            <router-link :to="'/(login)/olvide'" class="blue-btn">
              ¿Olvidaste tu contraseña?
            </router-link>
            <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" block @click="login">
              Ingresar
            </v-btn>
            <div class="mt-5">
              <p>¿No tienes una cuenta? <router-link :to="'/(login)/registro' " class="blue-btn">Registrarse</router-link></p>
            </div>
            <div class="footer-links">
              <router-link :to="'/(login)/terminos'">Términos y Condiciones</router-link>
              <router-link :to="'/(login)/seguridad'">Información de Seguridad</router-link>
            </div>
        </v-card>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../../stores/app';
  
  const store = useStore();
  const email = ref('');
  const password = ref('');

  function login() {
    const response = store.signIn({ email: email.value, password: password.value });
    if(!response?.ok){
      alert("ERROR: " + response.message);
      return;
    }
    router.push('/(main)/inicio');
  }

  const isPasswordVisible = ref(false);

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
</script>
  
<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    margin-top: 5vh;
    min-height: 100vh;
  }
  
  .login-card {
    width: 50%;
    text-align: center;
    height: fit-content;
  }
  
  .footer-links a {
    font-size: 12px;
    color: #999;
    text-decoration: none;
    margin: 0 10px;
  }
</style>
  