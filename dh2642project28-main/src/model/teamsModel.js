    // Model for all NHL Teams
    // Imports
    import { getTeamStats, getNHLTeams } from "../apiCalls";
    import TeamClass from "./teamClass";

    export default {
        promiseState: {},
        teams: {},
        teamLogos: {},


         getNameFromAbbrev(abbrev) {
            const teamEntry = Object.values(this.teams).find(team => team.teamAbbrev === abbrev);
            if (teamEntry) {
                return teamEntry.name;
            } else {
                console.log("Could not find a team with that abbreviation");
                return null;
            }
        },

        async setTeams() {
            this.promiseState = {}; // Reset the promise state before fetching
            
            try {
                const activeTeams = {};
                const teamsData = await getNHLTeams(); // Fetch teams data directly without using resolvePromise
                
                teamsData.forEach(teamEntry => {
                    (teamEntry.teams).forEach(team => {
                        const logo20232024 = team.logos.find(logo => logo.endSeason === 20232024);
                        
                        // If logo is from 2023-2024 it is an active team
                        // Needs to be changed every year.
                        if (logo20232024) {
                            const { secureUrl: logoURL } = logo20232024;
                            this.teamLogos[teamEntry.fullName] = logoURL;
                            activeTeams[teamEntry.fullName] = teamEntry; // Storing the entire team data
                        }
                    });
                });
            
                // Create teamClass instances for each team in activeTeams
                Object.keys(activeTeams).forEach(teamName => {
                    const teamData = activeTeams[teamName];
                    
                    const team = new TeamClass();
                    
                    team.setName(teamData.fullName);
                    team.setLogoURL(this.teamLogos[teamName]);
                    team.setTeamAbbrev(teamData.teamAbbrev);

                    this.teams[team.name] = team;
                });

                await this.setTeamStats();

                return { teams: this.teams, teamLogos: this.teamLogos };
            } catch (error) {
                this.promiseState.error = error;
                throw new Error("Error fetching teams and logos: " + error);
            }

        },

        async setTeamStats() {
            try {
                const teamStandings = await getTeamStats();
                teamStandings.forEach(teamStat => {
                    const teamName = teamStat.teamName.default;
                    this.teams[teamName].gamesPlayed = teamStat.gamesPlayed;
                    this.teams[teamName].wins = teamStat.wins;
                    this.teams[teamName].losses = teamStat.losses;
                    this.teams[teamName].ties = teamStat.ties;
                    this.teams[teamName].points = teamStat.points;
                    this.teams[teamName].goalDifferential = teamStat.goalDifferential;
                    this.teams[teamName].goalAgainst = teamStat.goalAgainst;
                    this.teams[teamName].goalFor = teamStat.goalFor;
                    this.teams[teamName].conferenceName = teamStat.conferenceName;
                    this.teams[teamName].conferenceAbbrev = teamStat.conferenceAbbrev;
                    this.teams[teamName].divisionName = teamStat.divisionName;
                    this.teams[teamName].divisionAbbrev = teamStat.divisionAbbrev;
                });
            } catch (error) {
                console.error('Error setting team statistics:', error);
            }
        },        

        async initialize() {
            try {
                const promiseState = this.setTeams();
    
                // Wait for promise to resolve
                const teamsData = await promiseState;
    
                // Set data and states accordingly
                this.promiseState.data = teamsData;
                
                // Return the resolved data to access it if needed
                return teamsData;
            } catch (error) {
                console.error(error);
                throw new Error("Initialization of teamsModel failed.");
            }
        }
    }