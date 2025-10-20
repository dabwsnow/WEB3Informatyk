import { createRouter, createWebHistory } from 'vue-router'
import Tests from '../components/tests/Tests.vue'
import Courses from '../components/pages/Courses.vue'
import Arkusz from '../components/pages/Arkusz.vue'
import Home from '../components/common/Home.vue'
import TestView from '../components/tests/TestView.vue'
import QuestionsDatabase from '../components/tests/QuestionsDatabase.vue'
import Login from '../components/views/auth/Login.vue'
import Profile from '../components/pages/Profile.vue'
import Admin from '../components/admin/AdminPanel.vue'
import ComingSoon from '../components/pages/ComingSoon.vue'
import About from '../components/pages/About.vue'
import Contact from '../components/pages/Contact.vue'
import Terms from '../components/pages/Terms.vue'
import Privacy from '../components/pages/Privacy.vue'

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
    path: '/courses/:profileId',
    name: 'Arkusz',
    component: Arkusz,
    props: true,
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
    path: '/panel',
    name: 'AdminPanel',
    component: Admin,
    meta: { showLayout: true, requiresAdmin: true }
  },
  {
    path: '/coming-soon',
    name: 'ComingSoon',
    component: ComingSoon,
    meta: { showLayout: true }
  },
  { 
    path: '/about', 
    name: 'About',
    component: About,
    meta: { showLayout: true }
  },
  { 
    path: '/contact', 
    name: 'Contact',
    component: Contact,
    meta: { showLayout: true }
  },
  { 
    path: '/terms', 
    name: 'Terms',
    component: Terms,
    meta: { showLayout: true }
  },
  { 
    path: '/privacy', 
    name: 'Privacy',
    component: Privacy,
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