import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const selectFormGlobal = state => state.get('form');

const selectForm = (id) => createSelector(selectFormGlobal, form => form.get(id));

const selectLoading = () =>
    createSelector(selectGlobal, global => global.get('loading'));

const selectError = () =>
    createSelector(selectGlobal, global => global.get('error'));

const selectErrorInfo = () =>
    createSelector(selectGlobal, global => global.get('errorInfo'));

const selectCurrentUser = () =>
    createSelector(selectGlobal, global => global.get('currentUser'));

const selectUsers = () =>
    createSelector(selectGlobal, global => global.get('users'));

const selectUserToken = () =>
    createSelector(selectGlobal, global => global.get('userToken'));

const selectUserActions = () =>
    createSelector(selectGlobal, global => global.get('userActions'));

const selectQuizzes = () =>
    createSelector(selectGlobal, global => global.get('quizzes'));

const selectQuestions = () =>
    createSelector(selectGlobal, global => global.get('questions'));

const selectQuiz = () =>
createSelector(selectGlobal, global => global.get('quiz'));

const selectRooms = () =>
createSelector(selectGlobal, global => global.get('rooms'));

const selectPublicQuizzes = () =>
    createSelector(selectGlobal, global => global.get('publicQuizzes'));

const selectReports = () =>
    createSelector(selectGlobal, global => global.get('reports'));
const selectScore = () => 
    createSelector(selectGlobal, global => global.get('score'));

const selectResults = () => 
    createSelector(selectGlobal, global => global.get('results'));

export {
    selectGlobal,
    selectCurrentUser,
    selectUsers,
    selectUserToken,
    selectRouter,
    selectLoading,
    selectError,
    selectErrorInfo,
    selectForm,
    selectUserActions,
    selectQuizzes,
    selectQuestions,
    selectQuiz,
    selectRooms,
    selectPublicQuizzes,
    selectReports,
    selectScore,
    selectResults,
}