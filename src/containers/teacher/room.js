import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import RoomTable from "../../components/control/roomTable";
import {selectRooms} from '../app/selectors';
import {fetchRooms} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";

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
        }
        this.deleteRoom = this.deleteRoom.bind(this);
        this.handleSubmitRoom = this.handleSubmitRoom.bind(this);
    }

    componentDidMount() {
      this.props.fetchRooms();
    }

    roomInfoHardCode = [
      {
        id: "123",
        name: "sample room 1",
        start: "1:30 AM 1/1/2019",
        end: "2:30 PM 1/2/2019"
      },
      {
        id: "456",
        name: "sample room 2",
        start: "1:30 PM, 1/1/2019",
        end: "2:30 PM, 1/2/2019"
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
          QuizId: this.state.quizId,
          startTime: `${this.state.date}T${this.state.startTime}:00Z`,
          Duration: duration,
        };
        HttpUtil.postJsonAuthorization('/room', data);        
      }
      
    }

    deleteRoom(id) {
      HttpUtil.deleteJsonAuthorization(`/room`, {id: id});
      this.props.fetchRooms();
    }

    render() {
      const rooms = (this.props.rooms && this.props.rooms.length > 0) ? this.props.rooms : this.roomInfoHardCode ;
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">

              <div id="myModal" className="modal fade" role="dialog">
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
                                <option value="1">First quiz</option>
                                <option value="2">Second quiz</option>
                                <option value="3">Third quiz</option>
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

              <div>
                <span id="quizz-header-text">Rooms</span>
                <div className="button-container">
                  <button className="button-primary" data-toggle="modal" data-target="#myModal">
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
                            deleteRoom={this.deleteRoom}/>
              </div>
            </div>
            
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchRooms: () => dispatch(fetchRooms()), 
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Room);