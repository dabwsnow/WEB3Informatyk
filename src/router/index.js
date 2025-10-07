import { createRouter, createWebHistory } from 'vue-router'
import Tests from '../views/Tests.vue'
import Courses from '../views/Courses.vue'
import Home from '../components/Home.vue'
import TestView from '../views/TestView.vue'
import QuestionsDatabase from '../views/QuestionsDatabase.vue'
import Login from '../views/Login.vue'
import Profile from '../components/Profile.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home',
    component: Home,
    meta: { showLayout: true }
  },
  { 
    path: '/tests', 
    name: 'Tests',
    component: Tests,
    meta: { showLayout: true }
  },
  {
    path: '/baza/:category',
    name: 'QuestionsDatabase',
    component: QuestionsDatabase,
    props: true,
    meta: { showLayout: true }
  },
  {
    path: '/tests/:category',
    name: 'TestView',
    component: TestView,
    props: true,
    meta: { showLayout: true }
  },
  { 
    path: '/courses', 
    name: 'Courses',
    component: Courses,
    meta: { showLayout: true }
  },
  { 
    path: '/login', 
    name: 'Login',
    component: Login,
    meta: { showLayout: false }
  },
  { 
    path: '/profile', 
    name: 'Profile',
    component: Profile,
    meta: { showLayout: true }
  },
  { 
    path: '/settings', 
    name: 'Settings',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Ustawienia - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/materials', 
    name: 'Materials',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Materiały - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/tools', 
    name: 'Tools',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Kalkulatory - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/about', 
    name: 'About',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>O projekcie - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/contact', 
    name: 'Contact',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Kontakt - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/terms', 
    name: 'Terms',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Regulamin - Coming Soon</h1></div>' },
    meta: { showLayout: true }
  },
  { 
    path: '/privacy', 
    name: 'Privacy',
    component: { template: '<div style="padding: 100px 20px; text-align: center;"><h1>Polityka prywatności - Coming Soon</h1></div>' },
    meta: { showLayout: true }
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