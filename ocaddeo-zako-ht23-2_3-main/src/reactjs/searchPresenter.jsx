import { observer } from "mobx-react-lite";
import SearchFormView from "../views/searchFormView.jsx";
import SearchResultsView from "../views/searchResultsView.jsx";

export default observer(
    function Search(props){
        
        function showSearchResults(searchState){
                
                if(!searchState.promise) {
                    return <div>no data</div>
                }

                if(!searchState.data && !searchState.error) {
                    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />
                }

                if(searchState.error) {
                    return <div>Error: {searchState.error}</div>
                }

                if(searchState.data) {
                    return <div>
                        <SearchResultsView
                            searchResults={searchState.data}
                            dishClicked={handleDishChosen}
                        /> 
                    </div>
                }
            
        }
        
        function handleDishChosen(dish) {
            return props.model.setCurrentDish(dish.id)
        }
        
        function textChangeCB(text) {
            return props.model.setSearchQuery(text)
        }

        function typeChangeCB(type) {
            return props.model.setSearchType(type)
        }

        function searchClickCB() {
            return props.model.doSearch(props.model.searchParams)
        }

        return<div>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]}
                textChange={textChangeCB}
                typeChange={typeChangeCB}
                searchClick={searchClickCB}
                text={props.model.searchParams.query}
                type={props.model.searchParams.type}
                
            /> {showSearchResults(props.model.searchResultsPromiseState)}
        </div>
    }
);