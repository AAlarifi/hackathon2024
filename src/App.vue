<template>
    <div></div>
  </template>
  
  <script>
  // the relevant methods
  import { doc, setDoc } from "firebase/firestore"
  import db from './firebase/init.js'
  
  export default {
    created() {
      this.createCountry()
    },
    methods: {
      async createCountry() {
  
        await setDoc(doc(db, 'countries', 'US'), {
          name: 'United States'
        })
      }
    }
  }
  </script>