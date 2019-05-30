import React, { Component } from 'react';
import { Row, Col, Table, Icon, Button, Divider, Popconfirm, message, Layout, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import Fade from 'react-reveal/Fade';
// import { connect } from "react-redux";
// import { createStructuredSelector } from 'reselect';
// import { selectUsers, selectLoading } from "../app/selectors";
// import { withRouter } from 'react-router-dom';
import { Loading } from './shared/LoadingComponent.js';

const { Content } = Layout;
const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
    fontSize: '20px',
    background: 'transparent',
    width: '100%',
};
class AdminUserNotifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
    }

    fetch(data) {}

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
        if ( this.props.loading ) {
            return (
                <Content className="notification" style={insideStyles}>
                    <Loading text={'Loading Notifications ...'}/>
                </Content>
            );
        }
        else if ( this.props.users.length > 0 ) {
            const data = this.fetch(this.props.users);
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
                    title: 'Mail',
                    dataIndex: 'mail',
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
                                <span style={{color: 'red', cursor: 'pointer'}}>Disable</span>
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
                                <Table columns={columns} dataSource={data} pagination={{ pageSize: 6 }}
                                title={() => <span>{this.type + ' Notifications'}</span>} bordered size="middle"/>
                            </Fade>
                        </Col>
                    </Row>
                </Content>
            );
        }
        return (<div></div>)
    }
}

// const mapStateToProps = createStructuredSelector({
//     users: selectUsers(),
//     loading: selectLoading(),
// });
  
// const withRouterAdminStudentNotifications = withRouter(connect(mapStateToProps)(AdminStudentNotifications));
// const withRouterAdminTeacherNotifications = withRouter(connect(mapStateToProps)(AdminTeacherNotifications));
// export { withRouterAdminStudentNotifications, withRouterAdminTeacherNotifications };
export default AdminUserNotifications;
