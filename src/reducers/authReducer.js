import {LOGIN, LOGIN_ERROR} from "../actions/types";

const initialState = {
    token:"",
    errors:{}
};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN:
            console.log('asdsd');
            return {
                ...state,
                token:action.payload
            };
        case LOGIN_ERROR:
            return {
                ...state,
                errors:action.payload
            };
        default: return state;
    }
}