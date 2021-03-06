import { initialState, ProjectState } from '../state/project.state';
import { createProjectSuccessAction, fetchProjectsSuccessAction, createProjectDetailsSuccessAction, fetchProjectDetailsSuccessAction, fetchProjectDetailsFailureAction, cleanProjectDetailsAction } from '../actions/project.actions';

export function projectReducer(state = initialState, action): ProjectState {
    switch (action.type) {
        case createProjectSuccessAction.type: {
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        }
        case createProjectDetailsSuccessAction.type: {
            return {
                ...state,
                projectDetails: action.payload
            }
        }
        case fetchProjectsSuccessAction.type: {
            return {
                ...state,
                projects: action.payload
            }
        }
        case fetchProjectDetailsSuccessAction.type: {
            return {
                ...state,
                projectDetails: action.payload
            }
        }
        case cleanProjectDetailsAction.type: {
            return {
                ...state,
                projectDetails: null
            }
        }
        default:
            return state;
    }
}