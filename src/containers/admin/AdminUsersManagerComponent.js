import React from 'react';
import AdminStudentsManager from './AdminStudentsManagerComponent';
import AdminTeachersManager from './AdminTeachersManagerComponent';
import { Layout } from 'antd';

const { Content } = Layout;

const AdminUsersManager = (props) => {
    const users = props.users;
    document.write(JSON.stringify(users));
    return (
        <Content className="user-management">
            <AdminStudentsManager />
            <AdminTeachersManager />
        </Content>
    );
}

export default AdminUsersManager;