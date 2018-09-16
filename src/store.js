import  {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import rootReducer from "./reducers";
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};

const middleware = [promise(),thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store;