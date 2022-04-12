import { ActionTypes } from "../constants/action-types"

const initialState = {
    products:[],
    favorites:[]

}


export const productReducer = (state = initialState, {type, payload}:any) => {
    switch(type) {
        case ActionTypes.SET_PRODUCTS:
            console.log(state,'state reducer')
            return {...state, products:payload};
        default:
            return state;
    }

}

export const favoriteReducer = (state = initialState, {type, payload}:any) => {
    switch(type) {
        case ActionTypes.SET_FAVORITE:
            console.log(state,'state')
            return {...state, favorites:payload};
        default:
            return state;
    }

}