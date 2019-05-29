import React from 'react';

export const Loading = ({text}) => {
    return (
        <div>
            <span className="fa fa-spin fa-3x"></span>
            <h4>{text}</h4>
        </div>
    );
};