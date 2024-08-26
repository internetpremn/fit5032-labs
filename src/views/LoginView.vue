<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3 mt-5">
            <div class="col-sm-6 offset-sm-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
            </div>
          </div>
          <div class="row mb-3 mt-5">
            <div class="col-sm-6 offset-sm-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="text"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
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

const formData = ref({
  username: '',
  password: ''
})

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username === 'username') {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (formData.value.password.length === 'password') {
    if (blur) errors.value.password = 'Name must be at least 3 characters'
  } else {
    errors.value.password = null
  }
}
</script>

<style></style>
