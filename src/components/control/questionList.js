import React, {Component} from 'react';

class QuestionList extends Component {
  constructor(props) {
    super(props);
  }



  renderOption(options){
    return <div className="mc-answer-area">
      {options.map((option, index) => {return(
        <div className="mc-answer-option">
        <span className="mc-answer-option-letter" onClick={(e) => {
          e.target.classList.add("option-selected")
        }}>
          {index == 0 ? 'A': (index == 1) ? 'B': (index == 2) ? 'C': 'D'}
        </span>
        <div className="mc-answer-option-text">{option}</div>
      </div>
      );
      })}
    </div>
  }

  renderQuestion(question, index){
    return(
    <div className="quiz-container">
    <div className="question-header font-weight-bold">{index +" . " + question.question}</div>
    {this.renderOption(question.options)}
  </div>);
  }

  render(){
    return <div className="question-list">
      {this.props.data.map((question, index) => {return(
        this.renderQuestion(question, index + 1)
      )}
      )}
    </div>;
  }
}

export default QuestionList