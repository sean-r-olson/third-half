// listen for action type 
// set countries reducer to array of country objects
const countriesReducer = (state=[], action) => {
    if ('SET_COUNTRIES' === action.type) {
        return action.payload;
    }
    return state;
}

export default countriesReducer;