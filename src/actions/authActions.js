import {LOGIN, LOGIN_ERROR} from "./types";
import axios from 'axios';

export const login = (postData) =>dispatch => {

    axios.post('/auth/login', postData)
        .then(res => res.json()
        .then(token => dispatch({
        type: LOGIN,
        payload: token
    }))).catch(error => {
        if(error.response.status === 422){
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data
            })
        }
    });
};



