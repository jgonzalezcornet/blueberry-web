<template>
    <v-footer class="footer">
      <v-row justify="center" no-gutters>
        <v-col class="footer-text">
          {{new Date().getFullYear()}} — <strong>Blueberry</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>
  
  
<script>
    export default {
        name: 'AppInfo',
    }
</script>

<style>
    .footer {
        width: 100%;
        background-color: #001D3D !important;
        height: auto;
    }
    .footer-text {
        color: fuchsia;
        font-size: 20px;
        font-family: 'Varela Round', sans-serif;
        text-align: center;
        justify-content: center;
    }
</style>