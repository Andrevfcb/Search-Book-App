const searchReducer = (state={
    title: '',
    author: false,
    language: false,
    publishedDate: {
        startDate: false,
        endDate: false
    }
}, action) => {
    switch(action.type) {
        case 'titleChange':
            return state = {
                ...state,
                title: action.payload}
        case 'authorChange':
            return state = {
                ...state,
                author: action.payload ? action.payload : false}
        case 'languageChange':
            return state = {
                ...state,
                language: action.payload === "false" ? false : action.payload}
        case 'publishedDateChange':
            return state = {
                ...state,
                publishedDate: {
                    startDate: !!action.payload.startDate ? action.payload.startDate : action.payload.startDate.length !== 0 ? state.publishedDate.startDate : false,
                    endDate: !!action.payload.endDate ? action.payload.endDate : action.payload.endDate.length !== 0 ? state.publishedDate.endDate : false
                }}
        default:
            return state;
    }
}

export default searchReducer;