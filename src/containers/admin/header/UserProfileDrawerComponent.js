import React, { Component } from 'react';
import { Avatar, Drawer, Upload, Input, Button, Form, Icon, Card, Collapse, Select, DatePicker, message } from 'antd';
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

class ProfileForm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'fullname': this.props.fullName,
            'email': this.props.email,
            'phone': this.props.phone,
            'address': this.props.address,
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{padding: '0 9px'}} layout="vertical">
                <Form.Item label="Full Name">
                    {getFieldDecorator('fullname', {
                        rules: [
                            {
                                required: true,
                                message: 'Full name field is required'
                            },
                            {
                                min: 6,
                                message: 'Full name must have at least 6 characters.'
                            },
                            {
                                max: 30,
                                message: 'Full name must have at least 30 characters.'
                            },
                            {
                                pattern: /^\w[\w|\s]*$/,
                                message: 'Your full name is invalid.'
                            }
                        ]
                    })(
                        <Input suffix={<Icon type="profile" />}/>
                    )}
                </Form.Item>
                <Form.Item label="Sex">
                    <Select value={this.props.sex} suffixIcon={<Icon type="heart"/>} >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Birthday">
                    <DatePicker style={{width: '100%'}} value={moment(dateForMoment(this.props.birthday))} />
                </Form.Item>
                <Form.Item label="Email">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Email field is required',
                            },
                            {
                                pattern: /^\w[\d|\w|\.]*@\w+\.[\.|\w]+$/,
                                message: 'Your email is invalid',
                            }
                        ]
                    })(
                        <Input suffix={<Icon type="mail"/>}/>
                    )}  
                </Form.Item>
                <Form.Item label="Tel. Number">
                    {getFieldDecorator('phone', {
                        rules: [
                            {
                                required: true,
                                message: 'Telephone field is required',
                            },
                            {
                                pattern: /^\d+$/,
                                message: 'Your telephone number is invalid',
                            },
                            {
                                len: 10,
                                message: 'Tel number must have 10 characters.',
                            }
                        ]
                    })(
                        <Input suffix={<Icon type="phone" />}/>
                    )}
                </Form.Item>
                <Form.Item label="Address">
                    {getFieldDecorator('address', {
                        rules: [
                            {
                                required: true,
                                message: 'Address field is required',
                            },
                        ]
                    })(
                        <Input suffix={<Icon type="home" />}/>
                    )};
                </Form.Item>
                <Button type="primary" htmlType="submit" icon="redo" >
                    Update
                </Button>
            </Form>
        )
    }
}

const WrapperProfileForm = Form.create({ name: 'profile_form'})(ProfileForm);

const AvatarChangeForm = (props) => {
    const avatarProps = {
        name: 'avatarfile',
        beforeUpload: props.beforeUpload,
        onRemove: props.onRemove,
        disabled: (props.curAvatarFile !== null),
    };

    return (
        <Form style={{padding: '0 9px', textAlign: 'center'}} layout="vertical">
            <Form.Item>
                <Upload {...avatarProps} accept="image/*">
                    <Button>
                        <Icon type="upload" /> Upload your avatar
                    </Button>
                </Upload>
            </Form.Item>
        </Form>
    );
}

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabledBtn: true,
            help: '',
            newHelp: '',
            confirmStatus: 'validating',
            newStatus: 'validating',
        };
        this.onChangePasswordHandle = this.onChangePasswordHandle.bind(this);
        this.onChangeConfirmPasswordHandle = this.onChangeConfirmPasswordHandle.bind(this);
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'old_password': '',
            'new_password': '',
            'confirm_new_password': '',
        });
    }

    comparePassword(pass, confirmPass) {
        if (pass.toString() === '') {
            this.setState({
                disabledBtn: true,
                newStatus: 'error',
                newHelp: 'Password must not be empty.',
                help: '',
                confirmStatus: 'validating',
            });
        }
        else if (pass.toString() !== confirmPass.toString()) {
            this.setState({
                disabledBtn: true,
                confirmStatus: 'error',
                help: 'Password doesn\'t matched. Please check again.',
                newStatus: '',
                newHelp: '',
            })
        }
        else {
            this.setState({
                disabledBtn: false,
                confirmStatus: 'success',
                help: 'Passwords are matched.',
                newHelp: '',
                newStatus: 'success',
            })
        }
    }

    onChangePasswordHandle(e) {
        const newPassword = e.target.value;
        const confirmNewPassword = this.props.form.getFieldValue('confirm_new_password');
        this.comparePassword(newPassword, confirmNewPassword);
    }

    onChangeConfirmPasswordHandle(e) {
        const confirmNewPassword = e.target.value;
        const newPassword = this.props.form.getFieldValue('new_password');
        this.comparePassword(newPassword, confirmNewPassword);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{padding: '0 9px'}} layout="vertical" onSubmit={() => {message.success('Successfully');}}>
                <Form.Item label="Old Password">
                    {getFieldDecorator('old_password')(
                        <Input.Password placeholder="Old Password..."/>
                    )}
                </Form.Item>
                <Form.Item label="New Password" validateStatus={this.state.newStatus} help={this.state.newHelp}>
                    {getFieldDecorator('new_password')(
                        <Input.Password placeholder="New Password..." onChange={this.onChangePasswordHandle}/>
                    )}
                </Form.Item>
                <Form.Item label="Confirm New Password" validateStatus={this.state.confirmStatus} help={this.state.help}>
                    {getFieldDecorator('confirm_new_password')(
                        <Input.Password placeholder="Confirm New Password..." onChange={this.onChangeConfirmPasswordHandle}/>
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" disabled={this.state.disabledBtn} icon="redo" style={{marginTop: '10px'}}>
                    Change Password
                </Button>
            </Form>
        );
    }
}

const WrapperChangePasswordForm = Form.create({name: 'password_change'})(ChangePasswordForm);
class UserProfileDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: 'Luan Nguyen Trong',
            birthday: new Date(1998, 10, 16),
            email: 'luannguyentrong98@gmail.com',
            phone: '0358684926',
            address: '171 Quoc Lo 13 St., Binh Thanh',
            sex: 'male',
            curAvatarFile: null,
        }
    }

    beforeUploadHandle = (file) => {
        this.setState({
            curAvatarFile: file,
        });
        return false;
    }

    onRemoveHandle = (file) => {
        this.setState({
            curAvatarFile: null
        });
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
                        <Panel header="Update Profile" extra={<Icon type="team" />} key="1">
                            <WrapperProfileForm {...this.state}/>
                        </Panel>
                        <Panel header="Change Avatar" extra={<Icon type="link" />} key="2">
                            <AvatarChangeForm beforeUpload={this.beforeUploadHandle} onRemove={this.onRemoveHandle}/>
                        </Panel>
                        <Panel header="Change Password" extra={<Icon type="build" />} key="3">
                            <WrapperChangePasswordForm />                            
                        </Panel>
                        <Panel header="Logout" extra={<Icon type="logout" />} key="4">
                            <p className="text-center"><Link to="/login">Click here to Good Bye</Link></p>
                        </Panel>
                    </Collapse>
                </Scrollbars>
            </Drawer>
        )
    }
}

export default UserProfileDrawer;