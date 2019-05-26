import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LStudentHeader, LTeacherHeader }from './header';
import { LStudentFooter, LTeacherFooter } from './footer';
import { LStudentDashboard, LTeacherDashboard } from './dashboard';
import StudentTest from './studentTest';
import './index.css';

class Luantnguyen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teacher: {
                headerBackgroundColor: 'transparent',
            },
            student: {
                headerBackgroundColor: 'transparent',
            }
        };

        this.setTeacherBackgroundColor = this.setTeacherBackgroundColor.bind(this);
        this.setStudentBackgroundColor = this.setStudentBackgroundColor.bind(this);
    }

    setTeacherBackgroundColor(val) {
        this.setState({
            teacher: {
                ...this.state.teacher,
                headerBackgroundColor: val,
            },
        });
    }

    setStudentBackgroundColor(val) {
        this.setState({
            student: {
                ...this.state.student,
                headerBackgroundColor: val,
            },
        });
    }

    render() {
        return (
            <Layout className="luantnguyen">
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'teacher' && (
                    <React.Fragment>
                        <LTeacherHeader backgroundCol={this.state.teacher.headerBackgroundColor} user={this.props.user}/>
                        <Switch>
                            <Route exact path="/luantnguyen/dashboard" component={() => (<LTeacherDashboard user={this.props.user} headerBackgroundCol={this.state.teacher.headerBackgroundColor} setHeaderBackgroundCol={this.setTeacherBackgroundColor} />)} />
                            <Redirect to="/luantnguyen/dashboard" />
                        </Switch>
                        <LTeacherFooter />
                    </React.Fragment>
                )}
                {this.props.user && this.props.user.userInfo && this.props.user.userInfo.role === 'student' && (
                    <React.Fragment>
                        <LStudentHeader backgroundCol={this.state.student.headerBackgroundColor} user={this.props.user}/>
                        <Switch>
                            <Route exact path="/luantnguyen/dashboard" component={() => (<LStudentDashboard user={this.props.user} headerBackgroundCol={this.state.student.headerBackgroundColor} setHeaderBackgroundCol={this.setStudentBackgroundColor} />)} />
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