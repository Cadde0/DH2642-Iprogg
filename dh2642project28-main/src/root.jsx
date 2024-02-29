import React from 'react';
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Standings from "./presenters/standingsPresenter.jsx";
import Main from "./presenters/mainPresenter.jsx";
import LogIn from "./presenters/logInPresenter.jsx"
import TeamsPresenter from "./presenters/teamsPresenter.jsx";
import SelectedTeamPresenter from './presenters/selectedTeamPresenter';
import SchedulePresenter from "./presenters/schedulePresenter.jsx";
import GamePresenter from './presenters/gamePresenter.jsx';
import Header from "./views/header.jsx";
import "./styles/index.css";
import "./styles/root.css";
import PlayersPresenter from './presenters/playersPresenter.jsx';
import favTeamModel from './model/favTeamModel.js';

export default observer(
    function root({standingsModel, teamsModel, scheduleModel, playersModel, authenticationModel, favTeamModel}){
        
        
        return(
            <div className="app-container">
                <div>
                    <Header />
                </div>
                <div className="main-content">
                    <RouterProvider router={makeRouter({ standingsModel, teamsModel, scheduleModel, playersModel , authenticationModel, favTeamModel})} />
                </div>
            </div>
        );
});

function makeRouter({ standingsModel, teamsModel, scheduleModel, authenticationModel, playersModel, favTeamModel}) {
    return createHashRouter([
        {
            path: "/",
            element: <Main model={teamsModel} favModel={favTeamModel} scheduleModel={scheduleModel} />,
        },
        {
            path: "/standings",
            element: <Standings model={standingsModel} />,
        },
        {
            path: "/main",
            element: <Main model={teamsModel} favModel={favTeamModel} scheduleModel={scheduleModel}/>,
        },
        {
            path: "/teams",
            element: <TeamsPresenter model={teamsModel} />,
        },
        {
            path: "/teams/:teamName",
            element: <SelectedTeamPresenter model={teamsModel} favModel={favTeamModel} />,
        },
        {
            path: "/players",
            element: <PlayersPresenter model={playersModel} />,
        },
        {
            path: "/schedule",
            element: <SchedulePresenter model={scheduleModel} teamsModel={teamsModel} /> ,
        },
        {
            path: "/login",
            element: <LogIn model={authenticationModel} favModel={favTeamModel}/> ,
        },            
    ]);
}
