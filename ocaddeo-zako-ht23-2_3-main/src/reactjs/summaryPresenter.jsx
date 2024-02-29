import SummaryView from "../views/summaryView.jsx";
import { observer } from "mobx-react-lite";
import { shoppingList } from "/src/utilities.js";

export default observer(
    function Summary(props){
        return <SummaryView people={props.model.numberOfGuests} ingredients={[] = shoppingList(props.model.dishes)}/>;
    }
);
