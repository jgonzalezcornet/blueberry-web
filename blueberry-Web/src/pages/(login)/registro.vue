<template>
    <div class="register-container">
      <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg register-card">
        <h1 class="page-title" style="margin-bottom: 20px">Crear tu cuenta</h1>
        <v-text-field
          label="Nombre"
          v-model="name"
          prepend-icon="mdi-account"
        />
        <v-text-field
          label="Apellido"
          v-model="lastname"
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
          type="password"
          prepend-icon="mdi-lock"
        />
        <v-text-field
          label="Confirmar contraseña"
          v-model="confirmPassword"
          type="password"
          prepend-icon="mdi-lock-check"
        />
        <v-btn
          class="font-montserrat text-capitalize font-weight-bold font-large bg-primary"
          block
          @click="registrarse"
        >
          Registrarse
        </v-btn>
        <div style="margin-top: 20px">
            <p>¿Ya tienes una cuenta? <router-link :to="'/(login)/login' " class="blue-btn">Iniciar sesión</router-link></p>
        </div>
      </v-card>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useStore } from '../../stores/app';
  const store = useStore();
  
  const name = ref('');
  const lastname = ref('');
  const email = ref('');
  const dni = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const router = useRouter();
  
  const registrarse = () => {
    if(password.value != confirmPassword.value){
      alert("ERROR: Las contraseñas ingresadas no coinciden.");
      return;
    }
    const response = store.addUser({ name: name.value, lastname: lastname.value, email: email.value, dni: dni.value, password: password.value });
    if(!response.ok){
      alert("ERROR: " + response.message);
      return;
    }
    router.push('/(login)/login');
  };
</script>
  
<style scoped>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .register-card {
    width: 50%;
    text-align: center;
  }
</style>
  