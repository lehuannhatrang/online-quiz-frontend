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
import QuizResult from "../student/quizResult"
import ReportTeacher from "../teacher/reportTeacher"
import RoomReport from "../teacher/roomReport"
import StudentResult from "../student/studentResult"
import Admin from "../admin";
import Luantnguyen from '../luantnguyen';
import WrongPermission from "../errors/WrongPermission";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from "../app/selectors";
import Teacher from "../../containers/teacher";
import Forum from "../../containers/forum";


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

                {(!this.props.user || !this.props.user.userInfo) && this.unAuthorizedUrl.indexOf(location.pathname) > -1 && (
                    <Switch>
                        <Route exact path="/" component={DashBoard}/>
                        <Route exact path="/forum" component={Forum}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                )                   
                }

                {/* waiting while data is fetching! */}
                {!this.props.user && !(this.unAuthorizedUrl.indexOf(location.pathname) > -1) && (
                    <div>Loading .... </div>
                )}

                {/* User role undefine */}
                {this.props.user && (!this.props.user.userInfo || !this.props.user.userInfo.role) && (
                    <Redirect to={{pathname: '/', state: {redirect: this.props.location.pathname}}} />
                )}

                {/* User route : teacher */}
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'teacher' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route path="/teacher" component={Teacher}/>
                    <Route exact path="/forum" component={Forum}/>     
                    <Route path="/student" component={WrongPermission}/>
                    <Route path="/admin" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}

                {/* User route: student */}
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'student' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route exact path="/forum" component={Forum}/>
                    <Route path="/student" component={() => (<Luantnguyen user={this.props.user} />)}/>
                    <Route exact path="/student/test/:roomId" component={StudentTest}/>
                    <Route exact path="/student/result" component={StudentResult}/>
                    <Route exact path="/student/result/:quizid" component={QuizResult}/>
                    <Route path="/teacher" component={WrongPermission}/>
                    <Route path="/admin" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}

                {/* User route: admin */}
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'admin' && (
                <Switch>
                    <Route exact path="/" component={DashBoard}/>
                    <Route path="/admin" component={() => (<Admin admin={this.props.user} />)} />
                    <Route path="/teacher" component={WrongPermission}/>
                    <Route path="/student" component={WrongPermission}/>
                    <Route path="" component={NotFound} />
                </Switch>
                )}
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
  