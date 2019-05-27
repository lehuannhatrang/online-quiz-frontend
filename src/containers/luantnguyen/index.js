import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LStudentFooter, LTeacherFooter } from './footer';
import { LStudentDashboard, LTeacherDashboard } from './dashboard';
import StudentTest from './studentTest';
import './index.css';

class Luantnguyen extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Layout className="luantnguyen">
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'teacher' && (
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/luantnguyen/dashboard" component={() => (<LTeacherDashboard user={this.props.user} />)} />
                            <Redirect to="/luantnguyen/dashboard" />
                        </Switch>
                        <LTeacherFooter />
                    </React.Fragment>
                )}
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'student' && (
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/luantnguyen/dashboard" component={() => (<LStudentDashboard user={this.props.user} />)} />
                            <Route exact path="/luantnguyen/student/test/:roomId" component={() => (<StudentTest student={this.props.user} />)} />
                            <Redirect to="/luantnguyen/dashboard" />
                        </Switch>
                        <LStudentFooter />
                    </React.Fragment>
                )}
            </Layout>
        );
    }
};

export default Luantnguyen;