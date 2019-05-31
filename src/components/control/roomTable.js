import React, {Component} from 'react';
import {toast} from "react-toastify";


class RoomTable extends Component {
  constructor(props) {
    super(props);
  }

  transformDateTime(date) {
    const time = date.split('T');
    const day = time[0].split('-');
    const newDay = `${day[2]}/${day[1]}/${day[0]}`
    const hour = time[1].substring(0,5);
    return `${hour} ${newDay}`
  }

  render(){
    const rooms = this.props.data.filter(data => data.name.indexOf(this.props.searchingText) > -1)
    return(
      <div>
        <table className="quizzes-table">
          <tbody>
            <tr>
              <th className="room-name-column quizz-column-heading">ROOM NAME</th>
              <th className="room-start-column quizz-column-heading">START</th>
              <th className="room-end-column quizz-column-heading">DURATION</th>
              <th className="delete-column quizz-column-heading">DELETE</th>
              <th className="edit-column quizz-column-heading">EDIT</th>
            </tr>

            { rooms.map(room => {return(
              <tr key={room.id}>
                <td className="room-name-column quizz-column room-name">
                  <a href={`#`} id={`name-${room.id}`} title={`id: ${room.id}`} className="font-weight-bold" onClick={() => this.props.editRoom(room.id)}>
                    {room.name}
                  </a>
                  <div className="float-right">
                    <a href="#" title={room.id} className="text text-mute" onClick={() => {
                      let dummy = document.createElement("textarea");
                      document.body.appendChild(dummy);
                      dummy.value = room.id;
                      dummy.select();
                      document.execCommand("copy");
                      document.body.removeChild(dummy);
                      toast.success("Copied Room Id")
                    }}>
                      Copy id
                    </a>
                  </div>
                </td>
                <td className="room-start-column quizz-column">{this.transformDateTime(room.startTime)}</td>
                <td className="room-end-column quizz-column">{`${room.Duration} Minutes`}</td>
                <td className="delete-column quizz-column">
                  <a href="#" onClick={() => this.props.deleteRoom(room.id)}>
                    <i className="ion-close-round"></i>
                  </a>
                </td>
                <td className="edit-column quizz-column">
                  <a href={`#`} data-toggle="modal" data-target="#editRoom" onClick={() => this.props.editRoom(room.id)}>
                    <i className="ion-edit"></i>
                  </a>
                </td>
              </tr>
            )}
            )}

            {(!rooms || rooms.length === 0) && (
              <tr>
                <td className="name-column quizz-column">No room founded</td>
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
