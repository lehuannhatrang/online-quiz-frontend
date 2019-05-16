import React, {Component} from 'react';
import Header from "../../components/control/header";
import StudentHeader from "../../components/control/studentHeader";
import ResultTable from "../../components/control/resultTable";
import {selectRooms} from '../app/selectors';
import {fetchRooms} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

class studentResult extends Component {
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
    }

    testInfoHardCode = [
      {
        id: "123",
        name: "sample test 1 result",
        start: "1:30 AM 1/1/2019",
        end: "2:30 PM 1/2/2019"
      },
      {
        id: "456",
        name: "sample test 2 result",
        start: "1:30 PM, 1/1/2019",
        end: "2:30 PM, 1/2/2019"
      }
    ]

    render() {
      const rooms = (this.props.rooms && this.props.rooms.length > 0) ? this.props.rooms : this.testInfoHardCode ;
        return(
          <div>
            <StudentHeader/>

            <div id="quizz-container">
              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Test Result" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <ResultTable searchingText={this.state.search} data= {rooms} 
                            deleteRoom={this.deleteRoom}/>
              </div>
            </div>
            
          </div>
        )
    }
}

export default studentResult;