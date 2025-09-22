import { createApp } from 'vue';
import App from './App.vue';
import { createWebHistory, createRouter } from 'vue-router'

import CreateAutomation from "./pages/create-automation.vue"
import HomeView from "./pages/index.vue"


const routes = [
  { path: '/', component: HomeView },
  { path: '/create-automation', component: CreateAutomation },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})


createApp(App).use(router).mount('#app');