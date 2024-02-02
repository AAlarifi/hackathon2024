<script>
export default {
  data() {
    return {
      selectedElements: [],
    };
  },
  props: {
    category: String,
    categoryElements: Array,
  },
  methods: {
    getSelectedElements() {
      this.$emit('getSelectedElements', this.selectedElements);
    },
  },
};
</script>

<template>
  <div>
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
      Filter by {{ this.category }}
    </label>
    <div class="flex space-x-4">
      <template v-for="element in this.categoryElements" v-bind:key="element">
        <label :for="`category${element}`"
            class="text-sm text-gray-900 dark:text-black">
          {{ element }}
        </label>
        <input type="checkbox"
          :value="element"
          class="text-blue-500 form-radio"
          v-model="selectedElements">
      </template>
    </div>
  </div>
</template>
