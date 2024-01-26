<template>
  <div :style="{ fontFamily: fontFamily }" class="flex flex-col items-center justify-center ">
    <button @click="toggleDarkMode" class="border mb-2 ">Toggle Dark Mode</button>
    <button @click="toggleColourBlindMode" class="border mb-2">Toggle Color Blind Mode</button>
    <button @click="toggleFontStyle" class="border mb-2">Toggle Font</button>
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
.text{
  color:white
}
</style>