import React, { Component } from 'react';
import { Row, Col, Table, Input, Icon, Button, Divider, notification, message, Modal, Avatar } from 'antd';
import { Parallax } from 'react-parallax';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import getStandardFormatDate from './shared/standardFormatDate';

const imgSrc = 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/c0.0.960.960a/p960x960/57099071_386843385502140_3693027126954426368_o.jpg?_nc_cat=111&_nc_oc=AQmxgOsOXh3S0Yr_SrdxSsjbwZ5eADAHW06-O_uz5xhvcRw2e5irYOVa0p0U5udpQ4U&_nc_ht=scontent.fsgn3-1.fna&oh=071c08f9904c8fb5e353607848d6984c&oe=5D66F006';
const bgImagePath = 'https://images.pexels.com/photos/418831/pexels-photo-418831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const inlineStyle = {
    padding: 25,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
    width: '80%',
};

class AdminTeachersManager extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            modalVisible: false,
            teacherAvatar: '',
            teacherName: '',
            teacherBirthday: null,
            teacherEmail: '',
            teacherSchool: '',
            teacherAddress: '',
            teacherSex: '',
            teacherPhone: '',
            teacherId: '',
        };
    }

    getColumnSearchProps = (dataIndex) => (
    {
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search" size="small" style={{ width: 90, marginRight: 8 }} >
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)}
                    size="small" style={{ width: 90 }} >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    
    confirmDeleteTeacher = (teacher) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => {
                    message.success('Delete teacher successfully');
                    notification.close(key);
                }}>
                Confirm
            </Button>
        );
        notification.open({
            message: 'Do you want to delete?',
            description: 'If you want to delete teacher named ' + teacher.name + ', please press confirm button below.',
            btn,
            key,
        });
    }

    visitTeacherProfile = (teacher) => {
        //get Teacher profile 
        teacher = {
            ...teacher,
            sex: (Math.random() < 0.5 ? 'Male' : 'Female'),
            birthday: new Date(1998, 10, 16),
            address: '447 Hoa Hao St., District 10',
            avatar: imgSrc,
            school: 'Nguyen Binh Khiem High School'
        };

        this.setState({
            teacherName: teacher.name,
            teacherAvatar: teacher.avatar,
            teacherSchool: teacher.school,
            teacherBirthday: teacher.birthday,
            teacherSex: teacher.sex,
            teacherPhone: teacher.phone,
            teacherEmail: teacher.mail,
            teacherAddress: teacher.address,
            teacherId: teacher.innerId,
        });

        this.setState({
            modalVisible: true,
        });
    }

    render() {

        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '32%',
                sorter: (a, b) => (a.name < b.name) ? -1 : ((a.name === b.name) ? 0 : 1),
                sortDirections: ['ascend', 'descend'],
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                width: '18%',
            },
            {
                title: 'Mail',
                dataIndex: 'mail',
                key: 'mail',
                width: '32%',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => this.visitTeacherProfile(record)}>Visit</span>
                        <Divider type="vertical" />
                        <span style={{color: '#1890ff', cursor: 'pointer'}} onClick={() => this.confirmDeleteTeacher(record)}>Delete</span>
                    </span>
                )
            }
        ];

        return (
            <React.Fragment>
                <Row type="flex" justify="space-around" align="middle" style={{padding: '0px 0px 55px 0px'}}>
                    <Col span={23}>
                        <Fade right>
                            <Table columns={columns} dataSource={this.props.teachers} pagination={{ pageSize: 6 }}
                            title={() => <span>{'Teacher Accounts'}</span>} bordered size="middle"/>
                        </Fade>
                        <Modal className="my-modal" width={640} centered visible={this.state.modalVisible} footer={null} onCancel={(e) => {this.setState({ modalVisible: false });}}>
                            <Row>
                                <Col span={12}>
                                    <Parallax style={{width: "100%"}} strength={1000} bgClassName="background-profile" bgImage={bgImagePath} blur={0}>
                                        <div style={{height: 320}}>
                                            <div style={inlineStyle}>
                                                <Avatar size={80} src={this.state.teacherAvatar} style={{cursor: 'pointer', border: '2px solid #ddd'}}/>
                                                <div className="name-profile">
                                                    <h6 className="text-uppercase">{this.state.teacherName}</h6>
                                                    <h6>{'Teacher'}{' '}<span style={{color: '#1890ff', fontWeight: 'bold'}}>{'@'}{
                                                        this.state.teacherId >= 1000 ? this.state.teacherId : (
                                                            this.state.teacherId >= 100 ? '0' + this.state.teacherId : (
                                                                this.state.teacherId >= 10 ? '00' + this.state.teacherId : '000' + this.state.teacherId
                                                            )
                                                        )}</span></h6>
                                                </div>
                                            </div>       
                                        </div>
                                    </Parallax>
                                </Col>
                                <Col span={12} >
                                    <div style={{height: 320}}>
                                        <div style={{...inlineStyle, textAlign: 'left', padding: 0, lineHeight: 2}}>
                                            <div><Icon type="profile" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherName}</div>
                                            <div><Icon type="heart" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherSex}</div>
                                            <div><Icon type="schedule" theme="filled" style={{marginRight: '8px'}}/>{' '}{getStandardFormatDate(this.state.teacherBirthday)}</div>
                                            <div><Icon type="phone" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherPhone}</div>
                                            <div><Icon type="bulb" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherSchool}</div>
                                            <div><Icon type="home" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherAddress}</div>
                                            <div><Icon type="mail" theme="filled" style={{marginRight: '8px'}}/>{' '}{this.state.teacherEmail}</div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Modal>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }  
};

export default AdminTeachersManager;