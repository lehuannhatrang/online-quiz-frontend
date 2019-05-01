import React, { Component } from 'react';
import { Layout, Menu, Icon, Drawer } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function RenderLogo( {small} ) {
    return small ?
        (<h5 className="text-center mb-0" style={{color: 'white', padding: '16.5px'}}><span style={{color: '#1890ff'}}>O</span>Q</h5>)
        : (<h5 className="text-center mb-0" style={{color: 'white', padding: '16.5px'}}>
            <Icon type="trophy" theme="twoTone"/>{' '}
            <span style={{color: '#1890ff'}}>Online</span>Quiz
            </h5>);
}
class AdminMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Sider
                collapsible
                collapsed={this.props.collapsed}
                trigger={null}
            >
                <div className="logo">
                    <RenderLogo small={this.props.collapsed}/>
                    
                </div>
                <div className="text-center avatar-container">
                    
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span>Option 2</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={<span><Icon type="user" /><span>User</span></span>}
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={<span><Icon type="team" /><span>Team</span></span>}
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                        <Icon type="file" />
                        <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default AdminMenu;