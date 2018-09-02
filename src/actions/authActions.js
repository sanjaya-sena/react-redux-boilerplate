import {LOGIN, ADD_ERRORS, REMOVE_ERRORS} from "./types";
import axios from 'axios';

export const login = (postData) =>dispatch => {

    axios.post('/auth/login', postData).then(
        (request)=>{
            dispatch({
                type: LOGIN,
                payload: request.data.token
            });
            localStorage.setItem('token',request.data.token);
            
            dispatch({
                type: REMOVE_ERRORS
            })
        }
    )
        .catch(error => {
        if(error.response.status === 422 || error.response.status === 400){
            dispatch({
                type: REMOVE_ERRORS
            });
            dispatch({
                type: ADD_ERRORS,
                payload: error.response.data
            });
        }
    });
};



