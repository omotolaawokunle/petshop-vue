import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "./main.css";

const toastOptions = {
  position: "top-right",
  timeout: 5000,
  closeOnClick: true,
};

createApp(App).provide("baseUrl", "https://pet-shop.buckhill.com.hr/api/v1/").provide("formatDate", function (date: string) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
})
.provide('toLocale', function (number: string | number) {
    if (number) {
        return Number(number).toLocaleString("en", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }
    return 0;
}).use(router).use(createPinia()).use(Toast, toastOptions).mount('#app')
