import React, {Component} from 'react';

class RoomTable extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const rooms = this.props.data.filter(data => data.name.indexOf(this.props.searchingText) > -1)
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

            { rooms.map(room => {return(
              <tr key={room.id}>
                <td className="room-name-column quizz-column room-name">{room.name}</td>
                <td className="room-start-column quizz-column">{room.start}</td>
                <td className="room-end-column quizz-column">{room.end}</td>
                <td className="delete-column quizz-column">
                  <a href="#" onClick={() => this.props.deleteRoom(room.id)}>
                    <i className="ion-close-round"></i>
                  </a>
                </td>
                <td className="edit-column quizz-column">
                  <a href={`/teacher/room/${room.id}`}>
                    <i className="ion-edit"></i>
                  </a>
                </td>
              </tr>
            )}
            )}

            {(!rooms || rooms.length === 0) && (
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
export default RoomTable;
