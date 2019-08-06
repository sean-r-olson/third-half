const teamsReducer = (state=[], action) => {
    if ('SET_TEAMS' === action.type) {
        return action.payload;
    }
    return state;
}

export default teamsReducer;