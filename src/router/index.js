import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: { template: '<div>Home</div>' } },
  { path: '/tests', component: { template: '<div>Teoria</div>' } },
  { path: '/courses', component: { template: '<div>Praktyka</div>' } },
  { path: '/login', component: { template: '<div>Login</div>' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router