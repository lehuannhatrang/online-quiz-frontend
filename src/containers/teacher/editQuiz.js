import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import Question from "../../components/control/question";
import {selectQuizzes, selectUsers} from '../app/selectors';
import {fetchQuizzes, fetchUsers} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";
import { defaultCipherList } from 'constants';
import { WithContext as ReactTags } from 'react-tag-input';
import "./tag.css";

class EditQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          questions : [],
          quizName: this.props.quiz? this.props.quiz.quizName : 'Sample Quiz Name',
          isPublic: false,
          suggestions: [],
          tags: [],
          initTags: false,
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
        this.props.fetchUsers();
    }

    componentWillReceiveProps(newProps) {
      if(newProps.quizzes.length > 0 && newProps.users.length > 0) {
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
          tags: thisQuiz.shareWith.map(id => {
            return{
              id: id,
              text: newProps.users.find(user => user.id === id).userInfo.displayName,
            }
          }, newProps),
          suggestions: newProps.users.map(user => {
            return {
              id: user.id ,
              text: user.userInfo.displayName,
            }
          }),
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
        isPublic: this.state.isPublic,
        shareWith: this.state.tags.map(tag => tag.id),
      }
      debugger;
      HttpUtil.putJsonAuthorization(`/quiz`,data)
        .then(res => window.location="/teacher/quizz");
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

              <div className="row mt-2 ml-2 mb-2">
                <label class="switch mr-2">
                  <input type="checkbox" value="ok" onClick={() => this.setState({isPublic : !this.state.isPublic})}/>
                  <span class="slider round"></span>
                </label>
                <span className={`d-inline ${this.state.isPublic? "text-success" : "text-muted"} pt-2 pb-2`}><h4>Public</h4></span>
              </div>

              <div className="row ml-2">
                <h4>Share with</h4>
              </div>

              <div className="row ml-2">
                <ReactTags tags={this.state.tags}
                    suggestions={this.state.suggestions}
                    handleDelete={(tag) => this.handleDelete(tag)}
                    handleAddition={tag => this.handleAddition(tag)}
                    handleDrag={this.handleDrag}
                    delimiters={[188,13]} 
                    placeholder="Add new user to share"/>
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
      fetchUsers: () => dispatch(fetchUsers()),
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes(),
  users: selectUsers(),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditQuiz);