import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader"
import QuestionList from "../../components/control/questionList"
import Header from "../../components/control/header"
import { Loading } from '../share/LoadingComponent';
import CountDown from '../share/CountDownComponent';
import { Link, withRouter } from 'react-router-dom';
import {selectRooms, selectQuizzes, selectLoading} from '../app/selectors';
import {fetchRooms, fetchQuizzes} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import * as ReadyModes from '../share/ReadyModes';

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

class StudentTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
          questionList: null,
          duration: null,
          startTime: null,
          ready: ReadyModes.UNDECIDED,
          finish: false,
          errorMessage: null,
          loadingText: 'Checking Room',
        };

        this.handleSetReady = this.handleSetReady.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
    }

    componentDidMount() {
      this.props.fetchRooms();
    }

    handleSubmit(){
      if(confirm("Are you sure to submit ?")){
        alert("Ok, now you are submited !");
      }
    }

    handleSetReady() {
      this.setState({
        ready: ReadyModes.READY,
      });
    }

    handleFinish() {
      this.setState({
        finish: true,
      });
    }


    render() {
      if (this.state.errorMessage !== null) {
        return (
          <div>
            <Header />
            <div className="col-12 container">
              <h4>{this.state.errorMessage}</h4>
            </div>
          </div>
        );
      }
      else if (this.state.finish) {
        return (
          <div>
            <Header />
            <div className="col-12 container">
              <h3>{'Your exam finished.'}</h3>
              <Link to="/dashboard">{'Click here to comeback to homepage'}</Link>
            </div>
          </div>
        );
      }
      else if (this.state.ready === ReadyModes.NON_READY) {
        return (
          <div>
            <Header />
            <div className="col-12 container">
              <CountDown to={this.state.startTime} handleEndTimeout={this.handleSetReady}/>
            </div>
          </div>
        );
      }
      else if (this.props.loading) {
        return (
          <div>
            <Header />
            <div className="col-12 container">
                <Loading text={this.state.loadingText} />
              </div>
          </div>
        );
      }
      else {
        if (this.state.questionList && this.state.startTime && this.state.duration && this.state.ready === ReadyModes.READY) {
          const endTime = new Date(this.state.startTime.getTime() + this.state.duration * 60 * 1000);
          return (
            <div>
              <Header/>
              <div id="time-left-container">
                <div id="time-left">
                  <CountDown to={endTime} handleEndTimeout={this.handleFinish} />
                </div>
              </div>
              <QuestionList data={this.state.questionList}/>
              <div className="submit-button-container">
                <button className="button-primary submit-button" onClick={this.handleSubmit}>SUBMIT ANSWER</button>
              </div>
            </div>
          );
        }
        else if (this.props.rooms) {
          if (this.props.rooms.id !== undefined) {
            const room = this.props.rooms;
            //const startTime = parseISOString(room.startTime);
            const startTime = new Date(2019, 4, 26, 18, 47, 29);
            const duration = room.Duration;
            const questionList = room.quiz.questions;
            this.setState({
              questionList, startTime, duration
            });
            var now = new Date();
            var ready = startTime.getTime() <= now.getTime() ? ReadyModes.READY : ReadyModes.NON_READY;
            var finish = now.getTime() >= (startTime.getTime() + duration * 60 * 1000);
            this.setState({
              ready, finish
            });
          }
          else if (this.props.rooms.length > 0) {
            const roomId = this.props.match.params.roomId;
            const theRoom = this.props.rooms.filter(room => room.id === roomId)[0];
            if (theRoom === undefined) {
              this.setState({
                errorMessage: 'Room Id non exists',
              });
            }
            else {
              this.setState({
                loadingText: 'Loading Room...',
              });
              this.props.fetchRooms(roomId);
            }
          } 
        }
        else {
          return (
            <div>
              <Header />
              <div className="col-12 container">
              </div>
            </div>
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
      fetchQuizzes: () => dispatch(fetchQuizzes()),
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  quizzes: selectQuizzes(),
  loading: selectLoading(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentTest));