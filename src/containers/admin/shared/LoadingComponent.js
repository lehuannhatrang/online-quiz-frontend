import React from 'react';
import { Spin, Row, Col, Icon } from 'antd';

export const Loading = (props) => {
    return (
        <Row style={{padding: '80px 0'}}>
            <Col offset={5} span={14} style={{textAlign: 'center'}}>
                <Spin size="large" indicator={<Icon type="setting" theme="filled" style={{fontSize: '50px', color: '#1890ff'}} spin />}/>
                <br />
                <br />
                <h4 style={{color: 'black'}}>{props.text}</h4>
            </Col>
        </Row>
    );
};