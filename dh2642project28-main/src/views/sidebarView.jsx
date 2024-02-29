import React, { useState } from 'react';
import '/src/styles/sidebar.css';
//import '/src/sidebarStyles.css';

const SidebarView = (props) => {
    return (
        <div className={`sidebar ${props.showSidebar ? 'show-sidebar' : ''}`}>
            <div className="sidebar-menu">
                <button className="sidebar-button" onClick={props.toMain}>Home</button>
                <button className="sidebar-button" onClick={props.toStandings}>Standings</button>
                <button className="sidebar-button" onClick={props.toScheduleView}>Schedule</button>
                <button className="sidebar-button" onClick={props.toTeamsView}>Teams</button>
                <button className="sidebar-button" onClick={props.toPlayersView}>Players</button>
            </div>
            <div className="user-sidebar-button">
                <button className="sidebar-button" onClick={props.toLogInView}>Log in</button>
            </div>
        </div>
    );
};

export default SidebarView;
