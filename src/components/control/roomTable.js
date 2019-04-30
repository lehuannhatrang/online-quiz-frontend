import React, {Component} from 'react';

class RoomTable extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div>
        <table className="quizzes-table">
          <tbody>
            <tr>
              <th className="room-name-column quizz-column-heading">NAME</th>
              <th className="room-start-column quizz-column-heading">START</th>
              <th className="room-end-column quizz-column-heading">END</th>
              <th className="delete-column quizz-column-heading">DELETE</th>
              <th className="edit-column quizz-column-heading">EDIT</th>
            </tr>

            { this.props.data.map(room => {return(
              <tr key={room.id}>
                <td className="room-name-column quizz-column room-name">{room.name}</td>
                <td className="room-start-column quizz-column">{room.start}</td>
                <td className="room-end-column quizz-column">{room.end}</td>
                <td className="delete-column quizz-column">
                  <a href="#">
                    <i className="ion-close-round"></i>
                  </a>
                </td>
                <td className="edit-column quizz-column">
                  <a href={`/teacher/quiz/${room.id}`}>
                    <i className="ion-edit"></i>
                  </a>
                </td>
              </tr>
            )}
            )}

            {(!this.props.data || this.props.data.length === 0) && (
              <tr>
                <td className="name-column quizz-column">No data found</td>
                <td className="date-column quizz-column"></td>
                <td className="delete-column quizz-column"></td>
                <td className="edit-column quizz-column"></td>
              </tr>
            ) }
            
          </tbody>
        </table>
      </div>
    )
  }
}
export default RoomTable;
