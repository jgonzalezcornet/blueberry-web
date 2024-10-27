<template>
  <div class="header-container">
    <router-link :to="'/(main)/inicio'">
      <ExitButton />
    </router-link>
    <h1 class="page-title">Perfil</h1>
  </div>
  <div class="d-flex flex-column justify-center align-center pt-4">
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg w-50 text-center h-fit mb-10">
      <h1 class="page-title mb-5">Información personal</h1>
      <p>Nombre: {{ userData.name }}</p>
      <p>Apellido: {{ userData.lastname }}</p>
      <p>Correo: {{ userData.email }}</p>
      <p>DNI: {{ userData.dni }}</p>
    </v-card>
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg w-50 text-center h-fit mb-10">
      <h1 class="page-title mb-5">Modificar alias</h1>
      <v-text-field
        label="Alias"
        v-model="alias"
        prepend-icon="mdi-account"
      />
      <v-btn
        class="font-montserrat text-capitalize font-weight-bold font-large bg-primary"
        block
        @click="updateAlias"
      >
        Modificar
      </v-btn>
    </v-card>
    <v-card elevation="2" class="font-montserrat px-6 pt-3 pb-5 rounded-lg w-50 text-center h-fit">
      <h1 class="page-title mb-5">Modificar contraseña</h1>
      <v-text-field
        label="Contraseña actual"
        v-model="currentPassword"
        prepend-icon="mdi-lock"
        :type="currentPasswordFieldType" 
        :append-icon='currentPasswordIcon' @click:append="toggleCurrentPasswordVisibility"
      />
      <v-text-field
        label="Nueva contraseña"
        v-model="password"
        prepend-icon="mdi-lock"
        :type="passwordFieldType" 
        :append-icon='passwordIcon' @click:append="togglePasswordVisibility"
      />
      <v-text-field
        label="Confirmar nueva contraseña"
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
  import { ref, computed } from 'vue';
  import { useStore } from '../../stores/app';
  import getLoggedUserId from '../../utils/getLoggedUserId';
  import ErrorHandler from '../../utils/ErrorHandler';
  const store = useStore();

  const userData = computed(() => {
    const id = getLoggedUserId();
    if(!id){
      return {};
    }
    const response = store.getUserData(id.id);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return {};
    }
    return response.data;
  });
  
  const alias = ref('');

  const password = ref('');
  const confirmPassword = ref('');
  const currentPassword = ref('');
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

  const updateAlias = () => {
    const response = store.getLoggedUser();
    if(!response.ok){
      ErrorHandler({ status: 400, message: "No se han podido extraer los datos del usuario ingresado." });
      return;
    }

    if(alias.value.length < 3){
      ErrorHandler({ status: 400, message: "El alias debe tener al menos 3 caracteres." });
      return;
    }
    
    const response2 = store.setAlias(response?.data?.id, alias.value);
    if(!response2.ok){
      ErrorHandler({ status: 400, message: "No se ha podido actualizar el alias" });
      return;
    }
  }

  const modificarPassword = () => {
    const id = getLoggedUserId();
    if(!id){
      ErrorHandler({ status: 400, message: "No se ha encontrado un usuario con el id especificado." });
      return;
    }

    
    if(password.value != confirmPassword.value){
      ErrorHandler({ status: 400, message: "Las contraseñas no coinciden." });
      return;
    }

    if (!passwordRegex.test(password.value)) {
      ErrorHandler({ status: 400, message: "a contraseña debe tener al menos una minúscula, una mayúscula, un número, un carácter especial y al menos 8 caracteres." });
      return;
    }

    const response = store.setPassword(id.id, password.value, currentPassword.value);
    if(!response.ok){
      ErrorHandler({ status: 400, message: response.message });
      return;
    }
  }

  const isPasswordVisible = ref(false);
  const isConfirmPasswordVisible = ref(false);
  const isCurrentPasswordVisible = ref(false);

  const toggleCurrentPasswordVisibility = () => {
    isCurrentPasswordVisible.value = !isCurrentPasswordVisible.value;
  };

  const togglePasswordVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value;
  };

  const toggleConfirmPasswordVisibility = () => {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
  };

  const currentPasswordFieldType = computed(() => 
    isCurrentPasswordVisible.value ? 'text' : 'password'
  );

  const currentPasswordIcon = computed(() => 
    isCurrentPasswordVisible.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
  );

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
</style>
