import DetailsView from "../views/detailsView.jsx";
import DinnerModel from "../DinnerModel.js";

export default function Details(props) {

    function dishInMenuCB(dish) {
        return dish.id === props.model.currentDish;
    }

    function addDishToMenuCB() {
        props.model.addToMenu(props.model.currentDishPromiseState.data);
    }

    if(!props.model.currentDishPromiseState.promise) {
        return <div> No Data </div>
    }

    if(!props.model.currentDishPromiseState.data && !props.model.currentDishPromiseState.error) {
        return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
    }

    if(props.model.currentDishPromiseState.error) {
        return <div>Error: {props.model.currentDishPromiseState.error}  </div>
    }

    
    // Use ternary operator for conditional rendering
    return<DetailsView
                guests={props.model.numberOfGuests}
                isDishInMenu={props.model.dishes.find(dishInMenuCB) !== undefined}
                dishData={props.model.currentDishPromiseState.data}
                addDishToMenu={addDishToMenuCB}
            />
}
