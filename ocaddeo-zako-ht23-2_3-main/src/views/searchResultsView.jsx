import "/src/style.css"

function SearchResultsView(props) {
    return(
        <div>
            {
                (props.searchResults).map(SearchResultsViewACB)
            }
        </div>
    );

    function SearchResultsViewACB(dish) {
        return (
            <span key={dish.id} className="dishImageSpan" onClick={() => handleDishClickCB(dish)}>
              <img src={dish.image} height="100" alt={dish.title}></img>
              <div>{dish.title}</div>
            </span>
          );
        
        function handleDishClickCB(dish) {
            props.dishClicked(dish);
            window.location.hash="#/details";
        }
    }
}

export default SearchResultsView;