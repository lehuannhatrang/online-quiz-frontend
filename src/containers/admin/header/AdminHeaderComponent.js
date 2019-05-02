import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './header-style.css';
import { Layout, Menu, Dropdown, Drawer, Input, Card, Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import diffTime from '../shared/diffTime';
const { Header } = Layout;
const Search = Input.Search;
const { Meta } = Card;

const RenderUserProfileMenu = ({name}) => {
    return (
        <Menu>
            <Menu.Item key="0" style={{margin: 0}} disabled>
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

const RenderNotificationItem = ({notification}) => {

    const textType = notification.type == 'teacher' ? 'text-warning' : 'text-info';
    const desc = (
        <div>
            <div>
                <b>{notification.name}</b> from <b>{notification.school}</b> has created a <b><span className={textType}>{notification.type}</span></b> account.
            </div>
            <div>
                {diffTime(notification.date)}
            </div>
        </div>
    );

    return (
        <Card style={{width: '90%', border: 'none'}} type="inner" key={notification.id}>
            <Meta avatar={<Avatar src={notification.avatar} />} description={desc} />
        </Card>
    );
};

const RenderNotificationsMenu = ({notifications}) => {
    if (notifications.length == 0 ) {
        return (
            <Menu>
                <Menu.Item key="-2" style={{margin: 0}} disabled>
                    <div className="text-uppercase text-center font-weight-bold" style={{
                        color: '#1890ff',
                        fontSize: '14px',
                    }}>{'NOTIFICATIONS'}</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key={0} style={{margin: 0}} disabled>
                    <div className="text-center font-style-italic">You don't have any notification.</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="-1" style={{margin: 0, textAlign: 'center'}}>
                    <Link to="/signup"><Icon type="flag" theme="filled"/>{' '}View all</Link>
                </Menu.Item>
            </Menu>
        )
    }
    else {
        const numNotifications = (notifications.length < 5) ? notifications.length : 5;
        let notifyItems = [];
        for (let i = 0; i < numNotifications; ++i) {
            notifyItems.push(
                <RenderNotificationItem notification={notifications[i]} />
            );
        };
        return(
            <Scrollbars autoHeight
                autoHeightMin={0}
                autoHeightMax={410}
                style={{ width: 350}}>
                <Menu>
                    <Menu.Item key="-2" style={{margin: 0}} disabled>
                        <div className="text-uppercase text-center font-weight-bold" style={{
                            color: '#1890ff',
                            fontSize: '14px',
                        }}>{'NOTIFICATIONS'}</div>
                    </Menu.Item>
                    <Menu.Divider />
                    {notifyItems}
                    <Menu.Divider />
                    <Menu.Item key="-1" style={{margin: 0, textAlign: 'center'}}>
                        <Link to="/signup"><Icon type="flag" theme="filled"/>{' '}View all</Link>
                    </Menu.Item>
                </Menu>
            </Scrollbars>
        );
    }
};

const RenderSettingsMenu = (props) => {
    return (
        <Menu>
            <Menu.Item key="0" style={{margin: 0}} disabled>
                <div className="text-uppercase text-center font-weight-bold" style={{
                    color: '#1890ff',
                    fontSize: '14px',
                }}>{'Settings'}</div>
            </Menu.Item>
            <Menu.Divider />
            <Card key="1" style={{border: 'none', padding: '10px 15px'}} bodyStyle={{padding: '0'}} type="inner">
                <div className="text-uppercase">{'Header'}</div>
                <div className="settings-btn-container">
                    <Button.Group>
                        <Button type="primary" onClick={props.onSTB}>Classic Style</Button>
                        <Button onClick={props.onSWB}>Modern Style</Button>
                    </Button.Group>
                </div>
            </Card>
            <Card key="2" style={{border: 'none', padding: '10px 15px'}} bodyStyle={{padding: '0'}} type="inner">
                <div className="text-uppercase">{'Sidebar Theme'}</div>
                <div className="settings-btn-container">
                    <Button.Group>
                        <Button type="primary" onClick={props.onSLT}>Light Theme</Button>
                        <Button onClick={props.onSDT}>Dark Theme</Button>
                    </Button.Group>
                </div>  
            </Card>
            <Card key="3" style={{border: 'none', padding: '10px 15px'}} bodyStyle={{padding: '0'}} type="inner">
                <div className="text-uppercase">{'Sidebar Mode'}</div>
                <div className="settings-btn-container">
                    <Button.Group>
                        <Button type="primary" onClick={props.onSVM}>Vertical Mode</Button>
                        <Button onClick={props.onSIM}>Inline Mode</Button>
                    </Button.Group>
                </div>
            </Card>
            <Menu.Divider />
            <Menu.Item key="-1" style={{margin: 0, textAlign: 'center'}}>
                <Link to="/admin/settings"><Icon type="deployment-unit" />{' '}All Settings</Link>
            </Menu.Item>
        </Menu>
    );
}

const overlayStyle = {
    width: '200px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
};
class AdminHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBarVisible: false,
            backgroundColor: 'white',
        };

        this.onShowSearchBar = this.onShowSearchBar.bind(this);
        this.onCloseSearchBar = this.onCloseSearchBar.bind(this);
        this.onSelectWhiteBackground = this.onSelectWhiteBackground.bind(this);
        this.onSelectTransparentBackground = this.onSelectTransparentBackground.bind(this);
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

    onSelectTransparentBackground() {
        this.setState({
            backgroundColor: 'transparent',
        });
    }

    onSelectWhiteBackground() {
        this.setState({
            backgroundColor: 'white',
        });
    }

    render() {

        const collapsedIcon = this.props.collapsing ? "menu-unfold" : "menu-fold";
        const notifyStatus = this.props.notifications.length > 0 ? 'success' : 'default';
        return(
            <Header class="header" style={{background: this.state.backgroundColor}}>
                <RenderSearchBar visible={this.state.searchBarVisible} onClose={this.onCloseSearchBar}/>
                <div className="btn-container float-left">
                    <Button shape="circle" icon={collapsedIcon} onClick={this.props.onToggle}/>
                    <Button shape="circle" icon="search" onClick={() => {this.onShowSearchBar()}}/>
                    <Dropdown placement="bottomLeft" overlayStyle={{...overlayStyle, width: '280px'}} 
                        overlay={<RenderSettingsMenu onSWB={this.onSelectWhiteBackground} onSTB={this.onSelectTransparentBackground}
                            onSVM={this.props.onSelectVerticalMode} onSIM={this.props.onSelectInlineMode}
                            onSDT={this.props.onSelectDarkTheme} onSLT={this.props.onSelectLightTheme}
                        />} 
                        trigger={['click']}>
                        <Button shape="circle" icon="tool"/>
                    </Dropdown>
                </div>
                <div className="float-right">
                    <div className="user-profile">
                        <Dropdown placement="bottomRight" overlayStyle={overlayStyle} overlay={() => <RenderUserProfileMenu name={'Luan N.T'}/>} trigger={['click']} >
                            <a className="ant-dropdown-link" href="#">
                            {'Luan N.T'} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                    <Dropdown placement="bottomRight" overlayStyle={{...overlayStyle, width: '350px'}} overlay={<RenderNotificationsMenu notifications={this.props.notifications}/>} trigger={['click']}>
                        <Badge status={notifyStatus} offset={[-8, 8]}>
                            <Button shape="circle" icon="bell" style={{marginLeft: '10px'}}/>
                        </Badge>
                    </Dropdown>
                    <Button shape="circle" icon="setting" style={{marginLeft: '10px'}}/>
                </div>
            </Header>
        );
    }
}

export default AdminHeader;