import "/src/styles/index.css";
import Root from "./root.jsx";
import { createRoot } from "react-dom/client";
import standingsModel from "./model/standingsModel.js";
import teamsModel from "./model/teamsModel.js";
import connectToFirebase from "./firebase/firebaseModel.js";
import scheduleModel from "./model/scheduleModel.js";
import playersModel from "./model/playersModel.js";
import authenticationModel from "./firebase/authenticationModel.js";
import connectFavTeamsToFirebase from "./firebase/favTeamsFireabaseModel.js";


import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never" });
const reactiveStandingsModel = observable(standingsModel);
const reactiveTeamsModel = observable(teamsModel);
const reactiveScheduleModel = observable(scheduleModel);
const reactiveAuthenticationModel = observable(authenticationModel)
const reactivePlayersModel = observable(playersModel);
const reactiveFavTeamModel = observable(favTeamModel);
// Perform necessary initialization for standingsModel and teamsModel
const initializeModels = async () => {
    await reactiveStandingsModel.setStandings();
    await reactiveTeamsModel.initialize();
    await reactiveScheduleModel.fetchWeeklySchedule();
    await reactivePlayersModel.initialize();
    connectToFirebase(reactiveStandingsModel, reaction);
    connectFavTeamsToFirebase(reactiveFavTeamModel, reaction);
  };

import { createElement } from "react";
import favTeamModel from "./model/favTeamModel.js";
window.React = { createElement: createElement }; // needed in the lab because it works with both React and Vue

initializeModels().then(() => {
  
    createRoot(document.getElementById('root')).render(
      <Root
        standingsModel={reactiveStandingsModel}
        scheduleModel={reactiveScheduleModel}
        teamsModel={reactiveTeamsModel}
        playersModel={reactivePlayersModel}
        authenticationModel={reactiveAuthenticationModel}
        favTeamModel={reactiveFavTeamModel}
      />
    );
  });