import {LOGIN, LOGIN_ERROR} from "../actions/types";

const initialState = {
    token:"",
    user:{}
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                token:action.payload.token,
                user:action.payload.user
            };
        default: return state;
    }
}