import React, {Component} from 'react';

class Question extends Component {
  constructor(props){
    super(props);
  }

  render(){ return <div className="question clearfix">
    <div className="question-number"><strong>#1</strong></div>
    <div className="clearfix">
      <div className="question-icon"><i className="ion-help"></i></div>
      <div className="question-text-entry">
        <textarea>
        </textarea>
      </div>
    </div>

    <div className="multiple-choice-menu">
      <div className="clearfix">
        <div className="multiple-choice-heading">ANSWER CHOICE</div>
        <div className="multiple-choice-correct">CORRECT ?</div>
      </div>
      <div className="mc-choice-container">
        <div className="mc-answer">
          <span className="mc-option">A</span>
          <div className="option-text-entry">
            <textarea>
            </textarea>
          </div>
          <div className="right-answer clearfix">
            <input type="checkbox"></input>
          </div>
        </div>
        <div className="mc-answer">
          <span className="mc-option">B</span>
          <div className="option-text-entry">
            <textarea>
            </textarea>
          </div>
          <div className="right-answer clearfix">
            <input type="checkbox"></input>
          </div>
        </div>
        <div className="mc-answer">
          <span className="mc-option">C</span>
          <div className="option-text-entry">
            <textarea>
            </textarea>
          </div>
          <div className="right-answer clearfix">
            <input type="checkbox"></input>
          </div>
        </div>
        <div className="mc-answer">
          <span className="mc-option">D</span>
          <div className="option-text-entry">
            <textarea>
            </textarea>
          </div>
          <div className="right-answer clearfix">
            <input type="checkbox"></input>
          </div>
        </div>

      </div>
    </div>
    <div className="question-action">
      <button className="delete-button">
        <i className="ion-trash-a"></i>
      </button>
    </div>
  </div>
  }
}

export default Question