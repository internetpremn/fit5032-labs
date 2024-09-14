<template>
  <h1>Create an Account</h1>
  <div class="row mb-3 mt-5">
    <div class="col-sm-4 offset-sm-4">
      <label for="email" class="form-label">Email</label>
      <input type="text" class="form-control" placeholder="Enter your email ID" v-model="email" />
    </div>
  </div>
  <div class="row mb-3 mt-3">
    <div class="col-sm-4 offset-sm-4">
      <label for="password" class="form-label">Password</label>
      <input
        type="password"
        class="form-control"
        placeholder="Enter your preferred passowrd"
        v-model="password"
      />
    </div>
  </div>
  <div class="row mb-3 mt-3">
    <div class="col-sm-2 offset-5">
      <label for="role" class="form-label">Role</label>
      <select class="form-select" v-model="role">
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
    </div>
  </div>
  <div class="row mb-3 mt-5">
    <p><button class="btn btn-warning me-2" @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const email = ref('')
const password = ref('')
const role = ref('buyer')
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
      const person = data.user
      console.log('Firebase Register Successful!', person.uid)

      const personDocRef = doc(db, 'persons', person.uid)
      await setDoc(personDocRef, {
        email: person.email,
        role: role.value
      })

      router.push('/FireLogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
