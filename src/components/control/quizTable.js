import React, {Component} from 'react';

class QuizTable extends Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    const quizzes = this.props.data.filter(data => data.name.indexOf(this.props.searchingText) > -1);
    return(
      <div>
        <table className="quizzes-table">
          <tbody>
            <tr>
              <th className="name-column quizz-column-heading">NAME</th>
              <th className="date-column quizz-column-heading">DATE</th>
              <th className="delete-column quizz-column-heading">DELETE</th>
              <th className="edit-column quizz-column-heading">EDIT</th>
            </tr>

            { quizzes.map(quiz => {return(
              <tr key={quiz.id}>
                <td className="name-column quizz-column">{quiz.name}</td>
                <td className="date-column quizz-column">{quiz.date}</td>
                <td className="delete-column quizz-column">
                  <a href="#" onClick={() => this.props.deleteQuiz(quiz.id)}>
                    <i className="ion-close-round"></i>
                  </a>
                </td>
                <td className="edit-column quizz-column">
                  <a href={`/teacher/quizz/edit/${quiz.id}`}>
                    <i className="ion-edit"></i>
                  </a>
                </td>
              </tr>
            )}
            )}

            {(!quizzes || quizzes.length === 0) && (
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
export default QuizTable;
