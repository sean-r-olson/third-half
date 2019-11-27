// listen for action type 
// set player profile reducer to object with logged in user's player info
// if action type is clear player profile (delete profile), set reducer to empty object
const playerProfileReducer = (state={}, action) => {
    if ('SET_PLAYER_PROFILE' === action.type) {
        return action.payload;
    } else if ('CLEAR_PLAYER_PROFILE' === action.type) {
        return {};
    }
    return state;
}

export default playerProfileReducer;