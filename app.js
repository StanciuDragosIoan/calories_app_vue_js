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
                type: null,
                quantity: null,
                caloriesPer100: null
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
            if(
                this.mealState.quantity !== null 
                        &&
                this.mealState.caloriesPer100 !== null 
                        &&
                this.mealState.type !== null){
                const qty = this.mealState.quantity;
                const cals100 = this.mealState.caloriesPer100;
                const type  = this.mealState.type;
                const meal = this.calculateMealCalories(qty, cals100, type);
                this.meals.push(meal);
                this.totalMeals += meal.calories;
                this.mealState.type= null; 
                this.mealState.quantity= null; 
                this.mealState.caloriesPer100= null; 
            } else {
                alert('Please input something..');
            }
           
            
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
        },

        completeMeal() {
            alert("meal complete..");
        }
    }
});

app.mount("#game");