import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader"

class Student extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <StudentHeader></StudentHeader>

            <div className="test-container clearfix">
              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                <span className="input-search-container">
                  <div className="input-block">
                    <i className="ion-compose"></i>
                    <input className="search-input" placeholder="Enter Room ID ..." type="text"></input>
                    <button className="button-primary submit-button">Enter</button>
                  </div>
                </span>
                </div>
              </div>
              <img src="https://static1.squarespace.com/static/5734ea3904426234cfb274bd/t/5b48039ff950b79b268cea76/1531446176681/Einstein.png"></img>
            </div>
          </div>
        )
    }

}

export default Student;