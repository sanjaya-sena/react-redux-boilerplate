import { FETCH_USERS, REMOVE_ERRORS, ADD_ERRORS,
    UPDATE_USER_PENDING, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    FETCH_USER_PENDING, FETCH_USER_ERROR, FETCH_USER_SUCCESS,
    FETCH_USERS_START, RECEIVE_USERS, FETCH_USERS_ERROR,
    CREATE_USER_COMPLETED, CREATE_USER_PENDING, CREATE_USER_ERROR } from "../actions/types";
import axios from "axios/index";

export const fetchUsers = () => dispatch => {
    dispatch({
        type: FETCH_USERS_START
    });
    axios.get(`/users`).then(
        (response)=>{
            dispatch({
                type: RECEIVE_USERS,
                payload: response.data
            });
        }
    ).catch( error => {
        dispatch({
            type: FETCH_USERS_ERROR,
            payload: error
        });
    });
};

export const fetchUser = (userId) => dispatch => {
    dispatch({
        type: FETCH_USER_PENDING
    });
    axios.get(`/users/${userId}`).then(
        (response)=>{
            dispatch({
                type: FETCH_USER_SUCCESS,
                payload: response.data
            });
        }
    ).catch( error => {
        dispatch({
            type: FETCH_USER_ERROR,
            payload: error
        });
    });


};

export const updateUser = (user) => dispatch => {

    dispatch({
        type: UPDATE_USER_PENDING
    });

    axios.put('/users/'+user.id, user).then(
        (response)=>{

            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: response.data
            });

            dispatch(fetchUsers());
        }
    )
        .catch(error => {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: error.response.data
            });
        });
};

export const createUser = (user) => dispatch => {

    dispatch({
        type: CREATE_USER_PENDING
    });

    axios.post(`/users`, user).then(
        (response)=>{
            dispatch({
                type: CREATE_USER_COMPLETED,
                payload: response.data
            })
        }

    )
        .catch(error => {
            dispatch({
                type: CREATE_USER_ERROR,
                payload: error.response.data
            });
        })

};
