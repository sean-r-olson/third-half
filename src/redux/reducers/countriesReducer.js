const countriesReducer = (state=[], action) => {
    if ('SET_COUNTRIES' === action.type) {
        return action.payload;
    }
    return state;
}

export default countriesReducer;