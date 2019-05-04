import React, { Component } from 'react';
import { Row, Col, Table, Icon, Button, Divider, Popconfirm, message, Layout, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import Fade from 'react-reveal/Fade';

const { Content } = Layout;

class AdminUserNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null
        }
    }

    componentDidMount() {
        this.setState({
            loading: true,
        });
        const data = this.fetch();
        this.setState({
            data,
        });
        setTimeout(() => {
            this.setState({ loading: false });
        }, 7000);
    }

    fetch() {}

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
        }
    )
    
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    activeUser(id, name) {}

    inActiveUser(id, name) {}

    render() {
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                sorter: (a, b) => (a.name < b.name) ? -1 : ((a.name === b.name) ? 0 : 1),
                sortDirections: ['ascend', 'descend'],
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex',
                width: '8%',
            },
            {
                title: 'School',
                dataIndex: 'school',
                key: 'school',
                width: '22%',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '22%',
            },
            {
                title: 'Phone',
                dataIndex: 'phone',
                key: 'phone',
                width: '13%',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => this.activeUser(record.id)}>
                            <span style={{color: 'green', cursor: 'pointer'}}>Active</span>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => this.inActiveUser(record.id)}>
                            <span style={{color: 'red', cursor: 'pointer'}}>Inactive</span>
                        </Popconfirm>
                    </span>
                )
            }
        ];

        return (
            <Content className="notification">
                <Row type="flex" justify="space-around" align="middle" style={{padding: '35px 0px 55px 0px'}}>
                    <Col span={23}>
                        <Fade left>
                            <Table columns={columns} dataSource={this.state.data} loading={this.state.loading} pagination={{ pageSize: 25 }}
                            title={() => <span>{this.type + ' Notifications'}</span>} bordered size="middle"/>
                        </Fade>
                    </Col>
                </Row>
            </Content>
        );
    }
}

class AdminStudentNotifications extends AdminUserNotifications {
    constructor(props) {
        super(props);
        this.type = 'Student';
    }

    fetch() {
        let data = [];
        for (let i = 0; i < 100; ++i) {
            data.push({
                key: i,
                id: i,
                name: 'Nhan Vo Trung',
                sex: 'Male',
                school: 'Rach Gia Secondary School',
                email: 'nhan.votrung@gmail.com',
                phone: '0880902666',
            });
        }
        return data;
    }

    activeUser(id) {
        message.success('You actived student with id ' + id);
    }

    inActiveUser(id) {
        message.error('You inactived student with id ' + id);
    }
}

class AdminTeacherNotifications extends AdminUserNotifications {
    constructor(props) {
        super(props);
        this.type = 'Teacher';
    }

    fetch() {
        let data = [];
        for (let i = 0; i < 100; ++i) {
            data.push({
                key: i,
                id: i,
                name: 'Phuoc Nguyen Ho Minh',
                sex: 'Female',
                school: 'Quoc hoc Hue High School',
                email: 'phuoc@vng.com.vn',
                phone: '0381414114',
            });
        }
        return data;
    }

    activeUser(id) {
        message.success('You actived teacher with id ' + id);
    }

    inActiveUser(id) {
        message.error('You inactived teacher with id ' + id);
    }
}

export { AdminStudentNotifications, AdminTeacherNotifications };
