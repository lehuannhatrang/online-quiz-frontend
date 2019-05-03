import React from 'react';
import { Layout, Icon, Card, Statistic, Row, Col, Avatar } from 'antd';

const { Content } = Layout;

const avatarStyle = {
    backgroundColor: 'white',
    color: 'lightgrey',
    fontSize: '50px',
};

const AdminDashboard = (props) => {
    return (
        <Content className="dashboard" style={{paddingTop: '50px'}}>
            <Row type="flex" justify="space-around" align="middle">
                <Col span={5} className="group-1-col">
                    
                    <Card>
                        <Avatar style={avatarStyle} size={64} icon="team" />
                        <Statistic valueStyle={{color: '#1890ff'}} title="Students" value={31298} className="group-1-statistic"/>
                    </Card>
                </Col>
                <Col span={5} className="group-1-col">
                    <Card>
                        <Avatar style={avatarStyle} size={64} icon="audit" />
                        <Statistic valueStyle={{color: '#1890ff'}} title="Teachers" value={2650} className="group-1-statistic"/>
                    </Card>
                </Col>
                <Col span={5} className="group-1-col">
                    <Card>
                        <Avatar style={avatarStyle} size={64} icon="bank" />
                        <Statistic valueStyle={{color: '#1890ff'}} title="Schools" value={571} className="group-1-statistic"/>
                    </Card>
                </Col>
                <Col span={5} className="group-1-col">
                    <Card>
                        <Avatar style={avatarStyle} size={64} icon="appstore" />
                        <Statistic valueStyle={{color: '#1890ff'}} title="Provinces" value={56} className="group-1-statistic" suffix={'/ 64'}/>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default AdminDashboard;