// filter incoming recipes based on field (e.g. "totalPrice"),
// number (e.g. user input), and morethan (true if you want the results
// be more than/equal to; false if you want the results be less than/equal)
/**
 * Filters recipes data based on requirements
 *
 * @param {Array} data - Data containing all recipes.
 * @param {string} field - Field name in the database.
 * @param {number} value - Comparing value (e.g. user input).
 * @param {boolean} morethan - True for greater than, false otherwise.
 * @return {Array} - An array of filtered recipes.
 */
export function filterNumber(data, field, value, morethan) {
  if (value > 0) {
    return data.filter((recipe) => {
      const fieldValue = recipe.data()[field];
      console.log(recipe.data()[field]);
      return morethan ? fieldValue >= value : fieldValue <= value;
    });
  } else {
    return data;
  }
}

/**
 * Filters recipes data based on requirements
 *
 * @param {Array} data - Data containing all recipes.
 * @param {string} arrayName - Name of the array field in the recipe data.
 * @param {string} field - Field name within the array.
 * @param {number} value - Comparing value (e.g. user input).
 * @param {boolean} morethan - True for greater than, false otherwise.
 * @return {Array} - An array of filtered recipes.
 */
export function filterArrayOfNumbers(data, arrayName, field, value, morethan) {
  if (value > 0) {
    return data.filter((recipe) => {
      if (recipe.data()[arrayName]) {
        const fieldValue = recipe.data()[arrayName][field];
        return morethan ? fieldValue >= value : fieldValue <= value;
      }
    });
  } else {
    return data;
  }
}
