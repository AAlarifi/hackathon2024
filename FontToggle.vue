<!-- src/components/FontToggle.vue -->

<template>
  <div>
    <h1 :style="{ fontFamily: currentFontStyle }">Toggle Font Example</h1>
    <!-- Toggle button -->
    <button @click="toggleFontStyle">Toggle Font</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentFontStyle: 'Arial, sans-serif',
      alternateFontStyle: 'Georgia, serif'
    };
  },
  methods: {
    toggleFontStyle() {
      this.currentFontStyle =
        this.currentFontStyle === 'Arial, sans-serif'
          ? this.alternateFontStyle
          : 'Arial, sans-serif';
    }
  }
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
