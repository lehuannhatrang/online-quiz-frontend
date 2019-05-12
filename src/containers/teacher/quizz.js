import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import QuizTable from "../../components/control/quizTable";
import {selectQuizzes} from '../app/selectors';
import {fetchQuizzes} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import HttpUtil from "../../utils/http.util";

class Quizz extends Component {
    constructor(props) {
        super(props);
        this.state = {
          search: "",
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
      HttpUtil.deleteJsonAuthorization(`/quiz`, {id: id});
      this.props.fetchQuizzes();
    }

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
                      <input className="search-input" placeholder="Search Quizzes" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <QuizTable searchingText={this.state.search} data= {this.props.quizzes.length > 0 ? this.props.quizzes : this.quizInfoHardCode} 
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
  }
}

const mapStateToProps = createStructuredSelector({
  quizzes: selectQuizzes(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quizz);