// listen for action type 
// set private posts reducer to array of private post objects (from user's belonged team)
const privatePostsReducer = (state=[], action) => {
    if ('SET_PRIVATE_POSTS' === action.type) {
        return action.payload;
    }
    return state;
}

export default privatePostsReducer;