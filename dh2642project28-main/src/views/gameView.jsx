import {useState, React} from 'react';
import { getWeekDay } from '../model/utilities';
import '/src/styles/scheduleStyles.css';

const GameView = (props) => {
    const {game, teamsModel, getLogoURL} = props;
    console.log("game and teamsmodel in gameview", game, teamsModel);

    if (!game) {
        return <div>Loading game details...</div>;
    }

    const getLogo = (abbr) => {
        getLogoURL(abbr);
    }

    return (
        <div className="details">
            <h2>Game Details {game.homeTeam}{getLogo(game.homeTeam)} vs {game.awayTeam}{getLogo(game.awayTeam)}</h2>

        </div>

    )
}
export default GameView;