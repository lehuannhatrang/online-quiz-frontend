import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader"
import QuestionList from "../../components/control/questionList"
import Header from "../../components/control/header"
import { Loading } from '../share/LoadingComponent';
import CountDown from '../share/CountDownComponent';
import { Link, withRouter } from 'react-router-dom';
import {selectRooms, selectQuizzes, selectLoading, selectErrorInfo, selectError} from '../app/selectors';
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
          questionList: [],
          duration: null,
          startTime: null,
          quizId: null,
          ready: ReadyModes.UNDECIDED,
          finish: false,
          errorMessage: null,
        };

        this.handleSetReady = this.handleSetReady.bind(this);
        this.handleSetReady = this.handleFinish.bind(this);
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
        ready: true,
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
              <CountDown to={this.state.startTime} handleFinish={this.handleSetReady}/>
            </div>
          </div>
        );
      }
      else if (this.state.ready === ReadyModes.READY) {
        this.setState({
          ready: ReadyModes.HAD_READY
        });
        this.props.fetchQuizzes();
      }
      else if (this.props.loading) {
        let loadingText = '';
        if (this.props.quizId && this.state.startTime && this.state.duration) {
          loadingText = 'Loading Quiz...';
        }
        else {
          loadingText = 'Loading Room...';
        }
        return (
          <div>
            <Header />
            <div className="col-12 container">
                <Loading text={loadingText} />
              </div>
          </div>
        );
      }
      else if (this.props.error) {
        return (
          <div>
            <Header />
            <div className="col-12 container">
              <h4>{this.props.errorInfo}</h4>
            </div>
          </div>
        );
      }
      else {
        if (this.props.quizzes.length > 0 && this.state.startTime && this.state.duration && this.state.ready === ReadyModes.HAD_READY) {
          const quiz = this.props.quizzes.filter(quiz => quiz.id === this.state.quizId)[0];
          this.setState({
            questionList: quiz.question,
          });
          const endTime = new Date(this.state.startTime.getTime() + this.state.duration * 60 * 1000);
          return (
            <div>
              <Header/>
              <div id="time-left-container">
                <div id="time-left">
                  <CountDown to={endTime} handleFinish={this.handleFinish} />
                </div>
              </div>
              <QuestionList data={this.questionList}/>
              <div className="submit-button-container">
                <button className="button-primary submit-button" onClick={this.handleSubmit}>SUBMIT ANSWER</button>
              </div>
            </div>
          )
        }
        else if (this.props.rooms.length > 0) {
          const room = this.props.rooms.filter(room => room.id === this.props.match.params.roomId)[0];
          if (room === undefined) {
            this.setState({
              errorMessage: 'Room Id is incorrect!'
            });
            return (<div></div>);
          }
          //const startTime = parseISOString(room.startTime);
          const startTime = new Date(2019, 4, 23, 21, 50, 10);
          const duration = room.Duration;
          const quizId = room.QuizId;
          alert(this.props.quizzes);
          this.setState({
            quizId, startTime, duration
          });
          var now = new Date();
          var ready = startTime.getTime() <= now.getTime() ? ReadyModes.READY : ReadyModes.NON_READY;
          var finish = now.getTime() >= (startTime.getTime() + duration * 60 * 1000);
          this.setState({
            ready, finish
          });
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
      fetchRooms: () => dispatch(fetchRooms()), 
      fetchQuizzes: () => dispatch(fetchQuizzes()),
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  quizzes: selectQuizzes(),
  loading: selectLoading(),
  error: selectError(),
  errorInfo: selectErrorInfo(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentTest));