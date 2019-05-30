import React, { Component } from 'react';
import AdminUserNotifications from './AdminNotificationsComponent';
import { message } from 'antd';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsers, selectLoading } from "../app/selectors";
import { withRouter } from 'react-router-dom';

class AdminStudentNotifications extends AdminUserNotifications {
    constructor(props) {
        super(props);
        this.type = 'Student';
    }

    fetch(data) {
        let students = [];
        for (let i = 0; i < data.length; ++i) {
            if (data[i].userInfo.role === 'student' && data[i].status === 'PENDING') {
                const student = {
                    id: data[i].id,
                    name: data[i].userInfo.displayName,
                    phone: data[i].userInfo.phone,
                    mail: data[i].userInfo.mail,
                    school: 'Le Hong Phong High School',
                    sex: (Math.random() < 0.5 ? 'Male' : 'Female'),
                }
                students.push(student);
            }
        }
        return students;
    }

    activeUser(id) {
        message.success('You actived student with id ' + id);
    }

    inActiveUser(id) {
        message.error('You inactived student with id ' + id);
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers(),
    loading: selectLoading(),
});
  

export default withRouter(connect(mapStateToProps)(AdminStudentNotifications));