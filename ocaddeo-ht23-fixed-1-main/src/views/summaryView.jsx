// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/utilities.js";
import "/src/style.css";

/* Functional JSX component. Name must start with capital letter */
function SummaryView(props){
    return (
            <div class="debug">
              Summary for <span title="nr guests">{props.people}</span> persons:
              
              <table>
                {  //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript, and make a comment
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
                          {/* //  <---- in JSX/HTML, with this curly brace, we go back to JavaScript expressions */}
                    
                </tbody>
              </table>
            </div>
    );
    /* for TW1.5 
      Note also that the callback can be defined after it is used! 
      This JS feature is called "function hoisting".
    */
    function ingredientTableRowCB(ingr){
        return <tr key={ /* TODO what's a key? */ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td class = "rightAlign"> {(ingr.amount * props.people).toFixed(2)}</td>
                 <td > {ingr.unit} </td>
               </tr>;
    }
}

export default SummaryView;
