import React, { Component } from 'react';
import './header-style.css';
import { Button, Icon, Layout, Dropdown, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { NotificationsMenu } from './NotificationsMenuComponent';
import { SearchBar } from './SearchBarComponent';
import { SettingsMenu } from './SettingsMenuComponent';
import { UserProfileMenu } from './UserProfileMenuComponent';

const { Header } = Layout;

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
                <SearchBar visible={this.state.searchBarVisible} onClose={this.onCloseSearchBar}/>
                <div className="btn-container float-left">
                    <Button shape="circle" icon={collapsedIcon} onClick={this.props.onToggle}/>
                    <Button shape="circle" icon="search" onClick={() => {this.onShowSearchBar()}}/>
                    <Dropdown placement="bottomLeft" overlayStyle={{...overlayStyle, width: '280px'}} 
                        overlay={<SettingsMenu onSWB={this.onSelectWhiteBackground} onSTB={this.onSelectTransparentBackground}
                            onSVM={this.props.onSelectVerticalMode} onSIM={this.props.onSelectInlineMode}
                            onSDT={this.props.onSelectDarkTheme} onSLT={this.props.onSelectLightTheme} onTAS={this.props.onToggleAvatarShape}
                        />} 
                        trigger={['click']}>
                        <Button shape="circle" icon="tool"/>
                    </Dropdown>
                </div>
                <div className="float-right">
                    <div className="user-profile">
                        <Dropdown placement="bottomRight" overlayStyle={overlayStyle} overlay={() => <UserProfileMenu name={'Luan N.T'}/>} trigger={['click']} >
                            <a className="ant-dropdown-link" href="#">
                            {'Luan N.T'} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                    <Dropdown placement="bottomRight" overlayStyle={{...overlayStyle, width: '350px'}} overlay={<NotificationsMenu notifications={this.props.notifications}/>} trigger={['click']}>
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