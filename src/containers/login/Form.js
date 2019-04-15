import React from 'react';
import {Field, reduxForm} from 'redux-form/immutable';

let LoginForm = props => {
    const { handleSubmit } = props;
    return (
        <form onSubmit={ handleSubmit }>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="icon-user"></i></span>
                </div>
                <Field name="username" type="text" className="form-control" placeholder="Username" component="input" />
            </div>
            <div className="input-group mb-4">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="icon-lock"></i></span>
                </div>
                <Field name="password" type="password" className="form-control" placeholder="Password" component="input" />
            </div>
            <div className="row">
                <div className="col-6">
                    <button type="submit" className="btn btn-primary px-4">Login</button>
                </div>
                <div className="col-6 text-right">
                    <button type="button" className="btn btn-link px-0">Forgot password?</button>
                </div>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'login',
})(LoginForm);
