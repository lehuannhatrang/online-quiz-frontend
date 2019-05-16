import {
    AUTHENTICATE,
    AUTHENTICATE_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS, 
    FETCH_USERS, 
    FETCH_USERS_ACTIONS, 
    FETCH_USERS_ACTIONS_SUCCESS, 
    FETCH_USERS_SUCCESS,
    FETCH_QUIZZES,
    FETCH_QUIZZES_SUCCESS,
    FETCH_QUESTIONS,
    FETCH_QUESTIONS_SUCCESS,
    FETCH_QUIZ,
    FETCH_QUIZ_SUCCESS,
    FETCH_ROOMS,
    FETCH_ROOMS_SUCCESS,
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

export function fetchQuizzes(){
    return {
        type: FETCH_QUIZZES
    }
}

export function fetchQuizzesSuccess(quizzes){
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuestions(id){
    return {
        type: FETCH_QUESTIONS,
        id
    }
}

export function fetchQuestionsSuccess(questions){
    return {
        type: FETCH_QUESTIONS_SUCCESS,
        questions
    }
}

export function fetchQuiz(id){
    return {
        type: FETCH_QUIZ,
        id
    }
}

export function fetchQuizSuccess(quiz){
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchRooms(){
    return {
        type: FETCH_ROOMS
    }
}

export function fetchRoomsSuccess(rooms){
    return {
        type: FETCH_ROOMS_SUCCESS,
        rooms
    }
}


//-------------------------------------------------------

export function error(error) {
    return {
        type: REQUEST_FAILED,
        error,
    }
}

