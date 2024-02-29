import { BASE_URL } from "../apiCalls";

function getResponseACB(response){
    if(response.status !== 200){
        throw new Error("This is the error " + response.status)
    }
    return response.json();
}

function getResultACB(result){
    return result;
}

//TODO: Do I need this?
function arrayToObjectACB(array){
    console.log(array)
    return array[0];
}

function getStandings(){
    return fetch(BASE_URL+"standings/now",{
        method: 'GET',
    }
    )
    .then(getResponseACB)
    .then(getResultACB);
}

export {getStandings}