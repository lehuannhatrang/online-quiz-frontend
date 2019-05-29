import React, {Component} from 'react';
import {Redirect} from "react-router-dom";
import {login} from "../app/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import { fetchUser } from '../app/actions';
import {selectUserToken, selectCurrentUser} from "../app/selectors";
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

    componentDidUpdate(){
        if(localStorage.getItem('userToken'))  
            this.props.fetchUser();
    }

    onSubmitForm(fields) {
        this.props.login(fields.get('username'), fields.get('password'));
    }

    render() {
        if (localStorage.getItem('userToken')) {
            if(!this.props.user) return(
                <div>
                    Navigating ...
                    Please wait ...
                </div>
            )
            if(this.props.user && (!this.props.user.userInfo || !this.props.user.userInfo.role))
            return(
                <div>
                    Navigating ...
                    Please wait ...
                </div>
            )

            if(this.props.user && !this.props.user.userInfo)    
                return <Redirect to='/'/>

            if(this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'teacher')    
                return <Redirect to='/teacher'/>

            if(this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'student')    
                return <Redirect to='/student'/>
            
            if(this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'admin')    
                return <Redirect to='/admin'/>

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
        login: (username, password) => dispatch(login(username, password)),
        fetchUser: () => dispatch(fetchUser())
    }
}

const mapStateToProps = createStructuredSelector({
    token: selectUserToken(),
    user: selectCurrentUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);