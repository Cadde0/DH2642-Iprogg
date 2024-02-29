
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
function SummaryView(props){
  function backToSearchCB() {
    window.location.hash="#/search";
  }

    return (
            <div className="debug">
              Summary for <span title="nr guests">{props.people}</span> persons:

              <button onClick={backToSearchCB}>Back to Search</button>
              
              <table>
                  {
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>
                  }
                
                <tbody>
                  {
                    sortIngredients(props.ingredients).map(ingredientTableRowCB)
                  }
                </tbody>
              </table>
            </div>
    );
    
    function ingredientTableRowCB(ingr){
        return <tr key={ingr.id} >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td class="align-right">{(ingr.amount*props.people).toFixed(2)}</td>
                 <td> {ingr.unit} </td>
               </tr>;
    }
}

export default SummaryView;
