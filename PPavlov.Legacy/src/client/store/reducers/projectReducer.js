import { SET_PROJECTS } from "../actions/types";

const initialState = {
    projects: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        default:
            return state;
    }
}