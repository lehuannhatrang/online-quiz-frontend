import React, { Component } from 'react';
import AdminStudentsManager from './AdminStudentsManagerComponent';
import AdminTeachersManager from './AdminTeachersManagerComponent';
import { Loading } from './shared/LoadingComponent.js';
import { Layout } from 'antd';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsers, selectLoading } from "../app/selectors";
import { withRouter } from 'react-router-dom';

const { Content } = Layout;
const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
    fontSize: '20px',
    background: 'transparent',
    width: '100%',
};

const filterUsers = (users, role) => {
    let filUsers = [];
    let j = 0;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].userInfo.role === role && users[i].status === "ACTIVATED") {
            j++;
            const user = {
                name: users[i].userInfo.displayName,
                mail: users[i].userInfo.mail,
                phone: users[i].userInfo.phone,
                innerId: j,
            }
            filUsers.push(user);
        }
    }
    return filUsers;
};

class AdminUsersManager extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (this.props.loading) {
            return (
                <Content className="user-management" style={insideStyles}>
                    <Loading text={'Loading Users ...'}/>
                </Content>
            )
        }
        else if (this.props.users.length > 0){
            const users = this.props.users;
            const students = filterUsers(users, 'student');
            const teachers = filterUsers(users, 'teacher');
    
            return (
                <Content className="user-management">
                    <AdminStudentsManager students={students}/>
                    <AdminTeachersManager teachers={teachers}/>
                </Content>
            );
        }
        
        return (<div></div>);
    }
}

const mapStateToProps = createStructuredSelector({
    users: selectUsers(),
    loading: selectLoading(),
});
  
export default withRouter(connect(mapStateToProps)(AdminUsersManager));