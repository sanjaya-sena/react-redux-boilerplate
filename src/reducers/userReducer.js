import {FETCH_USERS, UPDATE_USER, FETCH_USER} from "../actions/types";

const initialState = {
    items: [],
    item:{},
    user:{}
};

export default function (state = initialState, action) {
    switch (action.type){
        case FETCH_USERS:
            return {
                ...state,
                items:action.payload
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
        default: return state;
    }
}