import React, { Component } from 'react';
import './header-style.css';
import { Button, Icon, Layout, Dropdown, Badge } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { NotificationsMenu } from './NotificationsMenuComponent';
import { SearchBar } from './SearchBarComponent';
import UserProfileDrawer from './UserProfileDrawerComponent';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsers, selectCurrentUser, selectLoading } from "../../app/selectors";
import { fetchUsers, fetchUser } from "../../app/actions";
const { Header } = Layout;
const imgSrc = 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/c0.0.960.960a/p960x960/57099071_386843385502140_3693027126954426368_o.jpg?_nc_cat=111&_nc_oc=AQmxgOsOXh3S0Yr_SrdxSsjbwZ5eADAHW06-O_uz5xhvcRw2e5irYOVa0p0U5udpQ4U&_nc_ht=scontent.fsgn3-1.fna&oh=071c08f9904c8fb5e353607848d6984c&oe=5D66F006';

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
            drawerVisible: false,
            avatarSrc: imgSrc,
            name: 'Luan N.T',
        };

        this.onOpenDrawer = this.onOpenDrawer.bind(this);
        this.onCloseDrawer = this.onCloseDrawer.bind(this);
        this.onShowSearchBar = this.onShowSearchBar.bind(this);
        this.onCloseSearchBar = this.onCloseSearchBar.bind(this);
        this.onToggleHeaderMode = this.onToggleHeaderMode.bind(this);
    }

    componentDidMount() {
        this.props.fetchUsers();
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

    onToggleHeaderMode() {
        this.setState({
            backgroundColor: (this.state.backgroundColor === 'transparent') ? 'white' : 'transparent',
        });
    }

    onCloseDrawer() {
        this.setState({
            drawerVisible: false,
        });
    }

    onOpenDrawer() {
        this.setState({
            drawerVisible: true,
        });
    }

    parseISOString(s) {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    
    fetchNotifications(users) {
        const data = [];
        let j = 0;
        for (let i = 0; i < users.length; ++i) {
            if (users[i].status === 'PENDING') {
                j++;
                const notify = {
                    id: j,
                    name: users[i].userInfo.displayName,
                    school: 'Ngo Gia Tu High School',
                    date: this.parseISOString(users[i].userInfo.createdAt),
                    type: users[i].userInfo.role,
                };
                data.push(notify);
            }
        }
        return data;
    }

    render() {
        const notifications = this.fetchNotifications(this.props.users);
        const collapsedIcon = this.props.collapsing ? "menu-unfold" : "menu-fold";
        const notifyStatus = notifications.length > 0 ? 'success' : 'default';
        return(
            <Header class="header" style={{background: this.state.backgroundColor}}>
                <SearchBar visible={this.state.searchBarVisible} onClose={this.onCloseSearchBar}/>
                <div className="btn-container float-left">
                    <Button shape="circle" icon={collapsedIcon} onClick={this.props.onToggle}/>
                    <Button shape="circle" icon="search" onClick={() => {this.onShowSearchBar()}}/>
                    <Button shape="circle" icon="gold" onClick={() => {this.onToggleHeaderMode()}}/>
                    <Button shape="circle" icon="bulb" onClick={() => {this.props.onToggleSiderTheme()}}/>
                    {/* <Dropdown placement="bottomLeft" overlayStyle={{...overlayStyle, width: '280px'}} 
                        overlay={<SettingsMenu onSWB={this.onSelectWhiteBackground} onSTB={this.onSelectTransparentBackground}
                            onSVM={this.props.onSelectVerticalMode} onSIM={this.props.onSelectInlineMode}
                            onSDT={this.props.onSelectDarkTheme} onSLT={this.props.onSelectLightTheme} onTAS={this.props.onToggleAvatarShape}
                        />} 
                        trigger={['click']}>
                        <Button shape="circle" icon="tool"/>
                    </Dropdown> */}
                </div>
                <div className="float-right">
                    {/* <div className="user-profile">
                        <Dropdown placement="bottomRight" overlayStyle={overlayStyle} overlay={() => <UserProfileMenu name={'Luan N.T'}/>} trigger={['click']} >
                            <a className="ant-dropdown-link" href="#">
                            {'Luan N.T'} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div> */}
                    <Dropdown placement="bottomRight" overlayStyle={{...overlayStyle, width: '350px'}} overlay={<NotificationsMenu notifications={notifications} loading={this.props.loading}/>} trigger={['click']}>
                        <Badge status={notifyStatus} offset={[-8, 8]}>
                            <Button shape="circle" icon="bell" style={{marginLeft: '10px'}}/>
                        </Badge>
                    </Dropdown>
                    <Button shape="circle" icon="setting" style={{marginLeft: '10px'}} onClick={this.onOpenDrawer}/>
                    <UserProfileDrawer visible={this.state.drawerVisible} avatar={this.state.avatarSrc} admin={this.props.admin} onClose={this.onCloseDrawer}/>
                </div>
            </Header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchUser: () => dispatch(fetchUser()),
      fetchUsers: () => dispatch(fetchUsers()),
    }
  }
  
const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser(),
    users: selectUsers(),
    loading: selectLoading(),
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHeader));