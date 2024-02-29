import { getStandings } from "./standingsApi";
import resolvePromise from "./resolvePromise";
import { sortStandingsTeamsCB, sortByCB } from "./utilities";
export default{
    standings: [],
    standingsPromiseState: {},
    atlanticStandings: [],
    metropolitanStandings: [],
    centralStandings: [],
    pacificStandings: [],
    sortOption: "Points",

    //TODO: create an object that contains only necessary information and pass instead of standings
    
    //Old setTimeOut approach
    /* setStandings(sortBy){
        resolvePromise(getStandings(), this.standingsPromiseState)
        setTimeout(() => {
            this.standings = this.standingsPromiseState.data.standings
            this.standings.sort(sortStandingsTeamsCB)

            this.atlanticStandings = this.standings.slice(0, 8);
            this.metropolitanStandings = this.standings.slice(8, 16);
            this.centralStandings = this.standings.slice(16, 24);
            this.pacificStandings = this.standings.slice(24, 32);
            if(sortBy !== "choose:" || null){
                this.atlanticStandings.sort(function(a, b) { return sortByCB(a, b, sortBy); });
                this.metropolitanStandings.sort(function(a, b) { return sortByCB(a, b, sortBy); });
                this.centralStandings.sort(function(a, b) { return sortByCB(a, b, sortBy); });
                this.pacificStandings.sort(function(a, b) { return sortByCB(a, b, sortBy); });
            }
          }, "1000");

    },
    */


    async setStandings() {
        await resolvePromise(getStandings(), this.standingsPromiseState);
    
        this.standings = this.standingsPromiseState.data.standings;
    
        this.standings.sort(sortStandingsTeamsCB);
        this.atlanticStandings = this.standings.slice(0, 8);
        this.metropolitanStandings = this.standings.slice(8, 16);
        this.centralStandings = this.standings.slice(16, 24);
        this.pacificStandings = this.standings.slice(24, 32);

        this.sortStandings(this.sortOption)
    },

    setSortBy(sortBy) {
        this.sortOption = sortBy;
        this.sortStandings(this.sortOption)
    },

    sortStandings(sortBy){
        if (sortBy !== "choose:" && sortBy !== null) {
            this.atlanticStandings = this.atlanticStandings.slice().sort(function(a, b) { return sortByCB(a, b, sortBy); });
            this.metropolitanStandings = this.metropolitanStandings.slice().sort(function(a, b) { return sortByCB(a, b, sortBy); });
            this.centralStandings = this.centralStandings.slice().sort(function(a, b) { return sortByCB(a, b, sortBy); });
            this.pacificStandings = this.pacificStandings.slice().sort(function(a, b) { return sortByCB(a, b, sortBy); });
        }
    }
    
    


    //TODO: create a function that maps the information in standings to the newly created object
}