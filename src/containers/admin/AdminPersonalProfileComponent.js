import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Avatar, Icon, Row, Col, Input, Form, Layout } from 'antd';
import Fade from 'react-reveal/Fade';
import getStandardFormatDate from './shared/standardFormatDate';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import { selectUsers, selectLoading } from "../app/selectors";
import { Loading } from './shared/LoadingComponent';

const { Content } = Layout;
const bgImagePath = 'https://images.pexels.com/photos/1324803/pexels-photo-1324803.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const imgSrc = 'https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.0-1/c0.0.960.960a/p960x960/57099071_386843385502140_3693027126954426368_o.jpg?_nc_cat=111&_nc_oc=AQmxgOsOXh3S0Yr_SrdxSsjbwZ5eADAHW06-O_uz5xhvcRw2e5irYOVa0p0U5udpQ4U&_nc_ht=scontent.fsgn3-1.fna&oh=071c08f9904c8fb5e353607848d6984c&oe=5D66F006';

const inlineStyle = {
    padding: 25,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
};

const insideStyles = {
    padding: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'center',
    fontSize: '20px',
    background: 'transparent',
    width: '100%',
};

class AdminPersonalProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: this.props.admin.userInfo.displayName,
            birthday: new Date(1998, 10, 16),
            email: this.props.admin.userInfo.mail,
            phone: '(+84) ' + this.props.admin.userInfo.phone,
            address: '171 Quoc Lo 13 St., Binh Thanh',
            sex: 'male',
        };
    }

    render() {
        if (this.props.loading) {
            return (
                <Content className="user-management" style={insideStyles}>
                    <Loading text={'Loading Profile ...'} />
                </Content>
            );
        }
        else if ( this.props.users.length === 0) {
            return (<div></div>);
        }  
        else {
            const iconStyle = {fontSize: '20px', color: '#1890ff', padding: '0px 7px'};
            return (
                <React.Fragment>
                    <Row>
                        <Col span={24}>
                            <Parallax style={{width: "100%"}} strength={400} bgClassName="background-profile" bgImage={bgImagePath} blur={{min: -2, max: 3}}>
                                <div style={{height: 360}}>
                                    <div style={inlineStyle}>
                                        <Avatar size={100} src={imgSrc} className="avatar-profile"/>
                                        <div className="name-profile">
                                            <h4 className="text-uppercase">{this.state.fullName}</h4>
                                            <h5>{'System Administrator'}{' '}<span style={{color: '#1890ff', fontWeight: 'bold'}}>{'@0024'}</span></h5>
                                        </div>
                                    </div>       
                                </div>
                            </Parallax>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle" style={{padding: '65px 20px 30px 20px', backgroundColor: 'white'}}>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="profile" theme="filled" style={iconStyle}/>}  value={this.state.fullName.toUpperCase()}/>
                            </Fade>
                        </Col>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="mail" theme="filled" style={iconStyle}/>} value={this.state.email}/>
                            </Fade>
                        </Col>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="phone" theme="filled" style={iconStyle}/>} value={this.state.phone}/>
                            </Fade>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-around" align="middle" style={{padding: '0px 20px 55px 20px', backgroundColor: 'white'}}>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="heart" theme="filled" style={iconStyle}/>} value={this.state.sex.toUpperCase()}/>
                            </Fade>
                        </Col>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="schedule" theme="filled" style={iconStyle}/>} value={getStandardFormatDate(this.state.birthday)}/>
                            </Fade>
                        </Col>
                        <Col span={7}>
                            <Fade top>
                                <Input size="large" addonBefore={<Icon type="home" theme="filled" style={iconStyle}/>} value={this.state.address}/>
                            </Fade>
                        </Col>
                    </Row>
                    
                </React.Fragment>
            );
        }
        
    }
};

const mapStateToProps = createStructuredSelector({
    users: selectUsers(),
    loading: selectLoading(),
});
  
export default withRouter(connect(mapStateToProps)(AdminPersonalProfile));