import React, { Component } from 'react';
import QuestionsResultList from "./QuestionsResultListComponent";
import { selectRooms, selectLoading, selectResults } from '../../app/selectors';
import { fetchRooms, fetchMyResults } from '../../app/actions';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { Loading } from '../shared/LoadingComponent';
import LStudentHeader from '../header';
import parseISOString from '../shared/parseISOString';
import { Layout, message, notification, Button, Statistic, Row, Col, Divider, List, Icon } from 'antd';
import './lstudentResult.css';
import Fade from 'react-reveal/Fade';

const { Content } = Layout;

const colStyles = {
	backgroundColor: 'white', 
	boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
	padding: '15px 20px',
};

class StudentResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            allRooms: null,
        };
    }
    
    componentDidMount() {
        this.props.fetchMyResults();
    }

    getScores(questionList, userAnswers) {
        var n = userAnswers.length;
        const scores = (new Array(n)).fill(false);
        for (let i = 0; i < n; ++i) {
            if (userAnswers[i] !== null && userAnswers[i] !== undefined) {
                if (questionList[i].answer === userAnswers[i]) {
                    scores[i] = true;
                }
            }
        }
        return scores;
    }

    render() {
        const resultId = this.props.match.params.resultId;

        if ( this.props.loading) {
            return (
                <React.Fragment>
                    <LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={null} results={undefined}/>
                    <Content style={{
						padding: '80px 0',
						backgroundColor: 'white',
					}}>
						<Loading text={'Loading Result ...'} />
					</Content>
                </React.Fragment>
            );
        }
        else if (this.props.results !== undefined) {
            if (this.props.results) {
                const result = this.props.results.filter(result => result.id === resultId)[0];
                if (result === undefined) {
                    if ( !this.state.flag ) {
                        this.setState({
                            flag: true,
                        });
                        this.props.fetchRooms();
                        return (<div></div>);
                    }
                    else if (this.props.rooms.length > 0) {
                        return (
                            <React.Fragment>
                                <LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={this.props.rooms} results={this.props.results}/>
                                <Content style={{
                                    padding: '80px 0',
                                    backgroundColor: 'white',
                                }}>
                                    <Row style={{backgroundColor: 'white', padding: '80px 0'}}>
                                        <Col span={14} offset={5}>
                                            <Fade>
                                                <h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'Your result doesn\'t exists. Please try again!'}</h1>
                                                <h4 style={{fontSize: '18px', marginTop: '50px', fontFamily: 'Muli', textAlign: 'center'}}><Link style={{ color: 'blue' }} to="/student/dashboard/">{'Click here to comback to home page.'}</Link></h4>
                                            </Fade>
                                        </Col>
                                    </Row>
                                </Content>
                            </React.Fragment>
                        );
                    }
                    else {
                        return (<div></div>);
                    }
                }

                if (this.props.rooms.id !== undefined) {
                    const room = this.props.rooms;
                    const questionList = room.quiz.questions;
                    const userAnswers = result.userAnswer;
                    const scores = this.getScores(questionList, userAnswers);
                    return (
                        <React.Fragment>
                            <LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={this.state.allRooms} results={this.props.results} />
                            <Content style={{
                                padding: '80px 0',
                                fontFamily: 'Muli',
                            }}>
                                <Row style={{padding: '30px 80px'}}>
                                    <Col span={17} style={colStyles}>
                                        {!this.state.rankVisible && <QuestionsResultList data={questionList} answers={userAnswers}/>}
                                        {this.state.rankVisible && <Rank reports={this.props.reports} />}
                                    </Col>
                                    <Col span={6} offset={1} style={colStyles}>
                                        <h4 className="font-weight-bold">{room.name}</h4>
                                        <Divider />
                                        <h5>Score: {result.score}</h5>
                                        <Divider style={{fontFamily: 'Muli', fontSize: '14px'}} orientation='right'>Score board</Divider>
                                        <List grid={{ column: 6 }} dataSource={scores.entries()} 
                                            renderItem={
                                                item => {
                                                    return (
                                                        <List.Item key={item[0]}>
                                                            <div style={{
                                                                padding: '1px',
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                color: 'white',
                                                                background: 'black',
                                                                fontSize: '11px',
                                                            }}>{item[0] + 1}</div>
                                                            <div style={{
                                                                padding: '2px 5px',
                                                                textAlign: 'center',
                                                                color: !item[1] ? 'red' : 'green',
                                                                fontSize: '15px',
                                                                borderBottom: '1px solid #eee',
                                                            }}>
                                                                { !item[1] ? <Icon type="close"/> : <Icon type="check" /> }
                                                            </div>
                                                        </List.Item>
                                                    )
                                                }
                                            } />
                                        <Divider />
                                        <Button type="primary" size="large" style={{
                                            width: '100%',
                                            color: 'white',
                                            backgroundColor: 'black',
                                            border: 'none',
                                            outline: 'none'
                                        }} htmlType="button" className="ltn-btn">
                                            Rank
                                        </Button>
                                    </Col>
                                </Row>
                            </Content>
                        </React.Fragment>
                    );
                }
                else if (this.props.rooms.length > 0) {
                    this.setState({
                        allRooms: this.props.rooms,
                    });
                    const roomId = result.room;
                    this.props.fetchRooms(roomId);
                }
                else {
                    this.props.fetchRooms();
                }
            }
            else {
                return (
                    <React.Fragment>
                        <LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={null} results={null}/>
                        <Content style={{
                            padding: '80px 0',
                            backgroundColor: 'white',
                        }}>
                            <Row style={{backgroundColor: 'white', padding: '80px 0'}}>
                                <Col span={14} offset={5}>
                                    <Fade>
                                        <h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'You don\'t have any result yet. Please try again!'}</h1>
                                        <h4 style={{fontSize: '18px', marginTop: '50px', fontFamily: 'Muli', textAlign: 'center'}}><Link style={{ color: 'blue' }} to="/student/dashboard/">{'Click here to comback to home page.'}</Link></h4>
                                    </Fade>
                                </Col>
                            </Row>
                        </Content>
                    </React.Fragment>
                );
            }
        }
        
        return (<div></div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRooms: (roomId) => dispatch(fetchRooms(roomId)),
        fetchMyResults: () => dispatch(fetchMyResults()),
    }
}

const mapStateToProps = createStructuredSelector({
    rooms: selectRooms(),
    loading: selectLoading(),
    results: selectResults(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentResult));