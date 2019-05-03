import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AdminMenu from './menu/AdminMenuComponent';
import AdminHeader from './header/AdminHeaderComponent';
import AdminFooter from './footer/AdminFooterComponent';
import AdminUsersManager from './AdminUsersManagerComponent';
import AdminDashboard from './AdminDashboardComponent';
import { NOTIFICATIONS } from './data';
import './admin-style.css';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siderCollapsed: false,
            siderTheme: 'dark',
            siderMode: 'inline',
            avatarShape: 'circle',
        };

        this.onToggleAvatarShape = this.onToggleAvatarShape.bind(this);
    }

    onToggleSiderCollapsed = () => {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }

    onSelectVerticalMode = () => {
        //Save in database
        this.setState({
            siderMode: 'vertical',
        });
    }

    onSelectInlineMode = () => {
        //Save in database
        this.setState({
            siderMode: 'inline',
        });
    }

    onSelectLightTheme = () => {
        //Save in database
        this.setState({
            siderTheme: 'light',
        });
    }

    onSelectDarkTheme = () => {
        //Save in database
        this.setState({
            siderTheme: 'dark',
        });
    }

    onToggleAvatarShape() {
        if (this.state.avatarShape === 'circle') {
            this.setState({
                avatarShape: 'square',
            });
        }
        else {
            this.setState({
                avatarShape: 'circle',
            });
        }
    }

    render() {

        return (
            <Layout style={{minHeight: '100vh'}}>
                <AdminMenu collapsed={this.state.siderCollapsed}
                    mode={this.state.siderMode} theme={this.state.siderTheme} avatarShape={this.state.avatarShape}/>
                <Layout className="right-layout">
                    <AdminHeader onToggle={this.onToggleSiderCollapsed} collapsing={this.state.siderCollapsed}
                        notifications={NOTIFICATIONS} onSelectVerticalMode={this.onSelectVerticalMode}
                        onSelectInlineMode={this.onSelectInlineMode} onSelectDarkTheme={this.onSelectDarkTheme}
                        onSelectLightTheme={this.onSelectLightTheme} onToggleAvatarShape={this.onToggleAvatarShape}
                    />
                    <Switch>
                        <Route exact path="/admin" component={AdminDashboard} />
                        <Route exact path="/admin/dashboard" component={AdminDashboard} />
                        <Route exact path="/admin/users-management" component={AdminUsersManager} />
                        <Route exact path="/admin/notifications/students" component={AdminUsersManager} />
                        <Route exact path="/admin/notifications/teachers" component={AdminUsersManager} />
                        <Route exact path="/admin/settings" component={AdminUsersManager} />
                    </Switch>
                    <AdminFooter />
                </Layout>  
            </Layout>
        );
    }
}

export default Admin;