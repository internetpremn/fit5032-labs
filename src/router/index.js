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
      const loginSuccessful = localStorage.getItem('loginSuccessful') === 'true'
      if (loginSuccessful) {
        next()
      } else {
        next({ name: 'Login' }) // Cancel the navigation
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  const loginSuccessful = localStorage.getItem('loginSuccessful') === 'true'
  if ((to.name === 'About' || to.name === 'Home') && !loginSuccessful) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
