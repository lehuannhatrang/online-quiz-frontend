import React, {Component} from 'react';
import './lstudentTest.css';
import QuestionsList from "./QuestionsListComponent";
import { Loading } from '../shared/LoadingComponent';
import CountDown from '../shared/CountDownComponent';
import { Link, withRouter } from 'react-router-dom';
import LStudentHeader from '../header';
import { selectRooms, selectScore, selectLoading, selectResults } from '../../app/selectors';
import { fetchRooms, postResult, fetchMyResults } from '../../app/actions';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import * as ReadyModes from '../shared/ReadyModes';
import parseISOString from '../shared/parseISOString';
import { Layout, message, notification, Button, Statistic, Row, Col, Divider, List, Icon } from 'antd';
import RoomIdFailed from './RoomIdFailedComponent';
import Fade from 'react-reveal/Fade';

const { Content } = Layout;

const colStyles = {
	backgroundColor: 'white', 
	boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
	padding: '15px 20px',
};

class StudentTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
        	questionList: null,
			duration: null,
			startTime: null,
			ready: ReadyModes.UNDECIDED,
			finish: false,
			roomIdFailed: false,
			loadingText: 'Checking History ...',
			answers: null,
			score: null,
			flag: true,
			allRooms: null,
		};

        this.handleSetReady = this.handleSetReady.bind(this);
		this.handleFinish = this.handleFinish.bind(this);
		this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
    }

    componentDidMount() {
		//Check user did quiz.
		this.props.fetchMyResults();
      	//this.props.fetchRooms();
    }

    handleSubmit(){
      	
    }

    handleSetReady() {
      	this.setState({
        	ready: ReadyModes.READY,
      	});
    }

    handleFinish() {
			this.setState({
				loadingText: 'Submitting ...'
			});
			const studentAnswers = new Array(this.state.questionList.length);
			for (let i = 0; i < this.state.questionList.length; ++i) {
				const charAns = this.state.answers[i];
				if (charAns === undefined) {
					continue;
				}
				const idAnswer = charAns.charCodeAt(0) - 65;
				studentAnswers[i] = this.state.questionList[i].options[idAnswer];
			}
			this.props.postResult(this.props.match.params.roomId, studentAnswers);
    }

	handleChangeAnswer(id, val) {
		this.setState({
			answers: this.state.answers.fill(val, id, id + 1),
		});
	}

	getScore() {
		if ( this.props.score === null ) {
			if (this.state.score === null) {
				return 'zero';
			}
			else {
				return this.state.score;
			}
		}
		else {
			return this.props.score;
		}
	}
    render() { 
		if ( this.state.roomIdFailed ) {
			return (
				<React.Fragment>
					<LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={this.props.rooms} results={this.props.results}/>
					<Content style={{
						padding: '80px 0',
						backgroundColor: 'white',
					}}>
						<RoomIdFailed />
					</Content>
				</React.Fragment>
			);
		}
		else if (this.state.finish) {
			return (
				<React.Fragment>
					<LStudentHeader user={this.props.student} backgroundCol={'white'} results={this.props.results} rooms={this.state.allRooms}/>
					<Content style={{
						padding: '80px 0',
						backgroundColor: 'white',
					}}>
						<Row style={{backgroundColor: 'white', padding: '80px 0'}}>
							<Col span={14} offset={5}>
								<Fade>
									<h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'Your exam has finished! Your score is ' + this.getScore() + '.'}</h1>
									<h4 style={{fontSize: '18px', marginTop: '50px', fontFamily: 'Muli', textAlign: 'center'}}><Link style={{ color: 'blue' }} to="/student/dashboard/">{'Click here to comback to home page.'}</Link></h4>
								</Fade>
							</Col>
						</Row>
					</Content>
				</React.Fragment>
			);
		}
		else if ( this.props.score !== null ) {
			this.setState({
				finish: true,
			});
		}  
		else if (this.state.ready === ReadyModes.NON_READY) {
			return (
				<React.Fragment>
					<LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={this.state.allRooms} results={this.props.results}/>
					<Content style={{
						padding: '80px 0',
						backgroundColor: 'white',
					}}>
						<Row style={{backgroundColor: 'white', padding: '80px 0'}}>
							<Col span={14} offset={5}>
								<Fade>
									<h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'Your exam will start in some minutes later.'}</h1>
									<div style={{ 
										marginTop: '50px', marginLeft: 'auto', marginRight: 'auto', width: '25%',
										backgroundColor: 'black', padding: '12px 15px', textAlign: 'center',
										boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)'}}>
										<Statistic.Countdown value={this.state.startTime.getTime()} onFinish={this.handleSetReady} format="HH : mm : ss"
											valueStyle={{
												color: 'white',
												fontSize: '30px',
												fontFamily: 'Muli',
											}}/>
									</div>
								</Fade>
							</Col>
						</Row>
					</Content>
				</React.Fragment>
			);
		}
		else if (this.props.loading) {
			return (
				<React.Fragment>
					<LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={null} results={undefined}/>
					<Content style={{
						padding: '80px 0',
						backgroundColor: 'white',
					}}>
						<Loading text={this.state.loadingText} />
					</Content>
				</React.Fragment>
			);
		}
		else {
			if (this.state.questionList && this.state.startTime && this.state.duration && this.state.ready === ReadyModes.READY) {
				const endTime = this.state.startTime.getTime() + this.state.duration * 60 * 1000;
				let key = 0;
				var t = new Array(20);
				return (
					<React.Fragment>
						<LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={this.state.allRooms} results={this.props.results} />
						<Content style={{
							padding: '80px 0',
							fontFamily: 'Muli',
						}}>
							<Row style={{padding: '30px 80px'}}>
								<Col span={17} style={colStyles}>
									<QuestionsList data={this.state.questionList} handleChangeAnswer={(id, val) => { this.handleChangeAnswer(id, val); }}/>
								</Col>
								<Col span={6} offset={1} style={colStyles}>
									<h4 className="font-weight-bold">{this.props.rooms.name}</h4>
									<Divider />
									<Statistic.Countdown value={endTime} onFinish={this.handleFinish} format="HH:mm:ss"/>
									<Divider style={{fontFamily: 'Muli', fontSize: '14px'}} orientation='right'>Trace board</Divider>
									<List grid={{ column: 6 }} dataSource={this.state.answers.entries()} 
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
									}} htmlType="button" className="ltn-btn" onClick={this.handleFinish}>
										Submit Now
									</Button>
								</Col>
							</Row>
						</Content>
					</React.Fragment>
				);
			}
			else if (this.props.rooms) {
				if (this.props.rooms.id !== undefined) {
					const room = this.props.rooms;
					const startTime = parseISOString(room.startTime);
					// const startTime = new Date(2019, 5, 31, 9, 0, 0);
					const duration = room.Duration;
					const questionList = room.quiz.questions;
					this.setState({
						questionList, startTime, duration,
						answers: new Array(questionList.length),
					});
					var now = new Date();
					var ready = (startTime.getTime()-7*3600*1000) <= now.getTime() ? ReadyModes.READY : ReadyModes.READY;
					var finish = now.getTime() >= ((startTime.getTime()-7*3600*1000) + duration * 60 * 1000);
					this.setState({
						ready, finish
					});
				}
				else if (this.props.rooms.length > 0 && this.state.flag) {
					const roomId = this.props.match.params.roomId;
					const theRoom = this.props.rooms.filter(room => room.id === roomId)[0];
					if (theRoom === undefined) {
						this.setState({
							roomIdFailed: true,
						});
					}
					else {
						this.setState({
							loadingText: 'Loading Room...',
							allRooms: this.props.rooms,
						});
						this.props.fetchRooms(roomId);
					}
				}
				else {
					//checking
					if ( this.props.results === null) {
						this.setState({
							loadingText: 'Checking Room ...',
						});
						this.props.fetchRooms();
					}
					else if (this.props.results !== undefined) {
						const check = this.props.results.filter(result => result.room === this.props.match.params.roomId)[0];
						if (!check) {
							this.setState({
								loadingText: 'Checking Room ...',
							});
							this.props.fetchRooms();
						}
						else {
							if (this.state.score === null) {
								this.setState({
									score: check.score,
									flag: false,
								});
								this.props.fetchRooms();
							}
							else if (this.props.rooms.length > 0) {
								this.setState({
									allRooms: this.props.rooms,
									finish: true,
								});
							}
						}
					}
				}
			}
			else {
				return (
					<LStudentHeader user={this.props.student} backgroundCol={'white'} rooms={null} results={undefined}/> 
				)
			}
		}
		return <div></div>;
    }

}
// option selected add class:  option-selected

function mapDispatchToProps(dispatch) {
  	return {
	  	fetchRooms: (roomId) => dispatch(fetchRooms(roomId)),
		postResult: (room, userAnswer) => dispatch(postResult(room, userAnswer)),
		fetchMyResults: () => dispatch(fetchMyResults()),
  	}
}

const mapStateToProps = createStructuredSelector({
  	rooms: selectRooms(),
	loading: selectLoading(),
	score: selectScore(),
	results: selectResults(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentTest));