import React, { Component } from 'react';

class Forum extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <iframe style={{width: "100%", height:1000}} src="http://dev-quizonline.pantheonsite.io/forum/?fbclid=IwAR2jaiAly1xnQym622Z_edxtMdZ9T_U26xAqZO4Q0lWMEUxWO6ocldayAV8" />
        );
    }
};

export default Forum;