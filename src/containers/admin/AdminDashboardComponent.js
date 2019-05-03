import React from 'react';
import { Layout, Icon, Card, Statistic, Row, Col, Avatar } from 'antd';
import { Line } from 'react-chartjs-2';
import getRecentlySixMonths from './shared/recentSixMonths';
import Fade from 'react-reveal/Fade';

const { Content } = Layout;

const avatarStyle = {
    backgroundColor: 'white',
    color: 'lightgrey',
    fontSize: '50px',
};

const FirstGroupStatistic = (props) => {
    return (
        <Col span={5} className="group-1-col">
            <Fade bottom>
                <Card>
                    <Avatar style={avatarStyle} size={64} icon={props.icon} />
                    <Statistic valueStyle={{color: '#1890ff'}} title={props.title} value={props.quantity} 
                    suffix={props.suffix} className="group-1-statistic"/>
                </Card>
            </Fade>
        </Col>
    )
};


const AdminDashboard = (props) => {
    const firstGroupStatisticContents = [
        {
            id: 0,
            title: 'No. Students',
            icon: 'team',
            quantity: 21673,
        },
        {
            id: 1,
            title: 'No. Teachers',
            icon: 'audit',
            quantity: 6190,
        },
        {
            id: 2,
            title: 'No. Schools',
            icon: 'bank',
            quantity: 571,
        },
        {
            id: 3,
            title: 'No. Provinces',
            icon: 'appstore',
            quantity: 56,
            suffix: '/ 64',
        }
    ];

    const secondGroupStatisticContents = [
        {
            id: 0,
            title: 'No. Rooms',
            icon: 'calculator',
            quantity: 5673,
        },
        {
            id: 1,
            title: 'No. Quizs',
            icon: 'global',
            quantity: 46788,
        },
        {
            id: 2,
            title: 'No. Questions',
            icon: 'message',
            quantity: 120349,
        },
    ];

    const studentData = {
        labels: getRecentlySixMonths(),
        datasets: [
            {
                label: 'Number of Students',
                fill: true,
                lineTension: 0.03,
                backgroundColor: "rgba(150,197,104, 0.4)",
                borderColor: "rgba(150,197,104,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(153, 184, 149,1)",
                pointBackgroundColor: "#1890ff",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(153, 184, 149,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.numStudentData,
            }
        ],
    };

    const teacherData = {
        labels: getRecentlySixMonths(),
        datasets: [
            {
                label: 'Number of Teachers',
                fill: true,
                lineTension: 0.03,
                backgroundColor: "rgba(228, 244, 34, 0.4)",
                borderColor: "rgba(228, 244, 34,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(254, 213, 62,1)",
                pointBackgroundColor: "#1890ff",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(254, 213, 62,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.numTeacherData,
            }
        ],
    };

    return (
        <Content className="dashboard" style={{paddingTop: '50px'}}>
            <Row type="flex" justify="space-around" align="middle">
                {firstGroupStatisticContents.map((item) => {return (
                    <FirstGroupStatistic key={item.id} suffix={item.suffix} quantity={item.quantity} icon={item.icon} title={item.title} />
                );})}
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginTop: '35px'}}>
                <Col span={11}>
                    <Card title={'No. participated students (recent 6 months)'}>
                        <Line data={studentData} />
                    </Card>
                </Col>
                <Col span={11}>
                    <Card title={'No. participated teachers (recent 6 months)'}>
                        <Line data={teacherData} />
                    </Card>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginTop: '35px'}}>
                {secondGroupStatisticContents.map((item) => {return (
                    <SecondGroupStatistic key={item.id} />
                );})}
            </Row>
        </Content>
    );
};

export default AdminDashboard;