import React, {Component} from 'react';
import Header from "../../components/control/header";
import ReportTable from "../../components/control/ReportTable";
import {selectRooms, selectQuizzes, selectReports} from '../app/selectors';
import {fetchRooms, fetchQuizzes, fetchReports} from '../app/actions';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';

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
          reports: [],
        }
    }

    componentDidMount() {
      this.props.fetchReports();
      this.props.fetchRooms();
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.reports.length > 0 && nextProps.rooms.length > 0) {
        const newReport = nextProps.reports.map(report => {
          const room = nextProps.rooms.find(room => room.id === report.roomID)
          return{
            id: report.id,
            name: room.name,
            start: room.startTime,
            numberOfStudent: 10,
          }
        }, nextProps)
        this.setState({reports: newReport})
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
                <ReportTable searchingText={this.state.search} data= {this.state.reports}/>
              </div>
            </div>
            
          </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return {
      fetchRooms: () => dispatch(fetchRooms()), 
      fetchQuizzes: () => dispatch(fetchQuizzes()),
      fetchReports: () => dispatch(fetchReports())
  }
}

const mapStateToProps = createStructuredSelector({
  rooms: selectRooms(),
  quizzes: selectQuizzes(),
  reports: selectReports(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportTeacher);