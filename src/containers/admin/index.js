import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AdminMenu from './menu/AdminMenuComponent';
import AdminHeader from './header/AdminHeaderComponent';
import AdminFooter from './footer/AdminFooterComponent';
import AdminUsersManager from './AdminUsersManagerComponent';
import AdminDashboard from './AdminDashboardComponent';
import AdminPersonalProfile from './AdminPersonalProfileComponent';
import { AdminStudentNotifications, AdminTeacherNotifications } from './AdminNotificationsComponent';
import { NOTIFICATIONS } from './data';
import { Scrollbars} from 'react-custom-scrollbars';
import './admin-style.css';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siderCollapsed: false,
            siderTheme: 'dark',
        };

        this.onToggleSiderTheme = this.onToggleSiderTheme.bind(this);
    }

    onToggleSiderCollapsed = () => {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }

    onToggleSiderTheme = () => {
        //Save in database
        this.setState({
            siderTheme: this.state.siderTheme === 'light' ? 'dark' : 'light',
        });
    }

    render() {

        return (
            <Layout style={{height: '100vh'}} className="admin-layout">
                <AdminMenu collapsed={this.state.siderCollapsed}
                    mode={'inline'} theme={this.state.siderTheme} avatarShape={'circle'}/>
                <Layout className="right-layout" >
                    <AdminHeader onToggle={this.onToggleSiderCollapsed} collapsing={this.state.siderCollapsed}
                        notifications={NOTIFICATIONS} onToggleSiderTheme={this.onToggleSiderTheme}
                    />
                    <Scrollbars style={{height: '96vh'}}>
                        <Switch>
                            {/* <Route exact path="/admin" component={AdminDashboard} /> */}
                            <Route exact path="/admin/dashboard" 
                                component={() => <AdminDashboard 
                                    numStudentData={[65, 159, 80, 101, 106, 135, 80]}
                                    numTeacherData={[15, 49, 30, 31, 56, 34, 12]} 
                                    numRoomData={[69, 110, 122, 144, 145, 200, 210, 198, 215, 220]}
                                    numSchoolData={[164, 214, 193]}/>} />
                            <Route exact path="/admin/users-management" component={AdminUsersManager} />
                            <Route exact path="/admin/notifications/students" component={AdminStudentNotifications} />
                            <Route exact path="/admin/notifications/teachers" component={AdminTeacherNotifications} />
                            <Route exact path="/admin/profile" component={AdminPersonalProfile} />
                            <Redirect to="/admin/dashboard" />
                        </Switch>
                        <AdminFooter />
                    </Scrollbars>
                </Layout>  
            </Layout>
        );
    }
}

export default Admin;