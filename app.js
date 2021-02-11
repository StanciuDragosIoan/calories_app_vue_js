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
                    pizza: 300
                }
            ],
            mealState: {
                type: '',
                quantity: 0,
                caloriesPer100: 0
            },
            totalMeals: 0
        }
    },

    computed: {
        currentMeal(){
            return "123Meal"
        }
    },

    methods: {
        grabMeal(e){
            console.log("grab meal..");  
            const qty = this.mealState.quantity;
            const cals100 = this.mealState.caloriesPer100;
            const type  = this.mealState.type;
            const meal = this.calculateMealCalories(qty, cals100, type);
            this.meals.push(meal);
            this.totalMeals += meal.calories;
            
        },

        calculateMealCalories (qty, cals100, type) {
            console.log("calculating here..");
            const mealToAdd = {};
            const totalCalories = (qty * cals100) / 100;
            mealToAdd.food = type;
            mealToAdd.calories = totalCalories;
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
        }
    }
});

app.mount("#game");