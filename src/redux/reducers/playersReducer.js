// listen for action type 
// set players list reducer to array of player objects (user's belonged team)
const playersListReducer = (state=[], action) => {
    if ('SET_PLAYERS' === action.type) {
        return action.payload;
    }
    return state;
}

export default playersListReducer;
