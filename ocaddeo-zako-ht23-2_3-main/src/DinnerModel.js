import { getDishDetails, searchDishes, getMenuDetails } from "./dishSource";
import resolvePromise from "./resolvePromise";

/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/
export default {  // we export a JavaScript object: { p1:v1, p2:v2, method(param){ statements; }, }
    // other model properties will be initialized here in the coming lab steps 
numberOfGuests: 2,
dishes: [],
currentDish: null,

searchParams: {},
searchResultsPromiseState: {},
currentDishPromiseState: {},
getMenuDetailsPromiseState: {},

setNumberOfGuests(nr) {
    if(nr < 1 || !Number.isInteger(nr)) {
        throw new Error("number of guests not a positive integer")
    }
    this.numberOfGuests = nr;
},

addToMenu(dishToAdd){
    // array spread syntax example. Make sure you understand the code below.
    // It sets this.dishes to a new array [   ] where we spread (...) the previous value
    this.dishes= [...this.dishes, dishToAdd];
},

// filter function goes through entire array and removes the dish if its id is equal to any other dish id.
removeFromMenu(dishToRemove){
    // callback exercise! Also return keyword exercise
    function shouldWeKeepDishCB(dish){
        // Checks and returns true if dish.id is not equal to dishToRemove.id, without conversion.     
        return dish.id !== dishToRemove.id;
    }
    this.dishes= this.dishes.filter(shouldWeKeepDishCB);
},

/* 
   setting the ID of dish currently checked by the user.
   A strict MVC/MVP Model would not keep such data, 
   but we take a more relaxed, "Application state" approach. 
   So we store also abstract data that will influence the application status.
 */
setCurrentDish(id){
    if(this.currentDish != id) {
        resolvePromise(getDishDetails(id), this.currentDishPromiseState)
        this.currentDish = id;
    }
},

setSearchQuery(queryText) {
    this.searchParams.query = queryText;
},

setSearchType(type) {
    this.searchParams.type = type;
},

doSearch(searchParams) {
    resolvePromise(searchDishes(searchParams), this.searchResultsPromiseState)
},

}


