import React, {Component} from 'react';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: this.props.data ? this.props.data.answer : 'A',
    }
  }

  handleChange(){

  }

  renderItem(optionName, value="" , option) {
    return(
      <div className="mc-answer">
        <span className="mc-option">{optionName}</span>
        <div className="option-text-entry">
          <textarea class="form-control" defaultValue={value}/>
        </div>
        <div className="right-answer clearfix">
          <input type="checkbox" checked={this.state.answer === option?'checked':''} onClick={() => this.setState({answer: option})}/>
        </div>
      </div>
    );
  }

  render(){ 
    return (
    <div className="question clearfix">
      <div className="question-number"><strong>{`#${this.props.number? this.props.number : 0}`}</strong></div>
      <div className="clearfix">
        <div className="question-icon"><i className="ion-help"></i></div>
        <div className="question-text-entry">
          <textarea defaultValue={this.props.data? this.props.data.question: ''}/>
        </div>
      </div>

      <div className="multiple-choice-menu">
        <div className="clearfix">
          <div className="multiple-choice-heading">ANSWER CHOICE</div>
          <div className="multiple-choice-correct">CORRECT ?</div>
        </div>
        <div className="mc-choice-container">
          {this.renderItem('A', this.props.data? this.props.data.options[0]: 'Sample option A', 'A')}
          {this.renderItem('B', this.props.data? this.props.data.options[1]: 'Sample option B', 'B' )}
          {this.renderItem('C', this.props.data? this.props.data.options[2]: 'Sample option C', 'C' )}
          {this.renderItem('D', this.props.data? this.props.data.options[3]: 'Sample option D', 'D' )}
        </div>
      </div>
      <div className="question-action">
        <button className="delete-button" onClick={() => this.props.delete()}>
          <i className="ion-trash-a"></i>
        </button>
      </div>
    </div>)
  }
}

export default Question