import React, {Component} from 'react';
import './header.css';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import { selectCurrentUser } from '../../containers/app/selectors';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    liSelected(name) {
      if(location.pathname.indexOf(name) > -1) return "nav-li selected";
      else return "nav-li";
    }

    mToggle(){
      document.getElementById("myDropdown").classList.toggle("show");
    }

    handelLogout(){
      localStorage.clear();
      window.location = '/login';
    }

    render() {
      if(!this.props.user) return(
        <div>
          Loading ...
        </div>
      )

      if(this.props.user && this.props.user.userInfo)
        return(
          <div>
            <div id="header-container">
              <div className="header-wrapper">
                <div className="logo-icon">
                  <i className="ion-social-freebsd-devil"></i>
                </div>
                <div id="header-room-name">{(this.props.user && this.props.user.userInfo.role === "teacher") ? "TEACHER DESK" : "STUDENT DESK"}</div>

                  <button type="button" className="btn" id="header-username" onClick={this.mToggle}>
                    <span>{this.props.user? this.props.user.userInfo.displayName : "Profile"}</span>
                    <i className="ion-arrow-down-b"></i>
                  </button>

                  <div id="myDropdown" className="user-menu-content">
                    <a href="#">PROFILE</a>
                    <a href="#" onClick={() => this.handelLogout()}>LOG OUT</a>
                  </div>


                <div id="header-nav">
                  <ul>
                    <li className={location.pathname === "/teacher" ? "nav-li selected" : this.liSelected("/teacher/quizz")}><a href="/teacher/quizz">QUIZZES</a></li>
                    <li className={this.liSelected("/teacher/room")} ><a href="/teacher/room">ROOMS</a></li>
                    <li className={this.liSelected("/teacher/report")} ><a href="/teacher/report">REPORT</a></li>
                    <li className={this.liSelected("/teacher/result")} ><a href="/teacher/result">RESULT</a></li>
                  </ul>
                </div>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
