import { combineReducers } from 'redux';
import postReducer from './postReducer';
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
    posts: postReducer,
    users: userReducer,
    auth: authReducer,
    errors: errorReducer
});