import React, { Component } from 'react';
import { Avatar, Drawer, Row, Col, Input, Button, Form, Icon, Card, Collapse, Select, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import dateForMoment from '../shared/dateForMoment';

const { Panel } = Collapse;

const RenderTitle = (props) => {
    return (
        <React.Fragment>
            <Avatar src={props.avatar} size={32} />
            <Link to="admin/profile" className="title-link">{props.name}</Link>
        </React.Fragment>
    )
};

class UserProfileDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: 'Luan Nguyen Trong',
            birthday: new Date(1998, 10, 16),
            email: 'luannguyentrong98@gmail.com',
            phone: '(+84) 0358684926',
            address: '171 Quoc Lo 13 St., Binh Thanh',
            sex: 'male',
        }
    }

    render() {
        const text = (
            <p style={{ paddingLeft: 24 }}>
              A dog is a type of domesticated animal.
              Known for its loyalty and faithfulness,
              it can be found as a welcome guest in many households across the world.
            </p>
          );
        return (
            <Drawer visible={this.props.visible} placement="right" closable={true} onClose={this.props.onClose} 
                title={<RenderTitle avatar={this.props.avatar} name={this.props.name}/>}
                bodyStyle={{padding: 0, paddingTop: '15px'}} width={360} className="profile-drawer"
            >
                <div style={{padding: '8px 14px', background: '#e6f7ff', width: '100%'}}>
                    <Input.Search placeholder="Search.." onSearch={(val) => {message.info('You searched ' + val);}} enterButton/>
                </div>
                <Scrollbars autoHeight autoHeightMax={'80.5vh'} autoHeightMin={0}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="Profile" extra={<Icon type="team" />} key="1">
                            <Form style={{padding: '0 9px'}} layout="vertical">
                                <Form.Item label="Full Name">
                                    <Input suffix={<Icon type="profile" />} value={this.state.fullName}/>
                                </Form.Item>
                                <Form.Item label="Sex">
                                    <Select value={this.state.sex} suffixIcon={<Icon type="heart"/>} >
                                        <Select.Option value="male">Male</Select.Option>
                                        <Select.Option value="female">Female</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Birthday">
                                    <DatePicker style={{width: '100%'}} value={moment(dateForMoment(this.state.birthday))} />
                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input suffix={<Icon type="mail"/>} value={this.state.email}/>
                                </Form.Item>
                                <Form.Item label="Tel. Number">
                                    <Input suffix={<Icon type="phone" />} value={this.state.phone}/>
                                </Form.Item>
                                <Form.Item label="Address">
                                    <Input suffix={<Icon type="home" />} value={this.state.address}/>
                                </Form.Item>
                                <Button type="primary" htmlType="submit" icon="redo" style={{marginTop: '10px'}}>
                                    Update
                                </Button>
                            </Form>
                        </Panel>
                        <Panel header="Change Avatar" extra={<Icon type="link" />} key="2">
                            {text}
                        </Panel>
                        <Panel header="Change Password" extra={<Icon type="build" />} key="3">
                            {text}
                        </Panel>
                        <Panel header="Logout" extra={<Icon type="logout" />} key="3">
                            <p className="text-center"><Link to="/login">Good Bye</Link></p>
                        </Panel>
                    </Collapse>
                </Scrollbars>
            </Drawer>
        )
    }
}

export default UserProfileDrawer;