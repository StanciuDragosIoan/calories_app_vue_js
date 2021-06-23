const app = Vue.createApp({
  data() {
    return {
      meals: [],
      caloriesPer100List: [
        {
          chickenBreast: 120,
          fatPork: 180,
          lowFatPor: 150,
          turkeyBreast: 150,
          potatoes: 80,
          pizza: 300,
        },
      ],
      mealState: {
        type: null,
        quantity: null,
        caloriesPer100: null,
      },
      totalMeals: 0,
      totalProtein: 0,
      foodsList: [
        {
          id: 1,
          name: "cartof",
          nutrition: {
            calsPer100G: 80,
            proteinPer100: 3,
          },
        },

        {
          id: 2,
          name: "paine casa",
          nutrition: {
            calsPer100G: 200,
            proteinPer100: 10,
          },
        },

        {
          id: 3,
          name: "scoici",
          nutrition: {
            calsPer100G: 180,
            proteinPer100: 25,
          },
        },

        {
          id: 4,
          name: "ceafa",
          nutrition: {
            calsPer100G: 250,
            proteinPer100: 30,
          },
        },

        {
          id: 5,
          name: "protein icecream",
          nutrition: {
            calsPer100G: 270,
            proteinPer100: 30,
          },
        },
      ],
    };
  },

  computed: {
    currentMeal() {
      return "123Meal";
    },
  },

  mounted() {
    const tempMeals = JSON.parse(localStorage.getItem("totalMeals"));
    const tempCals = JSON.parse(localStorage.getItem("totalCals"));
    const tempProtein = JSON.parse(localStorage.getItem("totalProtein"));

    if (tempMeals && tempCals && tempProtein) {
      tempMeals.forEach((i) => this.meals.push(i));
      this.totalMeals = tempCals;
      this.totalProtein = tempProtein;
    }
  },
  methods: {
    grabMeal(e) {
      if (
        this.mealState.quantity !== null &&
        this.mealState.caloriesPer100 !== null &&
        this.mealState.type !== null
      ) {
        const qty = this.mealState.quantity;
        const cals100 = this.mealState.caloriesPer100;
        const type = this.mealState.type;
        const meal = this.calculateMealCalories(qty, cals100, type);
        this.meals.push(meal);
        this.totalMeals += meal.calories;
        this.totalProtein += meal.protein;
        this.mealState.type = null;
        this.mealState.quantity = null;
        this.mealState.caloriesPer100 = null;
        localStorage.setItem("totalMeals", JSON.stringify(this.meals));
        localStorage.setItem("totalCals", JSON.stringify(this.totalMeals));
        localStorage.setItem("totalProtein", JSON.stringify(this.totalProtein));
      } else {
        alert("Please input something..");
      }
    },

    checkMeal(input) {
      const filtereInput = input.toLowerCase();
      const filterAr = this.foodsList.map((i) => i.name);
      console.log(filterAr);
      if (filterAr.includes(filtereInput)) {
        const output = this.foodsList.filter((i) => i.name === filtereInput);
        const objToReturn = { ...output[0].nutrition };
        return objToReturn;
      } else {
        return null;
      }
    },

    calculateMealCalories(qty, cals100, type) {
      const nutritionItem = this.checkMeal(type);
      const mealToAdd = {};
      let totalCalories;
      let totalProtein = 0;
      if (nutritionItem !== null) {
        console.log(nutritionItem);
        totalCalories = (qty * nutritionItem.calsPer100G) / 100;
        totalProtein = (qty * nutritionItem.proteinPer100) / 100;
      } else {
        totalCalories = (qty * cals100) / 100;
      }

      // console.log(totalCalories)
      mealToAdd.food = type;
      mealToAdd.calories = totalCalories;
      mealToAdd.protein = totalProtein;
      console.log(mealToAdd);
      return mealToAdd;
    },

    grabType(e) {
      this.mealState.type = e.target.value;
    },

    grabQuantity(e) {
      this.mealState.quantity = e.target.value;
    },

    grab100(e) {
      this.mealState.caloriesPer100 = e.target.value;
    },

    clearMeals() {
      localStorage.clear();
      window.location.reload();
    },
  },
});

app.mount("#game");
