<template>
    <div class="login-container">
        <v-card elevation="2" class="font-montserrat px-6 py-5 rounded-lg login-card">
            <h1 class="page-title" style="margin-bottom: 20px">Iniciar sesión</h1>
            <v-text-field
              label="Correo electrónico"
              prepend-icon="mdi-email"
              v-model="email"
            />
            <v-text-field
              label="Contraseña"
              prepend-icon="mdi-lock"
              v-model="password"
              type="password"
            />
            <router-link :to="'/(login)/olvide'" class="blue-btn">
              ¿Olvidaste tu contraseña?
            </router-link>
            <v-btn class="font-montserrat text-capitalize font-weight-bold font-large bg-primary" block @click="inicio">
              Ingresar
            </v-btn>
            <div style="margin-top: 20px">
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
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();

  const inicio = () => {
    router.push('/(main)/inicio');
  };
</script>
  
<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: top;
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
  