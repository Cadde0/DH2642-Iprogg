import { dishType, menuPrice, sortDishes } from "../utilities";
import "/src/style.css"
import "/src/utilities.js"

function SidebarView(props) {
    function removeGuestCB() {
        props.onNumberChange(props.number - 1)
    }
    function addGuestCB() {
        props.onNumberChange(props.number + 1)
    }
    return(
            <div class = "debug">
                <button disabled={props.number == 1} onClick = {removeGuestCB}>-</button>
                {props.number}
                <button onClick={addGuestCB}>+</button>
                {
                    renderDish(props.dishes, props.number)
                }
                
            </div>
    );

    function renderDish(dishesArray, number) {
        function loremIpsumCB(dish) {
            function removeDishesACB() {
                props.removeDish(dish)
            }
            function addDishesACB() {
                props.currentDish(dish)
            }
            return(
                <tr key = {dish.id}>
                    <td><button onClick={removeDishesACB}>X</button></td>
                    <td><a href="#" onClick={addDishesACB}>{dish.title}</a></td>
                    <td>{dishType(dish)}</td>
                    <td class = "rightAlign">{(dish.pricePerServing * number).toFixed(2)}</td>
                </tr>
            );
            
        }
        
        return(
            <table>
                <tbody>
                    {
                        sortDishes(dishesArray).map(loremIpsumCB)
                    }

                    <tr>
                        <td></td>
                        <td>Total :</td>
                        <td></td>
                        <td class = "rightAlign">{(menuPrice(dishesArray)*number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default SidebarView;