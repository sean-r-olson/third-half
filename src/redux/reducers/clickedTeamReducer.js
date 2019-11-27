// listen for action type 
// set clicked team reducer to array of player objects
const clickedTeamReducer = (state=[], action) => {
    if ('SET_CLICKED_TEAM' === action.type) {
        return action.payload;
    }
    return state;
}

export default clickedTeamReducer;
    

  