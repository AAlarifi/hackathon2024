<template>
  <div :style="{ fontFamily: fontFamily }">
    <button @click="toggleDarkMode">Toggle Dark Mode</button>
    <button @click="toggleColourBlindMode">Toggle Color Blind Mode</button>
    <button @click="toggleFontStyle">Toggle Font</button>
    <h1>H1</h1>
    <h2>H2</h2>
    <h3>H3</h3>
    <p>this is smaple text.</p>
  </div>
</template>

<script>
import viewModeService from '../services/darkMode.service.js'
import '../assets/accessabilityMode.css';
// import FontToggleButton from '../components/FontToggle.vue';
import { toggleFontStyle, getCurrentFontStyle } from '../services/fontManager.service';
export default {
  data() {
    return {
      isDarkModeEnabled: false,
      isColorBlindModeEnabled: false,
    };
  },
  computed: {
    fontFamily() {
      return getCurrentFontStyle();
  }},
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
    toggleFontStyle() {
      toggleFontStyle();
    },
  },
};
</script>

<style>
@import '../assets/accessabilityMode.css';
</style>