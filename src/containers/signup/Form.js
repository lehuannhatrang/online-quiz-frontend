import React, {Component} from 'react';
import {Field, reduxForm, reset} from 'redux-form/immutable';
import Selection from '../../components/field/components/Selection';
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            step: "1",
            userName: "",
            password: "",
            retypePassword: "",
        };
    }

    roleOptions = [
        {
            label: "Student",
            value: "student"
        },
        {
            label: "Teacher",
            value: "teacher"
        },
        {
            label: "Admin",
            value: "admin"
        }
    ]

    
    render(){
        return (
            <form onSubmit={ this.props.handleSubmit }>
                <h1>Sign Up</h1>
                <p className="text-muted">Sign Up with us!</p>
            
                {this.state.step === "1" &&(   
                    <div>         
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="icon-user"></i></span>
                            </div>
                            <Field name="username" type="text" className="form-control" placeholder="Username" component="input" 
                            onChange={(e) => this.setState({userName : e.target.value}) }/>
                        </div>
            
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="icon-lock"></i></span>
                            </div>
                            <Field name="password" type="password" className="form-control" placeholder="Password" component="input" 
                            onChange={(e) => this.setState({password : e.target.value}) }/>

                            {this.state.password.length < 6 &&(
                                <span className="input-group-text" style={{color:"red"}}><i className="fa fa-times"></i></span>
                            )}

                            {!(this.state.password.length < 6) &&(
                                <span className="input-group-text" style={{color:"green"}}><i className="fa fa-check"></i></span>
                            )}
                        </div>

                        <div className="input-group mb-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="icon-lock"></i></span>
                            </div>
                            <Field name="retypePassword" type="password" className="form-control" placeholder="Retype password" component="input" 
                            onChange={(e) => this.setState({retypePassword : e.target.value}) }/>

                            {this.state.password === this.state.retypePassword &&(
                                <span className="input-group-text" style={{color:"green"}}><i className="fa fa-check"></i></span>
                            )}

                            {this.state.password !== this.state.retypePassword &&(
                                <span className="input-group-text" style={{color:"red"}}><i className="fa fa-times"></i></span>
                            )}

                        </div>

                    </div>
                )}

                {this.state.step === "2" &&(   
                    <div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="icon-user"></i></span>
                            </div>
                            <Field name="displayName" type="text" className="form-control" placeholder="Display Name" component="input"/>
                        </div>
            
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                            </div>
                            <Field name="email" type="text" className="form-control" placeholder="Email" component="input" />
                        </div>

                        <div className="input-group mb-1">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-phone"></i></span>
                            </div>
                            <Field name="phone" type="text" className="form-control" placeholder="Phone" component="input"/>
                        </div>

                        <div className="mb-4 mt-0">
                            <Selection options={this.roleOptions} name="role" className="form-control" placeholder="Role" component="input"/>
                        </div>
                        
                    </div>
                )}
    
                <div className="row">

                {this.state.step === "1" && (
                    <div className="col-6 offset-6 text-right">
                        <button type="button" className="btn btn-link px-0" onClick={() => this.setState({step : "2"})} 
                        disabled={!this.state.userName || this.state.password.length < 6 || this.state.password !== this.state.retypePassword}>Next Step ></button>
                    </div>
                )}
                
                {this.state.step === "2" && (
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary px-4">Submit</button>
                    </div>
                )}
                {this.state.step === "2" && (
                        <div className="col-6 text-right">
                            <button type="button" className="btn btn-link px-0" onClick={() => this.setState({step : "1"})}>{"< Go back"}</button>
                        </div>
                )}
                    
                    
                </div>
            </form>
        );
    }    
}

function validate(values) {
    const data = values.toJS();
    const errors = [];
    if (!data.name) {
        errors.name = 'Please enter name';
    }

    if (!data.group) {
        errors.group = 'Please select group';
    }

    if (!data.url) {
        errors.url = 'Please enter URL';
    } else if (!WebUtils.getUrlPattern().test(data.url)) {
        errors.url = 'Invalid URL string';
    }

    return errors;
}

function validate(values) {
    const data = values.toJS();
    const errors = [];
    if (!data.userName) {
        errors.name = 'Please enter user name';
    }
    if (!data.password) {
        errors.name = 'Please enter password';
    }
    return errors;
}

const mapStateToProps = createStructuredSelector({
    
});


function mapDispatchToProps(dispatch) {
    return {
        resetForm: () => dispatch(reset),
    }
}

SignUpForm = reduxForm({
    form: 'SignupForm',
    validate,
})(SignUpForm);

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
