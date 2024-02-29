import SidebarView from "../views/sidebarView.jsx";
import { observer } from "mobx-react-lite";

export default observer(function Sidebar(props) {
  function onNumberChangeCB(number) {
    props.model.setNumberOfGuests(number);
  }

  function dishClickedCustomEventCB(dish){
    props.model.setCurrentDish(dish.id);
  }

  function xClickedCustomEventCB(dish) {
    props.model.removeFromMenu(dish);
  }

  return (
    <SidebarView
      number={props.model.numberOfGuests}
      dishes={props.model.dishes}
      onNumberChange={onNumberChangeCB}
      dishClickedCustomEvent={dishClickedCustomEventCB}
      xClickedCustomEvent={xClickedCustomEventCB}
    />
  );
});
