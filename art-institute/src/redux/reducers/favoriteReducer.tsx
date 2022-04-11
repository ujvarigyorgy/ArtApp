import { ActionTypes } from "../constants/action-types"

const initialState = {
    favorites:[]
}


export const favoriteReducer = (state = initialState, {type, payload}:any) => {
    switch(type) {
        case ActionTypes.SET_FAVORITE:
            return {...state, products:payload};
        default:
            return state;
    }

}