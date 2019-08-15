const clickedTeamReducer = (state=[], action) => {
    if ('SET_CLICKED_TEAM' === action.type) {
        return action.payload;
    }
    return state;
}

export default clickedTeamReducer;
    

  