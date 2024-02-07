<template>
  <div>
    <div v-if="isLoading" class="flex flex-col items-center">
      <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- eslint-disable -->
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          <!-- eslint-enable -->
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
      <span>Loading posts...</span>
    </div>
    <div class="flex flex-col items-center">
    <ul v-if="recipes.length > 0">
      <li v-for='recipe in recipes' :key='recipe.id' class="list-none">
        <RecipePreview
            :image="recipe.image"
            :title="recipe.title"
            :description="recipe.des"
            :id="recipe.id"
            class="w-4/5 md:w-3/4 mx-auto mb-2"/>
      </li>
    </ul>
    </div>
  </div>
</template>
<script>
import {useFilterConditions} from '../stores/FilterConditions';
import {filterNumber, filterArrayOfNumbers} from '../services/filters';
import {query, collection, getDocs, where} from 'firebase/firestore';
import db from '../firebase/init.js';
import RecipePreview from './components/RecipePreview.vue';

export default {
  data() {
    return {
      conditions: [],
      isLoading: true,
      error: null,
      recipes: [],
    };
  },
  async created() {
    this.isLoading = true;
    const conditionsStore = useFilterConditions();
    this.conditions = conditionsStore.getFilterConditions;

    // Connect to Firebase and apply filters
    let queryConstruct = collection(db, 'recipe');
    this.conditions.forEach((condition) => {
      queryConstruct = query(queryConstruct,
          where(condition.field, condition.operator, condition.value));
    });

    // Retrieve data and assign it to this.data
    const q = await getDocs(queryConstruct);
    this.recipes = q.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // spreads all fields from document data into the object
    }));


    console.log('Results');

    // Filter on the client-side (filter based on inequalities)
    this.recipes = filterNumber(this.recipes, 'totalPrice',
        conditionsStore.filterValues.numericFields.maxBudget, false);
    this.recipes = filterNumber(this.recipes, 'servingPrice',
        conditionsStore.filterValues.numericFields.maxServingPrice, false);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'protein',
        conditionsStore.filterValues.nutrition.minProtein, true);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'protein',
        conditionsStore.filterValues.nutrition.maxProtein, false);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'carbs',
        conditionsStore.filterValues.nutrition.minCarbs, true);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'carbs',
        conditionsStore.filterValues.nutrition.maxCarbs, false);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'fats',
        conditionsStore.filterValues.nutrition.minFat, true);
    this.recipes = filterArrayOfNumbers(this.recipes, 'nutrition', 'fats',
        conditionsStore.filterValues.nutrition.maxFat, false);

    this.isLoading = false;
    // Print out the results
    this.recipes.forEach((recipe) => {
      console.log(recipe); // recipe.data() instead of mapping
    });
  },
  components: {
    RecipePreview,
  },
};
</script>
