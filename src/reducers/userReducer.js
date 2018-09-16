import {FETCH_USERS,
    UPDATE_USER_PENDING, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
    FETCH_USER_PENDING, FETCH_USER_ERROR, FETCH_USER_SUCCESS,
    FETCH_USERS_START, RECEIVE_USERS, FETCH_USERS_ERROR,
    CREATE_USER_COMPLETED, CREATE_USER_PENDING, CREATE_USER_ERROR } from "../actions/types";

const initialState = {
    users:{
        data:{},
        fetching:false,
        fetched:false,
        success:false,
        error:null
    },
    user:{
        data:null,
        loading:false,
        fetched:false,
        updated:false,
        error:null
    },

};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_USERS:
            return {
                ...state,
                users:{
                    data:action.payload
                }
            };
        case FETCH_USERS_START:
            return {
                ...state,
                users:{
                    ...state.users,
                    fetching:true
                }
            };
        case FETCH_USERS_ERROR:
            return {
                ...state,
                users:{
                    error:action.payload
                }
            };
        case RECEIVE_USERS:
            return {
                ...state,
                users:{
                    data:action.payload,
                    fetched:true,
                    fetching:false
                }
            };
        case UPDATE_USER_PENDING:
            return {
                ...state,
                user:{
                    loading:true
                }
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user:{
                    data:action.payload,
                    loading:false,
                    updated:true
                }
            };
        case UPDATE_USER_ERROR:
            return {
                ...state,
                user:{
                    error:action.payload
                }
            };
        case FETCH_USER_PENDING:
            return {
                ...state,
                user:{
                    loading:true
                }
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                user:{
                    data:action.payload,
                    loading:false,
                    fetched:true
                }
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                user:{
                    error:action.payload
                }
            };
        case CREATE_USER_PENDING:
            return {
                ...state,
                user:{
                    loading:true
                }
            };
        case CREATE_USER_COMPLETED:
            return {
                ...state,
                user:{
                    data:action.payload,
                    loading:false,
                    success:true,
                    error:null
                }
            };
        case CREATE_USER_ERROR:
            return {
                ...state,
                user:{
                    error:action.payload
                }
            };
        default: return state;
    }
}