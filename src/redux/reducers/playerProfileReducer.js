const playerProfileReducer = (state={}, action) => {
    if ('SET_PLAYER_PROFILE' === action.type) {
        return action.payload;
    } else if ('CLEAR_PLAYER_PROFILE' === action.type) {
        return {};
    }
    return state;
}

export default playerProfileReducer;