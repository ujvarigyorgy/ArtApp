import { ActionTypes } from "../constants/action-types"


export const setFavorite = (favorites:any) => {
    console.log(favorites,'payload')
    return{
        type:ActionTypes.SET_FAVORITE,
        payload: favorites,
    };
};