import { auth} from "../firebase/firebaseModel";

export default {
    favTeams: [],
    uid: null,
    preventSave: false,
    //currentUser: auth.currentUser,

    setPreventSave(value){
        this.preventSave = value
    },

    addFavTeam(team) {
        if (!this.favTeams.includes(team) && this.uid) {
            this.favTeams = [...this.favTeams, team];
            //this.uid = auth.currentUser.uid;
            console.log("user:", this.uid,"fav teams", this.favTeams);
        } else{
            console.log("already added or not logged in");
        } 
    },

    removeFavTeam(team) {
        if (this.favTeams.includes(team)) {
            this.favTeams = this.favTeams.filter(function(t) {
                return t !== team;
            });
            console.log(`Team ${team} removed from favorites.`);
        } else {
            console.log(`Team ${team} not found in favorites.`);
        }
    },

    clearFavTeams() {
        this.preventSave = true;
        this.favTeams = [];
        console.log("Favorite teams cleared");
        //this.preventSave = false;
    },

    clearUid(){
        this.uid = null
    },

    setUid(){
        this.uid = auth.currentUser.uid;
        console.log("uid set to", this.uid)
    }
};
