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
    color: 'white',
    width: '80%'
};

// const bgImage = 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const bgImage = 'https://cdn.pixabay.com/photo/2019/03/30/20/52/test-4092025_960_720.jpg';

const Introduction = (props) => {
    return (
        <Row id="luantnguyen-intro">
            <Parallax bgImage={bgImage} strength={0} blur={0}
                bgImageStyle={{
                    height: '130%',
                }}
                renderLayer={percentage => {
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                background: `rgba(255, 255, 255, ${(percentage - 0.5) * 0.5})`,
                                left: '0',
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
                        <Col span={9}>
                            <Slide left>
                                <h1 style={{fontSize: '32px'}}>Introduction</h1>
                                <p style={{marginTop: '45px', lineHeight: '25px'}}>
                                    <b>Super Online Quiz</b> is best online quiz system on the world. It is designed by a BKU team. 
                                    Velit, voluptatum. Sed, deleniti. Fugit quisquam eum quod architect, itaque, at voluptati explicabo
                                    dolor dolorum tempori, at voluptatibus explicabo? Eos.
                                </p>
                            </Slide>
                        </Col>
                        <Col span={3}></Col>
                        <Divider style={{height: '240px'}} type="vertical" />
                    </div>
                </div>
            </Parallax>
        </Row>
    );
};

export default Introduction;