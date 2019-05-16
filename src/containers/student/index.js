import React, {Component} from 'react';
import './student.css';
import StudentHeader from "../../components/control/studentHeader";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from "../app/selectors";
import {Redirect} from "react-router-dom";
import Header from "../../components/control/header"

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
          roomId: '',
        }
    }

    handelSubmitRoomID() {
      if(this.state.roomId) window.location = `/student/test/${this.state.roomId}`;
      else alert("Type room id!")
    }

    render() {
        return(
          <div>
            <Header/>

            <div className="test-container clearfix">
              <div className="quizzes-search-bar">
                <div className="quizzes-search-container">
                  <span className="input-search-container mb-2">
                    <div className="input-block">
                      <i className="ion-compose"></i>
                      <input className="search-input" placeholder="Enter Room ID ..." type="text" onChange={e => this.setState({roomId: e.target.value})} />
                      <button className="button-primary submit-button" onClick={() => this.handelSubmitRoomID()} disabled={this.state.roomId.length === 0}>Enter</button>
                    </div>
                  </span>
                  {this.state.roomId.length === 0 && (<div className="row">
                    <div className="col-5 offset-1">
                      <p className="text-danger">This field cannot be empty!</p>
                    </div>
                  </div>)}
                </div>
              </div>
              <img src="https://static1.squarespace.com/static/5734ea3904426234cfb274bd/t/5b48039ff950b79b268cea76/1531446176681/Einstein.png"></img>
            </div>
          </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Student);
