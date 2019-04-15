import {all, fork, put, takeLatest} from 'redux-saga/effects';
import {
    AUTHENTICATE, 
    FETCH_USER, 
    FETCH_USERS, 
    FETCH_USERS_ACTIONS
} from "./constants";
import {
    error, 
    fetchUserActionsSuccess, 
    fetchUsersSuccess,
    fetchUserSuccess,
    loginSuccess
} from "./actions";

import HttpUtils from '../../utils/http.util';
import {toast} from "react-toastify";

function request() {
    return HttpUtils.getJsonAuthorization('/games');
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchUser() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/user');
        if (data) {
            yield put(fetchUserSuccess(data));
        }
    } catch (err) {
        yield put(error(err.response.data))
    }
}

function* fetchUserWatcher() {
    yield takeLatest(FETCH_USER, fetchUser)
}

function* doFetchUser() {
    yield fork(fetchUserWatcher)
}
/////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchUsers() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/user/list');
        if (data) {
            yield put(fetchUsersSuccess(data));
        }
    } catch (err) {
        yield put(error(err.response.data))
    }
}

function* fetchUsersWatcher() {
    yield takeLatest(FETCH_USERS, fetchUsers)
}

function* doFetchUsers() {
    yield fork(fetchUsersWatcher)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
function* getLoginUser(action) {
    try {
        const data = yield HttpUtils.postJson('/auth/login', {username: action.username, password: action.password});
        if (data) {
            localStorage.setItem('userToken', data.token);
        }
        yield put(loginSuccess(data.token, data.user));
    } catch (err) {
        toast.error(err.response.data.message)
    }
}

function* getLoginUserWatcher() {
    yield takeLatest(AUTHENTICATE, getLoginUser)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* doLogin() {
    yield fork(getLoginUserWatcher)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchUserActions() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/action/list');
        if (data) {
            yield put(fetchUserActionsSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchUserActionsWatcher() {
    yield takeLatest(FETCH_USERS_ACTIONS, fetchUserActions)
}

function* doFetchUserActions() {
    yield fork(fetchUserActionsWatcher)
}

export default function* root() {
    
    try {
        yield all([
            doLogin(),
            doFetchUser(),
            doFetchUserActions(),
            doFetchUsers(),
        ])
    } catch (e) {
        console.log(e)
    }
}
