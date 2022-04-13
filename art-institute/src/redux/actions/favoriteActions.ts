import { ActionTypes } from "../constants/action-types"


export const setFavorite = (favorites:any) => {
    return{
        type:ActionTypes.SET_FAVORITE,
        payload: favorites,
    };
};