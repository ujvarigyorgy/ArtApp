import { ActionTypes } from "../constants/action-types"

const initialState = {
    products:[],
    favorites:[],

}


export const productReducer = (state = initialState, {type, payload}:any) => {
    switch(type) {
        case ActionTypes.SET_PRODUCTS:
            console.log(state,'product reducer')
            return {...state, products:payload};
        case ActionTypes.SET_FAVORITE:
            console.log(state,'favorite reducer')
            return {...state, favorites:payload};
        default:
            return state;
    }

}

