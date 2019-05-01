import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { Layout } from 'antd';
import AdminMenu from './AdminMenuComponent';
import AdminHeader from './header/AdminHeaderComponent';
import AdminFooter from './footer/AdminFooterComponent';
import AdminUsersManager from './AdminUsersManagerComponent';
import AdminDashboard from './AdminDashboardComponent';
import './admin-style.css';

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            siderCollapsed: false,
        };
    }

    onToggleSiderCollapsed = () => {
        this.setState({
            siderCollapsed: !this.state.siderCollapsed,
        });
    }

    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
                <AdminMenu collapsed={this.state.siderCollapsed} />
                <Layout className="right-layout">
                    <AdminHeader onToggle={this.onToggleSiderCollapsed} collapsing={this.state.siderCollapsed}/>
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