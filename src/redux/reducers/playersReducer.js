const playersListReducer = (state=[], action) => {
    if ('SET_PLAYERS' === action.type) {
        return action.payload;
    }
    return state;
}

export default playersListReducer;
