import LogInView from "../views/LogInView";
import SidebarView from "../views/sidebarView";//Is this needed?
import { observer } from "mobx-react-lite";
import readFromFirebase from "../firebase/favTeamsFireabaseModel"

export default observer(function LogIn(props){


    function handleUsernameInputChange(username){
        props.model.setUsername(username)
    }

    function handlePasswordInputChange(password){
        props.model.setPassword(password)
    }

    async function handleLogIn(){
        await props.favModel.clearFavTeams()
        await props.model.LogIn()
        await props.favModel.setUid()
        await readFromFirebase(props.favModel)
    }

    function handleRegister(){
        props.model.RegisterUser()
    }

    function handleTest(){
        console.log("current uid", props.favModel.uid)
    }
    
    async function handleLogOut(){
        await props.model.logOut()
        await props.favModel.clearUid()
        await props.favModel.clearFavTeams()
    }

    return(
        <LogInView
            onUsernameInputChanged = {handleUsernameInputChange}
            onPasswordInputChanged = {handlePasswordInputChange}
            onLogIn = {handleLogIn}
            onRegister = {handleRegister}
            onTest = {handleTest}
            onLogOut = {handleLogOut}
        />

    )

});