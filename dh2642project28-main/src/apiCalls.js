const BASE_URL = "https://api-web.nhle.com/v1/";

// Teams - Zak
/*
    getNHLTeams : Fetches all NHL teams (even retired and old ones) and their data.
    getTeamStats : Returns every teams stats. 
*/

function getJSONACB(response) {
    if(response.ok) {
        return response.json();
    } else {
        throw new Error('Could not fetch Search details.');
    }
}


// Function to handle the resolved promise and extract the data array
function keepDataArrayACB(response) {
    if (response && response.data) {
        return response.data; // Assuming the data property holds the array
    } else {
        throw new Error('Invalid data structure in the response.');
    }
}


// Function to fetch all active NHL teams
async function getNHLTeams() {
    const url = "https://records.nhl.com/site/api/franchise?include=teams.id&include=teams.logos";
    const options = {
        method: 'GET',
        headers: {}
    };

    //Old and active NHL Teams
    return fetch(url, options)
            .then(getJSONACB)
            .then(keepDataArrayACB)
            .catch(error => {
                console.log(error);
                throw new Error("Could not fetch NHL team details.")
            });
}

async function getTeamStats() {
    const apiUrl = BASE_URL + "standings/now";

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch team statistics.');
        }

        const standingsData = await response.json();
        return standingsData.standings;
    } catch (error) {
        console.error('Error fetching team statistics:', error);
        throw new Error('Error fetching team statistics.');
    }
}

/* Rasmus/schedule */


// Schedule now
export const getScheduleToday= () => {
    const url = new URL(BASE_URL + 'schedule/now');

    return fetch(url, {
        method: 'GET',
        headers: {
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
            console.error('Error getting today\'s schedule: ', error);
            throw error;
        });
};

export const getScheduleDate = (DATE) => {
    const url = new URL(BASE_URL + `schedule/${DATE}`);

    return fetch(url, {
        method: 'GET',
        headers: {
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
            console.error(`Error fetching ${DATE}\'s schedule: `, error);
            throw error;
        });
};

export const getClubScheduleSeason = (TEAM_ABBR) => {
    const url = new URL(BASE_URL + `club-schedule-season/${TEAM_ABBR}/now`);

    return fetch(url, {
        method: 'GET',
        headers: {
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
            console.error(`Error ${TEAM_ABBR}\'s season schedule: `, error);
            throw error;
        });
};

export const getClubScheduleMonth = (TEAM_ABBR) => {
    const url = new URL(BASE_URL + `club-schedule/${TEAM_ABBR}/month/now`);

    return fetch(url, {
        method: 'GET',
        headers: {
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
            console.error(`Error ${TEAM_ABBR}\'s month schedule: `, error);
            throw error;
        });
};



export const getClubScheduleWeek = (TEAM_ABBR) => {
    const url = new URL(BASE_URL + `club-schedule/${TEAM_ABBR}/week/now`);

    return fetch(url, {
        method: 'GET',
        headers: {
        }
      })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
        })
        .catch(error => {
            console.error(`Error ${TEAM_ABBR}\'s week schedule: `, error);
            throw error;
        });
};

export { getTeamStats, BASE_URL, getNHLTeams}

