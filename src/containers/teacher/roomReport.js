import React, {Component} from 'react';
import Header from "../../components/control/header";
import StudentList from "../teacher/studentList";

class RoomReport extends Component {
    constructor(props) {
        super(props);
    }

    roomResultInforHardCode = [
      {
        name: "Trần Văn A",
        score: "9.5",
        right: 11,
        total: 20
      },
      {
        name: "Trần Văn B",
        score: "9.5",
        right: 17,
        total: 20
      },
      {
        name: "Nguyễn Văn C",
        score: "5",
        right: 12,
        total: 20
      },
      {
        name: "Dương Văn D",
        score: "0.5",
        right: 1,
        total: 20
      }
    ]

    render() {
        return(
          <div>
            <Header/>
            <div id="quizz-container">

              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Student Result" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <StudentList data={this.roomResultInforHardCode}></StudentList>
          </div>
        )
    }
}

export default RoomReport;