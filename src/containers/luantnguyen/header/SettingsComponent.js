import React, { Component } from 'react';
import { Avatar, Drawer, Upload, Input, Button, Form, Icon, Collapse, Select, DatePicker, message, List, Statistic } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import moment from 'moment';
import dateForMoment from '../shared/dateForMoment';
import If from '../../../components/control/If';
import parseISOString from '../shared/parseISOString';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { Loading } from '../shared/LoadingComponent';
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
                <Button htmlType="submit" type="primary" icon="redo" >
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
        <Form style={{padding: '0 9px', textAlign: 'center'}} layout="vertical" onSubmit={() => {message.success('Change avatar!');}}>
            <Form.Item>
                <Upload {...avatarProps} accept="image/*">
                    <If condition={props.curAvatarFile === null}>
                        <Button>
                            <Icon type="upload" /> Upload your avatar
                        </Button>
                    </If>
                    <If condition={props.curAvatarFile !== null}>
                        <Button type="primary" htmlType="submit" >
                            <Icon type="check" /> Let's change                    
                        </Button>
                    </If>
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

const getDate = (date) => {
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
};

const normalizeListResults = (listResults) => {
    let newList = [];

    for (let i = 0; i < listResults.length; ++i) {
        let result = listResults[i];
        const startDate = getDate(result.start);
        if (newList.length === 0 || newList[newList.length - 1].commonDate !== startDate) {
            newList.push({
                commonDate: startDate,
                results: [
                    result,
                ],
            });
        }
        else {
            newList[newList.length - 1].results.push(result);
        }
    }
    return newList;
};

const ListResults = ({ listResults }) => {
    listResults.sort((a, b) => {
        return b.start.getTime() - a.start.getTime();
    });

    const normalizedListResults = normalizeListResults(listResults);
    let key = 0;
    return (
        <Collapse bordered={false} defaultActiveKey={['1']}>
            {normalizedListResults.map(
                (results) => {
                    key++;
                    return (
                        <Panel header={results.commonDate} key={key}>
                            <ListResultsInOneDay results={results.results} />
                        </Panel>
                    );
                }
            )}
        </Collapse>
    );
};

const niceTime = (time) => {
    return (time < 10) ? ('0' + time) : time;
};

const ListResultsInOneDay = ({ results }) => {
    return (
        <List
            itemLayout="horizontal"
            dataSource={results}
            renderItem={item => (
                <List.Item actions={[<a style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#1890ff',
                }} href={"/luantnguyen/student/result/" + item.id}>View more</a>]}>
                    <List.Item.Meta
                        avatar={
                            (item.score === item.maxScore) ?
                            (<Avatar icon="check" style={{color: 'white', backgroundColor: '#52c41a'}}/>)
                            : ((item.score / item.maxScore) >= 0.8) ? 
                            (<Avatar style={{color: 'white', background: '#1890ff'}}>Good</Avatar>)
                            : ((item.score / item.maxScore) >= 0.5) ?
                            (<Avatar style={{color: 'white', background: 'orange'}}>So so</Avatar>)
                            : (<Avatar style={{color: 'white', background: 'red'}}>Bad</Avatar>)
                        }
                        title={item.name}
                        description={'From ' + (niceTime(item.start.getHours()) + ':' + niceTime(item.start.getMinutes())) + ' to ' + (niceTime(item.end.getHours()) + ':' + niceTime(item.end.getMinutes()))}
                    />
                    <Statistic title="Score" value={item.score} suffix={'/' + item.maxScore} />
                </List.Item>
            )}
        />
    );
}

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: this.props.user.userInfo.displayName,
            birthday: new Date(1998, 10, 16),
            email: 'luannguyentrong98@gmail.com',
            phone: '0358684926',
            address: '171 Quoc Lo 13 St., Binh Thanh',
            sex: 'male',
            curAvatarFile: null,
            loadingText: 'Loading Results ...',
        }

        this.beforeUploadHandle = this.beforeUploadHandle.bind(this);
        this.onRemoveHandle = this.onRemoveHandle.bind(this);
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

    getListResults(rooms, results) {
        const listResults = [
            {
                id: "1",
                name: "Phung's Room",
                start: new Date(2019, 4, 21, 8, 0, 0),
                end: new Date(2019, 4, 25, 9, 0, 0),
                score: 9,
                maxScore: 10,
            },
            {
                id: "2",
                name: "Room for books",
                start: new Date(2019, 4, 22, 15, 30, 0),
                end: new Date(2019, 4, 22, 16, 30, 0),
                score: 15,
                maxScore: 15,
            },
            {
                id: "3",
                name: "BKU Bedroom",
                start: new Date(2019, 4, 18, 6, 20, 0),
                end: new Date(2019, 4, 18, 9, 0, 0),
                score: 7.5,
                maxScore: 20
            },
            {
                id: "4",
                name: "AI Room",
                start: new Date(2019, 4, 18, 14, 40, 0),
                end: new Date(2019, 4, 18, 15, 25, 0),
                score: 6.5,
                maxScore: 10
            },
            {
                id: "5",
                name: "BKU Bedroom",
                start: new Date(2019, 4, 20, 7, 0, 0),
                end: new Date(2019, 4, 20, 8, 10, 0),
                score: 9.5,
                maxScore: 10
            },
            {
                id: "6",
                name: "AI Room",
                start: new Date(2019, 3, 14, 12, 0, 0),
                end: new Date(2019, 3, 14, 13, 25, 0),
                score: 2,
                maxScore: 10
            },
        ];
        for (let i = 0; i < results.length; ++i) {
            const result = results[i];
            const myResult = { 
                score: result.score,
                maxScore: 10,
                id: result.id,
            };
            const roomId = result.room;
            const room = rooms.filter(room => room.id === roomId)[0];
            myResult.start = parseISOString(room.startTime);
            myResult.end = new Date(myResult.start.getTime() + room.Duration * 60000);
            myResult.name = room.name;
            listResults.push(myResult);
        }
        return listResults;
    }

    renderListResults = () => {
        if (this.props.results === undefined) {
            return (<Loading text={this.state.loadingText} />);
        }
        else if (this.props.results === null) {
            return (<h4>You don't have any result.</h4>);
        }
        else {
            const listResults = this.getListResults(this.props.rooms, this.props.results);
            return (
                <React.Fragment>
                    <div style={{padding: '8px 14px', background: '#e6f7ff', width: '100%'}}>
                        <Input.Search placeholder="Search Results ..." style={{width: '60%'}} onSearch={(val) => {message.info('You searched ' + val);}} enterButton/>
                    </div>
                    <Scrollbars autoHeight autoHeightMax={'80.5vh'} autoHeightMin={0}>
                        <ListResults listResults={listResults} />
                    </Scrollbars>
                </React.Fragment>
            );
        }
    }

    render() {
        const avatarSrc = 'https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/37543101_987787444760103_4820973328015556608_n.jpg?_nc_cat=108&_nc_eui2=AeFb3bQ8uwKSE1V9m81aEh9pJrx3iC9nV4uRWyAMYrLkMK9F6cKi6j7I-zi5hRDbx5gOwEiB1W7ohkpdeyvaYmWK_8SfVT7i7OhrkyylHIpWRA&_nc_oc=AQnb97Ve1hTc7Abt19NH_K5wZmovInjpb2x7p19alEeQFtrSaeY1yKpYNKQHJmShDU8&_nc_ht=scontent.fsgn8-1.fna&oh=02543fe2718b549b83bc0e62ed5bc7b0&oe=5D531AC5';
        
        return (
            
            <Drawer visible={this.props.visible} placement="right" closable={true} onClose={() => {this.props.onClose();}}
                title={<RenderTitle avatar={avatarSrc} name={this.props.user.userInfo.displayName}/>}
                bodyStyle={{padding: 0, paddingTop: '15px'}} width={this.props.childrenVisible ? 760 : 460} className="profile-drawer"
            >
                <Drawer visible={this.props.childrenVisible} placement="right" closable={true} onClose={() => { this.props.onChildrenClose(); }} 
                    title={'Your Results'} bodyStyle={{padding: 0, paddingTop: '15px'}} width={680} className="profile-drawer"
                >
                    {this.renderListResults()}
                </Drawer>
                
                <Scrollbars autoHeight autoHeightMax={'80.5vh'} autoHeightMin={0}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="View Result" extra={<Icon type="trophy" />} key="5">
                            <div className="text-center">
                                <Button type="primary" onClick={() => { this.props.onChildrenOpen(); } }>
                                    <Icon type="project" />View your results
                                </Button>
                            </div>  
                        </Panel>
                        <Panel header="Update Profile" extra={<Icon type="team" />} key="1">
                            <WrapperProfileForm {...this.state}/>
                        </Panel>
                        <Panel header="Change Avatar" extra={<Icon type="link" />} key="2">
                            <AvatarChangeForm curAvatarFile={this.state.curAvatarFile} beforeUpload={this.beforeUploadHandle} onRemove={this.onRemoveHandle}/>
                        </Panel>
                        <Panel header="Change Password" extra={<Icon type="build" />} key="3">
                            <WrapperChangePasswordForm />                            
                        </Panel>
                        <Panel header="Logout" extra={<Icon type="logout" />} key="4">
                            <p className="text-center"><Link style={{color: '#1890ff', textDecoration: 'none'}} to="/login">Click here to Good Bye</Link></p>
                        </Panel>
                    </Collapse>
                </Scrollbars>
                
            </Drawer>
        )
    }
}

export default Settings;