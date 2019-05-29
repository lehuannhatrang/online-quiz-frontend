import React, {Component} from 'react';

class StudentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const students = this.props.data;
        return(
          <div>

<table className="table table-striped student-result">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Student Name</th>
      <th scope="col">Right</th>
      <th scope="col">Total</th>
      <th scope="col">Score</th>
    </tr>
  </thead>
  <tbody>
    {
      students.map((student,index) => {return(
        <tr>
          <th scope="row">{index+1}</th>
          <td>{student.name}</td>
          <td>{student.right}</td>
          <td>{student.total}</td>
          <td>{student.score}</td>
        </tr>
      )})
    }

  </tbody>
</table>
            
          </div>
        )
    }
}

export default StudentList;