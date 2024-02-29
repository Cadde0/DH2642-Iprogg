import { BASE_URL, API_KEY } from './apiConfig.js';


export function getMenuDetails(array_of_dish_ids){ 
    const recipe_ids = array_of_dish_ids.join(','); 
    const url = `${BASE_URL}recipes/informationBulk?ids=${recipe_ids}`;
    const options = {
    	method: 'GET',
    	headers: { 
            'X-Mashape-Key': API_KEY
    	}
    };

    // Return promise
    // Fat arrow for anonymous functions. Instead of: function (response) { ... }
    return fetch(url, options)
        .then(getTheJSON_ACB)
        .catch(error => {
            console.log(error);
            throw new Error("Could not fetch menu details.")
        });
}


export function getDishDetails(id) {

    return getMenuDetails([id]).then(dishArrayToObjectACB);
}

function dishArrayToObjectACB(array) {
    console.log(array);

    if(array.length > 0 && Array.isArray(array)) {
        return array[0];
    }
    else {
        throw new Error("Could not find any dish details.")
    }
}

export function searchDishes(searchParams){
    const queryParams = new URLSearchParams();

    if (searchParams.query) {
        queryParams.append("query", searchParams.query);
    }
    
    if (searchParams.type) {
        queryParams.append("type", searchParams.type);
    }

    const url = `${BASE_URL}recipes/complexSearch?${queryParams.toString()}`;

    const options = {
    	method: 'GET',
    	headers: {
    		'X-Mashape-Key': API_KEY
    	}
    };

    return fetch(url, options)
    .then(getTheJSON_ACB)
    .then(keepJustResultArrayACB)
    .catch(error => {
        console.log(error);
        throw error;
    });
} 

function getTheJSON_ACB(response) {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Could not fetch Search details.');
    }
}

function keepJustResultArrayACB(array) {
    if(array?.results) {
        return array.results;
    } else {
        throw new Error('No results found');
    }
}