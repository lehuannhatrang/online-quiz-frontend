import React, {Component} from 'react';
import './teacher.css';
import Header from "../../components/control/header"

class Teacher extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
          <div>
            <Header></Header>
            <a href="./teacher#quiz">Hello</a>
          </div>
        )
    }

}

export default Teacher;