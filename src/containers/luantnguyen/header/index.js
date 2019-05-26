import React, { Component } from 'react';
import { Layout, Row, Col, Button, Icon, message } from 'antd';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Settings from './SettingsComponent';
import './lheader.css';

const { Header } = Layout;

class LHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: this.props.backgroundCol,
            drawerVisible: false,
            drawerChildrenVisible: false,
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
            });
        } else {
            var percent = window.scrollY / h;
            this.setState({
                background: `rgba(255, 255, 255, ${percent})`,
            });
        }
    }

    componentDidMount() {
        if (this.props.backgroundCol === 'transparent')
            window.addEventListener('scroll', this.listenScrollEvent);
    }
        
    render() {
        const listResults = [
            {
                id: "1",
                name: "Phung's Room",
                start: new Date(2019, 4, 21, 8, 0, 0),
                end: new Date(2019, 4, 25, 9, 0, 0),
                score: 9,
                maxScore: 10,
            },
            {
                id: "2",
                name: "Room for books",
                start: new Date(2019, 4, 22, 15, 30, 0),
                end: new Date(2019, 4, 22, 16, 30, 0),
                score: 15,
                maxScore: 15,
            },
            {
                id: "3",
                name: "BKU Bedroom",
                start: new Date(2019, 4, 18, 6, 20, 0),
                end: new Date(2019, 4, 18, 9, 0, 0),
                score: 7.5,
                maxScore: 20
            },
            {
                id: "4",
                name: "AI Room",
                start: new Date(2019, 4, 18, 14, 40, 0),
                end: new Date(2019, 4, 18, 15, 25, 0),
                score: 6.5,
                maxScore: 10
            },
            {
                id: "5",
                name: "BKU Bedroom",
                start: new Date(2019, 4, 20, 7, 0, 0),
                end: new Date(2019, 4, 20, 8, 10, 0),
                score: 9.5,
                maxScore: 10
            },
            {
                id: "6",
                name: "AI Room",
                start: new Date(2019, 3, 14, 12, 0, 0),
                end: new Date(2019, 3, 14, 13, 25, 0),
                score: 2,
                maxScore: 10
            },
        ];

        return (
            <Header style={{position: 'fixed', width: '100%', zIndex: 1, backgroundColor: this.state.background, height: '64px'}}>
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
                                        <NavLink href="/luantnguyen/dashboard">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <AnchorLink className="nav-link" href="#luantnguyen-student-room-input">Contest</AnchorLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/luantnguyen/forum">Forum</NavLink>
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
                        onChildrenOpen={this.handleChildrenOpen} listResults={listResults}/>
                </Row>
            </Header>
        );
    }
}

class LTeacherHeader extends LHeader {
    constructor(props) {
        super(props);
    }
}

class LStudentHeader extends LHeader {
    constructor(props) {
        super(props);
    }
}

export { LTeacherHeader, LStudentHeader };