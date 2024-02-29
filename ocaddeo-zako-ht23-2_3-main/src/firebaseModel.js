import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import firebaseConfig from "/src/firebaseConfig.js";
import { getMenuDetails } from "./dishSource.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const REF = "model";
const rf = ref(db, REF);
const PATH ="dinnerModel86";

//Dummy test
set(ref(db, PATH+"/test"), "dummy");


function modelToPersistence(model){
    const dishIDS = (model.dishes).map(transformerCB)
    dishIDS.sort((a, b) => a - b);
    console.log(dishIDS)
    
    function transformerCB(dish) {
        return dish.id;
    }

    return {
        nrOfGuests : model.numberOfGuests,
        currentDishID : model.currentDish,
        dishIdArray : dishIDS
    };
}

function persistenceToModel(data, model) {
    function saveToModelACB(dishes) {
        model.dishes = dishes;
    }

    model.setCurrentDish(data?.currentDishID || null);
    model.setNumberOfGuests(data?.nrOfGuests || 2);
    return getMenuDetails(data?.dishIdArray || []).then(saveToModelACB);
}

function saveToFirebase(model) {
    if (model.ready) {
        set(rf, modelToPersistence(model));
    }
}

async function readFromFirebase(model) {
    model.ready = false;
    const snapshot= await get(rf);
    await persistenceToModel(snapshot.val(), model);
    model.ready = true;
}

function connectToFirebase(model, watchFunction) {
    function checkACB() {
        return [model.numberOfGuests, model.currentDish, model.dishes]
    }
    function sideEffectACB() { 
        saveToFirebase(model)
    }
    readFromFirebase(model)
    watchFunction(checkACB, sideEffectACB)
}

export {modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}


export default connectToFirebase;
