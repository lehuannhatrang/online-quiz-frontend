import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader"
import QuestionList from "../../components/control/questionList"
import Header from "../../components/control/header"

class StudentTest extends Component {
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
    endTime = "April 30, 2020 22:00:25";

    componentDidMount(){
      var countDownDate = new Date(this.endTime).getTime();
      var x = setInterval(function() {
      var now = new Date().getTime();
        
      var distance = countDownDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      var time = (hours < 10 ? ("0"+hours): hours) + " : " + (minutes < 10 ? ("0"+minutes): minutes) + " : " + (seconds < 10 ? ("0"+seconds): seconds);
      document.getElementById("time-left").innerHTML = ""+ time;
            
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("time-left").innerHTML = "EXPIRED";
      }

    }, 1000);
    }

    handleSubmit(){
      if(confirm("Are you sure to submit ?")){
        alert("Ok, now you are submited !");
      }
    }

    render() {
        return(
          <div>
            <Header/>
            <div id="time-left-container">
              <div id="time-left"></div>
            </div>
            <QuestionList data={this.questionList}/>
            <div className="submit-button-container">
              <button className="button-primary submit-button" onClick={this.handleSubmit}>SUBMIT ANSWER</button>
            </div>
          </div>
        )
    }

}
// option selected add class:  option-selected
export default StudentTest;