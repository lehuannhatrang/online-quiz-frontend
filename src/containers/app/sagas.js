import {all, fork, put, takeLatest} from 'redux-saga/effects';
import {
    AUTHENTICATE, 
    FETCH_USER, 
    FETCH_USERS, 
    FETCH_USERS_ACTIONS,
    FETCH_QUIZZES,
    FETCH_QUESTIONS,
    FETCH_QUIZ,
    FETCH_ROOMS,
    FETCH_PUBLIC_QUIZZES,
    FETCH_REPORTS,
    FETCH_RESULTS,
    POST_RESULT,
} from "./constants";
import {
    error, 
    fetchUserActionsSuccess, 
    fetchUsersSuccess,
    fetchUserSuccess,
    loginSuccess,
    fetchQuizzesSuccess,
    fetchQuestionsSuccess,
    fetchQuizSuccess,
    fetchRoomsSuccess,
    fetchPublicQuizzesSuccess,
    fetchReportsSuccess,
    postResultSuccess,
    fetchMyResultsSuccess,
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
function* postUserResult(action) {
    debugger;
    try {
        const data = yield HttpUtils.postJsonAuthorization('/result', {room: action.room, userAnswer: action.userAnswer});
        yield put(postResultSuccess(data.score));
    } catch (err) {
        console.log('Error');
    }
}

function* postUserResultWatcher() {
    yield takeLatest(POST_RESULT, postUserResult)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* doPostUserResult() {
    yield fork(postUserResultWatcher)
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
    yield fork(fetchQuizzesWatcher)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchQuizzes() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/quiz');
        if (data) {
            yield put(fetchQuizzesSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchQuizzesWatcher() {
    yield takeLatest(FETCH_QUIZZES, fetchQuizzes)
}

function* doFetchQuizzes() {
    yield fork(fetchUserActionsWatcher)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchMyResults() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/result/my');
        if (data) {
            yield put(fetchMyResultsSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchMyResultsWatcher() {
    yield takeLatest(FETCH_RESULTS, fetchMyResults)
}

function* doFetchMyResults() {
    yield fork(fetchMyResultsWatcher)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchQuestions(target) {
    try {
        const data = yield HttpUtils.getJsonAuthorization(`/quiz/questions/${target.id}`);
        if (data) {
            yield put(fetchQuestionsSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchQuestionsWatcher() {
    yield takeLatest(FETCH_QUESTIONS, fetchQuestions)
}

function* doFetchQuestions() {
    yield fork(fetchQuestionsWatcher)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchQuiz(target) {
    try {
        const data = yield HttpUtils.getJsonAuthorization(`/quiz?id=${target.id}`);
        if (data) {
            yield put(fetchQuizSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchQuizWatcher() {
    yield takeLatest(FETCH_QUIZ, fetchQuiz)
}

function* doFetchQuiz() {
    yield fork(fetchQuizWatcher)
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchRooms(params) {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/room/list', {roomId: params.roomId});
        if (data) {
            yield put(fetchRoomsSuccess(data));
        }
    } catch (e) {
        console.log(e);
    }
}

function* fetchRoomsWatcher() {
    yield takeLatest(FETCH_ROOMS, fetchRooms)
}

function* doFetchRooms() {
    yield fork(fetchRoomsWatcher)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchPublicQuizzes() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/quiz/public');
        if (data) {
            yield put(fetchPublicQuizzesSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchPublicQuizzesWatcher() {
    yield takeLatest(FETCH_PUBLIC_QUIZZES, fetchPublicQuizzes)
}

function* doFetchPublicQuizzes() {
    yield fork(fetchPublicQuizzesWatcher)
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function* fetchReports() {
    try {
        const data = yield HttpUtils.getJsonAuthorization('/report/list');
        if (data) {
            yield put(fetchReportsSuccess(data));
        }
    } catch (e) {
        console.log(e)
    }
}

function* fetchReportsWatcher() {
    yield takeLatest(FETCH_REPORTS, fetchReports)
}

function* doFetchReports() {
    yield fork(fetchReportsWatcher)
}


export default function* root() {
    
    try {
        yield all([
            doLogin(),
            doFetchUser(),
            doFetchUserActions(),
            doFetchUsers(),
            doFetchQuizzes(),
            doFetchQuestions(),
            doFetchQuiz(),
            doFetchRooms(),
            doFetchPublicQuizzes(),
            doFetchReports(),
            doFetchMyResults(),
            doPostUserResult(),
        ])
    } catch (e) {
        console.log(e)
    }
}
