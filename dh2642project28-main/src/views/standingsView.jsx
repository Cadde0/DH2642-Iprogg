import '../styles/standingsStyles.css'

function StandingsView(props){

    function toMainACB() {
        props.toMain();
    }
    /* maybe not needed
    function getStandingsACB(){
        props.getStandings();
    }
    */
    function showData(data) {
        return (
            <tr key={data.teamAbbrev.default}>
                <td>{data.teamName.default}</td>
                <td>{data.gamesPlayed}</td>
                <td>{data.wins}</td>
                <td>{data.losses}</td>
                <td>{data.goalFor}</td>
                <td>{data.points}</td>
            </tr>
        );
    }

    function createStandingsTable(divisionName, standings) {
        return (
            <div className='standings-table-container'>
                <h3>{divisionName}</h3>
                <table className="standings-table">
                    <thead>
                        <tr>
                            <th>Team</th>
                            <th>Games Played</th>
                            <th>Wins</th>
                            <th>Losses</th>
                            <th>Goals Made</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map(showData)}
                    </tbody>
                </table>
            </div>
        );
    }

    function renderOptions(option, index) {
        return (
            <option key={index} value={option}>
                {option}
            </option>
        );
    }

    function sortOptionHandlerACB(event) {
        props.onSortOptionChanged(event.target.value);
    }


    const sortBy = new Set(["Games played", "Wins", "Losses", "Points", "Goals"]);
    //TODO: create some conditional rendering logic for sorted and filtered data
    //TODO: implement some suspense when loading data
    return ( <div>
        {/* 
        //Maybe this is not needed
        <div>
            <button onClick={getStandingsACB}>
                get standings
            </button>
        </div>
        */}
        <div>
            <button className="goBack-btn" onClick={toMainACB}>Go back</button>
        </div>
        
        <div className='standings-text'>
            <select className='sortBy-dropdown' onChange = {sortOptionHandlerACB}>
                <option>
                    Sort By:
                </option>
                {Array.from(sortBy).map(renderOptions)}
            </select>
        </div>

        <div className="conferences-container">
            <div className="conference">
                <h2>Western Conference</h2>
                {createStandingsTable("Central Division", props.centralStandings)}
                {createStandingsTable("Pacific Division", props.pacificStandings)}
            </div>

            <div className="conference">
                <h2>Eastern Conference</h2>
                {createStandingsTable("Atlantic Division", props.atlanticStandings)}
                {createStandingsTable("Metropolitan Division", props.metropolitanStandings)}
            </div>
        </div>
    </div>
);
}
//TODO: The JSON parse and stringify can be optimized
export default StandingsView;