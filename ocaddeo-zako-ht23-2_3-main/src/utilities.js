function compareIngredientsCB(ingredientA, ingredientB){
    /* compare two ingredients, for sorting
       first by aisle, then by name */
    
    if (ingredientA.aisle < ingredientB.aisle) {
        return -1; // ingredientA should come before ingredientB
    } 
    else if (ingredientA.aisle > ingredientB.aisle) {
        return 1; // ingredientA should come after ingredientB
    } 
    else {
        // If the aisles are the same, compare by name 
        if(ingredientA.name < ingredientB.name) { return -1; }
        else if(ingredientA.name > ingredientB.name){ return 1; }
        else { return 0; }
    }
}

function sortIngredients(ingredients){
    /*  Use the above comparator callback to sort the given ingredient array.
        Note that sort() will change the original array. 
        To avoid that, use [...ingredients] which creates a new array and spreads the elements of the `ingredients` array.*/
    return [...ingredients].sort(compareIngredientsCB)
}

const dishTypeRanking={
    // helper object for isKnownType and dish sorting
    "starter":1,
    "main course":2,
    "dessert":3,
    "":0
};

function isKnownTypeCB(type){
    // Key (type) look up in the dishTypeRanking object and return true if found, or false if not found.
    return dishTypeRanking[type] ? true : false;
}

function dishType(dish){
    //  dish.dishTypes will contain an array of dish types, of which we have to pick one that is known. 
    if(dish.dishTypes) {
        // Array.find() is used with the callback isKnownTypeCB to find a known type
        const knownType = dish.dishTypes.find(isKnownTypeCB);
        // If a known type is found then it is returned, otherwise return an empty string
        return knownType || "";
    } 
    else {
        return ""; // Returns empty string if dishTypes property is not present
    }
}

function compareDishTypesCB(dishA, dishB){
    /* 
       Write a sort() comparator callback that compares dishes by their type, 
       so that all starters come before main courses and main courses come before desserts 
    */

    // Convert the dishTypes into integers
    const typeA = dishTypeRanking[dishType(dishA)];
    const typeB = dishTypeRanking[dishType(dishB)];

    if (typeA === "") {
        return -1;  // No type is ordered first
    }
    else if(typeB === "") {
        return 1;   // No type is ordered first
    }

    // Subtraction of the integers tells how to sort them
    // ""       --> no type
    // Negative --> sort A before B
    // Positive --> sort B before A
    // 0        --> same dishType
    return typeA - typeB;
}


function sortDishes(dishes){
    /* 
       Sort the dishes using the comparator callback above.
    */
    return [...dishes].sort(compareDishTypesCB);
}

/* 
   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
//Use map() and forEach() to calculate a shoppingList of ingredients, out of a dish array
function shoppingList(dishes){
    const result={}; // object used as mapping between ingredient ID and ingredient object

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays= dishes.map(keepJustIngredientsCB);
    const allIngredients= arrayOfIngredientArrays.flat();    
    allIngredients.forEach(ingredientCB);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}


function menuPrice(dishesArray){
    /* Given a dish array, calculate their total price with a map-reduce callback exercise */
    function dishPriceCB(dish) {
        // returns the price per serving for the dish
        return dish.pricePerServing;
    }
    
    function priceAccCB(dishPrice, acc) {
        // adds the price of a dish with an accumalator
        return dishPrice + acc;
    }
    
    const prices = dishesArray.map(dishPriceCB);
    return prices.reduce(priceAccCB, 0);
}


/*
  At this point, all of TW1.1 tests should pass!
*/


export {compareIngredientsCB, sortIngredients, isKnownTypeCB, dishType, sortDishes, shoppingList, menuPrice };

/*
  Optional: once you are done with the whole TW1, 
  if you want to learn more functional programming, you may want to rewrite shoppingList(dishes) 
  The unit tests will help you determine if your code is equivalent with the above.

  Problem: ingredientCB is not a pure function because it has a side effect: it changes the result object. 
  Instead, you can use reduce to produce the result object.

  allIngredients.reduce(amountReducerCB, {}), i.e. use an object as accumulator.
  
  To create new objects in the reducer CB, you can use either spread syntax {...object, other:property}  or Object.assign() 

  shoppingList() then becomes:
  return Object.values(dishes.map(callback1).flat().reduce(amountReducerCB, {}))
  
  And you can even move both callback definitions outside shoppingList() . Creating functions inside functions is more expensive 
  because the new function object is re-created and interpreted every time the enclosing function runs.
*/

