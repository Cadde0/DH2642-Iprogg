import React, { useEffect } from 'react';
import MainView from '../views/mainView';
import { observer } from 'mobx-react-lite';


export default observer(function Main(props) {
  const { model, favModel, scheduleModel } = props;
  
  // Updates the scheduleModel for favTeams. Saves the games for the favTeams 
  useEffect(() => {
    const fetchAllTeamSchedules = async () => {
        for (const teamName of favModel.favTeams) {
            const abbr = model.teams[teamName].teamAbbrev;
            await scheduleModel.fetchTeamWeeklySchedule(abbr);
        }
    };

    if (favModel.favTeams.length > 0 && model.teams) {
        fetchAllTeamSchedules();
    }
}, [favModel.favTeams, scheduleModel]);


  if (model.promiseState && model.promiseState.promise && !model.promiseState.data && !model.promiseState.error) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
  }

  // Conditional rendering to check if all favorite teams have their schedules loaded
  if (favModel.favTeams.length > 0 && favModel.favTeams.some(teamName => !scheduleModel.teamGames[model.teams?.[teamName]?.teamAbbrev])) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
}

// Gets the logo from team abbreviation
const getLogoForView = (abbr) => {
    let teamName = props.model.getNameFromAbbrev(abbr);
    let logoURL = props.model.teamLogos[teamName];
    return logoURL;
}


  return <MainView 
  teams={model.teams} 
  favTeams={favModel.favTeams}
  teamGames={scheduleModel.teamGames}
  getLogo={getLogoForView}

  />;
});
