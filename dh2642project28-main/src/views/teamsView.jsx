import "../styles/teamView.css";

function TeamsView(props) {
  function renderTeamsByDivision(teams) {
    const easternAtlantic = teams.filter(
      (team) =>
        team.divisionName === "Atlantic" && team.conferenceName === "Eastern"
    );
    const easternMetropolitan = teams.filter(
      (team) =>
        team.divisionName === "Metropolitan" &&
        team.conferenceName === "Eastern"
    );
    const westernCentral = teams.filter(
      (team) =>
        team.divisionName === "Central" && team.conferenceName === "Western"
    );
    const westernPacific = teams.filter(
      (team) =>
        team.divisionName === "Pacific" && team.conferenceName === "Western"
    );

    return (
      <div className="teamLogosContainer">
        <div className="conference">
          <h1>Eastern</h1>
          <h2>Atlantic</h2>
          <div className="division">{renderTeams(easternAtlantic)}</div>
          <h2>Metropolitan</h2>
          <div className="division">{renderTeams(easternMetropolitan)}</div>
        </div>
        <div className="conference">
          <h1>Western</h1>
          <h2>Central</h2>
          <div className="division">{renderTeams(westernCentral)}</div>
          <h2>Pacific</h2>
          <div className="division">{renderTeams(westernPacific)}</div>
        </div>
      </div>
    );
  }

  function renderTeams(teams) {
    return teams.map((team) => <TeamsViewACB key={team.name} team={team} />);
  }

  return renderTeamsByDivision(Object.values(props.teams));
}

function TeamsViewACB({ team }) {
  const handleLogoClickCB = () => {
    window.location.hash = `#/teams/${team.name
      .toLowerCase()
      .replace(/\s/g, "-")}`;
  };

  return (
    <a
      key={team.name}
      className="teamLogoImageSpan"
      onClick={handleLogoClickCB}
    >
      <img src={team.logoURL} height="100" alt={`Team Logo ${team.name}`} />
      <div>{team.name}</div>
    </a>
  );
}

export default TeamsView;
