import 'reflect-metadata'

import './assets/use-assets'

import { createApp } from 'vue'
import router from "./router";

import App from './App.vue'

createApp(App)
  .use(router)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  .catch(() => {})
