import React from 'react';
import './footer-style.css';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="footer mb-0">
            <Row type="flex" justify="space-around" align="middle">
                <Col span={23}>
                    <Row>
                        <Col span={12} className="text-left">
                            <Link to="/dashboard">OnlineQuiz</Link>{' © 2019. All right reserved.' }
                        </Col>
                        <Col span={12} className="text-right">
                            {'Make with '}<i class="fa fa-heart text-pulse"></i>{' by '}<Link to ="#">luantnguyen</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Footer>
    );
};

export default AdminFooter;