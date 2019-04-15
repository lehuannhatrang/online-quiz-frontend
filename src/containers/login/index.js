import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {login} from "../app/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectUserToken} from "../app/selectors";
import Config from "../../../configs";
import LoginForm from "./Form";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username:'',
                password:''
            }
        }

    }

    componentWillMount() {
        const redirect = this.props.location.state ? this.props.location.state.redirect ? this.props.location.state.redirect : '/' : '/';
        // if (!localStorage.getItem('userToken') && !localStorage.getItem('user')) {
        //     window.location = `${Config.BACKEND_API_URL}/auth/login/local?redirect=${Config.FRONT_END_HOST}${redirect}&checkUser=true`
        // }
    }

    onSubmitForm(fields) {
        this.props.login(fields.get('username'), fields.get('password'));
    }

    render() {
        // if (!localStorage.getItem('userToken') && !localStorage.getItem('user')) {
        //     return <div />
        // }
        const redirect = this.props.location.state ? this.props.location.state.redirect ? this.props.location.state.redirect : '/' : '/';
        if (localStorage.getItem('userToken')) {
            return <Redirect to={redirect}/>
        }
        return (
            <div className="center-screen">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card-group">
                                <div className="card p-4">
                                    <div className="card-body">
                                        <LoginForm onSubmit={(fields) => this.onSubmitForm(fields) } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

const mapStateToProps = createStructuredSelector({
    token: selectUserToken(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);