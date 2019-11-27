// listen for action type 
// set team data reducer to logged in user's belonged team info
const teamDataReducer = (state={}, action) => {
    if ('SET_TEAM_DATA' === action.type) {
        return action.payload;
    }
    return state;
}

export default teamDataReducer;