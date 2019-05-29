import React, {Component} from 'react';

class ReportTable extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const results = this.props.data.filter(data => data.name.indexOf(this.props.searchingText) > -1)
    return(
      <div>
        <table className="quizzes-table">
          <tbody>
            <tr>
              <th className="room-name-column quizz-column-heading">ROOM NAME</th>
              <th className="room-start-column quizz-column-heading">START</th>
              <th className="room-end-column quizz-column-heading">END</th>
              <th className="delete-column quizz-column-heading"></th>
              <th className="edit-column quizz-column-heading"></th>
            </tr>

            { results.map(room => {return(
              <tr key={room.id}>
                <td className="room-name-column quizz-column room-name">{room.name}</td>
                <td className="room-start-column quizz-column">{room.start}</td>
                <td className="room-end-column quizz-column">{room.end}</td>
                <td className="delete-column quizz-column">
                </td>
                <td className="edit-column quizz-column">
                  <a href={`/teacher/report/${room.id}`}>
                  <button type="button" className="btn view-result">View</button>
                  </a>
                </td>
              </tr>
            )}
            )}

            {(!results || results.length === 0) && (
              <tr>
                <td className="name-column quizz-column">No room found</td>
                <td className="date-column quizz-column"></td>
                <td className="delete-column quizz-column"></td>
                <td className="edit-column quizz-column"></td>
                <td className="edit-column quizz-column"></td>
              </tr>
            ) }
            
          </tbody>
        </table>
      </div>
    )
  }
}
export default ReportTable;
