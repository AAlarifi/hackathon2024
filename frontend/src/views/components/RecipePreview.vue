<template>
  <div class="w-4/5 md:w-1/2 border rounded-xl p-5 flex flex-col md:flex-row">
    <div class="md:w-1/3 p-1 flex justify-center content-center">
      <img :src="image" class="recipe-image rounded-xl w-2/3" alt="Meal Image">
    <!-- object-cover -->
    </div>
    <div class="md:w-2/3 p-4 flex flex-col text-center md:text-left">
      <h2 class="font-semibold">{{title}}</h2>
      <p class="mb-2">{{shortDescription}}</p>
      <div class="flex flex-row justify-center md:justify-end
                  content-end mt-2 md:self-end">
        <!-- eslint-disable-next-line max-len -->
        <button type="button" class="w-2/3 md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Read more...</button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      shortDescription: '',
    };
  },
  props: {
    title: String,
    description: String,
    id: String,
    image: String,
    // Nutrition: Array,
  },
  created() {
    if (this.description && this.description.length > 100) {
      this.shortDescription = this.description.substring(0, 100) + '...';
    } else {
      this.shortDescription = this.description;
    }
    console.log('short: ', this.shortDescription);
  },
};
</script>

<style>
/* Add custom CSS for recipe images */
.recipe-image {
  object-fit: cover; /* Maintain aspect ratio */
  max-width: 100%; /* Maximum width, adjust as needed */
  max-height: 140px; /* Maximum height, adjust as needed */
  min-width: 100px; /* Minimum width, adjust as needed */
  min-height: 100px; /* Minimum height, adjust as needed */
}
</style>
