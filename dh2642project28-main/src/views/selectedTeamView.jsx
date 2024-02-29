// SelectedTeamView.jsx
import React from "react";
import "../styles/selectedTeamView.css";


function SelectedTeamView(props) {

    function handleAddToFav() {
        props.onAddToFav(props.team.name);
    }

    function handleRemoveFav() {
      props.onRemoveFav(props.team.name);
  }

  return (
    <div className={"selected-team-container"}>
      <div className="team-header">
        <img
          src={props.team.logoURL}
          height="80"
          alt={`Team Logo ${props.team.name}`}
        />
        <div className="team-name">
          <h2>
            {props.team.name} ({props.team.teamAbbrev})
          </h2>
          <h2>
            {props.team.conferenceName} Conference (
            {props.team.conferenceAbbrev})
          </h2>
        </div>
      </div>

      <div className="team-stats">
        <div className="buttons-fav">
          <button onClick={handleAddToFav}>Add to favorite</button>
          <button onClick={handleRemoveFav}>Remove from favorite</button>
        </div>
        <div>
          Division: {props.team.divisionName} ({props.team.divisionAbbrev})
        </div>
        <div>Games played: {props.team.gamesPlayed}</div>
        <div>Wins: {props.team.wins}</div>
        <div>Ties: {props.team.ties}</div>
        <div>Losses: {props.team.losses}</div>
        <div>Points: {props.team.points}</div>
        <div>Goal for: {props.team.goalFor}</div>
        <div>Goal against: {props.team.goalAgainst}</div>
        <div>Goal differential: {props.team.goalDifferential}</div>
        
      </div>

    </div>
    
  );
}

export default SelectedTeamView;
