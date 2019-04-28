import React, {Component} from 'react';
import './header.css';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <div id="header-container">
              <div className="header-wrapper">
                <div className="logo-icon">
                  <i className="ion-paper-airplane"></i>
                </div>
                <div id="header-room-name">ABCJQL2016</div>
                <div id="header-username">
                  <span>Truong</span>
                  <i className="ion-arrow-down-b"></i>
                </div>
                <div id="header-nav">
                  <ul>
                    <li className="selected"><span>LAUNCH</span></li>
                    <li className=""><span>QUIZZES</span></li>
                    <li className=""><span>ROOMS</span></li>
                    <li className=""><span>REPORTS</span></li>
                    <li className=""><span>RESULTS</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
    }

}

export default Header;