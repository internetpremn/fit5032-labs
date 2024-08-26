<script setup>
// import JSON from './components/JSON.vue'
import Forms from './views/HomeView.vue'
import BHeader from './components/BHeader.vue'
import LoginView from './views/LoginView.vue'
</script>

<template>
  <!-- <LoginView /> -->
  <div class="main-container mt-5">
    <header>
      <BHeader />
    </header>
    <div class="row">
      <div class="col-sm-8 offset-sm-2"></div>
      <main class="main-box">
        <div class="text-center mt-5">
          <router-view></router-view>
        </div>
        <!-- <JSON /> -->
        <!-- <Forms /> -->
      </main>
    </div>
  </div>
</template>

<style>
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
