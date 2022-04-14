import { combineReducers } from "redux";
import { artworkReducer } from "./artworkReducer";
import { favoriteReducer } from "./favoriteReducer";


const reducers = combineReducers({
    allArtworks:artworkReducer,
    favoriteArtworks:favoriteReducer,
})

export default reducers