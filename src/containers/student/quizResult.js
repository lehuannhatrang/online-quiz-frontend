import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader"
import QuestionList from "../../components/control/questionList"

class QuizResult extends Component {
    constructor(props) {
        super(props);
    }
    questionList = [
      {
        id: 1,
        question: "What is this ?",
        options: ["Orange", "Apple", "Patato", "All are correct"]
      },
      {
        id: 2,
        question: "Where do you live ?",
        options: ["Ha noi", "HCM", "Da nang", "Lao"]
      },
      {
        id: 3,
        question: "Just a sample question with 3 options ?",
        options: ["Option 1 ne", "so 2", "so 3"]
      },
      {
        id: 3,
        question: "Just a sample question with 3 options ?",
        options: ["Option 1 ne", "so 2", "so 3"]
      }
    ]

    studentSelect = ['A','A','B','C']
    answer = ['D','C','B','A']

    endTime = "April 30, 2020 22:00:25";

    render() {
        return(
          <div>
            <StudentHeader/>
            <div className="alert alert-warning" role="alert" id="quiz-score">
  Score: 9/10
            </div>

            <QuestionList data={this.questionList} studentSelect={this.studentSelect} answer={this.answer}/>
          </div>
        )
    }

}
// option selected add class:  option-selected
export default QuizResult;