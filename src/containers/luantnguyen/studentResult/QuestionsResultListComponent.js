import React, {Component} from 'react';
import { Radio, List, Avatar } from 'antd';

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

	render() {
		return (
			<List itemLayout="vertical" dataSource={this.props.data.entries()} 
				renderItem={
					item => {
						return	(
							<List.Item key={item[0] + 1}>
								<div style={{ fontSize: '16px' }}>
									<Avatar size={30} style={{ backgroundColor: 'black', fontSize: '13px' }}>{'Q.' + (item[0] + 1)}</Avatar>
									<span style={{ marginLeft: '8px', fontFamily: 'Playfair Display' }}><b>{capitalize(item[1].question)}</b></span>
								</div>
								<div style={{ padding: '15px 0px 10px 0px'}}>
									{enumerate(item[1].options).map(option => (
										<p key={option[0]}><b style={{ fontSize: '16px'}}>{String.fromCharCode(65 + option[0]) + '. '}</b>{option[1]}</p>
									))}
									{/* <RadioGroup name={'question' + (item[0] + 1)} buttonStyle="solid" size="large">
										{enumerate(item[1].options).map(option => (
											<Radio key={option[0]} style={radioStyles} value={String.fromCharCode(65 + option[0])}>{option[1]}</Radio>
										))}
									</RadioGroup> */}
									<div className="float-right" style={{ marginRight: '20px'}}>
										<span>Your Answer: </span>
										<RadioGroup name={'question' + (item[0] + 1)} buttonStyle="solid" size="small">
											{enumerate(item[1].options).map(option => (
												<Radio.Button key={option[0]} value={String.fromCharCode(65 + option[0])}><span style={{ padding: '5px 8px' }}>{String.fromCharCode(65 + option[0])}</span></Radio.Button>
											))}
										</RadioGroup>
									</div>
									<div style={{ clear: 'both' }}></div>
								</div>
							</List.Item>
						)
					}
				} />
		)
	}
}

export default QuestionsResultList