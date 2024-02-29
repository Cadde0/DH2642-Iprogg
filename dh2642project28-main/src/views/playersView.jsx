// PlayersView.jsx
import React from "react";
import "/src/styles/players.css";

function PlayersView(props) {
  const {
    teams,
    forwards,
    defensemen,
    goalies,
    onTeamChange,
    selectedTeam,
    selectedPosition,
    onPositionChange,
    playerSearch,
    onPlayerSearchChange,
    selectedPlayer,
    onPlayerClick,
  } = props;


  const teamOptions = Object.values(teams).map((team) => (
    <option key={team.teamAbbrev} value={team.teamAbbrev}>
      {team.name}
    </option>
  ));

  const handleTeamChange = (e) => {
    const newSelectedTeam = e.target.value;
    onTeamChange(newSelectedTeam);
  };

  const mapPositionCodeToFullPosition = (positionCode, fullPos) => {
    if (fullPos === true) {
      const fullPosition = {
        C: 'Center Forward',
        L: 'Left Forward',
        R: 'Right Forward',
        D: 'Defenseman',
        G: 'Goalie',
      };
      return fullPosition[positionCode] || positionCode;
    }
  
    const positionMap = {
      C: 'Forwards',
      L: 'Forwards',
      R: 'Forwards',
      D: 'Defensemen',
      G: 'Goalies',
    };
    return positionMap[positionCode] || positionCode; // Return full position or code if not found
  };
  

  const positionOptions = ["Forwards", "Defensemen", "Goalies"].map((position) => (
    <option key={position} value={position}>
      {position}
    </option>
  ));

  const handlePositionChange = (e) => {
    const newSelectedPosition = e.target.value;
    onPositionChange(newSelectedPosition);
  };

  const handlePlayerSearchChange = (e) => {
    const newPlayerSearch = e.target.value;
    onPlayerSearchChange(newPlayerSearch);
  };

  const handlePlayerClick = (player) => {
    onPlayerClick(player);
  };
  
  const getFilteredPlayers = (playerSearch, players) => {
    if (!playerSearch) {
      return players;
    }
    const searchLowerCase = playerSearch.toLowerCase();
    return players.filter((player) =>
      player.fullName.toLowerCase().includes(searchLowerCase)
    );
  };
  
  const filterPlayersByTeamAndPosition = (players, teamAbbrev, position) => {
    return players.filter((player) =>
      (teamAbbrev === "" || player.teamAbbrev === teamAbbrev) &&
      (position === "" || mapPositionCodeToFullPosition(player.positionCode, false) === position)
    );
  };

  const handleClosePlayerDetails = () => {
    onPlayerClick({});
  };
  
  const filteredForwards = filterPlayersByTeamAndPosition(forwards, selectedTeam, selectedPosition);
  const filteredDefensemen = filterPlayersByTeamAndPosition(defensemen, selectedTeam, selectedPosition);
  const filteredGoalies = filterPlayersByTeamAndPosition(goalies, selectedTeam, selectedPosition);
  
  const allFilteredPlayers = [
    ...filteredForwards,
    ...filteredDefensemen,
    ...filteredGoalies
  ];
  
  const filteredPlayers = getFilteredPlayers(playerSearch, allFilteredPlayers);
  

  return (
    <div className="player-container">
        <div className="filter-container">
        <input
          className="player-search"
          type="text"
          placeholder="Search players..."
          value={playerSearch}
          onChange={handlePlayerSearchChange}
        />
        <select
            className="player-dropdown"

          id="teamDropdown"
          onChange={handleTeamChange}
          value={selectedTeam}
        >
          <option value="">All Teams</option>
          {teamOptions}
        </select>
        <select
            className="player-dropdown"
          id="positionDropdown"
          onChange={handlePositionChange}
          value={selectedPosition}
        >
          <option value="">All Positions</option>
          {positionOptions}
        </select>
        
    </div>
        {filteredPlayers.length > 0 ? (
            <div>  
            </div>
        ) : (
            <div className="noResults-message">
              No matching players found.
            </div>
        )}
      <div>
        <ul className="player-list">
          {filteredPlayers.map((player, index) => (
            <li key={`${player.id}-${index}`} className="player-item">
              <img className="player-img" src={player.headshot} alt="Player Headshot" onClick={() => handlePlayerClick(player)}/>
              <div className="player-name">{player.fullName}</div>
            </li>
          ))}
        </ul>
      </div>
      {/* Selected Player Details */}
      {Object.keys(selectedPlayer).length > 0 && (
        <div className={"selected-player-details"}>
            <h2 className="selected-player-name">{selectedPlayer.fullName}</h2>
            <button className="close-button" onClick={handleClosePlayerDetails}>Close</button>
          <img
            className="enlarged-player-img"
            src={selectedPlayer.headshot}
            alt="Selected Player Headshot"
          />
          <div className="player-details">
            <p>Birth Date:</p>
            <p>{selectedPlayer.birthDate}</p>
            <p>Birth City:</p>
            <p>{selectedPlayer.birthCity.default}</p>
            <p>Birth Country: {selectedPlayer.birthCountry}</p>
            <p>Weight:</p>
            <p>{selectedPlayer.weightInKilograms} Kilograms</p> 
            <p>Height:</p>
            <p>{selectedPlayer.heightInCentimeters} Centimeters</p>
            <p>Sweater Number: {selectedPlayer.sweaterNumber}</p>
            <p>Position: {mapPositionCodeToFullPosition(selectedPlayer.positionCode, true)}</p>
            {/*TODO format ALL of this so it is pretty :) */}
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayersView;