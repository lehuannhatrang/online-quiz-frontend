import React, { Component } from 'react';
import IndexConfig from '../../../configs'

class Forum extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <iframe style={{width: "100%", height:1000}} src={IndexConfig.FORUM_URL} />
        );
    }
};

export default Forum;