<template>
<div>
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <p>P</p>
  <button @click="toggleDarkMode">Toggle Dark Mode</button>
  <button @click="toggleColourBlindMode">Toggle Color Blind Mode</button>
</div>
</template>

<script>
import viewModeService from '../services/darkMode.service.js'
import '../assets/accessabilityMode.css';
export default {
  data() {
    return {
      isDarkModeEnabled: false,
      isColorBlindModeEnabled: false,
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDarkModeEnabled = !this.isDarkModeEnabled;
      viewModeService.toggleDarkMode();
      this.updateBodyClass();
    },
    toggleColourBlindMode() {
      this.isColorBlindModeEnabled = !this.isColorBlindModeEnabled;
      viewModeService.toggleColourBlindMode();
      this.updateBodyClass();
    },
    updateBodyClass() {
      document.body.classList.toggle('dark-mode', this.isDarkModeEnabled);
      document.body.classList.toggle('color-blind-mode', this.isColorBlindModeEnabled);
    },
  },
};
</script>

<style>
@import '../assets/accessabilityMode.css';
</style>