// listen for action type 
// set teams reducer to array of team objects
const teamsReducer = (state=[], action) => {
    if ('SET_TEAMS' === action.type) {
        return action.payload;
    }
    return state;
}

export default teamsReducer;