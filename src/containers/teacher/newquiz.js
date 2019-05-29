import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import Question from "../../components/control/question";
import {selectQuestions, selectUsers} from '../app/selectors';
import {fetchQuestions, fetchUsers} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";
import { WithContext as ReactTags } from 'react-tag-input';
import "./tag.css";

class NewQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          quizName: "",
          questions: [],
          isPublic: false,
          suggestions: [],
          tags: [],
          initTags: false,
        }
    }

    componentDidMount() {
      this.handleAddNewQuestion();
      this.props.fetchUsers();
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.users.length > 0 && !this.state.initTags) {
        this.setState({
          suggestions: nextProps.users.map(user => {
            return {
              id: user.id ,
              text: user.userInfo.displayName,
            }
          })
        })
      }
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

    handleAddition(tag){
      let newTags = this.state.tags;
      if(!this.state.tags.find(ele => ele.id === tag.id)){
        newTags.push(tag);
      }
      else{
        newTags = this.state.tags.filter(ele => ele.id !== tag.id);
      }
      this.setState({
        tags: newTags
      })
    }

    handleDelete(tag){
      const newTags = this.state.tags.filter((ele, index) => index !== tag);
      this.setState({
        tags: newTags,
      })
    }

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
        shareWith: this.state.tags.map(tag => tag.id)
      };
      HttpUtil.postJsonAuthorization('/quiz', data).then(res => window.location="/teacher/quizz");
    }
    
    render() {
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">
              <div className="mb-2">
                <span id="quizz-header-text">Create New Quiz</span>

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
      fetchUsers: () => dispatch(fetchUsers()),
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuestions(),
  users: selectUsers(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuiz);