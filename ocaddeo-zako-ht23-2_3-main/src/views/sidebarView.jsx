import { dishType, sortDishes, menuPrice } from "/src/utilities.js";
import "/src/style.css";

/* Functional JSX component. Name must start with capital letter */
function SidebarView(props) {
  return (
    <div className="align-center"> Number of Guests
    <div>
      <button disabled={(props.number == 1)} onClick={()=>props.onNumberChange((props.number - 1))}>-</button>
      {props.number}
      <button onClick={()=>props.onNumberChange((props.number + 1))}>+</button>

      <table>
        <tbody>
          {sortDishes(props.dishes).map(dishesTableRowCB)}
          {totalPrice(props.dishes)}
        </tbody>
      </table>
    </div>
    </div>
  );

  function dishesTableRowCB(dish) {
    return (
      <tr key={dish.id}>
        <td>
            <button onClick={()=> props.xClickedCustomEvent(dish)}>X</button>
        </td>
        <td>
            <a href="#/details" onClick={()=> props.dishClickedCustomEvent(dish)}>
                {dish.title}
            </a>
        </td>
        <td>{dishType(dish)}</td>
        <td className="align-right">{(dish.pricePerServing * props.number).toFixed(2)}</td>
      </tr>
    );
  }
  function totalPrice(dishes) {
    return (
        <tr>
            <td></td>
            <td>Total: </td>
            <td></td>
            <td className="align-right">
                {(menuPrice(dishes) * props.number).toFixed(2)}
            </td>
        </tr>
    );
  }
}

export default SidebarView;
