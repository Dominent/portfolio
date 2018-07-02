import { SET_GALLERY_DETAILS } from "./types";

export const setGalleryDetails = details => dispatch => {
    dispatch({
        type: SET_GALLERY_DETAILS,
        payload: details
    })
}