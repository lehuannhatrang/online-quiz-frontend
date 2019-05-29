import React, {Component} from 'react';
import Header from "../../components/control/header";
import ReportTable from "../../components/control/ReportTable";

class ReportTeacher extends Component {
    constructor(props) {
        super(props);
        this.state ={
          search: "",
          roomName: "",
          password: "",
          quizId: "",
          date: "",
          startTime: "",
          endTime: "",
        }
    }

    reportInforHardCode = [
      {
        id: "123",
        name: "Report sample 1",
        start: "1:30 AM 1/1/2019",
        end: "2:30 PM 1/2/2019"
      },
      {
        id: "456",
        name: "Report sample 2",
        start: "1:30 PM, 1/1/2019",
        end: "2:30 PM, 1/2/2019"
      }
    ]

    render() {
      const rooms = (this.props.rooms && this.props.rooms.length > 0) ? this.props.rooms : this.reportInforHardCode ;
        return(
          <div>
            <Header/>

            <div id="quizz-container">
              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container">
                    <div className="input-block">
                      <i className="ion-ios-search-strong"></i>
                      <input className="search-input" placeholder="Search Report" type="text" onChange={(e) => this.setState({search: e.target.value})}></input>
                    </div>
                  </span>
                </div>
              </div>

              <div className="quizzes-content-container">
                <ReportTable searchingText={this.state.search} data= {rooms}/>
              </div>
            </div>
            
          </div>
        )
    }
}

export default ReportTeacher;