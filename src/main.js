// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import router from './router/routes';
import 'tailwindcss/tailwind.css'





const app = createApp(App);
app.use(createPinia())
app.use(router);
app.mount('#app');
