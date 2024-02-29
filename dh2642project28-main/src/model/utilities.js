import teamsModel from './teamsModel.js';

function sortBydivisionCB(teamA, teamB){ // Corrected the typo here
    if(divisionRanking[teamA.divisionAbbrev] > divisionRanking[teamB.divisionAbbrev]){
        return 1;
    }
    if(divisionRanking[teamA.divisionAbbrev] < divisionRanking[teamB.divisionAbbrev]){
        return -1;
    }
    else return 0;
}

function sortByCB(teamA, teamB, sortBy){
    if(teamA[sortBy] < teamB[sortBy]){
        return 1;
    }
    if(teamA[sortBy] > teamB[sortBy]){
        return -1;
    }
    return 0;
}

const divisionRanking={
    //E
    "A":1,
    "M":2,
    //W
    "C":3,
    "P":4,
}

//TODO: create some functions that filters and sorts the teams in standings



const getWeekDay = (date) => {
    const dayDate = new Date(date);
    const dayNr = dayDate.getDay();
    const days = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];
    return days[dayNr];
};


export {sortBydivisionCB as sortStandingsTeamsCB, sortByCB, getWeekDay,}

