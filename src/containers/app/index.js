import React, {Component} from 'react';
import '../../public/assets/css/style.css';
import '../../public/assets/css/style.min.css';
import '../../public/style.css';
import Router from './router';
import injectReducer from "../../utils/injectReducer";
import reducer from "./reducer";
import injectSaga from "../../utils/injectSaga";
import saga from "./sagas";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser, selectError, selectErrorInfo, selectLoading} from "./selectors";
import {
    fetchUser, 
    fetchUserActions
} from "./actions";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {withRouter} from 'react-router-dom';
import Error from "../errors";
import queryString from 'query-string';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (localStorage.getItem('userToken')) {
            this.props.fetchUser();
        }
    }

    componentWillMount() {
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.authorization) {
            localStorage.setItem('userToken', parsed.authorization);
        }
        if (parsed.user) {
            localStorage.setItem('user', parsed.user)
        }
        this.props.history.push(this.props.location.pathname);
    }

    render() {
        if (this.props.hasError && this.props.error.status !== 401) {
            return <Error error={this.props.error}/>
        } else if (this.props.error.status === 401) {
            localStorage.removeItem('userToken')
        }
        return (
            <div>
                <Router location={this.props.location} />
                <ToastContainer />
            </div>
        );
    }
}

const withReducer = injectReducer({key: 'global', reducer});
const withSaga = injectSaga({key: 'global', saga });

const mapStateToProps = createStructuredSelector({
    loading: selectLoading(),
    user: selectCurrentUser(),
    hasError: selectError(),
    error: selectErrorInfo(),
});


function mapDispatchToProps(dispatch) {
    return {
        fetchUser: () => dispatch(fetchUser()),
        fetchSourceConfiguration: () => dispatch(fetchSourceConfiguration()),
        fetchTokenTypes: () => dispatch(fetchTokenTypes()),
        fetchSourceTypes: () => dispatch(fetchSourceTypes()),
        fetchSourceFields: () => dispatch(fetchSourceFields()),
        fetchGames: () => dispatch(fetchGames()),
    }
}

export default compose(
    withRouter,
    withReducer,
    withSaga,
    connect(mapStateToProps, mapDispatchToProps),
)(App);