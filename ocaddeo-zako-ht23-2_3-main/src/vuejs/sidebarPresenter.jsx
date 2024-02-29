import SidebarView from "../views/sidebarView.jsx";

export default function Sidebar(props){

    function onNumberChangeCB(number) {
        props.model.setNumberOfGuests(number);
    }
    
    function dishClickedCustomEventCB(dish){
        props.model.setCurrentDish(dish.id);
    }
    
    function xClickedCustomEventCB(dish) {
        props.model.removeFromMenu(dish);
    }

    return <SidebarView 
        number={props.model.numberOfGuests} 
        dishes={props.model.dishes}
        onNumberChange={onNumberChangeCB}
        dishClickedCustomEvent={dishClickedCustomEventCB}
        xClickedCustomEvent={xClickedCustomEventCB}
        />;
}
