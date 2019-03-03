import { SET_GALLERY_DETAILS } from "../actions/types";

const initialState = {
    details: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GALLERY_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        default:
            return state;
    }
}