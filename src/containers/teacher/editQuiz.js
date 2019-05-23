import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import Question from "../../components/control/question";
import {selectQuizzes} from '../app/selectors';
import {fetchQuizzes} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";
import { defaultCipherList } from 'constants';

class EditQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questions : [],
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
        this.props.fetchQuizzes();
    }

    componentWillReceiveProps(newProps) {
      if(newProps.quizzes.length > 0) {
        const thisQuiz = newProps.quizzes.find(quiz => quiz.id === location.pathname.replace(this.editQuizPath, ''))
        const newQuestion = thisQuiz.questions.map(question => {
          return {
            question: question.question,
            options: question.options,
            answer: question.answer,
          }
        })
        this.setState({
          questions : newQuestion,
          quizName: thisQuiz.name,
        });
      }
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
        name: this.state.quizName,
        questions: this.state.questions,
      }
      debugger;
      HttpUtil.putJsonAuthorization(`/quiz`,data)
        .then(res => this.props.fetchQuizzes())
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
      const quiz = this.props.quizzes ? this.props.quizzes.find(q => q.id === location.pathname.replace(this.editQuizPath, '')) : {};
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
                      <input className="search-input" id="quizname-input" placeholder="Name your Quiz ..." type="text" defaultValue={quiz? quiz.name : ''} onChange={e => this.setState({quizName: e.target.value})}></input>
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
      fetchQuizzes: (id) => dispatch(fetchQuizzes()), 
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz);