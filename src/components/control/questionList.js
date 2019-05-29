import React, {Component} from 'react';

// class QuestionList extends Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount(){
//     var questionDiv  = document.getElementsByClassName("quiz-container");
//     if(this.props.studentSelect){
//       this.props.studentSelect.forEach((select, index) => {
//         switch (select) {
//           case "A":
//             questionDiv[index].children[1].children[0].firstChild.classList.add("false-select");
//             break;
//           case "B":
//             questionDiv[index].children[1].children[1].firstChild.classList.add("false-select");
//             break;
//           case "C":
//             questionDiv[index].children[1].children[2].firstChild.classList.add("false-select");
//             break;
//           case "D":
//             questionDiv[index].children[1].children[3].firstChild.classList.add("false-select");
//             break;
//           default:
//             break;
//         }
//       });
//     }
//     if(this.props.answer){
//       this.props.answer.forEach((select, index) => {
//         switch (select) {
//           case "A":
//             questionDiv[index].children[1].children[0].firstChild.classList.add("true-select");
//             break;
//           case "B":
//             questionDiv[index].children[1].children[1].firstChild.classList.add("true-select");
//             break;
//           case "C":
//             questionDiv[index].children[1].children[2].firstChild.classList.add("true-select");
//             break;
//           case "D":
//             questionDiv[index].children[1].children[3].firstChild.classList.add("true-select");
//             break;
//           default:
//             break;
//         }
//       });
//     }
//   }

//   renderResult(index){
//     if(this.props.answer && this.props.studentSelect){
//       return(
//         <span className="mc-answer-option-letter">
//           {index == 0 ? 'A': (index == 1) ? 'B': (index == 2) ? 'C': 'D'}
//         </span>
//       )
//     } else {
//       return(
//         <span className="mc-answer-option-letter" onClick={(e) => {
//           e.target.classList.add("option-selected")
//         }}>
//           {index == 0 ? 'A': (index == 1) ? 'B': (index == 2) ? 'C': 'D'}
//         </span>
//       )
//     }

//   }
//   renderOption(options, quesPos){
//     return <div className="mc-answer-area">
//       {options.map((option, index) => {return(
//         <div className="mc-answer-option">
//         {this.renderResult(index)}
//         <div className="mc-answer-option-text">{option}</div>
//       </div>
//       );
//       })}

//       <div className="question-score">
//         {this.props.answer ? ((this.props.answer[quesPos] == this.props.studentSelect[quesPos]) ? "Score: 1 / 1" :"Score: 0 / 1") : ""}

//       </div>
//     </div>
//   }

//   renderQuestion(question, index){
//     return(
//     <div className="quiz-container">

//     <div className="question-header">{index +" . " + question.question}</div>
//     {this.renderOption(question.options, index-1)}

//   </div>);
//   }

//   render(){
//     return <div className="question-list">
//       {this.props.data.map((question, index) => {return(
//         this.renderQuestion(question, index + 1)
//       )}
//       )}
//     </div>;
//   }
// }

class QuestionList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{JSON.stringify(this.props.data)}
			</div>
		)
	}
}

export default QuestionList