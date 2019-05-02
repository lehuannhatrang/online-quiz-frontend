import React from 'react';
import { Card, Menu, Avatar, Icon } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
const { Meta } = Card;
import diffTime from '../shared/diffTime';

const NotificationItem = ({notification}) => {

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

export const NotificationsMenu = ({notifications}) => {
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
                <NotificationItem notification={notifications[i]} />
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