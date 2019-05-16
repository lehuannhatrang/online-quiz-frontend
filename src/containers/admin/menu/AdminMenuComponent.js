import React, { Component } from 'react';
import { Layout, Menu, Icon, Avatar, Button, Badge } from 'antd';
import { NavLink, Link } from 'react-router-dom';
import If from '../../../components/control/If';
import './menu-style.css';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function RenderLogo( {small, theme} ) {
    let x = {};
    if (theme === 'light') {
        x.color = 'black';
    }
    else {
        x.color = 'white';
    }

    return small ?
        (<h5 className="text-center mb-0" style={{color: 'white', padding: '19px'}}><span style={{color: '#1890ff'}}>O</span><span style={x}>Q</span></h5>)
        : (<h5 className="text-center mb-0" style={{color: 'white', padding: '19px'}}>
            <Icon type="trophy" theme="twoTone"/>{' '}
            <span style={{color: '#1890ff'}}>Online</span><span style={x}>Quiz</span>
            </h5>);
}

class AdminMenu extends Component {
    constructor(props) {
        super(props);
    }

    getKeyOfUrl(url) {
        switch(url) {
            case '/admin':
                return "1";
            case '/admin/dashboard':
                return "1";
            case '/admin/users-management':
                return "2";
            case '/admin/notifications/students':
                return "3";
            case '/admin/notifications/teachers':
                return "4";
            case '/admin/settings':
                return "5";
        }
    }

    render() {

        let avatarBackground = {};
        if (this.props.theme === 'dark') {
            avatarBackground.background = 'black';
        }
        else {
            avatarBackground.background = '#f6f7f9';
        }

        let x = {};
        if (this.props.theme === 'light') {
            x.color = 'black';
        }
        else {
            x.color = 'white';
        }

        //const {pathname} = this.props.location;
        // const selectedKey = this.getKeyOfUrl(pathname);
        //console.log(pathname);
        const imgSrc = 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/c0.0.960.960a/p960x960/57099071_386843385502140_3693027126954426368_o.jpg?_nc_cat=111&_nc_oc=AQmxgOsOXh3S0Yr_SrdxSsjbwZ5eADAHW06-O_uz5xhvcRw2e5irYOVa0p0U5udpQ4U&_nc_ht=scontent.fsgn3-1.fna&oh=071c08f9904c8fb5e353607848d6984c&oe=5D66F006';
        return (
            <Sider
                collapsible
                collapsed={this.props.collapsed}
                trigger={null}
                theme={this.props.theme}
            >
                <div className="logo">
                    <RenderLogo small={this.props.collapsed} theme={this.props.theme}/>
                    
                </div>
                <If condition={!this.props.collapsed}>
                    <div className="text-center avatar-container" style={avatarBackground}>
                        <br />
                        <br />
                        <Avatar style={{marginBottom: '14px'}} shape={this.props.avatarShape} src={imgSrc} size={75}/>
                        <div>
                            <Link to="/admin/profile" className="text-uppercase font-weight-normal">{'Luan N.T'}<span style={x}>{'@'}{'0024'}</span></Link>
                            {/* <Button size="small" type="primary" onClick={this.onToggleAvatarShape} style={{padding: 0}}>
                                {
                                    (this.state.avatarShape === 'circle') ? 'sqr' : 'cir'
                                }
                            </Button> */}
                        </div>
                        <br />
                        <br />
                    </div>
                </If>
                <Menu className="admin-menu" theme={this.props.theme} mode={this.props.mode}>
                    <Menu.Item key="1">
                        <NavLink to="/admin/dashboard">
                            <Icon type="dashboard" />
                            <span>Dashboard</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to="/admin/users-management">
                            <Icon type="usergroup-add" />
                            <span>User Management</span>
                        </NavLink>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="notification" /><span>Notifications</span></span>}
                    >
                        <Menu.Item key="3"><NavLink to="/admin/notifications/students">Students</NavLink></Menu.Item>
                        <Menu.Item key="4"><NavLink to="/admin/notifications/teachers">Teachers</NavLink></Menu.Item>
                    </SubMenu>
                    <Menu.Item key="5">
                        <NavLink to="/admin/profile">
                            <Icon type="profile"/>
                            <span>Admin Profile</span>
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default AdminMenu;