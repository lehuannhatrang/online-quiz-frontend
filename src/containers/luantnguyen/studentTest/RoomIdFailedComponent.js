import React, { Component } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import LightSpeed from 'react-reveal/LightSpeed';

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
                                <Link to={"/student/student/test/" + this.state.roomId}>{'Start Now'}</Link>
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

class RoomIdFailed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Row style={{backgroundColor: 'white', padding: '80px 0'}}>
                <Col span={14} offset={5}>
                    <LightSpeed>
                        <h1 style={{fontSize: '40px', textAlign: 'center'}} className="font-weight-bold">{'Sorry, your room ID doesn\'t exists!'}</h1>
                        <h4 style={{fontSize: '18px', marginBottom: '50px', fontFamily: 'Muli', textAlign: 'center'}}>{'Please try again, enter your room ID here and then press Start button.'}</h4>
                    </LightSpeed>
                    <LightSpeed left>
                        <WrapperRoomInputForm />
                    </LightSpeed>
                </Col>
            </Row>
        );
    }
}

export default RoomIdFailed;