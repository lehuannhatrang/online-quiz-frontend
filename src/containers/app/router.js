import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../login";
import DashBoard from "../dashboard";
import NotFound from "../errors/NotFound";
import If from "../../components/control/If";
import Quizz from "../teacher/quizz"
import NewQuiz from "../teacher/newquiz"
import Room from "../teacher/room"
import SignUp from "../signup";
import Admin from "../admin";

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
                    <Route exact path="/teacher" component={Quizz}/>
                    <Route exact path="/teacher/quizz" component={Quizz}/>
                    <Route exact path="/teacher/quizz/new" component={NewQuiz}/>
                    <Route exact path="/teacher/room" component={Room}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/admin" component={Admin} />
                    <Route path="" component={NotFound} />
                </Switch>
            </div>
        );
    }
}



export default Router;