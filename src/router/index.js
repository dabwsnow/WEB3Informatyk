import { createRouter, createWebHistory } from 'vue-router'
import Tests from '../views/Tests.vue'
import Courses from '../views/Courses.vue'
import Home from '../components/Home.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home 
  },
  { 
    path: '/tests', 
    name: 'Tests',
    component: Tests 
  },
  { 
    path: '/courses', 
    name: 'Courses',
    component: Courses 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: { template: '<div>Login - coming soon</div>' } 
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router