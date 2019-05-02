import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AdminMenu from './AdminMenuComponent';
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
        };
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

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <AdminMenu collapsed={this.state.siderCollapsed} numNotification={NOTIFICATIONS.length}
                    mode={this.state.siderMode} theme={this.state.siderTheme}/>
                <Layout className="right-layout">
                    <AdminHeader onToggle={this.onToggleSiderCollapsed} collapsing={this.state.siderCollapsed}
                        notifications={NOTIFICATIONS} onSelectVerticalMode={this.onSelectVerticalMode}
                        onSelectInlineMode={this.onSelectInlineMode} onSelectDarkTheme={this.onSelectDarkTheme}
                        onSelectLightTheme={this.onSelectLightTheme}
                    />
                    <Switch>
                        <Route exact path="/admin" component={AdminDashboard} />
                        <Route exact path="/admin/dashboard" component={AdminDashboard} />
                        <Route exact path="/admin/users-manager" component={AdminUsersManager} />
                    </Switch>
                    <AdminFooter />
                </Layout>  
            </Layout>
        );
    }
}

export default Admin;