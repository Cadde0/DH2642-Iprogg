// playersModel.js
import { getTeamRoster } from "./playersApi";
import TeamClass from "./teamClass";
import teamsModel from "./teamsModel";

export default {
  promiseState: false,
  forwards: [],
  defensemen: [],
  goalies: [],
  teams: teamsModel.teams,

  async fetchTeamRoster(teamAbbreviation) {
    this.promiseState = false;
    try {
      const rosterData = await getTeamRoster(teamAbbreviation);

      // Check if the team already exists in teamsModel
      const teamName = teamsModel.getNameFromAbbrev(teamAbbreviation);
      const team = teamsModel.teams[teamName];

      if (team) {
        // Update existing TeamClass instance with new roster data
        team.setForwards(rosterData.forwards || []);
        team.setDefensemen(rosterData.defensemen || []);
        team.setGoalies(rosterData.goalies || []);
      } else {
        console.error(`Team ${teamAbbreviation} not found in teamsModel.`);
    }

      // Update the model with the fetched player data
      this.forwards = [...this.forwards, ...(rosterData.forwards || [])];
      this.defensemen = [...this.defensemen, ...(rosterData.defensemen || [])];
      this.goalies = [...this.goalies, ...(rosterData.goalies || [])];

    } catch (error) {
      console.error(`Error fetching team roster for ${teamAbbreviation}:`, error);
    }
  },
  

  async initializeACB() {
    try {
        const teamAbbreviations = [];
        Object.entries(teamsModel.teams).forEach(([teamName, team]) => {
            teamAbbreviations.push(team.teamAbbrev);
        });

      // Use Promise.all to wait for all promises to resolve
      await Promise.all(teamAbbreviations.map(async (teamAbbrev) => {
        await this.fetchTeamRoster(teamAbbrev);
      }));
    } catch (error) {
      console.error('Error fetching team rosters:', error);
    }
  },

  async initialize() {
    try {
        await teamsModel.initialize();
        await this.initializeACB();

        this.promiseState = true;

      // You can do additional tasks here if needed

      // Return data or any other necessary information
      return {
        promiseState: this.promiseState,
        teams: this.teams,
        forwards: this.forwards,
        defensemen: this.defensemen,
        goalies: this.goalies,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Initialization of playersModel failed");
    }
  },
};
