import React, {Component} from 'react';
import './dashboard.css';
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from "../app/selectors";
import {fetchUser} from "../app/actions";

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
                <img src="/img/brand1.jpg"></img>
              </a>
              <nav className="clearfix" id="main-nav">
                <ul>
                  <li><a href={this.props.user.userInfo? `/${this.props.user.userInfo.role}` : "/login"}>Home</a></li>
                  <li><a href="/forum">Forum</a></li>
                  <li><a href="#">About Us</a></li>
                  
                  {!localStorage.getItem('userToken') && (
                      <li>
                        <a href="/login" className="login-btn">
                          <button className="btn sml">LOGIN</button>
                        </a>
                      </li>
                  )}

                  {localStorage.getItem('userToken') && (
                      <li>
                        <a href="#" className="login-btn">
                          <button className="btn sml">{`Hello ${this.props.user.userInfo?this.props.user.userInfo.displayName: "there"}`}</button>
                        </a>
                      </li>
                  )}

                  {!localStorage.getItem('userToken') && (
                      <li>
                        <a href="/signup" className="login-btn">
                          <button className="btn sml">REGISTER</button>
                        </a>
                      </li>
                  )}
                  
                  {localStorage.getItem('userToken') && (
                      <li>
                        <a href="/" className="login-btn">
                          <button onClick={() => localStorage.clear()} className="btn sml">LOGOUT</button>
                        </a>
                      </li>
                  )}
                  
                </ul>
              </nav>
            </div>
          </header>
          <section className="heading-section" style={{backgroundImage: "url(" + "/img/bgsection1.png" + ")"}}>
            <div className="clearfix sec1-container">
            <div id="cta" style={{cursor: "default"}}>
              <h1><strong>Welcome to Online Quiz !</strong></h1>
              <p>Simple classroom application for fun, effective, engagement and fast assessments.</p>
            </div>
            </div>
          </section>
          <section>
            <div style={{backgroundColor: "#8db4d0"}}>
            </div>
          </section>
          </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(fetchUser()),
  }
}

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser(),  
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);