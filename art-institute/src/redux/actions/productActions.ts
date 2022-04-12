import { ActionTypes } from "../constants/action-types"
export const setProducts = (products:any) => {
    return{
        type:ActionTypes.SET_PRODUCTS,
        payload: products,
    };
};


