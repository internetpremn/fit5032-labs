<template>
  <div>
    <h1 class="text-center">Actions for Books</h1>
    <form>
      <div class="row mb-3 mt-5">
        <div class="col-sm-4 offset-4">
          <label for="isbn" class="form-label">ISBN</label>
          <input type="text" class="form-control" v-model="isbn" id="isbn" required />
        </div>
        <div class="row mb-3 mt-5">
          <div class="col-sm-4 offset-4">
            <label for="name" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="name" id="name" required />
          </div>
        </div>
        <div class="text-center mt-3">
          <button type="button" class="btn btn-primary me-2" @click="addBook">Add Book</button>
          <button type="button" class="btn btn-warning me-2" @click="updateBookName">
            Update Book Name
          </button>
          <button type="button" class="btn btn-danger me-2" @click="deleteBook">Delete Book</button>
          <button type="button" class="btn btn-secondary" @click="logout">Sign out</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { useRouter } from 'vue-router'

import BookList from '../components/BookList.vue'
import {
  getFirestore,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs
} from 'firebase/firestore'
import { getAuth, signOut } from 'firebase/auth'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const router = useRouter()
    const auth = getAuth()
    const db = getFirestore()

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
        resetForm()
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    const updateBookName = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('Invlaid ISBN')
          return
        }
        const id = await fetchISBN(isbnNumber)
        if (!id) {
          alert('Invlaid ISBN')
          return
        }

        const libraryDocRef = doc(db, 'books', id)
        await updateDoc(libraryDocRef, {
          name: name.value
        })
        alert('Book name updated')
        resetForm()
      } catch (error) {
        console.error('Book name not updated becaue:', error)
      }
    }

    const deleteBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('Invlaid ISBN')
          return
        }
        const id = await fetchISBN(isbnNumber)
        if (!id) {
          alert('Invlaid ISBN')
          return
        }
        const libraryDocRef = doc(db, 'books', id)
        await deleteDoc(libraryDocRef)
        alert('Book deleted')
        resetForm()
      } catch (error) {
        console.error('Book not deleted becaue:', error)
      }
    }

    const resetForm = () => {
      isbn.value = ''
      name.value = ''
    }

    const logout = async () => {
      try {
        await signOut(auth)
        localStorage.removeItem('sellerLoginSuccessful')
        router.push('/firelogin')
      } catch (error) {
        console.error('Error during logout: ', error)
      }
    }

    const fetchISBN = async (isbnNumber) => {
      const libraryCollection = collection(db, 'books')
      const q = query(libraryCollection, where('isbn', '==', isbnNumber))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].id
      }
      return null
    }

    return {
      isbn,
      name,
      addBook,
      updateBookName,
      deleteBook,
      logout,
      fetchISBN
    }
  },
  components: {
    BookList
  }
}
</script>
