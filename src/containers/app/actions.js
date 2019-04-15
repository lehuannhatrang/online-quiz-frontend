import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS, 
    FETCH_USERS, 
    FETCH_USERS_ACTIONS, 
    FETCH_USERS_ACTIONS_SUCCESS, 
    FETCH_USERS_SUCCESS,
    REQUEST_FAILED
} from "./constants";

export function fetchUser() {
    return {
        type: FETCH_USER,
    }
}

export function fetchUserSuccess(user) {
    return {
        type: FETCH_USER_SUCCESS,
        user,
    };
}

export function fetchUsers() {
    return {
        type: FETCH_USERS,
    }
}

export function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        users,
    }
}

export function login(username, password) {
    return {
        type: AUTHENTICATE,
        username,
        password,
    }
}

export function loginSuccess(token, user) {
    return {
        type: AUTHENTICATE_SUCCESS,
        token,
        user,
    }
}


export function fetchUserActions() {
    return {
        type: FETCH_USERS_ACTIONS
    }
}

export function fetchUserActionsSuccess(userActions) {
    return {
        type: FETCH_USERS_ACTIONS_SUCCESS,
        userActions
    }
}

//-------------------------------------------------------

export function error(error) {
    return {
        type: REQUEST_FAILED,
        error,
    }
}

