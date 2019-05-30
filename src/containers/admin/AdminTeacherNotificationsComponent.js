import React, { Component } from 'react';
import AdminUserNotifications from './AdminNotificationsComponent';
import { message } from 'antd';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsers, selectLoading } from "../app/selectors";
import { withRouter } from 'react-router-dom';

class AdminTeacherNotifications extends AdminUserNotifications {
    constructor(props) {
        super(props);
        this.type = 'Teacher';
    }

    fetch(data) {
        let teachers = [];
        for (let i = 0; i < data.length; ++i) {
            if (data[i].userInfo.role === 'teacher' && data[i].status === 'PENDING') {
                const teacher = {
                    id: data[i].id,
                    name: data[i].userInfo.displayName,
                    phone: data[i].userInfo.phone,
                    mail: data[i].userInfo.mail,
                    school: 'Phan Boi Chau High School',
                    sex: (Math.random() < 0.5 ? 'Male' : 'Female'),
                }
                teachers.push(teacher);
            }
        }
        return teachers;
    }

    activeUser(id) {
        message.success('You actived teacher with id ' + id);
    }

    inActiveUser(id) {
        message.error('You inactived teacher with id ' + id);
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers(),
    loading: selectLoading(),
});
  

export default withRouter(connect(mapStateToProps)(AdminTeacherNotifications));