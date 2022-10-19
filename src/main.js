import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/tailwind.css";
import { createI18n, useI18n } from 'vue-i18n';
import { languages, defaultLocale } from '@/i18n/index.js';

const messages = Object.assign(languages);

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'ru',
  messages
});

createApp(App, {
  setup() {
    const {t} = useI18n();
    return t;
  }
})
  .use(router)
  .use(i18n)
  .mount("#app");