import "/src/style.css"

function SearchFormView(props) {
    return(
        <div>
            <input value={props.text || ""} onChange={(handleInputChangeACB)}></input>
            <select value={props.type || ""} onChange={handleTypeChangeCB}>
                <option value="">
                    Choose:
                </option>    
                { 
                    (props.dishTypeOptions).map(dishTypeOptionsACB)
                }
            </select>
            <button onClick={handleSearchClickACB}>Search!</button>
            <button onClick={backToSummaryACB}>Summary</button>
        </div>
    );
    
    function dishTypeOptionsACB(option) {
        return ( 
            <option key={option} value={option.type}>
            {console.log(option.type)}
            {option}
        </option>
        );
    }
    
    function handleInputChangeACB(event) {
        props.textChange(event.target.value);
        
    }
    
    function handleTypeChangeCB(event) {
        props.typeChange(event.target.value);
    }
    
    function handleSearchClickACB() {
        props.searchClick();
    }
    
    function backToSummaryACB() {
        window.location.hash="#/summary";
    }
}

export default SearchFormView;