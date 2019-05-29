import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, Option, message } from 'antd';
import Fade from 'react-reveal/Fade';

class ContactForm extends Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeTelnum = this.handleChangeTelnum.bind(this);
        this.handleOnChangeEnquiry = this.handleOnChangeEnquiry.bind(this);
        this.handleOnChangeRole = this.handleOnChangeRole.bind(this);
        this.state = {
            enquiry: 'general',
            role: this.props.user ? this.props.user.userInfo.role : 'other',
            fullNameValidateStatus: 'validating',
            fullNameHelp: '',
            emailValidateStatus: 'validating',
            emailHelp: '',
            telnumValidateStatus: 'validating',
            telnumHelp: '',
        };
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'fullname': this.props.user ? this.props.user.userInfo.displayName : '',
            'email': '',
            'telnum': '',
            'message': '',
        });
    }

    handleOnChangeEnquiry(val) {
        this.setState({
            enquiry: val,
        });
    }

    handleOnChangeRole(val) {
        this.setState({
            role: val,
        });
    }

    handleSubmit() {
        message.success('Your form was submitted.');
    }

    handleChangeFullname(e) {
        const val = e.target.value;
        if (val.length === 0) {
            this.setState({
                fullNameValidateStatus: 'error',
                fullNameHelp: 'Full name must not be empty!',
            });
        }
        else if (val.length < 3 || val.length > 35) {
            this.setState({
                fullNameValidateStatus: 'error',
                fullNameHelp: 'Full name length is invalid!',
            });
        }
        else if (!/^[A-Za-z ]+$/.test(val)) {
            this.setState({
                fullNameValidateStatus: 'error',
                fullNameHelp: 'Full name is invalid!',
            });
        }
        else {
            this.setState({
                fullNameValidateStatus: 'success',
                fullNameHelp: '',
            });
        }
    }

    handleChangeEmail(e) {
        const val = e.target.value;
        if (val.length === 0) {
            this.setState({
                emailValidateStatus: 'error',
                emailHelp: 'Email must not be empty!',
            });
        }
        else if (val.length < 5) {
            this.setState({
                emailValidateStatus: 'error',
                emailHelp: 'Email length is invalid!',
            });
        }
        else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val) ) {
            this.setState({
                emailValidateStatus: 'error',
                emailHelp: 'Your email is invalid!',
            });
        }
        else {
            this.setState({
                emailValidateStatus: 'success',
                emailHelp: '',
            });
        }
    }

    handleChangeTelnum(e) {
        const val = e.target.value;
        if (val.length === 0) {
            this.setState({
                telnumValidateStatus: 'error',
                telnumHelp: 'Telnum must not be empty!',
            });
        }
        else if (val.length !== 10) {
            this.setState({
                telnumValidateStatus: 'error',
                telnumHelp: 'Telnum length is invalid!',
            });
        }
        else if ( !/^[0-9]+$/i.test(val) ) {
            this.setState({
                telnumValidateStatus: 'error',
                telnumHelp: 'Your telnum is invalid!',
            });
        }
        else {
            this.setState({
                telnumValidateStatus: 'success',
                telnumHelp: '',
            });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} layout="vertical" className="contact-form" style={{width: '100%'}}>
                <Fade>
                    <h3>Personal Details</h3>
                    <Form.Item validateStatus={this.state.fullNameValidateStatus} help={this.state.fullNameHelp}>
                        {getFieldDecorator('fullname')(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Full name'}
                                onChange={this.handleChangeFullname}/>
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={this.state.emailValidateStatus} help={this.state.emailHelp}>
                        {getFieldDecorator('email')(
                            <Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Email'} 
                                onChange={this.handleChangeEmail}/>
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={this.state.telnumValidateStatus} help={this.state.telnumHelp}>
                        {getFieldDecorator('telnum')(
                            <Input type="tel" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={'Phone number'} 
                            onChange={this.handleChangeTelnum}/>
                        )}                 
                    </Form.Item>
                    <h3>Enquiry Information</h3>
                    <Form.Item label="Enquiry">
                        <Select placeholder="Choose enquiry type" value={this.state.enquiry} dropdownClassName="contact-form-dropdown"
                        onChange={this.handleOnChangeEnquiry}>
                            <Select.Option value="general">General Enquiry</Select.Option>
                            <Select.Option value="difficultly">Difficultly Enquiry</Select.Option>
                            <Select.Option value="system">System Enquiry</Select.Option>
                            <Select.Option value="suggestion">Suggestion</Select.Option>
                            <Select.Option value="knowledge">Knowledge Enquiry</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Your Role">
                        <Select placeholder="Your role" value={this.state.role} dropdownClassName="contact-form-dropdown"
                        onChange={this.handleOnChangeRole}>
                            <Select.Option value="teacher">Teacher</Select.Option>
                            <Select.Option value="student">Student</Select.Option>
                            <Select.Option value="other">Other</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('message')(
                            <Input.TextArea rows={5} placeholder={'Message here...'}></Input.TextArea>
                        )}  
                    </Form.Item>
                    <Form.Item>
                        <Button type="dark" htmlType="submit" className="contact-form-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Fade>
            </Form>
        );
    }
}

const WrappedContactForm = Form.create({ name: 'contact_form'})(ContactForm);

function Contact(props) {

    return (
        <div className="container-fluid col-12 p-0 m-0" id="luantnguyen-contact-form">
            <div className="col-12 super-contact-form">
                <div className="col-12 title">
                    <h1 className="text-center font-weight-bold" style={{fontSize: '40px'}}>
                        Contact Us
                    </h1>
                </div>
                <div className="col-8 offset-2 main-form row">
                    <WrappedContactForm user={props.user}/>
                </div>
            </div>
        </div>
    );
}

export default Contact;