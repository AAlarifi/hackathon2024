<template>
  <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-8 flex-col md:flex-row items-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          class="w-12 h-12 text-white p-3 bg-indigo-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-3xl">Budgeats</span>
      </a>
      <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-xl justify-center space-x-6">
        <div
          v-for="(link, index) in navLinks"
          :key="index"
          class="relative inline-block text-left"
        >
          <a
            @click.prevent="toggleDropdown(index)"
            :class="{ 'border-b-2 border-indigo-500': isDropdownOpen === index }"
            class="cursor-pointer hover:text-gray-900 transform transition-transform duration-300 hover:-translate-y-1 relative inline-block"
          >
            {{ link }}
            <div
              v-if="isDropdownOpen === index"
              class="origin-top-left absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              role="menu"
            >
              <div class="py-1" role="none">
             
                <router-link :to="'/'" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Action 1</router-link>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Action 2</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Action 3</a>
              </div>
            </div>
          </a>
        </div>
      </nav>
      <div
        class="relative inline-block text-left"
        ref="profileDropdown"
        @mouseenter="isProfileDropdownOpen = true"
      >
        

        <div
          v-if="isProfileDropdownOpen"
          @mouseleave="closeProfileDropdown"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="profile-options-menu"
        >
          
        </div>
      </div>
    </div>
  </header>




  
</template>

<script>

export default {
  data() {
    return {
      navLinks: ["Home", "Recipies", "About us", "Emergency"],
      isDropdownOpen: null,
      isProfileDropdownOpen: false,
    };
  },
  
  methods: {
    toggleDropdown(index) {
      if (this.isDropdownOpen === index) {
        this.isDropdownOpen = null;
      } else {
        this.isDropdownOpen = index;
      }
    },
    toggleProfileDropdown() {
      this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
    },
    closeProfileDropdown(event) {
      const isMouseOverButton = this.$refs.profileButton.contains(event.relatedTarget);
      const isMouseOverDropdown = this.$refs.profileDropdown.contains(event.relatedTarget);

      if (!isMouseOverButton && !isMouseOverDropdown) {
        this.isProfileDropdownOpen = false;
      }
    },
   
  },
};
</script>

<style lang="scss" scoped>
/* Add your custom styles here */
</style>
