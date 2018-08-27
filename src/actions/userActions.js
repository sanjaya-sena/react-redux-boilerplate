import { FETCH_USERS } from "../actions/types";

export const fetchUsers = () =>dispatch => {
    fetch('/users')
        .then(res => res.json())
        .then(users => dispatch({
            type: FETCH_USERS,
            payload: users
        }));
};


