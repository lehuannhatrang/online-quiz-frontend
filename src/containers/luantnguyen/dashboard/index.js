import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Layout, Button } from 'antd';
import { LStudentHeader, LTeacherHeader } from '../header';
import StudentRoomInput from './StudentRoomInputComponent';
import { selectRooms, selectLoading, selectResults } from '../../app/selectors';
import { fetchRooms, fetchMyResults } from '../../app/actions';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { Loading } from '../shared/LoadingComponent'; 
import Introduction from './IntroductionComponent';
import Contact from './ContactComponent';
import Help from './HelpComponent';
import Fade from 'react-reveal/Fade';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import './ldashboard.css';

const { Content } = Layout;
const insideStyles = {
    background: "transparent",
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
};

const bgImage = 'https://images.pexels.com/photos/1018136/pexels-photo-1018136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const bgImage1 = 'https://cdn.pixabay.com/photo/2018/10/04/07/48/omr-3723132_960_720.jpg';
const logoUrl = 'https://cdn.pixabay.com/photo/2016/12/17/15/50/logo-1913689_960_720.png';

class LStudentDashboard extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.fetchMyResults();
    }

    render() {
        if ( this.props.loading ) {
            return (
                <React.Fragment>
                    <LStudentHeader user={this.props.user} backgroundCol={'transparent'} rooms={null} results={undefined}/>
                    <Loading text={'Loading Dashboard ...'} />
                </React.Fragment>
            );
        }
        else if (this.props.results !== undefined) {
            if (this.props.results) {
                if (this.props.rooms.length > 0) {
                    return (
                        <React.Fragment>
                            <LStudentHeader user={this.props.user} backgroundCol={'transparent'} rooms={this.props.rooms} results={this.props.results}/>
                            <Content>
                                <Parallax bgImage={Math.random() < 0.5 ? bgImage : bgImage1} strength={0} blur={{ min: -15, max: 15 }} 
                                    renderLayer={percentage => {
                                        return (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    background: `rgba(0, 0, 0, ${(percentage - 0.5) * 0.5})`,
                                                    left: '0',
                                                    top: '0',
                                                    width: '100vw',
                                                    height: (percentage * 100) + 'vh',
                                                }}
                                            />
                                        );}
                                    }
                                >
                                    <div style={{ height: '100vh' }}>
                                        <div style={insideStyles}>
                                            <Fade top>
                                                <div style={{width: '42%', margin: 'auto'}}>
                                                    <img src={logoUrl} alt="logo" width="100%"/>
                                                </div>
                                                <h2 className="text-uppercase font-weight-bold" style={{fontSize: '35px'}}>{'Super Online Quiz'}</h2>
                                                <div style={{marginTop: '70px'}}>
                                                    <AnchorLink href="#luantnguyen-student-room-input">
                                                        <Button style={{
                                                            color: 'black',
                                                            borderColor: 'black',
                                                            backgroundColor: 'transparent',
                                                        }} className="do-quiz-btn" shape="round" icon="double-right" size="large">
                                                            {'Let\'s Do Quiz'}
                                                        </Button>
                                                    </AnchorLink>
                                                </div>
                                            </Fade>
                                        </div>
                                    </div>
                                </Parallax>
                                <StudentRoomInput />
                                <Introduction />             
                                <Contact user={this.props.user} />
                                <Help user={this.props.user} />
                            </Content>
                        </React.Fragment>
                    );
                }
                else {
                    this.props.fetchRooms();
                }
            }
            else {
                return (
                    <React.Fragment>
                        <LStudentHeader user={this.props.user} backgroundCol={'transparent'} rooms={null} results={null}/>
                        <Content>
                            <Parallax bgImage={Math.random() < 0.5 ? bgImage : bgImage1} strength={0} blur={{ min: -15, max: 15 }} 
                                renderLayer={percentage => {
                                    return (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                background: `rgba(0, 0, 0, ${(percentage - 0.5) * 0.5})`,
                                                left: '0',
                                                top: '0',
                                                width: '100vw',
                                                height: (percentage * 100) + 'vh',
                                            }}
                                        />
                                    );}
                                }
                            >
                                <div style={{ height: '100vh' }}>
                                    <div style={insideStyles}>
                                        <Fade top>
                                            <div style={{width: '42%', margin: 'auto'}}>
                                                <img src={logoUrl} alt="logo" width="100%"/>
                                            </div>
                                            <h2 className="text-uppercase font-weight-bold" style={{fontSize: '35px'}}>{'Super Online Quiz'}</h2>
                                            <div style={{marginTop: '70px'}}>
                                                <AnchorLink href="#luantnguyen-student-room-input">
                                                    <Button style={{
                                                        color: 'black',
                                                        borderColor: 'black',
                                                        backgroundColor: 'transparent',
                                                    }} className="do-quiz-btn" shape="round" icon="double-right" size="large">
                                                        {'Let\'s Do Quiz'}
                                                    </Button>
                                                </AnchorLink>
                                            </div>
                                        </Fade>
                                    </div>
                                </div>
                            </Parallax>
                            <StudentRoomInput />
                            <Introduction />             
                            <Contact user={this.props.user} />
                            <Help user={this.props.user} />
                        </Content>
                    </React.Fragment>
                );
            }
        }
        
        return (<div></div>);
    }
}

// class LTeacherDashboard extends LDashboard {
//     constructor(props) {
//         super(props);
//     }

// }

// class LStudentDashboard extends LDashboard {
//     constructor(props) {
//         super(props);
//     }
// }

function mapDispatchToProps(dispatch) {
    return {
        fetchRooms: (roomId) => dispatch(fetchRooms(roomId)),
        fetchMyResults: () => dispatch(fetchMyResults()),
    }
}

const mapStateToProps = createStructuredSelector({
    rooms: selectRooms(),
    loading: selectLoading(),
    results: selectResults(),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LStudentDashboard));