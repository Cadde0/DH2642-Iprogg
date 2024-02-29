import Summary from "./summaryPresenter.jsx";
import Sidebar from "./sidebarPresenter.jsx";
import Details from "./detailsPresenter.jsx";
import Search from "./searchPresenter.jsx";
import { createHashRouter, Route, Routes, RouterProvider} from "react-router-dom";
import { observer } from "mobx-react-lite";

export default observer(
    function ReactRoot(props){
        return (conditionalRendering(props))
    }
)

function conditionalRendering(props) {
    if(!props.model.ready) {
        return (<img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />);
    }
    else {
        return (
            <div className="flexParent">
                <div className="sidebar" >
                    <Sidebar model={props.model} />
                </div>
                <div className="mainContent">
                    <RouterProvider router={router(props.model)}></RouterProvider>
                </div>
            </div>
        );
    }
}

function router (model) {
    return createHashRouter([
        {
            path:"/" , 
            element:<Search model={model}/>
        },
        {
            path:"/search" ,
            element:<Search model={model}/>
        },
        {
            path:"/details" ,
            element:<Details model={model}/>
        },
        {
            path:"/summary" ,
            element:<Summary model={model}/>
        }
    ])
}