// TeamClass.js
export default class TeamClass {
    constructor() {
      this.name = null;
      this.teamAbbrev = null;
      this.logoURL = null;
      this.roster = {
        forwards: [],
        defensemen: [],
        goalies: [],
      };
      this.gamesPlayed = null;
      this.wins = null;
      this.ties = null;
      this.losses = null;
      this.points = null;
      this.goalDifferential = null;
      this.goalAgainst = null;
      this.goalFor = null;
      this.conferenceName = null;
      this.conferenceAbbrev = null;
      this.divisionName = null;
      this.divisionAbbrev = null;
    }
  
    async setName(name) {
      this.name = name;
      return this.name;
    }
  
    async setLogoURL(logoURL) {
      this.logoURL = logoURL;
      return this.logoURL;
    }
  
    async setTeamAbbrev(abbr) {
      this.teamAbbrev = abbr;
      return this.teamAbbrev;
    }
  
    async setGamesPlayed(gamesPlayed) {
      this.gamesPlayed = gamesPlayed;
    }
  
    async setWins(wins) {
      this.wins = wins;
    }
  
    async setTies(ties) {
      this.ties = ties;
    }
  
    async setLosses(losses) {
      this.losses = losses;
    }
  
    async setPoints(points) {
      this.points = points;
    }
  
    async setForwards(forwards) {
      this.roster.forwards = forwards;
    }
  
    async setDefensemen(defensemen) {
      this.roster.defensemen = defensemen;
    }
  
    async setGoalies(goalies) {
      this.roster.goalies = goalies;
    }
  }
  