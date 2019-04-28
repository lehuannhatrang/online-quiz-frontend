import React, {Component} from 'react';
import './dashboard.css';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
          <header id="main-header">
            <div className="wrapper clearfix">
              <a href="#" id= "logo">
                <img src="../public/assets/img/brand1.jpg"></img>
              </a>
              <nav className="clearfix" id="main-nav">
                <ul>
                  <li><a href="#">Plans</a></li>
                  <li><a href="#">Helps</a></li>
                  <li><a href="#">About</a></li>
                  <li><a href="#">Price</a></li>
                  <li><a href="#" className="login-btn">
                    <button className="btn sml">LOGIN</button>
                  </a></li>
                  <li><a href="#" className="login-btn">
                    <button className="btn sml">REGISTER</button>
                  </a></li>
                </ul>
              </nav>
            </div>
          </header>
          <section className="heading-section" style={{backgroundImage: "url(" + "../public/assets/img/bgsection1.png" + ")"}}>
            <div className="clearfix sec1-container">
            <div id="cta">
              <h1><strong>Welcome to Online Quiz !</strong></h1>
              <p>Simple classroom application for fun, effective, engagement and fast assessments.</p>
            </div>
            </div>
          </section>
          <section>
            <div>
              <h1>Under-contruction ...</h1>
            </div>
          </section>
          </div>
        )
    }

}

export default DashBoard;