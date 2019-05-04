import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import Question from "../../components/control/question";
import {selectQuestions} from '../app/selectors';
import {fetchQuestions} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";

class NewQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questions: [],
        }
    }

    createQuizPath = '/teacher/quizz/new';
    
    
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

function mapDispatchToProps(dispatch) {
  return {
      fetchQuestions: (id) => dispatch(fetchQuestions(id)), 
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuestions(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);