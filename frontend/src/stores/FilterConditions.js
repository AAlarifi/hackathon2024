import {defineStore} from 'pinia';

export const useFilterConditions = defineStore('filterConditions', {
  state: () => ({
    conditions: [],
    filterValues: {
      kidsFriendly: '',
      cuisines: [],
      totalTimes: [],
      numericFields: {
        maxBudget: '',
        maxServingPrice: '',
      },
      nutrition: {
        minProtein: '',
        maxProtein: '',
        minCarbs: '',
        maxCarbs: '',
        minFat: '',
        maxFat: '',
      },
    },
  }),
  getters: {
    getFilterConditions(state) {
      return state.conditions;
    },
  },
  actions: {
    replaceFilterConditions(conditions) {
      this.conditions = conditions;
    },
  },
});
