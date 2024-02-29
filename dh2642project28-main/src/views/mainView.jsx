import React from 'react';

function MainView(props) {
  const teams = props.teams;
  const favTeams = props.favTeams;
  const teamGames = props.teamGames;
  const getLogo = props.getLogo;

  function renderFavoriteTeams(teams, favTeams, teamGames) {
    const favoriteTeams = teams.filter(team => favTeams.includes(team.name));
    return favoriteTeams.map((team) => <TeamLogo key={team.name} team={team} specificTeamGames={teamGames[team.teamAbbrev]} getLogo={getLogo} />);
  }
  return <div className="teamLogosContainer">{renderFavoriteTeams(Object.values(teams), favTeams, teamGames)}</div>;
}



function TeamLogo(props) {
  const team = props.team;
  const specificTeamGames = props.specificTeamGames;
  const getLogo = props.getLogo;


  const handleLogoClick = () => {
    window.location.hash = `#/teams/${team.name.toLowerCase().replace(/\s/g, "-")}`;
  };

  
  
  return (
    <a key={team.name} className="teamLogoImageSpan" onClick={handleLogoClick}>
        <img src={team.logoURL} height="10" alt={`Team Logo ${team.name}`} />
        <div>{team.name}</div>
        <div>
            <div className="upcoming-games">Upcoming games:</div>
            {Object.entries(specificTeamGames)
                .filter(([date, games]) => games.length > 0) // Filter out dates with no games
                .map(([date, games]) => (
                    <div key={date}>
                        <div className="team-games">
                            <div>{date}:</div>
                            {games.map(game => (
                                <button key={game.id} className="game-container">
                                    <div className="game-time">{game.time} (GMT+1)</div>
                                    <div className="team-info">
                                        <div className="team-abb">{game.homeTeam}</div>
                                        <img className="team-log" src={getLogo(game.homeTeam)} height="20" alt={`Team Logo ${game.homeTeam}`} />
                                        <div className="vs">vs</div>
                                        <div className="team-abb">{game.awayTeam}</div>
                                        <img className="team-log" src={getLogo(game.awayTeam)} height="20" alt={`Team Logo ${game.awayTeam}`} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    </a>
);
}

export default MainView;
