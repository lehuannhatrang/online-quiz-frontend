import React, {Component} from 'react';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    liSelected(name) {
      if(location.pathname.indexOf(name) > -1) return "nav-li selected";
      else return "nav-li";
    }

    render() {
        return(
          <div>
            <div id="header-container">
              <div className="header-wrapper">
                <div className="logo-icon">
                  <i className="ion-social-freebsd-devil"></i>
                </div>
                <div id="header-room-name">TEACHER DESK</div>

                <div id="header-username">
                  <span>Truong</span>
                  <i className="ion-arrow-down-b"></i>


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



export default Header;
