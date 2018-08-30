import {ADD_ERRORS, REMOVE_ERRORS} from "../actions/types";

const initialState = {
    items:{}
};

export default function (state = initialState, action) {
    switch (action.type){
        case ADD_ERRORS:
            return {
                ...state,
                items:action.payload
            };
        case REMOVE_ERRORS:
            return {
                ...state,
                items:{}
            };
        default: return state;
    }
}