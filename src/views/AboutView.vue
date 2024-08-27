<template>
  <div class="about">
    <h1>About Our Library</h1>
    <p>
      Welcome to our digital library! We're dedicated to providing a vast collection of books and
      resources to our community.
    </p>
  </div>
  <div class="text-center mt-5">
    <button @click="logout" class="btn btn-primary me-2">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('loginSuccessful')
  router.push({ name: 'Login' })
}
</script>

<style></style>
