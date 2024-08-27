<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 mt-5">
            <div class="col-sm-6 offset-sm-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" />
            </div>
          </div>
          <div class="row mb-3 mt-5">
            <div class="col-sm-6 offset-sm-3">
              <label for="password" class="form-label">Password</label>
              <input type="text" class="form-control" id="password" v-model="formData.password" />
            </div>
          </div>
          <div class="text-center mt-5">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const formData = ref({
  username: '',
  password: ''
})

const router = useRouter()

const submitForm = () => {
  if (formData.value.username === 'username' && formData.value.password === 'password') {
    localStorage.setItem('loginSuccessful', 'true')
    router.push({ name: 'About' })
  } else {
    alert('Invalid credentials')
  }
}
</script>

<style></style>
