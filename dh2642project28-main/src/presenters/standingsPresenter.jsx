import StandingsView from "../views/standingsView";
import { observer } from "mobx-react-lite";

export default observer(function Standings(props){


    function handleBack(){
        window.location.hash = "#/main";
    }

    function handleStandings(){
        props.model.setStandings();
    }

    function handleSortOptionChanged(sortBy){
            props.model.setSortBy(convertSortByCB(sortBy));
    }

    function convertSortByCB(sortBy){
        if(sortBy == "Wins"){
            return "wins"
        }
        else if(sortBy == "Games played"){
            return "gamesPlayed"
        }
        else if(sortBy == "Losses"){
            return "losses"
        }
        else if(sortBy == "Points"){
            return "points"
        }
        else if(sortBy == "Goals"){
            return "goalFor"
        }
    }

    return(
        <StandingsView
            toMain = {handleBack}
            getStandings = {handleStandings}
            standingsData = {props.model.standings}
            atlanticStandings = {props.model.atlanticStandings}
            metropolitanStandings = {props.model.metropolitanStandings}
            centralStandings = {props.model.centralStandings}
            pacificStandings = {props.model.pacificStandings}
            onSortOptionChanged = {handleSortOptionChanged}
            model = {props.model}
        />
    )

});
