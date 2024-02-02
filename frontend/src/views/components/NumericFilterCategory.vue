<script>
export default {
  data() {
    return {
      input: '',
    };
  },
  props: {
    name: String,
  },
  methods: {
    getInputNumber() {
      this.input = this.input === '' || isNaN(this.input) ||
                    this.input < 0 ? '' : parseFloat(this.input);
      this.$emit('getInputNumber', this.input);
    },
  },
};
</script>

<template>
  <div>
    <label for="category1"
      class="text-sm text-gray-900 dark:text-black mr-3">
      {{ this.name }}
    </label>
    <input type="number"
        step="0.01"
        class="text-blue-500 form-radio"
        v-model="input"
        @input="getInputNumber">
  </div>
</template>
