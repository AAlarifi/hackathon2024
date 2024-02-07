<template>
  <div class="flex items-center justify-center h-screen ">
    <form class="w-full ml-10 mr-10 mb-20" @submit.prevent="getRecipe">
      <!-- Search Input -->
      <label for="default-search" class="mb-2 text-sm font-medium
        text-gray-900 sr-only dark:text-black">Search</label>
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex
          items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input type="search" id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border
          border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
          focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
          dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500
          dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos...">
        <button type="submit"
          class="text-black absolute end-2.5 bottom-2.5 bg-blue-700
          hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
          font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
          dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      <!-- <img v-for="(image, index) in images"
        :key="index" :src="image" alt="Recipe Image"> -->

      <!-- Filter Options -->
      <div class="mt-8">
        <!-- eslint-disable -->
        <Checkboxes ref="allergensComponent" category="Allergens"
          :categoryElements="['peanuts', 'fish', 'milk', 'soy', 'wheat', 'sesame', 'mustard', 'eggs']"
          @getSelectedElements="addSelectedElementsToEqualsCondition('allergens', $event, false)" />
        <Checkboxes ref="amenitiesComponent" category="Amenities"
          :categoryElements="['oven', 'pan', 'pot', 'bowl', 'blender']"
          @getSelectedElements="addSelectedElementsToEqualsCondition('amenities', $event, false)" />
        <Checkboxes ref="dietsComponent" category="Diets"
          :categoryElements="['vegan', 'vegetarian', 'keto', 'gluten-free', 'pescatarian', 'halal']"
          @getSelectedElements="addSelectedElementsToArrayContainsAnyCondition('diets', $event)" />
        <Checkboxes ref="cuisinesComponent" category="Cuisines"
          :categoryElements="['Italian', 'Chinese', 'Indian', 'French', 'Mexican', 'Japanese', 'Thai', 'Spanish', 'Greek']" />
          <!-- @getSelectedElements="addSelectedElementsToEqualsCondition('cuisine', $event, '==')" -->
        <Checkboxes ref="difficultyComponent" category="Difficuly" 
          :categoryElements="['easy', 'medium', 'hard']"
          @getSelectedElements="addSelectedElementsToInCondition('difficulty', $event)" />
        <Checkboxes ref="servingSizeComponent"
          category="Serving Size" :categoryElements="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]"
          @getSelectedElements="addSelectedElementsToInCondition('servingSize', $event)" />
        <!-- NEEEED TO DO CUISINES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DECIDE WHETHER WE WANT ONLY 1 CUISINE PER MEAL OR MULTIPLE (IF ONE WE CAN DO IT ON FIREBASE FILTER, IF MORE THEN CLIENT SIDE! -->
        <!-- eslint-enable -->
        <div>
          <label for="kidsFriendly">Kids friendly:</label>
          <select name="kidsFriendly" id="kidsFriendly"
            v-model="filterValues.kidsFriendly">
            <option value="">N/A</option>
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium
          text-gray-900 dark:text-black">Filter by Total Time</label>
          <div class="flex space-x-4">
            <template :key="totalTime.value"
                v-for="totalTime in [{ 'label': 'Short(<30mins)', 'value': 30 },
                { 'label': 'Medium(<1h15mins)', 'value': 75 },
                { 'label': 'Long(<2h)', 'value': 120 },
                { 'label': 'Extra Long(>2h)', 'value': 121 }]">
              <label :for="`category${totalTime.label}`"
                class="text-sm text-gray-900 dark:text-black">
                {{ totalTime.label }}
              </label>
              <input type="checkbox"
                :value="totalTime.value"
                class="text-blue-500 form-radio"
                v-model="filterValues.totalTimes">
            </template>
          </div>
        </div>

        <div>
          <label for="points">Total Time</label>
          <input type="range" id="points" name="points" min="0" max="600">
        </div>

        <!-- eslint-disable -->
        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Pricing</label>
          <div class="flex space-x-4">
            <NumericInput name="Maximum Budget" @getInputNumber="updateNumericValue('numericFields', 'maxBudget', $event)" />
            <NumericInput name="Maximum Price per Serving" @getInputNumber="updateNumericValue('numericFields', 'maxServingPrice', $event)" />
          </div>
        </div>

        <div>
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Filter by Nutrition</label>
          <div class="flex space-x-4">
            <NumericInput name="Minimum Protein" @getInputNumber="updateNumericValue('nutrition', 'minProtein', $event)" />
            <NumericInput name="Maximum Protein" @getInputNumber="updateNumericValue('nutrition', 'maxProtein', $event)" />
          </div>
          <div class="flex space-x-4">
            <NumericInput name="Minimum Carbohydrates" @getInputNumber="updateNumericValue('nutrition', 'minCarbs', $event)" />
            <NumericInput name="Maximum Carbohydrates" @getInputNumber="updateNumericValue('nutrition', 'maxCarbs', $event)" />
          </div>
          <div class="flex space-x-4">
            <NumericInput name="Minimum Fat" @getInputNumber="updateNumericValue('nutrition', 'minFat', $event)" />
            <NumericInput name="Maximum Fat" @getInputNumber="updateNumericValue('nutrition', 'maxFat', $event)" />
          </div>
        </div>
      </div>
      <!-- eslint-enable -->
      <button type="submit"
        class="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm
        px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700
        dark:focus:ring-blue-800">Submit</button>
    </form>
  </div>
</template>

<script>
import Checkboxes from './components/CheckboxFilterCategory.vue';
import NumericInput from './components/NumericFilterCategory.vue';
import {useFilterConditions} from '../stores/FilterConditions';
// import {ref} from 'vue';

export default {
  data() {
    return {
      conditionsStore: 'ref(null)',
      selectedElements: [],
      images: [],
      conditions: [],
      data: [],
      filterValues: {
        kidsFriendly: '',
        cuisines: [],
        totalTimes: [],
        numericFields: {
          maxBudget: '',
          maxServingPrice: '',
        },
        nutrition: {
          minProtein: '',
          maxProtein: '',
          minCarbs: '',
          maxCarbs: '',
          minFat: '',
          maxFat: '',
        },
      },
    };
  },
  created() {
    this.conditionsStore = useFilterConditions();
  },
  methods: {
    async getRecipe() {
      this.conditions = [];

      if (this.filterValues.kidsFriendly !== '') {
        this.addCondition('kidsFriendly',
            '==', this.filterValues.kidsFriendly);
      }

      // Change cuisines to cuisine in the database or filter on the client-side
      this.$refs.difficultyComponent.getSelectedElements();
      this.$refs.servingSizeComponent.getSelectedElements();
      this.$refs.allergensComponent.getSelectedElements();
      this.$refs.amenitiesComponent.getSelectedElements();
      this.$refs.dietsComponent.getSelectedElements();

      this.conditionsStore.replaceFilterConditions(this.conditions);

      this.$router.push({name: 'searchResults'});
    },
    // Takes selected checkboxes' values and add them to the filter condition
    addSelectedElementsToEqualsCondition(field, elements, value) {
      elements.forEach((e) => {
        this.addCondition(field + '.' + e, '==', value);
      });
    },
    addSelectedElementsToArrayContainsAnyCondition(field, elements) {
      if (elements.length > 0) {
        this.addCondition(field, 'array-contains-any', elements);
      }
    },
    addSelectedElementsToInCondition(field, elements) {
      if (elements.length > 0) {
        this.addCondition(field, 'in', elements);
      }
    },
    // add condition to FB filter (only 1 inequality is allowed e.g.">" or "<=")
    addCondition(field, operator, value) {
      this.conditions.push({field, operator, value});
    },
    updateNumericValue(category, key, value) {
      // this.filterValues[category][key] = value === '' ||
      //     isNaN(value) || value < 0 ? '' : parseFloat(value);
      this.conditionsStore.filterValues[category][key] = value;
    },
  },
  components: {
    Checkboxes,
    NumericInput,
  },
};
</script>
