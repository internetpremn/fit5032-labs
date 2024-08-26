import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      // Perform logic before entering the About route
      if (someCondition) {
        next()
      } else {
        next(false) // Cancel the navigation
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'About' || to.name === 'Home') {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
