import "/src/styles/home.css";

export default
function LogInView(props) {

    function usernameInputHandlerACB(event) {
        props.onUsernameInputChanged(event.target.value);
    }

    function passwordInputHandlerACB(event) {
        props.onPasswordInputChanged(event.target.value);
    }

    function logInHandlerACB() {
        props.onLogIn();
    }

    function registerHandlerACB() {
        props.onRegister();
    }

    function testHandlerACB() {
        props.onTest();
    }

    function logOutHandlerACB() {
        props.onLogOut();
    }

    return ( <div>
        <h1 className="homeHeader">LOGIN</h1>
            <div className="contentContainer">    
                <div>
                    Username:
                    <input
                        onChange = {usernameInputHandlerACB}>
                    </input>

                    Password:
                    <input
                        onChange = {passwordInputHandlerACB}>
                    </input>

                    <button onClick={logInHandlerACB}>
                        Login
                    </button>

                    <button onClick={registerHandlerACB}>
                        Register
                    </button>

                    <button onClick={logOutHandlerACB}>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
}