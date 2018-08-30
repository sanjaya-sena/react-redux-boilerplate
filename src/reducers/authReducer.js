import {LOGIN, LOGIN_ERROR} from "../actions/types";

const initialState = {
    token:""
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                token:action.payload
            };
        default: return state;
    }
}