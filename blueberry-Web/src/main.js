import { registerPlugins } from '@/plugins';

import App from './App.vue';

import { createApp } from 'vue';
import pinia from './stores';

const app = createApp(App);
app.use(pinia);

registerPlugins(app);

app.mount('#app');