<template>
    <main>
      <TheWelcome />
      <div>
        <h2 :style="{ fontFamily: selectedFont }">Filtered Recipes</h2>
        <div v-if="recipes.length === 0">No recipes found</div>
        <div v-else>
          <div v-for="recipe in recipes" :key="recipe.id" :style="{ fontFamily: selectedFont }">
            <h3>{{ recipe.name }}</h3>
            <p>Difficulty: {{ recipe.diff }}, Serving Size: {{ recipe.servingSize }}</p>
            <!-- Display other recipe details as needed -->
          </div>
        </div>
      </div>
      <FontToggleButton @fontToggled="onFontToggled" />
    </main>
  </template>
  
  <script>
  import TheWelcome from './components/TheWelcome.vue';
  import FontToggleButton from './components/FontToggleButton.vue';
  
  export default {
    components: {
      TheWelcome,
      FontToggleButton,
    },
    data() {
      return {
        selectedFont: 'Arial', // Set a default font
        recipes: [], // Your recipe data
      };
    },
    methods: {
      onFontToggled(font) {
        this.selectedFont = font;
      },
      // Your existing methods for fetching recipes
    },
  };
  </script>
  