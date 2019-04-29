import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header"
import RoomTable from "../../components/control/roomTable"
class Room extends Component {
    constructor(props) {
        super(props);
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
              <div>
                <span id="quizz-header-text">Rooms</span>
                <div className="button-container">
                  <button className="button-primary">
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
                      <input className="search-input" placeholder="Search Rooms" type="text"></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <RoomTable data= {this.roomInfoHardCode} />
              </div>
            </div>
            
          </div>
        )
    }

}

export default Room;
// alert("Hello world");