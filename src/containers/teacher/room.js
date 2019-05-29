import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import RoomTable from "../../components/control/roomTable";
import {selectRooms, selectQuizzes} from '../app/selectors';
import {fetchRooms, fetchQuizzes} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";
import {toast} from "react-toastify";


class Room extends Component {
    constructor(props) {
        super(props);
        this.state ={
          search: "",
          roomName: "",
          password: "",
          quizId: "",
          date: "",
          startTime: "",
          endTime: "",
          isEdit: false,
          editRoom: {},
        }
        this.deleteRoom = this.deleteRoom.bind(this);
        this.handleSubmitRoom = this.handleSubmitRoom.bind(this);
        this.editRoom = this.editRoom.bind(this);
    }

    componentDidMount() {
      this.props.fetchRooms();
      this.props.fetchQuizzes();
    }

    roomInfoHardCode = [
      {
        id: "123",
        name: "sample room 1",
        startTime: "2019-01-02T12:00:00.00Z",
        Duration: "90"
      },
      {
        id: "456",
        name: "sample room 2",
        startTime: "2019-01-02T12:00:00.00Z",
        Duration: "60"
      }
    ]

    calculateTime(begin, end) {
      const beginTime = begin.split(":").map(value => Number(value));
      const endTime = end.split(":").map(value => Number(value));
      const duration = (endTime[0]*60 + endTime[1]) - (beginTime[0]*60 + beginTime[1]);
      return duration;      
    }

    handleSubmitRoom() {
      const duration = this.calculateTime(this.state.startTime, this.state.endTime);
      if(duration < 0) {
        alert("Set End time again");
      }
      else{
        const data={
          name: this.state.roomName,
          QuizId: this.state.quizId,
          startTime: `${this.state.date}T${this.state.startTime}:00Z`,
          Duration: duration,
        };
        HttpUtil.postJsonAuthorization('/room', data);        
      }
      
    }

    handleEditRoom() {
      const duration = this.calculateTime(this.state.startTime, this.state.endTime);
      if(duration < 0) {
        alert("Set End time again");
      }
      else{
        const data={
          name: this.state.editRoomName,
          QuizId: this.state.editQuizId,
          startTime: `${this.state.editDate}T${this.state.editStartTime}:00Z`,
          editDuration: duration,
        };
        HttpUtil.postJsonAuthorization('/room', data);        
      }
      
    }



    deleteRoom(id) {
      HttpUtil.deleteJsonAuthorization(`/room`, {id: id})
        .then(res => this.props.fetchRooms())
      
    }

    editRoom(id) {
      const editRoom = this.props.rooms.find(room => room.id === id);
      this.setState({
        editRoom,
        editDate: editRoom.startTime.substring(0,10),
        editDuration: editRoom.Duration,
        editStartTime: editRoom.startTime.substring(11,16),
        editRoomName: editRoom.name,
        editQuizId: editRoom.QuizId,
        editPassword: editRoom.password||'',
      })
      if(!(this.props.quizzes.length > 0)) toast.warn("Waiting for loading data ...");
    }

    renderForm(room) {
      return(
        <div id="editRoom" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={this.handleEdiitRoom}>

                      <div className="modal-header">
                        <h4 className="modal-title">Edit room</h4>
                      </div>

                      <div className="modal-body">
                          <div className="form-group row">
                            <label for="room-name" className="col-sm-2 col-form-label">Name:</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" name="room-name" id="room-name" defaultValue={room.name||''}
                                      onChange={e => this.setState({editRoomName: e.target.value})} placeholder="Enter room name"/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="room-password" className="col-sm-2 col-form-label">Password:</label>
                            <div className="col-sm-10">
                              <input type="password" className="form-control" id="room-password" defaultValue={room.password||''}
                                      onChange={e => this.setState({editPassword: e.target.value})} placeholder="optional ..."/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="quiz-name" className="col-sm-2 col-form-label">Quiz:</label>
                            <div className="col-sm-10">
                              <select className="custom-select" id="quiz-name" defaultValue={room.QuizId||''} onChange={e => this.setState({editQuizId: e.target.value})}>
                                <option disabled value=''>Select the quiz ...</option>
                                {this.props.quizzes.length>0 && this.props.quizzes.map(quiz => (
                                  <option value={quiz.id}>{quiz.name? quiz.name: quiz.id}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="room-date" className="col-sm-2 col-form-label">Date:</label>
                            <div className="col-sm-10">
                              <input type="date" className="form-control" id="room-date" defaultValue={room.startTime ? room.startTime.substring(0,10): ''}
                                      onChange={e => this.setState({editDate: e.target.value})} placeholder="Date ..."/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="start-time-container">
                              <label for="start-time" className="col-sm-1 col-form-label">Start:</label>
                              <div className="col-sm-10">
                                <input type="text" className="form-control" id="start-time" defaultValue={room.startTime ? room.startTime.substring(11,16): ''} onChange={e => this.setState({editStartTime: e.target.value})} required/>
                              </div>
                            </div>

                            <div className="end-time-container">
                              <label for="end-time" className="col-sm-1 col-form-label">Duration (Minute)</label>
                              <div className="col-sm-10">
                                <input type="number" className="form-control" defaultValue={this.state.editDuration} id="duration" onChange={e => this.setState({editDuration: e.target.value})} required/>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-default btn-newroom">Edit</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
      )
    }

    render() {
      const rooms = this.props.rooms ? this.props.rooms : [];
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">

              <div id="newRoom" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <form onSubmit={this.handleSubmitRoom}>

                      <div className="modal-header">
                        <h4 className="modal-title">Create new room</h4>
                      </div>

                      <div className="modal-body">
                          <div className="form-group row">
                            <label for="room-name" className="col-sm-2 col-form-label">Name:</label>
                            <div className="col-sm-10">
                              <input type="text" className="form-control" name="room-name" id="room-name" 
                                      onChange={e => this.setState({roomName: e.target.value})} placeholder="Enter room name"/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="room-password" className="col-sm-2 col-form-label">Password:</label>
                            <div className="col-sm-10">
                              <input type="password" className="form-control" id="room-password"
                                      onChange={e => this.setState({password: e.target.value})} placeholder="optional ..."/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="quiz-name" className="col-sm-2 col-form-label">Quiz:</label>
                            <div className="col-sm-10">
                              <select className="custom-select" id="quiz-name" onChange={e => this.setState({quizId: e.target.value})}>
                                <option disabled selected>Select the quiz ...</option>
                                {this.props.quizzes.length>0 && this.props.quizzes.map(quiz => (
                                  <option value={quiz.id}>{quiz.name? quiz.name: quiz.id}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label for="room-date" className="col-sm-2 col-form-label">Date:</label>
                            <div className="col-sm-10">
                              <input type="date" className="form-control" id="room-date"
                                      onChange={e => this.setState({date: e.target.value})} placeholder="Date ..."/>
                            </div>
                          </div>

                          <div className="form-group row">
                            <div className="start-time-container">
                              <label for="start-time" className="col-sm-1 col-form-label">Start:</label>
                              <div className="col-sm-10">
                                <input type="time" className="form-control" id="start-time" onChange={e => this.setState({startTime: e.target.value})} required/>
                              </div>
                            </div>

                            <div className="end-time-container">
                              <label for="end-time" className="col-sm-1 col-form-label">End:</label>
                              <div className="col-sm-10">
                                <input type="time" className="form-control" id="end-time" onChange={e => this.setState({endTime: e.target.value})} required/>
                              </div>
                            </div>
                          </div>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-default btn-newroom">Create</button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
              
              {this.props.quizzes.length > 0 && this.renderForm(this.state.editRoom)}

              <div>
                <span id="quizz-header-text">Rooms</span>
                <div className="button-container">
                  <button className="button-primary" data-toggle="modal" data-target="#newRoom">
                    <i className="ion-plus-round"></i>
                    ADD ROOM
                  </button>
                </div>
              </div>

              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Rooms" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <RoomTable searchingText={this.state.search} data= {rooms} 
                            deleteRoom={this.deleteRoom} editRoom={this.editRoom}/>
              </div>
            </div>
            
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchRooms: () => dispatch(fetchRooms()), 
      fetchQuizzes: () => dispatch(fetchQuizzes()),
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  quizzes: selectQuizzes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);