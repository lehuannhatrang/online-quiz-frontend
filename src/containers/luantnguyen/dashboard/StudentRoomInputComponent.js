import React, { Component } from 'react';
import { Form, Input, Button, Icon, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

class RoomInputForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            validateStatus: 'validating',
            help: '',
            roomId: '',
        };
        this.handleChangeRoomInput = this.handleChangeRoomInput.bind(this);
        this.handleStartToDoQuiz = this.handleStartToDoQuiz.bind(this);
    }

    handleChangeRoomInput(e) {
        let val = e.target.value;
        this.setState({
            roomId: val,
        });

        if (val.length === 0) {
            this.setState({
                validateStatus: 'error',
                help: 'Room ID must not be empty!',
            });
        }
        else if (/^[A-Za-z0-9]+$/.test(val)) {
            this.setState({
                validateStatus: 'success',
                help: ''
            });
        }
        else {
            this.setState({
                validateStatus: 'error',
                help: 'Invalid room ID',
            });
        }
    }

    handleStartToDoQuiz = (e) => {

    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'room_input': '',
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form style={{marginTop: '30px'}}>
                <Form.Item validateStatus={this.state.validateStatus} help={this.state.help}>
                    {getFieldDecorator('room_input')(
                        <Input.Search placeholder="Type room ID ..." enterButton={
                            <Button style={{backgroundColor: 'black', color: 'white', fontFamily: 'Playfair Display'}} disabled={this.state.validateStatus === 'error' || this.state.validateStatus === 'validating'}>
                                <a href={"/student/student/test/" + this.state.roomId}>{'Start Now'}</a>
                            </Button>
                        }
                            size="large" onSearch={this.handleStartToDoQuiz} onChange={this.handleChangeRoomInput}
                            style={{fontFamily: 'Muli'}}/>
                    )}
                </Form.Item>
            </Form>
        );
    }

}

const WrapperRoomInputForm = Form.create({name: 'room_input'})(RoomInputForm);

class StudentRoomInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
    
        return(
            <Row style={{backgroundColor: 'white', padding: '80px 0'}} id="luantnguyen-student-room-input">
                <Col span={14} offset={5}>
                    <Fade top>
                        <h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'Enter Room ID'}</h1>
                        <h4 style={{fontSize: '18px', marginBottom: '50px', fontFamily: 'Muli', textAlign: 'center'}}>{'Enter room ID provided by your teacher, and then press Start button'}</h4>
                    </Fade>
                    <Fade bottom>
                        <WrapperRoomInputForm />
                    </Fade>
                </Col>
            </Row>
        );
    }
}

export default StudentRoomInput;