import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header"
import QuizTable from "../../components/control/quizTable"

class Quizz extends Component {
    constructor(props) {
        super(props);
    }
    quizInfoHardCode = [
      {
        id: "123",
        name: "sample quiz 1",
        date: "1/1/2019"
      },
      {
        id: "456",
        name: "sample quiz 2",
        date: "2/1/2019"
      },
    ]

    render() {
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">
              <div>
                <span id="quizz-header-text">Quizzes</span>
                <div className="button-container">
                  <button className="button-primary">
                    <i className="ion-plus-round"></i>
                    ADD QUIZ
                  </button>
                  <div className="dropdown-content">
                    <a href="/teacher/quizz/new">Create new quiz</a>
                    <a href="#">Import ...</a>
                  </div>
                </div>
              </div>

              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Quizzes" type="text"></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <QuizTable data= {this.quizInfoHardCode} />
              </div>
            </div>
            
          </div>
        )
    }

}

export default Quizz;
// alert("Hello world");