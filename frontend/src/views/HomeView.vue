<template>
  <div class="flex items-center justify-center h-screen ">
    <form class="w-full ml-10 mr-10 mb-20" @submit.prevent="getRecipie">
      <!-- Search Input -->
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos...">
        <button type="submit"
          class="text-black absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      <img v-for="(image, index) in images" :key="index" :src="image" alt="Recipe Image">
      
      <!-- Filter Options -->
      <div class="mt-8">
        <div>

          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Allergen</label>
          <div class="flex space-x-4">


            <label for="category1" class="text-sm text-gray-900 dark:text-black">Peanuts</label>
            <input type="checkbox" value="peanuts" class="text-blue-500 form-radio" v-model="allergens">


            <label for="category2" class="text-sm text-gray-900 dark:text-black">Fish</label>
            <input type="checkbox" value="fish" class="text-blue-500 form-radio" v-model="allergens">

            <label for="category3" class="text-sm text-gray-900 dark:text-black">Milk</label>
            <input type="checkbox" value="milk" class="text-blue-500 form-radio" v-model="allergens">


            <label for="category4" class="text-sm text-gray-900 dark:text-black">Soy</label>
            <input type="checkbox" value="soy" class="text-blue-500 form-radio" v-model="allergens">

            <label for="category5" class="text-sm text-gray-900 dark:text-black">Wheat</label>
            <input type="checkbox" value="wheat" class="text-blue-500 form-radio" v-model="allergens">


            <label for="category6" class="text-sm text-gray-900 dark:text-black">Sesame</label>
            <input type="checkbox" value="sesame" class="text-blue-500 form-radio" v-model="allergens">

            <label for="category7" class="text-sm text-gray-900 dark:text-black">Mustard</label>
            <input type="checkbox" id="category1" name="category" class="text-blue-500 form-radio" v-model="allergens">


          </div>
        </div>

        <div class="p-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Ammenities</label>
          <div class="flex space-x-4">

            <label for="1" class="text-sm text-gray-900 dark:text-black">Oven</label>
            <input type="checkbox" value="oven" class="text-blue-500 form-radio" v-model="amenities">

            <label for="2" class="text-sm text-gray-900 dark:text-black">Pan</label>
            <input type="checkbox" value="pan" class="text-blue-500 form-radio" v-model="amenities">

            <label for="3" class="text-sm text-gray-900 dark:text-black">Pot</label>
            <input type="checkbox" value="pot" class="text-blue-500 form-radio" v-model="amenities">

            <label for="4" class="text-sm text-gray-900 dark:text-black">Bowl</label>
            <input type="checkbox" value="bowl" class="text-blue-500 form-radio" v-model="amenities">

            <label for="5" class="text-sm text-gray-900 dark:text-black">Blender</label>
            <input type="checkbox" value="blender" class="text-blue-500 form-radio" v-model="amenities">




          </div>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Cuisines</label>
          <div class="flex space-x-4">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Italian</label>
            <input type="checkbox" value="Italian" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category2" class="text-sm text-gray-900 dark:text-black">Chinese</label>
            <input type="checkbox" value="Chinese" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category3" class="text-sm text-gray-900 dark:text-black">Indian</label>
            <input type="checkbox" value="Indian" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category4" class="text-sm text-gray-900 dark:text-black">French</label>
            <input type="checkbox" value="French" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category5" class="text-sm text-gray-900 dark:text-black">Mexican</label>
            <input type="checkbox" value="Mexican" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category6" class="text-sm text-gray-900 dark:text-black">Japanese</label>
            <input type="checkbox" value="Japanese" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category7" class="text-sm text-gray-900 dark:text-black">Thai</label>
            <input type="checkbox" value="Thai" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category8" class="text-sm text-gray-900 dark:text-black">Spanish</label>
            <input type="checkbox" value="Spanish" class="text-blue-500 form-radio" v-model="cuisines">

            <label for="category9" class="text-sm text-gray-900 dark:text-black">Greek</label>
            <input type="checkbox" value="Greek" class="text-blue-500 form-radio" v-model="cuisines">


          </div>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Category</label>
          <div class="flex space-x-4">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Maximum Budget</label>
            <input type="number" class="text-blue-500 form-radio" v-model="numericFields.maxBudget" @input="validateNumericField('maxBudget')">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Maximum Price per Serving</label>
            <input type="number" class="text-blue-500 form-radio" v-model="numericFields.maxServingPrice" @input="validateNumericField('maxServingPrice')">

          </div>
        </div>
      </div>
      <button type="submit"
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
import { query, collection, getDocs, where, and, or, addDoc } from "firebase/firestore"
import db from '../firebase/init.js'

export default {
  data() {
    return {
      images: [],
      allergens: [],
      conditions: [],
      data: [],
      resultRecipes: [],
      diff: [],
      array: [],
      amenities: [],
      cuisines: [],
      numericFields: {
        maxBudget: '',
        maxServingPrice: ''
      }
    }
  },
  methods: {
    // add conditions to initial filter (remember only 1 inequality is allowed [e.g. ">" or "<="])
    addCondition(conditionsArray, field, operator, value) {
      conditionsArray.push({ field, operator, value })
    },

    // filter incoming recipes based on field (e.g. "totalPrice"), number (e.g. user input), and
    // morethan (true if you want the results be more than/equal to; false if you want the results be less than/equal)
    filterNumber(field, number, morethan) {
      return this.data.filter(recipe => {
        const fieldValue = recipe.data()[field];
        return morethan ? fieldValue >= number : fieldValue <= number;
      });
    },

    async getRecipie() {

      this.conditions = []
      
      this.allergens.forEach(a => {
        this.addCondition(this.conditions, 'allergens.' + a, '==', false)
      })

      this.amenities.forEach(a => {
        this.addCondition(this.conditions, 'amenities.' + a, '==', false)
      })

      if(this.cuisines.length > 0){
        this.addCondition(this.conditions, 'cuisines', 'array-contains-any', this.cuisines)
      }

      // Connect to Firebase and apply filters
      let queryConstruct = collection(db, 'recipe')
      this.conditions.forEach(condition => {
        queryConstruct = query(queryConstruct, where(condition.field, condition.operator, condition.value))
      })

      // Retrieve data and assign it to this.data
      const q = await getDocs(queryConstruct)
      this.data = q.docs;

      console.log("Results")

      // Filter on the client-side (filter based on inequalities)
      if(this.numericFields.maxBudget > 0) {
        this.data = this.filterNumber("totalPrice", this.numericFields.maxBudget, false)
      }
      
      if(this.numericFields.maxServingPrice > 0) {
        this.data = this.filterNumber("servingPrice", this.numericFields.maxServingPrice, false)
      }

      // Print out the results
      this.data.forEach(recipe => {
        console.log(recipe.data())
      })
    },
    
    validateNumericField(fieldName) {
      this.numericFields[fieldName] = this.numericFields[fieldName] === '' || isNaN(this.numericFields[fieldName]) || this.numericFields[fieldName] < 0 ? '' : parseFloat(this.numericFields[fieldName]);
    }
  }
};



</script>
