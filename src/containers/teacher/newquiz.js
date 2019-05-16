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
          quizName: "",
          questions: [],
          isPublic: false,
        }
    }

    componentDidMount() {
      this.handleAddNewQuestion();
    }

    createQuizPath = '/teacher/quizz/new';

    emptyQuestion = {
      question: "",
      options: [
          "",
          "",
          "",
          "",
      ],
      answer: "A",
    };

    async handleAddNewQuestion() {
      const newQuestions = await this.state.questions.slice();
      await newQuestions.push(this.emptyQuestion);
      this.setState({
        questions: newQuestions,
      })
    }

    async deleteQuestion(index) {
      const questions = await this.state.questions.slice();
      await questions.splice(index, 1);
      this.setState({
        questions
      })
    }

    handleChangeQuestion(value, index){
      let questions = this.state.questions.slice();
      questions[index] = value;
      this.setState({questions});
    }
    
    handleSubmit() {
      const data = {
        name: this.state.quizName,
        questions: this.state.questions,
        isPublic: this.state.isPublic,
      };
      HttpUtil.postJsonAuthorization('/quiz', data);
    }
    
    render() {
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">
              <div className="mb-2">
                <span id="quizz-header-text">Create Quiz - <span className={`d-inline ${this.state.isPublic? "text-success" : "text-muted"} pt-2`}>Public</span></span>

                <div className="d-inline ml-4">
                
                  <label class="switch mr-2">
                    <input type="checkbox" value="ok" onClick={() => this.setState({isPublic : !this.state.isPublic})}/>
                    <span class="slider round"></span>
                  </label>
                </div>

                <div className="button-container">
                  <button className="button-primary" onClick={() => this.handleSubmit()}>
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
                      <input className="search-input" id="quizname-input" 
                      placeholder="Name your Quiz ..." type="text"
                      onChange={e => this.setState({quizName: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <button className="button-primary new-btn" onClick={() => this.handleAddNewQuestion()}>
                <i className="ion-plus-round"></i>
                NEW
              </button>

              <div id="questions">
              {this.state.questions.map((question, index) => {
                return(
                  <Question data={question} number={index +1} delete={() => this.deleteQuestion(index)}
                  onChange={value => this.handleChangeQuestion(value, index)}
                  />
                )
              })}
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