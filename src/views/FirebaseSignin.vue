<template>
  <h1>Sign in</h1>
  <div class="row mb-3 mt-5">
    <div class="col-sm-4 offset-sm-4">
      <label for="email" class="form-label">Email</label>
      <input type="text" class="form-control" placeholder="Enter your email ID" v-model="email" />
    </div>
  </div>
  <div class="row mb-3 mt-5">
    <div class="col-sm-4 offset-sm-4">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="password"
      />
    </div>
  </div>
  <div class="row mb-3 mt-5">
    <p><button class="btn btn-dark me-2" @click="signin">Sign in via Firebase</button></p>
  </div>
</template>
<!-- 
<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const signin = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (data) => {
      const person = data.user
      console.log('Firebase Register Successful!', person.uid)
      const personDocRef = doc(db, 'persons', person.uid)
      const personDoc = await getDoc(personDocRef)
      if (personDoc.exists()) {
        const personData = personDoc.data()
        const personRole = personData.role
        if (personRole === 'seller') {
          localStorage.setItem('sellerLoginSuccessful', 'true')
          router.push({ name: 'AddBook' })
        } else if (personRole === 'buyer') {
          localStorage.setItem('buyerLoginSuccessful', 'true')
          router.push({ name: 'About' })
        }
        console.log('Current role:', personData.role, 'Current person:', auth.currentUser)
      } else {
        console.error('User not found')
      }
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script> -->
