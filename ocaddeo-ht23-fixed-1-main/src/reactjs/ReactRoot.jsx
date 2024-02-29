import Summary from "./summaryPresenter.jsx";

export default
// observer(     will be added in week 3
function ReactRoot(props){
    return (<div>
                <div><Sidebar model={props.model} /></div>
                <div><Summary model={props.model} /></div>
            </div>
           );
}
// )
