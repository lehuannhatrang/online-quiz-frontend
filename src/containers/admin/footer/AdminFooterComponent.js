import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
    return (
        <div className="footer row col-12 mb-0">
            <div className="col-6 text-left">
                <Link to="/dashboard">Online Quiz</Link>{' © 2019. All right reserved.' }
            </div>
            <div className="col-6 text-right">
                {'Make with '}<i class="fa fa-heart text-pulse"></i>{' by '}<Link to ="#">luantnguyen</Link>
            </div>
        </div>
    );
};

export default AdminFooter;