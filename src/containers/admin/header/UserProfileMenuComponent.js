import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

export const UserProfileMenu = ({name}) => {
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
                <Link to="/admin/profile"><Icon type="user" />{' '}Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" style={{margin: 0}}>
                <Link to="http://www.facebook.com/"><Icon type="edit" />{' '}Edit</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3" style={{margin: 0}}>
                <Link to="/signup"><Icon type="logout" />{' '}Sign Out</Link>
            </Menu.Item>
        </Menu>
    );
};