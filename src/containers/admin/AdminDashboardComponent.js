import React from 'react';
import { Layout, Icon, Card, Statistic, Row, Col, Avatar } from 'antd';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import getRecentlyMonths from './shared/recentMonths';
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

const SecondGroupStatistic = (props) => {
    return (
        <Col span={7} className="group-1-col">
            <Fade bottom>
                <Card className="text-center">
                    <Avatar style={{...avatarStyle, color: 'tomato'}} size={64} icon={props.icon} />
                    <Statistic valueStyle={{color: 'orange'}} title={props.title} value={props.quantity} />
                </Card>
            </Fade>
        </Col>
    )
};

const ThirdGroupStatistic = (props) => {
    return (
        <Col span={4} className="group-1-col">
            <Fade top>
                <Card className="text-center">
                    <Avatar style={{...avatarStyle, color: props.color}} size={64} icon={props.icon} />
                    <Statistic value={props.quantity} suffix={props.suffix}/>
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

    const thirdGroupStatisticContents = [
        {
            id: 0,
            icon: 'facebook',
            quantity: 33777,
            suffix: 'members',
            color: '#6A5ACD',
        },
        {
            id: 1,
            icon: 'youtube',
            quantity: 1245098,
            suffix: 'subcribers',
            color: 'red',
        },
        {
            id: 2,
            icon: 'twitter',
            quantity: 904777,
            suffix: 'followers',
            color: '#1890ff',
        },
        {
            id: 3,
            icon: 'instagram',
            quantity: 5033088,
            suffix: 'followers',
            color: 'pink',
        },
        {
            id: 4,
            icon: 'linkedin',
            quantity: 999777,
            suffix: 'subcribers',
            color: '#4682B4',
        },
        {
            id: 5,
            icon: 'github',
            quantity: 29563,
            suffix: 'stars',
            color: 'black',
        },
    ];

    const studentData = {
        labels: getRecentlyMonths(6),
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
        labels: getRecentlyMonths(6),
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

    const roomData = {
        labels: getRecentlyMonths(9),
        datasets: [
            {
                label: 'Number of Rooms',
                fill: false,
                lineTension: 0.03,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#1890ff",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: props.numRoomData,
            }
        ]
    };
    
    const schoolData = {
        labels: ['Primary', 'Secondary', 'High'],
        datasets: [
            {
                label: 'No. School Types',
                data: props.numSchoolData,
                backgroundColor: ['yellow', '#DC143C', '#1890ff'],
            },
        ],
    };

    const subjectData = {
        labels: ['Math', 'Literature', 'Physics', 'Chemistry', 'History', 'English', 'Geography', 'IT'],
        datasets: [
            {
                label: 'No. Subject Quizs',
                data: props.subjectData,
                backgroundColor: ['#DC143C', '#1890ff', '#FF4500', '#7CFC00', '#00FFFF', '#8A2BE2', '#FF7F50', '#9ACD32'],
            },
        ],
    };

    return (
        <Content className="dashboard" style={{paddingTop: '50px'}} >
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
                    <SecondGroupStatistic key={item.id} quantity={item.quantity} icon={item.icon} title={item.title}/>
                );})}
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginTop: '35px'}}>
                <Col span={23}>
                    <Card title={'No. created rooms (recent 9 months)'}>
                        <Bar data={roomData} />
                    </Card>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginTop: '35px'}}>
                <Col span={23}>
                    <Card>
                        <Col span={12}>
                            <Doughnut data={schoolData} />
                            <div className="text-center" style={{padding: '10px', marginTop: '20px'}}>{'No. of students arranged by school types'}</div>
                        </Col>
                        <Col span={12}>
                            <Doughnut data={subjectData} />
                            <div className="text-center" style={{padding: '10px', marginTop: '20px'}}>{'No. of quizes arranged by subjects'}</div>
                        </Col>
                    </Card>
                </Col>
            </Row>
            <Row type="flex" justify="space-around" align="middle" style={{marginTop: '35px'}}>
                <Col span={23}>
                    <Row gutter={16}>
                        {thirdGroupStatisticContents.map((item) => {return (
                            <ThirdGroupStatistic key={item.id} quantity={item.quantity} icon={item.icon} color={item.color} suffix={item.suffix}/>
                        );})}
                    </Row>
                </Col>
            </Row>
        </Content>
    );
};

export default AdminDashboard;