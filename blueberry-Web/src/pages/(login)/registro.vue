<template>
    <div class="register-container">
      <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg register-card">
        <h1 class="page-title mb-5">Crear tu cuenta</h1>
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
          :type="passwordFieldType" 
          :append-icon='passwordIcon' 
          @click:append="togglePasswordVisibility"
        >
          <template v-slot:prepend>
            <v-tooltip text="La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y al menos 8 caracteres.">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props">mdi-lock</v-icon>
              </template>
            </v-tooltip>
          </template>
        </v-text-field>
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
          @click="registrarse"
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
  import { useRouter } from 'vue-router';
  import { useStore } from '../../stores/app';
  import ErrorHandler from '../../utils/ErrorHandler';
  
  const store = useStore();
  const router = useRouter();
  
  const name = ref('');
  const lastname = ref('');
  const email = ref('');
  const dni = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  
  const registrarse = () => {
    if(password.value != confirmPassword.value){
      ErrorHandler({ status: 400, message: "Las contraseñas ingresadas no coinciden." });
      return;
    }
    if (!passwordRegex.test(password.value)) {
      ErrorHandler({ status: 400, message: "La contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y al menos 8 caracteres." });
      return;
    }
    const response = store.addUser({ name: name.value, lastname: lastname.value, email: email.value, dni: dni.value, password: password.value });
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
    router.push('/(login)/login');
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
  