<template>
  
  <RouterView/>
  <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/darkmode">darkmode</router-link>
    <!-- <router-link to="/translate">translate page</router-link> -->
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';
import router from "./router/index.js";

export default {
  mounted() {
    this.$router = createRouter({
      history: createWebHistory(),
      routes: []
    })
  }
}

// import NavBar from "./layouts/NavigationBar.vue"

// // the relevant methods
// import { collection, addDoc } from "firebase/firestore"
// // the firestore instance
// import db from './firebase/init.js'

// export default {
//   created() {
//     this.createUser()
//   },
//   methods: {
//     async createUser() {
//       // 'users' collection reference
//       const colRef = collection(db, 'users')
//       // data to send
//       const dataObj = {
//         firstName: 'John',
//         lastName: 'Doe',
//         dob: '1990'
//       }

//       // create document and return reference to it
//       const docRef = await addDoc(colRef, dataObj)

//       // access auto-generated ID with '.id'
//       console.log('Document was created with ID:', docRef.id)
//     }
//   },
//   components: {
//     NavBar
//   }
// }
</script>