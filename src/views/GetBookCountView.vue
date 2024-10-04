<template>
    <div id="app">
      <h1>Book Counter</h1>
      <button @click="getBookCount">Get Book Count</button>
      <button @click="getBookNames">Get Book Names</button>
      
      <p  class="mt-5" v-if="count !== null">Total number of books: {{ count }}</p>
      <p v-if="error">{{ error }}</p>
  
      <div v-if="bookNames.length > 0">
        <h2 class="mt-5">List of Book Names</h2>
        <ul>
          <li v-for="(book, index) in bookNames" :key="index">{{ book }}</li>
        </ul>
      </div>
    </div>
  </template>
  

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        count: null,
        error: null,
        bookNames: [], 
      };
    },
    methods: {
      async getBookCount() {
        try {
          const response = await axios.get('https://countbooks-mg4yxnf5gq-uc.a.run.app/');
          this.count = response.data.count;
          this.error = null;
        } catch (error) {
          console.error('Error fetching book count:', error);
          this.error = error.message;
          this.count = null;
        }
      },
      async getBookNames() {
        try {
          const response = await axios.get('https://booknames-mg4yxnf5gq-uc.a.run.app');
          this.bookNames = response.data.names;  
          this.error = null;
        } catch (error) {
          console.error('Error fetching book names:', error);
          this.error = error.message;
          this.bookNames = [];
        }
      },
    },
  };
  </script>
  
