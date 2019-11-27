// listen for action type 
// set message reducer to array of message objects
const messageReducer = (state=[], action) => {
    if ('SET_MESSAGES' === action.type) {
        return action.payload;
    }
    return state;
}

export default messageReducer;