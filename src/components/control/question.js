import React, {Component} from 'react';

class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      answer: this.props.data ? this.mapOptionToAnswer(this.props.data.options.findIndex(option => option === this.props.data.answer)) : '',
      answerText: "",
      question: "",
      options: [
        "",
        "",
        "",
        "",
      ],
    };
  }

  mapOptionToAnswer(index) {
    switch(index){
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
      defaut:
        return "A";
    }
  }

  mapAnswerToOption(answer) {
    switch(answer){
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
    }
  }

  async handleChange(type, value){
    let options = await this.state.options.slice();
    switch(await type){
      case "question":
        this.setState({question: value});
        break;
      case "option-A":
        options[0] = value;
        this.setState({options: options})
        break;
      case "option-B":
        options[1] = value;
        this.setState({options: options})
        break;
      case "option-C":
        options[2] = value;
        this.setState({options: options})
        break;
      case "option-D":
        options[3] = value;
        this.setState({options: options})
        break;
      case "answer":
        this.setState({answer: value});
        break;
      default:
        break;
    }
    const answerText = await this.state.options[this.mapAnswerToOption(this.state.answer)];
    await this.setState({
      answerText
    });
    this.props.onChange({
      question: this.state.question,
      options: this.state.options,
      answer: this.state.answerText,
    });
  }

  renderItem(optionName, value="" , option) {
    return(
      <div className="mc-answer">
        <span className="mc-option">{optionName}</span>
        <div className="option-text-entry">
          <textarea class="form-control" defaultValue={value} onChange={e => this.handleChange(`option-${option}`, e.target.value)}/>
        </div>
        <div className="right-answer clearfix">
          <input type="checkbox" checked={this.state.answer === option?'checked':''} onClick={() => this.handleChange("answer", option)}/>
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
          <textarea defaultValue={this.props.data? this.props.data.question: ''} onChange={e => this.handleChange("question",e.target.value)}/>
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