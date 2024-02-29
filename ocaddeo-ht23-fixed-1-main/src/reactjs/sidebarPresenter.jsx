import SidebarView from "../views/sidebarView";
import { observer } from "mobx-react-lite";

export default
observer(
    function Sidebar(props) {
        function changeNumberOfGuestsCB(nr) {
            props.model.setNumberOfGuests(nr);
        }
        function currentDishCB(dish) {
            props.model.setCurrentDish(dish.id);
        }
        function removeDishCB(dish) {
            props.model.removeFromMenu(dish);
        }
        return( 
            <SidebarView 
            number={props.model.numberOfGuests} 
            dishes={props.model.dishes}
            onNumberChange={changeNumberOfGuestsCB}
            currentDish={currentDishCB}
            removeDish={removeDishCB}    
            />
        );
    }

)