import {fromJS} from 'immutable';
import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    REQUEST_FAILED,
    FETCH_USERS, 
    FETCH_USERS_SUCCESS, 
    FETCH_USERS_ACTIONS, 
    FETCH_QUIZZES,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUESTIONS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUIZ,
    FETCH_QUIZ_SUCCESS,
    FETCH_ROOMS,
    FETCH_ROOMS_SUCCESS,
    //FETCH_ROOMS_FAILED,
    FETCH_PUBLIC_QUIZZES,
    FETCH_PUBLIC_QUIZZES_SUCCESS,
    FETCH_USERS_ACTIONS_SUCCESS
} from "./constants";

const initialState = fromJS({
    loading: false,
    error: false,
    errorInfo: '',
    currentUser: '',
    userToken: localStorage.getItem('userToken'),
    userId: localStorage.getItem('userId'),
    users: [],
    quizzes: [],
    questions: [],
    quiz: {},
    rooms: [],
    publicQuizzes: [],
});

function appReducer(state = initialState, action) {
    switch (action.type) {

        case FETCH_USER:
            return state.set('loading', true).set('error', false);
        case FETCH_USER_SUCCESS:
            return state.set('currentUser', action.user).set('error', false).set('loading', false);

        case FETCH_USERS:
            return state.set('loading', true).set('error', false);
        case FETCH_USERS_SUCCESS:
            return state.set('users', action.users).set('error', false).set('loading', false);

        case AUTHENTICATE:
            return state.set('loading', true).set('error', false);
        case AUTHENTICATE_SUCCESS:
            return state.set('userId', action.userId).set('userToken', action.token).set('loading', false).set('currentUser', action.user);

        case FETCH_USERS_ACTIONS:
            return state.set('loading', true).set('error', false);
        case FETCH_USERS_ACTIONS_SUCCESS:
            return state.set('userActions', action.userActions).set('loading', false);

        case FETCH_QUIZZES:
            return state.set('loading', true).set('error', false);
        case FETCH_QUIZZES_SUCCESS:
            return state.set('quizzes', action.quizzes).set('error', false).set('loading', false);

        case FETCH_QUESTIONS:
            return state.set('loading', true).set('error', false);
        case FETCH_QUESTIONS_SUCCESS:
            return state.set('questions', action.questions).set('error', false).set('loading', false);

        case FETCH_QUIZ:
            return state.set('loading', true).set('error', false);
        case FETCH_QUIZ_SUCCESS:
            return state.set('quiz', action.quiz).set('error', false).set('loading', false);

        case FETCH_ROOMS:
            return state.set('loading', true).set('error', false);
        case FETCH_ROOMS_SUCCESS:
            return state.set('rooms', action.rooms).set('error', false).set('loading', false);
        // case FETCH_ROOMS_FAILED:
        //     return start.set('rooms', null).set('error', true).set('errorInfo', action.errorMessage).set('loading', false);

        case FETCH_PUBLIC_QUIZZES:
            return state.set('loading', true).set('error', false);
        case FETCH_PUBLIC_QUIZZES_SUCCESS:
            return state.set('publicQuizzes', action.quizzes).set('error', false).set('loading', false);

        case REQUEST_FAILED:
            return state.set('error', true).set('errorInfo', action.error).set('loading', false)
        default:return state;
    }
}

export default appReducer;