import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import ScheduleView from '../views/scheduleView';
import GameView from '../views/gameView';
import { useLocation } from 'react-router-dom';


const GamePresenter = observer( (props) => {
    console.log("props in gamepresenter", props);

    const location = useLocation();
    const game = location.state?.game;


    useEffect(() => {
        // Fetch the schedule when the component mounts
        props.model.fetchWeeklySchedule();
    }, []);

    const getLogoForView = (abbr) => {
        let teamName = props.teamsModel.getNameFromAbbrev(abbr);
        let logoURL = props.teamsModel.teamLogos[teamName];
        return logoURL;
    }

    return (
        <div>
            <GameView 
            game={game} 
            teamsModel={props.teamsModel}
            getLogoURL={getLogoForView}
            />   
        </div>
    );
});

export default GamePresenter;