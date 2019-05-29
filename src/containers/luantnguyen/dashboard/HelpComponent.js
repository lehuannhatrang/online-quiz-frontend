import React, { Component } from 'react';
import { Parallax } from 'react-parallax';
import { Row, Col, Divider } from 'antd';
import Slide from 'react-reveal/Slide';

const insideStyles = {
    background: "transparent",
    padding: '70px 0',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: 'left',
    fontSize: '20px',
    color: 'black',
    width: '80%'
};

const bgImage = 'https://images.pexels.com/photos/2008145/pexels-photo-2008145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
//const bgImage = 'https://images.pexels.com/photos/574285/pexels-photo-574285.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const Help = (props) => {
    return (
        <Row id="luantnguyen-help">
            <Parallax bgImage={bgImage} strength={0} blur={0}
                renderLayer={percentage => {
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                background: `rgba(0, 0, 0, ${(percentage - 0.5) * 0.5})`,
                                right: '0',
                                top: '0',
                                height: '380px',
                                width: (percentage * 200) + 'vh',
                            }}
                        />
                    );}
                }
            >
                <div style={{ height: '380px' }}>
                    <div style={insideStyles}>
                        <Col span={12}>
                            <Divider style={{height: '240px', float: 'right'}} type="vertical" />
                        </Col>
                        <Col span={9} offset={3} style={{textAlign: 'right'}}>
                            <Slide right>
                                <h1 style={{fontSize: '32px'}}>Instruction</h1>
                                <p style={{marginTop: '45px', lineHeight: '27px'}}>
                                    {props.user && props.user.userInfo.role === 'teacher' && (
                                        <span>You can create, delete, update rooms, quizzes, questions for your students. Setting time
                                            for your rooms. Evenly, you can import other's quizzes to your room. 
                                            Remember to notify room ID to your student. So easy to use!
                                        </span>
                                    )}
                                    {props.user && props.user.userInfo.role === 'student' && (
                                        <span>You can do quiz created by your teachers, view your results. Evenly,
                                        you can contact to admin for Super Online Quiz enquirys. If you want to do a
                                        quiz, please ask your teacher for the room ID. So easy to use!
                                        </span>
                                    )}
                                    {!props.user && (
                                        <span>You can do quiz created by your teachers, view your results. Evenly,
                                        you can contact to admin for Super Online Quiz enquirys. If you want to do a
                                        quiz, please ask your teacher for the room ID. So easy to use!
                                        </span>
                                    )}
                                </p>
                            </Slide>
                        </Col>
                    </div>
                </div>
            </Parallax>
        </Row>
    );
};

export default Help;