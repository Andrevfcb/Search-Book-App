const booksReducer = (state={
    list: [],
    maxNumber: 10,
}, action) => {
    switch(action.type) {
        case 'fetch':
            return state = {
                ...state,
                list: action.payload
            };
        case 'changeNumber':
            return state = {
                ...state,
                maxNumber: action.payload ? state.maxNumber + action.payload : 10
            };
        default:
            return state;
    }
}

export default booksReducer;