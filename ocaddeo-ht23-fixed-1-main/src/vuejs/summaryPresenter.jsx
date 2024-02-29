import SummaryView from "../views/summaryView.jsx";

export default
function Summary(props){
    return <SummaryView people={props.model.numberOfGuests} ingredients={[] /* empty array for starters */}/>;
}
