<template>
    <div class="header-container">
      <router-link :to="{ path: '/inicio' }">
        <v-icon class="exit-btn">mdi-chevron-left</v-icon>
      </router-link>
      <span class="page-title">Actividad</span>
    </div>
    <div class="page-content">
      <v-card class="page-card font-montserrat px-3" elevation="2" width="60vw">
        <v-container class="activity-slot">
          <v-text class="pb-5">Hoy</v-text>
          <v-row class="activity-row" no-gutters>
            <v-col class="icon-col" cols="auto">
              <v-icon class="icon" large>{{"mdi-credit-card-check-outline"}}</v-icon>
            </v-col>
            <v-col class="info-col">
              <v-row no-gutters>
                <v-text class="activity-user">Nicolás Priotto</v-text>
              </v-row>
              <v-row no-gutters>
                <v-text class="activity-detail">Transferencia enviada</v-text>
              </v-row>
            </v-col>
            <v-col class="price-col" cols="auto">
              <v-text class="activity-price">-$3000</v-text>
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="border-opacity-100" color="info"></v-divider>
        <v-container class="activity-slot">
          <v-text class="pb-5">Hoy</v-text>
          <v-row class="activity-row" no-gutters>
            <v-col class="icon-col" cols="auto">
              <v-icon class="icon" large>{{"mdi-credit-card-check-outline"}}</v-icon>
            </v-col>
            <v-col class="info-col">
              <v-row no-gutters>
                <v-text class="activity-user">Nicolás Priotto</v-text>
              </v-row>
              <v-row no-gutters>
                <v-text class="activity-detail">Transferencia enviada</v-text>
              </v-row>
            </v-col>
            <v-col class="price-col" cols="auto">
              <v-text class="activity-price">-$3000</v-text>
            </v-col>
          </v-row>
        </v-container>
        <v-divider class="border-opacity-100" color="info"></v-divider>
      </v-card>
    </div>
</template>
  
  
<script setup>
 
</script>

<style>
  .page-card {
    align-items: center;
    padding-left: 7px;
    padding-right: 7px;
    padding-top: 3px;
    padding-bottom: 5px;
  }

  .activity-slot {
    padding: 10px;
  }

.activity-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-col {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
}

.icon {
  margin-top: -5px;
  margin-right: 10px;
}

.info-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.activity-user {
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  line-height: 1;
}

.activity-detail {
  font-size: 0.8rem;
  color: gray;
  margin: 0;
}

.price-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.activity-price {
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
}

</style>