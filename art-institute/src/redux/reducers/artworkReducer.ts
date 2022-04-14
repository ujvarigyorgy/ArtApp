import { ActionTypes } from "../constants/action-types"

const initialState = {
    artworks:[],

}


export const artworkReducer = (state = initialState, {type, payload}:any) => {
    switch(type) {
        case ActionTypes.SET_ARTWORKS:
            return {...state, artworks:payload};
        default:
            return state;
    }

}

