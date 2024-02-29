// playersPresenter.jsx
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import PlayersView from "../views/PlayersView";
import teamsModel from "../model/teamsModel";

export default observer(function PlayersPresenter(props) {
  const { model } = props;
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState({});

// Check if the players promise is pending
if (model.promiseState == false) {
    // Render a loading image or text while the promise is pending
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
  }

  const handleTeamChange = (teamAbbrev) => {
    setSelectedTeam(teamAbbrev);
  };

  const handlePositionChange = (position) => {
    setSelectedPosition(position);
  }

  const handlePlayerSearchChane = (string) => {
    setPlayerSearch(string);
  }

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
  }

  return (
    <PlayersView
      forwards={model.forwards}
      defensemen={model.defensemen}
      goalies={model.goalies}
      teams={teamsModel.teams}
      selectedTeam={selectedTeam}
      onTeamChange={handleTeamChange}
      selectedPosition={selectedPosition}
      onPositionChange={handlePositionChange}
      playerSearch={playerSearch}
      onPlayerSearchChange={handlePlayerSearchChane}
      selectedPlayer={selectedPlayer}
      onPlayerClick={handlePlayerClick}
    />
  );
});