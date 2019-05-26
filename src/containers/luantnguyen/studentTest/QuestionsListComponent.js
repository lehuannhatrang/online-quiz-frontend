import React, {Component} from 'react';

class QuestionsList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{JSON.stringify(this.props.data)}
			</div>
		)
	}
}

export default QuestionList