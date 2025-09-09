import 'primeicons/primeicons.css';
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Button from 'primevue/button';
import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
app.component('Button', Button);
app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(router);

app.mount('#app');
