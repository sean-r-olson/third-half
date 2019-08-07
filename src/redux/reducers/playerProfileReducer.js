const playerProfileReducer = (state={}, action) => {
    if ('SET_PLAYER_PROFILE' === action.type) {
        return action.payload;
    }
    return state;
}

export default playerProfileReducer;