import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import LStudentFooter from './footer';
import LStudentDashboard from './dashboard';
import StudentTest from './studentTest';
import StudentResult from './studentResult';
import './index.css';

class Luantnguyen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout className="luantnguyen">
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'student' && (
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/student/dashboard" component={() => (<LStudentDashboard user={this.props.user} />)} />
                            <Route exact path="/student/student/test/:roomId" component={() => (<StudentTest student={this.props.user} />)} />
                            <Route exact path="/student/student/result/:resultId" component={() => (<StudentResult student={this.props.user} />)} />
                            <Redirect to="/student/dashboard" />
                        </Switch>
                        <LStudentFooter />
                    </React.Fragment>
                )}
            </Layout>
        );
    }
};

export default Luantnguyen;