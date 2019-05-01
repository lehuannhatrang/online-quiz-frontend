import React from 'react';
import './footer-style.css';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Footer } = Layout;

const AdminFooter = () => {
    return (
        <Footer className="footer row col-12 mb-0">
            <div className="col-6 text-left">
                <Link to="/dashboard">OnlineQuiz</Link>{' © 2019. All right reserved.' }
            </div>
            <div className="col-6 text-right">
                {'Make with '}<i class="fa fa-heart text-pulse"></i>{' by '}<Link to ="#">luantnguyen</Link>
            </div>
        </Footer>
    );
};

export default AdminFooter;