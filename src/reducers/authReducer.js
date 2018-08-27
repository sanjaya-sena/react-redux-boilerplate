import { LOGIN } from "../actions/types";

const initialState = {

};

export default function (state = initialState, action) {
    switch (action.type){
        case LOGIN:
            return {
                ...state,
                auth:action.payload
            };
        default: return state;
    }
}