// selectedTeamPresenter.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import SelectedTeamView from '../views/selectedTeamView';

// Observer
export default observer(function SelectedTeamPresenter(props) {
    const { teamName } = useParams(); 
    let formattedTeamName = teamName;
    const { model } = props;

    if (teamName) {
        // Format teamName: Convert first letter of each word to uppercase and remove dashes
        formattedTeamName = teamName
            .split('-') // Split the string by dashes
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
            .join(' '); // Join the words together with spaces
    }

    if (model.promiseState && model.promiseState.promise && !model.promiseState.data && !model.promiseState.error) {
        // Render a loading image or text while the promise is pending
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
    }

    const team = formattedTeamName ? model.teams[formattedTeamName] : null;
    
    if(!team) {
        return <div>No such team exists in our database</div>
    }

    function addToFavHandler(team){
        props.favModel.preventSave = false;
        props.favModel.addFavTeam(team)
        props.favModel.preventSave = true;
    }

    function removeFavHandler(team){
        props.favModel.preventSave = false;
        props.favModel.removeFavTeam(team)
        props.favModel.preventSave = true;
        console.log("removed ", team, "from favorites")
        window.location.hash = "#/main";
    }

    return <SelectedTeamView 
                team={team}
                onAddToFav = {addToFavHandler}
                onRemoveFav = {removeFavHandler} />;
  });
