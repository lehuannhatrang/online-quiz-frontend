import React, { Component } from 'react';
import { Layout, Row, Col, Button, Icon, message } from 'antd';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Settings from './SettingsComponent';
import './lheader.css';

const { Header } = Layout;

class LStudentHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: this.props.backgroundCol,
            drawerVisible: false,
            drawerChildrenVisible: false,
            boxShadow: 'none',
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleChildrenClose = this.handleChildrenClose.bind(this);
        this.handleResultOpen = this.handleResultOpen.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChildrenOpen = this.handleChildrenOpen.bind(this);
        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    handleClose = () => {
        this.setState({
            drawerVisible: false,
        });
    }

    handleChildrenClose = () => {
        this.setState({
            drawerChildrenVisible: false,
        });
    }

    handleOpen = () => {
        this.setState({
            drawerVisible: true,
        });
    }

    handleChildrenOpen = () => {
        this.setState({
            drawerChildrenVisible: true,
        });
    }

    handleResultOpen = () => {
        this.setState({
            drawerVisible: true,
        });
        setTimeout(() => {
            this.setState({
                drawerChildrenVisible: true,
            });
        }, 1000);
    }

    listenScrollEvent(e) {
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        if (window.scrollY >= h) {
            this.setState({
                background: 'white',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)'
            });
        } else {
            var percent = window.scrollY / h;
            this.setState({
                background: `rgba(255, 255, 255, ${percent})`,
                boxShadow: 'none',
            });
        }
    }

    componentDidMount() {

        if (this.props.backgroundCol === 'transparent')
            window.addEventListener('scroll', this.listenScrollEvent);
        else {
            this.setState({
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
            });
        }
    }
        
    render() {
        
        return (
            <Header style={{position: 'fixed', width: '100%', zIndex: 1, backgroundColor: this.state.background, height: '64px',
                boxShadow: this.state.boxShadow}}>
                <Row style={{height: '100%'}}>
                    <Col span={6}>
                        <Button shape="circle" icon="twitter" target="https://www.twitter.com" style={{marginRight: '5px', backgroundColor: 'transparent'}}/>
                        <Button  shape="circle" icon="instagram" target="https://www.facebook.com" style={{marginRight: '12px', backgroundColor: 'transparent'}} />
                        <span style={{fontSize: '14px', fontFamily: 'Playfair Display'}} className="font-weight-bold">{'Follow Us!'}</span>
                    </Col>
                    <Col span={12}>
                        <div className="luantnguyen-menu" style={{margin: 'auto', width: '100%', height: '100%', textAlign: 'center'}}>
                            <Navbar light expand="md" className="p-0">
                                <Nav className="m-auto" navbar>
                                    <NavItem>
                                        <NavLink href="/student/dashboard">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <AnchorLink className="nav-link" href="#luantnguyen-student-room-input">Contest</AnchorLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/forum">Forum</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="#" onClick={() => { this.handleResultOpen(); }}>Result</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <AnchorLink className="nav-link" href="#luantnguyen-contact-form">Contact</AnchorLink>
                                    </NavItem>
                                </Nav>
                            </Navbar>
                        </div>
                    </Col>
                    <Col span={6} style={{textAlign: 'center'}}>
                        {!localStorage.getItem('userToken') && (
                            <Link to="/login"><span style={{fontSize: '16px'}} className="font-weight-bold">{'Login'}</span></Link>
                        )}
                        {localStorage.getItem('userToken') &&(
                            <Button style={{backgroundColor: 'transparent', border: 'none', boxShadow: 'none'}}
                                onClick={this.handleOpen}>
                                <span style={{fontSize: '14px', fontFamily: 'Playfair Display'}} className="font-weight-bold">{'Hi, ' + this.props.user.userInfo.displayName}</span>
                            </Button>
                        )}
                    </Col>
                    <Settings user={this.props.user} visible={this.state.drawerVisible} onClose={this.handleClose} 
                        childrenVisible={this.state.drawerChildrenVisible} onChildrenClose={this.handleChildrenClose} 
                        onChildrenOpen={this.handleChildrenOpen} rooms={this.props.rooms} results={this.props.results}/>
                </Row>
            </Header>
        );
    }
}

export default LStudentHeader;