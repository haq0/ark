import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.js'
import 'highlight.js/styles/atom-one-dark.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
