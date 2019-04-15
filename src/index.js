import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router/immutable';
import configureStore from './web.config/config.store';
import history from "./web.config/history";
import {fromJS} from "immutable";


const initialState = fromJS({});
const store = configureStore(initialState, history);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <App/>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);