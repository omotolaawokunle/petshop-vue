import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
};
createApp(App).use(router).use(createPinia()).use(Toast, toastOptions).mount('#app')
