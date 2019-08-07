const privatePostsReducer = (state=[], action) => {
    if ('SET_PRIVATE_POSTS' === action.type) {
        console.log(action.payload);
        return action.payload;
    }
    return state;
}

export default privatePostsReducer;