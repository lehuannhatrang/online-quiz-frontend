import React from 'react';
import { Button, Menu, Card, Icon } from 'antd';
import { Link } from 'react-router-dom';

export const SettingsMenu = (props) => {
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
            <Card key="4" style={{border: 'none', padding: '10px 15px'}} bodyStyle={{padding: '0'}} type="inner">
                <div className="text-uppercase">{'Avatar Shape'}</div>
                <div className="settings-btn-container">
                    <Button block onClick={props.onTAS}>Toggle Shape</Button>
                </div>
            </Card>
            <Menu.Divider />
            <Menu.Item key="-1" style={{margin: 0, textAlign: 'center'}}>
                <Link to="/admin/settings"><Icon type="deployment-unit" />{' '}All Settings</Link>
            </Menu.Item>
        </Menu>
    );
}