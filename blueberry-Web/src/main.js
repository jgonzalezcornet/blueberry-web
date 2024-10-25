/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import pinia from './stores';

const app = createApp(App);
app.use(pinia);

registerPlugins(app);

app.mount('#app');