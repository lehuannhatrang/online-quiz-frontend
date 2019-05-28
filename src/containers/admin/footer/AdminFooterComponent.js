import React from 'react';
import './footer-style.css';
import { Link } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="admin-footer mb-0">
            <Row type="flex" justify="space-around" align="middle">
                <Col span={23}>
                    <Row>
                        <Col span={12} className="text-left">
                            <Link className="admin-footer-link" to="/dashboard">OnlineQuiz</Link>{' © 2019. All right reserved.' }
                        </Col>
                        <Col span={12} className="text-right">
                            {'Make with '}<i className="fa fa-heart text-pulse"></i>{' by '}<Link className="admin-footer-link" to ="#">luantnguyen</Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Footer>
    );
};

export default AdminFooter;