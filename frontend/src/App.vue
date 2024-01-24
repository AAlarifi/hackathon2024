<template>
  <div>
    <NavBar/>
  </div>
</template>

<script>
import NavBar from "./layouts/NavigationBar.vue"

// the relevant methods
import { collection, addDoc } from "firebase/firestore"
// the firestore instance
import db from './firebase/init.js'

export default {
  created() {
    this.createUser()
  },
  methods: {
    async createUser() {
      // 'users' collection reference
      const colRef = collection(db, 'users')
      // data to send
      const dataObj = {
        firstName: 'John',
        lastName: 'Doe',
        dob: '1990'
      }

      // create document and return reference to it
      const docRef = await addDoc(colRef, dataObj)

      // access auto-generated ID with '.id'
      console.log('Document was created with ID:', docRef.id)
    }
  },
  components: {
    NavBar
  }
}
</script>