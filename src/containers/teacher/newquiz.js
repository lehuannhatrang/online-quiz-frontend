import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header"
import Question from "../../components/control/question"

class NewQuiz extends Component {
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
                <span id="quizz-header-text">Create Quiz</span>
                <div className="button-container">
                  <button className="button-primary">
                    <i className="ion-plus-round"></i>
                    SAVE & QUIT
                  </button>
                  
                </div>
              </div>

              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-university"></i>
                      <input className="search-input" id="quizname-input" placeholder="Name your Quiz ..." type="text"></input>
                    </div>
                  </span>
                </div>
              </div>

              <button className="button-primary new-btn">
                <i className="ion-plus-round"></i>
                NEW
              </button>

              <div id="questions">
                <Question/>
                <Question/>
              </div>
              
            </div>
          </div>
        )
    }

}

export default NewQuiz;
// alert("Hello world");