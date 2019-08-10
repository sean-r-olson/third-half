const messageReducer = (state=[], action) => {
    if ('SET_MESSAGES' === action.type) {
        console.log(action.payload);
        return action.payload;
    }
    return state;
}

export default messageReducer;