import {LOGIN, ADD_ERRORS, REMOVE_ERRORS} from "./types";
import axios from 'axios';

export const login = (postData) =>dispatch => {

    axios.post('/auth/login', postData).then(
        (request)=>{
            dispatch({
                type: LOGIN,
                payload: request.data.token
            });
            dispatch({
                type: REMOVE_ERRORS
            })
        }
    )
        .catch(error => {
        if(error.response.status === 422){
            dispatch({
                type: ADD_ERRORS,
                payload: error.response.data
            })
        }
    });
};



