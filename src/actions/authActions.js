import { LOGIN } from "./types";

export const login = (postData) =>dispatch => {
    fetch('/auth/login',{
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(postData)
    })
        .then(res => res.json())
        .then(token => dispatch({
            type: LOGIN,
            payload: token
        }))
};



