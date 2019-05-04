import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import RoomTable from "../../components/control/roomTable";
import {selectRooms} from '../app/selectors';
import {fetchRooms} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

class Room extends Component {
    constructor(props) {
        super(props);
        this.state ={
          search: ""
        }
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

    render() {
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">

              <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Create new room</h4>
                    </div>
                    <div className="modal-body">

              <form>
                <div className="form-group row">
                  <label for="room-name" className="col-sm-2 col-form-label">Name:</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="room-name" placeholder="Enter room name"/>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="room-password" className="col-sm-2 col-form-label">Password:</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="room-password" placeholder="optional ..."/>
                  </div>
                </div>

                <div className="form-group row">
                  <label for="quiz-name" className="col-sm-2 col-form-label">Quiz:</label>
                  <div className="col-sm-10">
                    <select className="custom-select" id="quiz-name">
                      <option disabled selected>Select the quiz ...</option>
                      <option value="1">First quiz</option>
                      <option value="2">Second quiz</option>
                      <option value="3">Third quiz</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <div className="start-time-container">
                    <label for="start-time" className="col-sm-1 col-form-label">Start:</label>
                    <div className="col-sm-10">
                      <input type="time" className="form-control" id="start-time" required/>
                    </div>
                  </div>

                  <div className="end-time-container">
                    <label for="end-time" className="col-sm-1 col-form-label">End:</label>
                    <div className="col-sm-10">
                      <input type="time" className="form-control" id="end-time" required/>
                    </div>
                  </div>
                </div>
                </form>

                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-default btn-newroom">Create</button>
                    </div>
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
                <RoomTable searchingText={this.state.search} data= {this.roomInfoHardCode} />
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