import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../login";
import DashBoard from "../dashboard";
import NotFound from "../errors/NotFound";
import If from "../../components/control/If";
import Teacher from "../teacher";
import SignUp from "../signup";

class Router extends Component {
    constructor(props) {
        super(props);
    }

    unAuthorizedUrl = [
        "/",
        "/login",
        "/signup"
    ]

    render() {
        return (
            <div>
                <If condition={!(this.unAuthorizedUrl.indexOf(this.props.location.pathname) > -1) && !localStorage.getItem('userToken')}>
                    <Redirect to={{pathname: '/login', state: {redirect: this.props.location.pathname}}} />
                </If>
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/teacher" component={Teacher}/>
                    <Route path="" component={NotFound} />
                </Switch>
            </div>
        );
    }
}



export default Router;