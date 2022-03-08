import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
    searchValues: searchReducer,
    books: booksReducer
})

export default reducers;