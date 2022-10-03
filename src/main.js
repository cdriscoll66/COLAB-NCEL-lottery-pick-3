import { createApp } from 'vue'
import App from './App.vue'
// import VueGtm from 'vue-gtm';
import router from './router'
import Particles from "particles.vue3";


import './assets/main.css'
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia()).use(Particles)

// use(VueGtm, {
//     id: 'GTM-5QNGL5T',
//     defer: false,
//     enabled: true,
//     debug: false,
//     loadScript: true,
//     vueRouter: router,
//     trackOnNextTick: false,
//   });

app.use(router)

app.mount('#app')
