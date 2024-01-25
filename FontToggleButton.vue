<template>
    <div>
      <button v-for="font in fonts" :key="font" @click="toggleFont(font)" class="font-button">
        {{ font }}
      </button>
    </div>
  </template>
  
  <style scoped>
  .font-button {
    margin-top: 15px;
    display: block;
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        selectedFont: 'Default', // Default font
        fonts: ['Default', 'Sans-serif', 'Comic Sans', 'Arial', 'Times New Roman', 'Verdana', 'OpenDyslexic', 'Courier New', 'Georgia', 'Tahoma', 'Impact']
      };
    },
    methods: {
      toggleFont(font) {
        this.selectedFont = font;
        document.body.style.fontFamily = font; // Set the font for the entire page
        // You can apply the font to specific elements if needed
      }
    }
  };
  </script>
  