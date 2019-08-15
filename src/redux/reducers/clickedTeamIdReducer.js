const clickedTeamIdReducer = (state={}, action) => {
    if ('SET_CLICKED_TEAM_ID' === action.type) {
        console.log(action.payload)
        return action.payload;
    }
    return state;
}

export default clickedTeamIdReducer;
