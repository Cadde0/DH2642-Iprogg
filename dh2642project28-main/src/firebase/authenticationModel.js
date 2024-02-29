import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth} from "./firebaseModel";
//import favTeamModel from "../model/favTeamModel";
//import { observable, configure, reaction } from "mobx";
//import connectFavTeamsToFirebase from "./favTeamsFireabaseModel";

//const reactiveFavTeamModel = observable(favTeamModel);

export default{
    username : null,
    password : null,
    UID : null,

    setUsername(username){
        this.username = username
    },

    setPassword(password){
        this.password = password
    },

    setUID(uid){
        this.UID = uid
    },

    clearUID(){
        this.UID = null
    },

    getUID(){
        return this.UID;
    },

    async LogIn() {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, this.username, this.password);
            console.log("Logged in as: ", userCredential.user.email);
            //connectFavTeamsToFirebase(reactiveFavTeamModel, reaction);
        } catch (error) {
            console.log("Incorrect username or password, error:", error);
            // Optionally clear the UID if login fails
            this.clearUID();
        }
    },
    

    RegisterUser(){
        createUserWithEmailAndPassword(auth, this.username, this.password)
        .then(function(userCredential){
            console.log("User created with username: ", userCredential.user.email)
        })
        .catch(function(error){
            console.log("Failed to register, error:", error)
        })
    },

    async logOut() {
        try {
            await signOut(auth);
            console.log("Logged out");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    },
    

    testUser(){
            console.log("current uid", this.UID)
    }
}