import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router'

import CreateAutomation from "./pages/create-automation.vue"
import HomeView from "./pages/index.vue"
import MyAutomations from "./pages/MyAutomations.vue"


const routes = [
  { path: '/', component: HomeView },
  { path: '/create-automation', component: CreateAutomation },
  { path: '/my-automation', component: MyAutomations },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


const app = createApp(App)
app.use(router).mount('#app');
