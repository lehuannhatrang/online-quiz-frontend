import React, {Component} from 'react';

class ResultTable extends Component {
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
              <th className="room-name-column quizz-column-heading">NAME</th>
              <th className="room-start-column quizz-column-heading">START</th>
              <th className="room-end-column quizz-column-heading">END</th>
              <th className="delete-column quizz-column-heading">SCORE</th>
              <th className="edit-column quizz-column-heading"></th>
            </tr>

            { results.map(result => {return(
              <tr key={result.id}>
                <td className="room-name-column quizz-column room-name">{result.name}</td>
                <td className="room-start-column quizz-column">{result.start}</td>
                <td className="room-end-column quizz-column">{result.end}</td>
                <td className="delete-column quizz-column">
                  {/* <a href="#" onClick={() => this.props.deleteRoom(result.id)}>
                    <i className="ion-close-round"></i>
                  </a> */}
                  9/10
                </td>
                <td className="edit-column quizz-column">
                  <a href={`/student/result/${result.id}`}>
                  <button type="button" class="btn view-result">View</button>
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
export default ResultTable;
