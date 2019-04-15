import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable';
import {reducer as formReducer} from 'redux-form/immutable';

import history from './history';
import globalReducer from '../containers/app/reducer';

export default function createReducer(injectedReducers = {}) {
    const rootReducer = combineReducers({
        global: globalReducer,
        form: formReducer,
        ...injectedReducers,
    });

    const mergeWithRouterState = connectRouter(history);
    return mergeWithRouterState(rootReducer);
}