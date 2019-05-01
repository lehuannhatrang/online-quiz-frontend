import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './header-style.css';
import { Layout, Menu, Dropdown, Drawer, Input } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;
const Search = Input.Search;

const RenderUserProfileMenu = ({name}) => {
    return (
        <Menu>
            <Menu.Item key="0" style={{margin: 0}}>
                <div className="text-uppercase text-center font-weight-bold" style={{
                    color: '#1890ff',
                    fontSize: '14px',
                }}>{name}</div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="1" style={{margin: 0}}>
                <Link to="http://www.facebook.com/"><Icon type="user" />{' '}User Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{margin: 0}}>
                <Link to="http://www.facebook.com/"><Icon type="tool" />{' '}Settings</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" style={{margin: 0}}>
                <Link to="/signup"><Icon type="logout" />{' '}Sign Out</Link>
            </Menu.Item>
        </Menu>
    );
};

const RenderSearchBar = (props) => {
    return (
        <Drawer
            closable={false} onClose={props.onClose}
            placement="top" visible={props.visible} height={60}
            getContainer=".right-layout"
            bodyStyle={{
                width: '1166px',
                padding: '15px 50px',
            }}
       >
            <Search placeholder="Search Text..." onSearch={value => console.log(value)} enterButton />
        </Drawer>
    )
};

class AdminHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBarVisible: false,
        };

        this.onShowSearchBar = this.onShowSearchBar.bind(this);
        this.onCloseSearchBar = this.onCloseSearchBar.bind(this);
    }

    onShowSearchBar() {
        this.setState({
            searchBarVisible: true,
        });
    }

    onCloseSearchBar() {
        this.setState({
            searchBarVisible: false,
        });
    }

    render() {

        const collapsedIcon = this.props.collapsing ? "menu-unfold" : "menu-fold";

        return(
            <Header class="header" style={{background: 'white'}}>
                <RenderSearchBar visible={this.state.searchBarVisible} onClose={this.onCloseSearchBar}/>
                <div className="btn-container float-left">
                    <Button shape="circle" icon={collapsedIcon} onClick={this.props.onToggle}/>
                    <Button shape="circle" icon="search" onClick={() => {this.onShowSearchBar()}}/>
                    <Button shape="circle" icon="tool" />
                </div>
                <div className="float-right">
                    <div className="user-profile">
                        <Dropdown placement="bottomRight" overlayStyle={{
                            width: '200px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                        }} overlay={() => <RenderUserProfileMenu name={'Luan N.T'}/>} trigger={['click']} >
                            <a className="ant-dropdown-link" href="#">
                            {'Luan N.T'} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                    <Button shape="circle" icon="crown" style={{marginLeft: '10px'}}/>
                </div>
            </Header>
        );
    }
}

export default AdminHeader;