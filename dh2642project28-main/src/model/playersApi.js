const STATS_URL = "https://statsapi.web.nhl.com/api/v1/";
const BASE_URL = "https://api-web.nhle.com/v1/";

function getJSONACB(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Could not fetch Player Stats.');
  }
}

function keepDataACB(response, TEAM_ABR) {
  //console.log("API Response:", response);
  if (response && (response.forwards || response.defensemen || response.goalies)) {
    // Add teamAbbrev property to each player in forwards
    // Merge firstName and lastName into new fullName property
    if (response.forwards) {
      response.forwards.forEach((player) => (player.teamAbbrev = TEAM_ABR));
      response.forwards.forEach((player) => (player.fullName = `${player.firstName.default} ${player.lastName.default}`));
    }
    
    // Add teamAbbrev property to each player in defensemen
    if (response.defensemen) {
      response.defensemen.forEach((player) => (player.teamAbbrev = TEAM_ABR));
      response.defensemen.forEach((player) => (player.fullName = `${player.firstName.default} ${player.lastName.default}`));
    }

    // Add teamAbbrev property to each player in goalies
    if (response.goalies) {
      response.goalies.forEach((player) => (player.teamAbbrev = TEAM_ABR));
      response.goalies.forEach((player) => (player.fullName = `${player.firstName.default} ${player.lastName.default}`));
    }
    //console.log("Updated response", response)
    return response;
  } else {
    throw new Error('Invalid data structure in the response.');
  }
}

async function getTeamRoster(TEAM_ABR) {
  const url = BASE_URL + `roster/${TEAM_ABR}/20222023`; // Gets the Roster for the team for the season
  const options = {
    method: "GET",
    headers: {},
  };

  return fetch(url, options)
    .then(getJSONACB)
    .then((responseJSON) => keepDataACB(responseJSON, TEAM_ABR))
    .catch((error) => {
      console.log(error);
      throw new Error("Could not get Team Roster");
    });
}

export { getTeamRoster };
