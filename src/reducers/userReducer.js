import {FETCH_USERS, UPDATE_USER, FETCH_USER, RESET_USERS_MESSAGE, RESET_USERS_SUCCESS} from "../actions/types";

const initialState = {
    items: [],
    success:false,
    message:"",
    item:{},
    user:{}
};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_USERS:
            return {
                ...state,
                items:action.payload.users,
                success: action.payload.success,
                message: action.payload.message
            };
        case UPDATE_USER:
            return {
                ...state,
                item:action.payload
            };
        case FETCH_USER:
            return {
                ...state,
                user:action.payload
            };
        case RESET_USERS_MESSAGE:
            return {
                ...state,
                message:""
            };
        case RESET_USERS_SUCCESS:
            return {
                ...state,
                success:false
            };
        default: return state;
    }
}