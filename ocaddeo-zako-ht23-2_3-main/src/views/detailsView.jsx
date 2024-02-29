import "/src/style.css";

function DetailsView(props) {

  function addToMenu(){
    props.addDishToMenu()
    window.location.hash="#/search";
  }

  function backToSearchCB(){
    window.location.hash="#/search";
  }
  return (
    <div className="details-container">
      <div className="left-side">
        <h2>{props.dishData.title}</h2>
        {/* Render image */}
        <img src={props.dishData.image} alt={props.dishData.title} />

        {/* Render prices */}
        <div className="prices">
          <div>
            <p>Price: ${(props.dishData.pricePerServing * props.guests).toFixed(2)}</p>
          </div>
          <div>
            <p>Price per guest: ${(props.dishData.pricePerServing).toFixed(2)}</p>
          </div>
        </div>

        {/* Render ingredients */}
        <div className="ingredients">
          <h4>Ingredients:</h4>
          {props.dishData.extendedIngredients.map((ingredient) => (
            <div key={ingredient.id}>
              <span>- {ingredient.name}: </span>
              <span>{ingredient.amount}</span>
              <span>{ingredient.unit}</span>
            </div>
          ))}
        </div>

      </div>

      <div className="right-side">
        {/* Render instructions */}
        <div className="instructions">
          <h4>Instructions:</h4>
          <div>{props.dishData.instructions}</div>
        </div>

        {/* Render link */}
        <a href={props.dishData.sourceUrl}>Original Recipe</a>

        {/* Render button */}
        <button disabled={props.isDishInMenu} onClick={() => addToMenu(props.dish)}>Add to Menu!</button>
        <button onClick={backToSearchCB}>Cancel</button>
      </div>
    </div>
  );

}

export default DetailsView;
