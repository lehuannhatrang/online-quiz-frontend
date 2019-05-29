import React, {Component} from 'react';
import { Radio, List, Avatar, Icon } from 'antd';

const RadioGroup = Radio.Group;

const enumerate = (arr) => {
	let result = [];
	for (let i = 0; i < arr.length; ++i) {
		const e = [i, arr[i]];
		result.push(e);
	}
	return result;
}

const capitalize = (str) => {
	return str[0].toUpperCase() + str.slice(1);
}
class QuestionsResultList extends Component {
	constructor(props) {
		super(props);
	}

	getData(questionList, userAnswers) {
		const data = [];
		for (let i = 0; i < questionList.length; ++i) {
			const question = questionList[i];
			question.userAnswer = userAnswers[i];
			data.push(question);
		}
		return data;
	}

	render() {
		const myData = this.getData(this.props.data, this.props.answers);
		return (
			<List itemLayout="vertical" dataSource={myData.entries()} 
				renderItem={
					item => {
						const right = item[1].answer;
						const left = item[1].userAnswer;
						var suffixIconQues = null
						if (left === null || left === undefined)
							suffixIconQues = (<Icon type="close" style={{color: 'red'}} />);
						return	(
							<List.Item key={item[0] + 1}>
								<div style={{ fontSize: '16px' }}>
									<Avatar size={30} style={{ backgroundColor: 'black', fontSize: '13px' }}>{'Q.' + (item[0] + 1)}</Avatar>
									<span style={{ marginLeft: '8px', fontFamily: 'Playfair Display' }}><b>{capitalize(item[1].question)}</b>{' '}</span>{suffixIconQues}
								</div>
								<div style={{ padding: '15px 0px 10px 0px'}}>
									{enumerate(item[1].options).map(option => {
										var suffixIcon = null;
										console.log(left + ' - ' + right + ' - ' + option[1]);
										if (option[1] === left) {
											if (option[1] === right) {
												suffixIcon = (<Icon type="check" style={{color: '#52c41a'}} />);
											}
											else {
												suffixIcon = (<Icon type="close" style={{color: 'red'}} />);
											}
										}
										else {
											if (option[1] === right) {
												suffixIcon = (<Icon type="check" style={{color: '#52c41a'}} />);
											}
										}
										return (
											<p key={option[0]}><b style={{ fontSize: '16px'}}>{String.fromCharCode(65 + option[0]) + '. '}</b>{option[1]}{' '}{suffixIcon}</p>
										);
									}
									)}
									{/* <RadioGroup name={'question' + (item[0] + 1)} buttonStyle="solid" size="large">
										{enumerate(item[1].options).map(option => (
											<Radio key={option[0]} style={radioStyles} value={String.fromCharCode(65 + option[0])}>{option[1]}</Radio>
										))}
									</RadioGroup> */}
									{/* <div className="float-right" style={{ marginRight: '20px'}}>
										<span>Your Answer: </span>
										<RadioGroup name={'question' + (item[0] + 1)} buttonStyle="solid" size="small">
											{enumerate(item[1].options).map(option => (
												<Radio.Button key={option[0]} value={String.fromCharCode(65 + option[0])}><span style={{ padding: '5px 8px' }}>{String.fromCharCode(65 + option[0])}</span></Radio.Button>
											))}
										</RadioGroup>
									</div>
									<div style={{ clear: 'both' }}></div> */}
								</div>
							</List.Item>
						)
					}
				} />
		)
	}
}

export default QuestionsResultList