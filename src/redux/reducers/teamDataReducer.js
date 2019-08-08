const teamDataReducer = (state={}, action) => {
    if ('SET_TEAM_DATA' === action.type) {
        console.log(action.payload);
        return action.payload;
    }
    return state;
}

export default teamDataReducer;