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
          <checkboxes ref="allergensComponent" category="Allergens" :categoryElements="['peanuts', 'fish', 'milk', 'soy', 'wheat', 'sesame', 'mustard', 'eggs']" @getSelectedElements="addSelectedElementsToEqualsCondition('allergens', $event, false)"/>
        </div>

        <div>
          <checkboxes ref="amenitiesComponent" category="Amenities" :categoryElements="['oven', 'pan', 'pot', 'bowl', 'blender']" @getSelectedElements="addSelectedElementsToEqualsCondition('amenities', $event, false)"/>
        </div>

        <div>
          <checkboxes ref="dietsComponent" category="Diets" :categoryElements="['vegan', 'vegetarian', 'keto', 'gluten-free', 'pescatarian', 'halal']" @getSelectedElements="addSelectedElementsToArrayContainsAnyCondition('diets', $event)"/>
        </div>

        <div>
          <checkboxes ref="cuisinesComponent" category="Cuisines" :categoryElements="['Italian', 'Chinese', 'Indian', 'French', 'Mexican', 'Japanese', 'Thai', 'Spanish', 'Greek']"/> <!-- @getSelectedElements="addSelectedElementsToEqualsCondition('cuisine', $event, '==')" -->
        </div>

        <div>
          <checkboxes ref="difficultyComponent" category="Difficuly" :categoryElements="['easy', 'medium', 'hard']" @getSelectedElements="addSelectedElementsToInCondition('difficulty', $event)"/>
        </div>

        <div>
          <label for="kidsFriendly">Kids friendly:</label>
          <select name="kidsFriendly" id="kidsFriendly" v-model="filterValues.kidsFriendly">
            <option value="">N/A</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>

        <div>
          <checkboxes ref="servingSizeComponent" category="Serving Size" :categoryElements="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]" @getSelectedElements="addSelectedElementsToInCondition('servingSize', $event)"/>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Total Time</label>
          <div class="flex space-x-4">
            <template v-for="totalTime in [{'label': 'Short(<30mins)', 'value': 30}, {'label': 'Medium(<1h15mins)', 'value': 75}, {'label': 'Long(<2h)', 'value': 120}, {'label': 'Extra Long(>2h)', 'value': 121}]">
              <label :for="`category${totalTime.label}`" class="text-sm text-gray-900 dark:text-black">{{ totalTime.label }}</label>
              <input type="checkbox" :value="totalTime.value" class="text-blue-500 form-radio" v-model="totalTimes">
            </template>
          </div>
        </div>

        <div>
          <label for="points">Total Time</label>
          <input type="range" id="points" name="points" min="0" max="600">
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Pricing</label>
          <div class="flex space-x-4">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Maximum Budget</label>
            <input type="number" class="text-blue-500 form-radio" v-model="numericFields.maxBudget" @input="validateNumericField('maxBudget')">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Maximum Price per Serving</label>
            <input type="number" class="text-blue-500 form-radio" v-model="numericFields.maxServingPrice" @input="validateNumericField('maxServingPrice')">

          </div>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Nutrition</label>
          <div class="flex space-x-4">

            <!-- Change the v-model and validate numeric field -->
            <label for="category1" class="text-sm text-gray-900 dark:text-black">Minimum Protein</label>
            <input type="number" class="text-blue-500 form-radio" v-model="numericFields.maxBudget" @input="validateNumericField('maxBudget')">

            <label for="category1" class="text-sm text-gray-900 dark:text-black">Maximum Protein</label>
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
import checkboxes from "./components/filterCategory.vue"
import { query, collection, getDocs, where, and, or, addDoc } from "firebase/firestore"
import db from '../firebase/init.js'

export default {
  data() {
    return {
      selectedElements: [],
      images: [],
      conditions: [],
      data: [],
      totalTimes: [],
      filterValues: {
        kidsFriendly: "",
        cuisines: [],
        totalTimes: [],
        numericFields: {
          maxBudget: '',
          maxServingPrice: ''
        }
      },
      numericFields: {
        maxBudget: '',
        maxServingPrice: ''
      }
    }
  },
  methods: {
    // Takes selected checkboxes' values and add them to the filter condition
    addSelectedElementsToEqualsCondition(field, elements, value) {
      elements.forEach(e => {
        this.addCondition(this.conditions, field + '.' + e, '==', value)
      })
    },
    addSelectedElementsToArrayContainsAnyCondition(field, elements){
      if(elements.length > 0){
          this.addCondition(this.conditions, field, 'array-contains-any', elements)
      }
    },
    addSelectedElementsToInCondition(field, elements) {
      if(elements.length > 0){
        this.addCondition(this.conditions, field, 'in', elements)
      }
    },
    // add conditions to initial filter (remember only 1 inequality is allowed [e.g. ">" or "<="])
    addCondition(conditionsArray, field, operator, value) {
      conditionsArray.push({ field, operator, value }) // Think about whether it's worth to pass conditions array or directly change the this.conditions
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

      if(this.filterValues.kidsFriendly !== ""){
        this.addCondition(this.conditions, 'kidsFriendly', '==', this.filterValues.kidsFriendly)
      }

      // Change cuisines to cuisine in the database or filter on the client-side 
      this.$refs.difficultyComponent.getSelectedElements()
      this.$refs.servingSizeComponent.getSelectedElements()
      this.$refs.allergensComponent.getSelectedElements()
      this.$refs.amenitiesComponent.getSelectedElements()
      this.$refs.dietsComponent.getSelectedElements()

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
  },
  components: {
    checkboxes
  }
};



</script>
