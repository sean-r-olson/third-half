const graphicsReducer = (state=[], action) => {
    if ('SET_GRAPHICS' === action.type) {
        return action.payload;
    }
    return state;
}

export default graphicsReducer;