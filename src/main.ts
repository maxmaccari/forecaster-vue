import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VIcon from './components/VIcon.vue'

import './css/app.css'

createApp(App)
  .use(router)
  .component('v-icon', VIcon)
  .mount('#app')
