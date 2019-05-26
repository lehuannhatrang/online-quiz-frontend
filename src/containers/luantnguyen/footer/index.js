import React, { Component } from 'react';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import { Layout, Row, Col } from 'antd';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './lfooter.css';

const { Footer } = Layout;

const scrollTopStyle = {
    background: 'black',
    color: "#fff",
    fontFamily: "Oswald",
    textAlign: "center",
    padding: '10px',
    fontSize: 15
};

const scrollButtonStyle = {
    position: 'static',
    display: 'inline-block',
    width: '30px',
    height: '30px',
    borderWidth: '2px',
    marginLeft: '10px',
};

const inlineStyles = {
    background: "transparent",
    padding: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-60%,-70%)",
    textAlign: 'center',
    fontSize: '20px',
    color: 'black',
};

const logoUrl = 'https://cdn.pixabay.com/photo/2016/12/17/15/50/logo-1913689_960_720.png';

class LFooter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Footer style={{padding: 0}}>
                <Row style={scrollTopStyle} className="scroll-top text-uppercase">
                    <span style={{position: 'relative', bottom: '5px'}}>Scroll To Top</span>
                    <ScrollUpButton style={scrollButtonStyle} ContainerClassName={'scroll-top'}/>
                </Row>
                <Row className="luantnguyen-footer">
                    <Row className="infor">
                        
                            <Col span={12} className="text-left" style={{height: '285px'}}>
                                
                                    <div style={inlineStyles}>
                                        <Fade>
                                            <div style={{width: '42%', margin: 'auto'}}>
                                                <img src={logoUrl} alt="logo" width="100%"/>
                                            </div>
                                            <h2 className="text-uppercase font-weight-bold" style={{fontSize: '20px', fontFamily: 'Playfair Display'}}>{'Super Online Quiz'}</h2>
                                        </Fade>
                                    </div>
                                
                            </Col>
                        
                        <Col span={6} className="text-left">
                            <Slide right>
                                <div>
                                    <h5 style={{width: '30%'}}>Explore</h5>
                                    <ul className="list-unstyled luantnguyen-footer-ul" style={{fontSize: '14px'}}>
                                        <li><Link to="/luantnguyen/dashboard" style={{color: 'black'}}>Home</Link></li>
                                        <li><Link to="/signup" style={{color: 'black'}}>Sign Up</Link></li>
                                        <li><AnchorLink offset='100' href="#luantnguyen-intro" style={{color: 'black'}}>Introduction</AnchorLink></li>
                                        <li><AnchorLink href="#luantnguyen-contact-form" style={{color: 'black'}}>Contact</AnchorLink></li>
                                        <li><AnchorLink offset='100' href="#luantnguyen-help" style={{color: 'black'}}>Help</AnchorLink></li>
                                    </ul>
                                </div>
                            </Slide>
                        </Col>
                        <Col span={6} className="text-left">
                            <Slide right>
                                <h5 style={{width: '60%'}}>Visit</h5>
                                <address>
                                    268 Ly Thuong Kiet St.<br /><br />
                                    District 10, TP.HCM<br /><br />
                                    Socialist Republic of Vietnam<br />
                                </address>
                                <br />
                                <h5 style={{width: '36%'}}>Business</h5>
                                <address>
                                    +84 35 8684 926<br /><br />
                                    SuperOnlineQuiz-BKU.com<br />
                                </address>
                            </Slide>
                        </Col>
                    </Row>
                    <Row className="copyright">
                        <Col offset={2} span={16} className="text-uppercase text-left font-weight-bold" style={{paddingTop: '8.5px'}}>
                            © Copyright @2019 UnieCafe.com. All Rights Reserved.
                        </Col>
                        <Col span={6}>
                            <SocialIcon style={{height: 20, width: 20, margin: 4}} url="https://www.google.com" bgColor="#000000"/>
                            <SocialIcon style={{height: 20, width: 20, margin: 4}} url="https://www.facebook.com/love100009524072443" bgColor="#000000"/>
                            <SocialIcon style={{height: 20, width: 20, margin: 4}} url="https://www.twitter.com/" bgColor="#000000"/>
                            <SocialIcon style={{height: 20, width: 20, margin: 4}} url="https://linkedin.com/" bgColor="#000000"/>
                            <SocialIcon style={{height: 20, width: 20, margin: 4}} url="https://www.cse.hcmut.edu.vn" label="CSE" bgColor="#000000"/>
                        </Col>
                    </Row>
                </Row>
            </Footer>
        );
    }
}

class LTeacherFooter extends LFooter {
    constructor(props) {
        super(props);
    }
}

class LStudentFooter extends LFooter {
    constructor(props) {
        super(props);
    }
}

export { LTeacherFooter, LStudentFooter };