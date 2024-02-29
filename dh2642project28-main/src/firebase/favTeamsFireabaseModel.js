import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getDatabase, ref, get, set} from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function getPathForUser(uid) {
    return `favoriteTeams/${uid}`;
}

function modelToPersistence(model) {
    return {
        favTeams: model.favTeams
    };
}

function persistenceToModel(data, model) {
    if (!data) {
        model.favTeams = [];
        return Promise.resolve(model);
    } else {
        model.favTeams = data.favTeams || [];
    }
}

function saveToFirebase(model) {
    if (model.ready) {
        const path = getPathForUser(model.uid);
        set(ref(db, path), modelToPersistence(model));
    }
}

function readFromFirebase(model) {
    model.ready = false;
    const path = getPathForUser(model.uid);

    return get(ref(db, path))
        .then(function(snapshot) {
            return persistenceToModel(snapshot.val(), model);
        })
        .then(function() {
            model.ready = true;
        })
        .catch(function(error) {
            console.error("Error reading from Firebase:", error);
            model.ready = true;
        });
}

function connectFavTeamsToFirebase(model, watchFunction) {
    model.ready = false;
    readFromFirebase(model).then(function() {
        console.log("Model read from Firebase at startup.");
        function combineModelProperties() {
            return [model.favTeams, model.uid];
        }
        function saveModelOnChange() {
            if(!model.uid){
                console.log("not logged in")
            }
            if (model.ready && !model.preventSave && model.uid) { 
                saveToFirebase(model);
                console.log("saving to fb on change", model.favTeams)
            }
        }
        watchFunction(combineModelProperties, saveModelOnChange);
        model.ready = true;
    }).catch(function(error) {
        console.error("Error reading model from Firebase at startup:", error);
        model.ready = true; 
    });
}


export default connectFavTeamsToFirebase;