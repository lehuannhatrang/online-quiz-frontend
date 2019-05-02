import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import AdminMenu from './AdminMenuComponent';
import AdminHeader from './AdminHeaderComponent';
import AdminFooter from './footer/AdminFooterComponent';
import AdminUsersManager from './AdminUsersManagerComponent';
import AdminDashboard from './AdminDashboardComponent';

class Admin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container col-12">
                <div class="row col-12">
                    <div className="col-2">
                        <AdminMenu />
                    </div>
                    <div className="col-10">
                        <AdminHeader />
                        <div className="container">
                            <Switch>
                                <Route exact path="/admin" component={AdminDashboard} />
                                <Route exact path="/admin/dashboard" component={AdminDashboard} />
                                <Route exact path="/admin/users-manager" component={AdminUsersManager} />
                            </Switch>
                        </div>
                        <AdminFooter />
                    </div>
                </div>  
            </div>
        );
    }
}

export default Admin;