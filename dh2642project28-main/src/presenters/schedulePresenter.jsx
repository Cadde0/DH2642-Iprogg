import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import ScheduleView from '../views/scheduleView';


const SchedulePresenter = observer( (props) => {

    useEffect(() => {
        // Fetch the schedule when the component mounts
        props.model.fetchWeeklySchedule();
    }, []);

    const getLogoForView = (abbr) => {
        let teamName = props.teamsModel.getNameFromAbbrev(abbr);
        let logoURL = props.teamsModel.teamLogos[teamName];
        return logoURL;
    }

    if (props.model.promiseState && props.model.promiseState.promise && !props.model.promiseState.data && !props.model.promiseState.error) {
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
      }

    return (
        <div>
            <ScheduleView 
            games={props.model.games}
            getLogoURL={getLogoForView}
            />
        </div>
    );
});

export default SchedulePresenter;