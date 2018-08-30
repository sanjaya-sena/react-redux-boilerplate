import {LOGIN, LOGIN_ERROR} from "./types";
import axios from 'axios';

export const login = (postData) =>dispatch => {

    axios.post('/auth/login', postData).then(
        (request)=>{
            dispatch({
                type: LOGIN,
                payload: request.data.token
            })
        }
    )
        .catch(error => {
        if(error.response.status === 422){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data
            })
        }

        if(error.response.status === 400){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data
            })
        }
    });
};



