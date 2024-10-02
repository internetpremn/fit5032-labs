import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import FirebaseSigninView from '@/views/FirebaseSignin.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import AddBookView from '@/views/AddBookView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import { getAuth } from 'firebase/auth'

import { getFirestore, doc, getDoc } from 'firebase/firestore'
import BookList from '@/components/BookList.vue'
import WeatherView from '@/views/WeatherView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true, role: ['buyer'] }
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
    meta: { requiresAuth: true, role: ['seller'] }
  },
  {
    path: '/booklist',
    name: 'BookList',
    component: BookList,
    meta: { requiresAuth: true, role: ['seller'] }
  },
  {
    path: '/bookcount',
    name: 'bookCount',
    component: GetBookCountView,
    meta: { requiresAuth: true, role: ['seller'] }
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const getPersonRole = async (uid) => {
  const db = getFirestore()
  const personDocRef = doc(db, 'persons', uid)
  const personDoc = await getDoc(personDocRef)
  if (personDoc.exists()) {
    const personData = personDoc.data()
    return personData.role
  }
  return null
}

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const person = auth.currentUser
  const buyerLoginSuccessful = localStorage.getItem('buyerLoginSuccessful') === 'true'
  const sellerLoginSuccessful = localStorage.getItem('sellerLoginSuccessful') === 'true'

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if ((!buyerLoginSuccessful && !sellerLoginSuccessful) || !person) {
      next({ name: 'FireLogin' })
    } else {
      const personRole = await getPersonRole(person.uid)
      if (to.meta.role && to.meta.role.includes(personRole)) {
        next()
      } else {
        next({ name: 'FireLogin' })
      }
    }
  } else {
    next()
  }
})

export default router
