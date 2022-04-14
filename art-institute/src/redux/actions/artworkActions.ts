import { ActionTypes } from "../constants/action-types"
export const setArtworks = (artworks:any) => {
    return{
        type:ActionTypes.SET_ARTWORKS,
        payload: artworks,
    };
};


