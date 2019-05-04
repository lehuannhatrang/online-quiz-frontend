import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import Question from "../../components/control/question";
import {selectQuiz} from '../app/selectors';
import {fetchQuiz} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";

class EditQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questions : (this.props.quiz.questions && (this.props.quiz.questions.length > 0) ) ? this.props.quiz.questions : this.questionsHardCodeData,
          quizName: this.props.quiz? this.props.quiz.quizName : 'Sample Quiz Name'
        }
    }

    questionsHardCodeData = [
      {
        id: "112233",
        question: "Sample Question 1",
        options: [
          "Sample Question A",
          "Sample Question B",
          "Sample Question C",
          "Sample Question D",
        ],
        answer: "B"
      },
      {
        id: "445566",
        question: "Sample Question 2",
        options: [
          "Sample Question A",
          "Sample Question B",
          "Sample Question C",
          "Sample Question D",
        ],
        answer: "D"
      },
    ]

    editQuizPath = '/teacher/quizz/edit/';

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

    componentDidMount() {
        this.props.fetchQuiz(location.pathname.replace(this.editQuizPath, ''))
    }

    async handleAddNewQuestion() {
        const newQuestions = await this.state.questions.slice();
        await newQuestions.push(this.emptyQuestion);
        this.setState({
          questions: newQuestions,
        })
    }

    async handleSubmit() {
      const data = await {
        id: location.pathname.replace(this.editQuizPath, ''),
        questions: this.state.questions,
      }
      HttpUtil.putJsonAuthorization(`/quiz/${data.id}`,data);
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

    render() {
      return(
          <div>
            <Header></Header>
            <div id="quizz-container">
              <div>
                <span id="quizz-header-text">Edit Quiz</span>
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
                      <input className="search-input" id="quizname-input" placeholder="Name your Quiz ..." type="text"></input>
                    </div>
                  </span>
                </div>
              </div>

              <button className="button-primary new-btn" onClick={() => this.handleAddNewQuestion()}>
                <i className="ion-plus-round"></i>
                NEW
              </button>

              <div id="questions">
                { this.state.questions.map((question, index) => {
                    return(
                        <Question data={question} number={index + 1} delete={() => this.deleteQuestion(index)}
                        onChange={value => this.handleChangeQuestion(value, index)}/>
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
      fetchQuiz: (id) => dispatch(fetchQuiz(id)), 
  }
}

const mapStateToProps = createStructuredSelector({
  quiz: selectQuiz(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz);