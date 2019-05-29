import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header";
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ReportTeacher from "./reportTeacher";
import RoomReport from "./roomReport";
import NewQuiz from "./newquiz";
import EditQuiz from "./editQuiz";
import Room from "./room";
import Quizz from "../teacher/quizz";
import NotFound from "../errors/NotFound";


class Teacher extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <React.Fragment>
            <Switch>
                    <Route exact path="/teacher/quizz" component={Quizz}/>
                    <Route exact path="/teacher/quizz/new" component={NewQuiz}/>
                    <Route path='/teacher/quizz/edit' component={EditQuiz}/>
                    <Route exact path="/teacher/room/" component={Room}/>
                    <Route exact path="/teacher/report/:roomid" component={RoomReport}/>
                    <Route exact path="/teacher/report/" component={ReportTeacher}/>
                    <Route path="" component={NotFound} />
            </Switch>

            </React.Fragment>
          </div>
        )
    }

}

export default Teacher;