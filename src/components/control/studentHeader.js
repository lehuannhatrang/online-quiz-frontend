import React, {Component} from 'react';
import './header.css';

class StudentHeader extends Component {
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
                <div id="header-room-name">STUDENT DESK</div>

                <div id="header-username">
                  <span>Truong</span>
                  <i className="ion-arrow-down-b"></i>


                </div>
                <div id="header-nav">
                  <ul>
                    <li className={location.pathname === "/student" ? "nav-li selected" : this.liSelected("/student/test")}><a href="/student">TEST</a></li>
                    <li className={this.liSelected("/student/result")} ><a href="/student/result">RESULT</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
    }

}



export default StudentHeader;
