import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getDatabase, ref, get, set} from "firebase/database";
import { getAuth} from "firebase/auth";

const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH="standings";


function modelToPersistence(model){
    return{
        //standings: model.standings.map(transformerCB),
        sortOption: model.sortOption,
    }
}

function persistenceToModel(data, model){
    // Set default values if data is falsy
    if (!data) {
        //model.standings = [];
        model.sortOption = "Points"
        // Resolve to the updated model immediately as there are no asynchronous operations
        return Promise.resolve(model);
    } else {
        // Use data from Firebase or fallback to defaults
        //model.setStandings();
        model.setSortBy(data.sortOption)
    }
}

function saveToFirebase(model){
    if(model.ready){
        set(ref(db, PATH), modelToPersistence(model))
    }
}

function readFromFirebase(model) {
    model.ready = false;
    return get(ref(db, PATH))
        .then(function(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        })
        .then(function() {
            model.ready = true;
        })
        .catch(function(error) {
            console.error("Error reading from Firebase:", error);
            model.ready = true; // Ensure ready is set back to true even in case of error
        });
}

function connectToFirebase(model, watchFunction) {
    // Read the model from Firebase when the app starts
    readFromFirebase(model).then(function() {
        console.log("Model read from Firebase at startup.");
    }).catch(function(error) {
        console.error("Error reading model from Firebase at startup:", error);
    });

    // Function to combine the watched properties
    function combineModelProperties() {
        return [/*model.standings,*/ model.sortOption];
    }

    // Function to save the model to Firebase when watched properties change
    function saveModelOnChange() {
        saveToFirebase(model);
    }

    // Set up a watch to observe changes in the model's properties
    watchFunction(combineModelProperties, saveModelOnChange);
}

//auth test

export const auth = getAuth(app);
export default connectToFirebase;