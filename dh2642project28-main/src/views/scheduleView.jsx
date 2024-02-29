import {useState, React} from 'react';
import { useNavigate } from 'react-router-dom';
import { getWeekDay } from '../model/utilities';
import '/src/styles/scheduleStyles.css';

const ScheduleView = (props) => {
    const {games, getLogoURL} = props;


    // Un-used for now //TODO make seperate detailed view for each game and show when clicked
    const handleGameClick = (game) => {
        //navigate(`/schedule/${game.id}`, { state: { game }});
    }



    // Scroll to pressed date
    const scrollToDate = (date) => {
        const element = document.getElementById(date);
        if(element){
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

 

    return (
        <>
        <div id="dateNav" className="sticky">
        {Object.keys(games).map((date) => (
        <button className="date-buttons" key={date} onClick={() => scrollToDate(date)}>
            <div>
                <span style={{ marginRight: '20px' }}>{date}</span>
                <span style={{ marginRight: '20px' }}>|</span>
                <span>{getWeekDay(date)}</span>
            </div>

            <div>{`${games[date].length} Games`}</div>
        </button>
        ))}
        </div>
            <div className="schedule-container">
            <h2 className='schedule-text'>Schedule</h2>
            {Object.entries(games).map(([date, gamesOnDate]) => (
                <section key={date}>
                    <h3 className="schedule-text" id={`${date}`}>{date}</h3>
                    {gamesOnDate.length === 0 ? (
                        <p className='schedule-text'>No games this date</p>
                    ) : (
                    <ul className="games">
                        {gamesOnDate.map((game, index) => (
                            <li key={index}>
                                <button className="game-buttons" onClick={() => handleGameClick(game)}>
                                    <div className="game-time">{game.time} (GMT+1)</div>
                                    <div className="game-info">
                                        <div className="team-logo-container">
                                            <img className="team-logo" src={getLogoURL(game.homeTeam)} height="20" alt={`Team Logo ${game.homeTeam}`} />
                                            <span className="team-abbr">{game.homeTeam}</span>
                                        </div>
                                        <div className="vs-text">vs</div>
                                        <div className="team-logo-container">
                                            <img className="team-logo" src={getLogoURL(game.awayTeam)} height="20" alt={`Team Logo ${game.awayTeam}`} />
                                            <span className="team-abbr">{game.awayTeam}</span>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                    )}
                </section>
            ))}
        </div>
        </>
    );
};


export default ScheduleView;
