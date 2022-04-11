import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
// import { favoriteReducer } from "./favoriteReducer";


const reducers = combineReducers({
    allArtworks:productReducer,
    // favoriteArtworks:favoriteReducer,
})

export default reducers