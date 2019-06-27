import { SET_PROJECTS, GET_ERRORS } from "./types";
import axios from 'axios';

export const getProjects = dispatch => {
    axios.get('/api/projects')
        .then(res => dispatch({
            type: SET_PROJECTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}