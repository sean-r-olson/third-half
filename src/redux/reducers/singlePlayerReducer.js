const singlePlayerReducer = (state={}, action) => {
    if ('SET_SINGLE_PLAYER' === action.type) {
        return action.payload;
    }
    return state;
}

export default singlePlayerReducer;