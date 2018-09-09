import { FETCH_USERS, REMOVE_ERRORS, ADD_ERRORS, FETCH_USER } from "../actions/types";
import {LOGIN} from "./types";
import axios from "axios/index";

export const fetchUsers = () => dispatch => {
    fetch('/users')
        .then(res => res.json())
        .then(users => dispatch({
            type: FETCH_USERS,
            payload: users
        }));
};

export const fetchUser = (userId,func) => dispatch => {

    axios.get('/users/'+userId).then(
        (request)=>{
            dispatch({
                type: FETCH_USER,
                payload: request.data
            });
            func();
        }
    ).catch( error => {
        console.log(error.response.data.data);

    });

};

export const updateUser = (user) => dispatch => {
    axios.put('/users/'+user.id, user).then(
        (request)=>{

            dispatch({
                type: REMOVE_ERRORS
            });

            dispatch({
                type: FETCH_USERS,
                payload: request.data
            });
        }
    )
        .catch(error => {
            if(error.response.status === 422 || error.response.status === 400){
                // dispatch({
                //     type: REMOVE_ERRORS
                // });
                dispatch({
                    type: ADD_ERRORS,
                    payload: error.response.data
                });
            }
        });
};

