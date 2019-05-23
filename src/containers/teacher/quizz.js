import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import QuizTable from "../../components/control/quizTable";
import {selectQuizzes, selectPublicQuizzes} from '../app/selectors';
import {fetchQuizzes, fetchPublicQuizzes} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";

class Quizz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          search: "",
          showPublicQuizzes: false,
          quizName: '',
          data: {},
        };
        this.deleteQuiz = this.deleteQuiz.bind(this);
    }

    componentDidMount() {
      this.props.fetchQuizzes();
    }
    
    quizInfoHardCode = [
      {
        id: "123",
        name: "sample quiz 1",
        createdAt: "2019-05-01T20:00:00Z"
      },
      {
        id: "456",
        name: "sample quiz 2",
        createdAt: "2019-05-12T22:00:00Z"
      },
    ]

    deleteQuiz(id) {
      const param = {
        id: id,
      };
      HttpUtil.deleteJsonAuthorization(`/quiz`, param).then(res=> {
        this.props.fetchQuizzes();
      });
    }

    handleImportClick() {
      this.props.fetchPublicQuizzes()
    }

    handleImportQuizzes(id) {
      const quiz = this.props.publicQuizzes.find(quiz => quiz.id === id);
      let questions = [];
      quiz.questions.map(question => {
        questions.push({
          question: question.question,
          options: question.options,
          answer: question.answer,
        })
      })
      const data = {
        name: this.state.quizName,
        isPublic: false,
        questions: questions,
      }
      this.setState({data: data})
    }

    handleSubmit() {
      debugger;
      HttpUtil.postJsonAuthorization('/quiz', this.state.data);
    }

    render() {
        return(
          <div>
            <Header></Header>
            <div id="quizz-container">

            <div id="myModal" className="modal fade" role="dialog">
              <div className="modal-dialog">
                <div className="modal-content">
                  <form onSubmit={this.handleSubmitRoom}>

                    <div className="modal-header">
                      <h4 className="modal-title">Import from public Quizzes</h4>
                    </div>

                    <div className="modal-body">

                      <div className="form-group row">
                        <label for="room-name" className="col-sm-2 col-form-label">Name:</label>
                        <div className="col-sm-10">
                          <input type="text" className="form-control" name="quiz-name" id="quiz-name" 
                                  onChange={e => this.setState({quizName: e.target.value})} placeholder="Enter quiz name"/>
                        </div>
                      </div>
                      
                      <div className="form-group row">
                        <label for="quiz-name" className="col-sm-2 col-form-label">Public Quizzes</label>
                        <div className="col-sm-10">
                          <select className="custom-select" id="quiz-name" onChange={e => this.handleImportQuizzes(e.target.value)}>
                            <option disabled selected>Select the quiz ...</option>
                            {this.props.publicQuizzes.map(quiz => (
                              <option value={quiz.id}>{quiz.name? quiz.name : quiz.id}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                        
                    </div>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="submit" className="btn btn-default btn-newroom" onClick={() => this.handleSubmit()}>Create</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>


              <div>
                <span id="quizz-header-text">Quizzes</span>
                <div className="button-container">
                  <button className="button-primary">
                    <i className="ion-plus-round"></i>
                    ADD QUIZ
                  </button>
                  <div className="dropdown-content">
                    <a href="/teacher/quizz/new">Create new quiz</a>
                    <a data-toggle="modal" data-target="#myModal" href="#" onClick={() => this.handleImportClick()}>Import ...</a>
                  </div>
                </div>
              </div>

              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Quizzes" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <QuizTable searchingText={this.state.search} data= {this.props.quizzes} 
                            deleteQuiz={this.deleteQuiz}/>
              </div>
            </div>
            
          </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
  return {
      fetchQuizzes: () => dispatch(fetchQuizzes()), 
      fetchPublicQuizzes: () => dispatch(fetchPublicQuizzes()),
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes(),
  publicQuizzes: selectPublicQuizzes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quizz);