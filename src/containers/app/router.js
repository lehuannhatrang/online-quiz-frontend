import React, {Component} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "../login";
import DashBoard from "../dashboard";
import NotFound from "../errors/NotFound";
import If from "../../components/control/If";
import Quizz from "../teacher/quizz";
import NewQuiz from "../teacher/newquiz";
import EditQuiz from "../teacher/editQuiz";
import Room from "../teacher/room";
import SignUp from "../signup";
import Student from "../student"
import StudentTest from "../student/studentTest"
import Admin from "../admin";
import WrongPermission from "../errors/WrongPermission";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from "../app/selectors";


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

                {/* waiting while data is fetching! */}
                {!this.props.user && (
                    <div>Loading .... </div>
                )}

                {/* User role undefine */}
                {this.props.user && (!this.props.user.userInfo || !this.props.user.userInfo.role) && (
                    <Redirect to={{pathname: '/', state: {redirect: this.props.location.pathname}}} />
                )}

                {/* User route : teacher */}
                {this.props.user && this.props.user.userInfo.role === 'teacher' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/teacher" component={Quizz}/>
                    <Route exact path="/teacher/quizz" component={Quizz}/>
                    <Route exact path="/teacher/quizz/new" component={NewQuiz}/>
                    <Route path='/teacher/quizz/edit' component={EditQuiz}/>
                    <Route path="/teacher/room/" component={Room}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/student" component={WrongPermission}/>
                    <Route path="/admin" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}

                {/* User route: student */}
                {this.props.user && this.props.user.userInfo.role === 'student' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/student" component={Student}/>
                    <Route exact path="/student/test/:roomId" component={StudentTest}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/teacher" component={WrongPermission}/>
                    <Route path="/admin" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}

                {/* User route: admin */}
                {this.props.user && this.props.user.userInfo.role === 'admin' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/admin" component={Admin} />
                    <Route path="/teacher" component={WrongPermission}/>
                    <Route path="/student" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}

                {/* <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/teacher" component={Quizz}/>
                    <Route exact path="/teacher/quizz" component={Quizz}/>
                    <Route exact path="/teacher/quizz/new" component={NewQuiz}/>
                    <Route path='/teacher/quizz/edit' component={EditQuiz}/>
                    <Route path="/teacher/room/" component={Room}/>
                    <Route exact path="/student" component={Student}/>
                    <Route exact path="/student/test/:roomId" component={StudentTest}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route path="/admin" component={Admin} />
                    <Route path="" component={NotFound} />
                </Switch> */}
                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      dispatch
    }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Router);
  