<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}
              </div>
            </div>
            <div class="col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-sm-6">
              <div class="col-sm-6">
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="isAustralian"
                    value="Austalian Resident"
                    @blur="() => validateNationality(true)"
                    @input="() => validateNationality(false)"
                    v-model="formData.nationality"
                  />
                  <label class="form-check-label" for="isAustralian">Australian Resident</label>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="form-check">
                  <input
                    type="radio"
                    class="form-check-input"
                    id="isForeign"
                    value="Foreign National"
                    v-model="formData.nationality"
                  />
                  <label class="form-check-label" for="isForeign">Foreign National</label>
                </div>
              </div>

              <div v-if="errors.nationality" class="text-danger">
                {{ errors.nationality }}
              </div>
            </div>

            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="() => validateGender(true)"
                @input="() => validateGender(false)"
                v-model="formData.gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">
                {{ errors.gender }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
          <div class="row mt-5" v-if="submittedCards.length">
            <div class="d-flex flex-wrap justify-content-start">
              <div
                v-for="(card, index) in submittedCards"
                :key="index"
                class="card m-2"
                style="width: 18rem"
              >
                <div class="card-header">User Information</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Username: {{ card.username }}</li>
                  <li class="list-group-item">Password: {{ card.password }}</li>
                  <li class="list-group-item">Nationality: {{ card.nationality }}</li>
                  <li class="list-group-item">Gender: {{ card.gender }}</li>
                  <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  nationality: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateReason(true)
  validateGender(true)
  validateNationality(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.reason &&
    !errors.value.gender &&
    !errors.value.nationality
  ) {
    submittedCards.value.push({
      ...formData.value
    })
    clearData()
  }
}

const clearData = () => {
  formData.value = {
    username: '',
    password: '',
    nationality: false,
    reason: '',
    gender: ''
  }
}

const clearForm = () => {
  clearData()
}

const errors = ref({
  username: null,
  password: null,
  nationality: null,
  gender: null,
  reason: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must at least be ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length < 1) {
    if (blur) errors.value.reason = 'Reason must be filled.'
  } else {
    errors.value.reason = null
  }
}

const validateGender = (blur) => {
  if (formData.value.gender.length < 1) {
    if (blur) errors.value.gender = 'Gender must be selected.'
  } else {
    errors.value.gender = null
  }
}

const validateNationality = (blur) => {
  if (formData.value.nationality < 1) {
    if (blur) errors.value.nationality = 'Nationality must be selected.'
  } else {
    errors.value.nationality = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
