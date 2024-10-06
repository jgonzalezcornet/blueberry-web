<template>
    <v-app-bar :elevation="2" color="#001D3D">
      <template v-slot:prepend>
        <img title="web-icon" style="width:40px; height:40px; margin-left:20px;" src="https://t4.ftcdn.net/jpg/05/92/52/75/360_F_592527505_FPSk30HzW1OKAUkPk6r7Po4eKBm5A4pL.jpg"/>
      </template>
    <v-toolbar-title class="font-varela" style="font-size: 180%;">Blueberry</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn prepend-icon="mdi-account" variant="tonal" :to="'/perfil'" class="perfil-btn font-varela" style="text-transform: capitalize; font-weight: bold;">
        Manuel Ahumada
    </v-btn>
    </v-app-bar>
</template>

<script>
  export default {
    name: 'AppBar',
  };
</script>

<style>

.v-icon {
  margin-right: 0px;
}

.perfil-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  min-width: 0;
  margin-right: 20px !important;
}

</style>