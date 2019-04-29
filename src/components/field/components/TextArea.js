import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import If from "../../control/If";
import Text from "./Text";

class TextArea extends Component {
    constructor(props) {
        super(props);
    }

    fieldRender = field => (
        <div>
            <div className="input-group-append">
                <textarea rows={field.rows} id={field.id} placeholder={field.placeholder} className={`${field.className} ${field.meta.error && field.meta.touched ? 'is-invalid':''}`} {...field.input}/>
                <span className="input-group-text"><i className="fa fa-edit"></i></span>
            </div>
            <If condition={field.meta.error && field.meta.touched}>
                <em className='error invalid-message'>{field.meta.error}</em>
            </If>
        </div>
    );

    render() {
        const { disabled, placeholder, className, label, helpText, name, type, rows } = this.props;
        return (
            <div className="form-group">
                <If condition={this.props.only !== 'value'}>
                    <label className="col-form-label" htmlFor={name}><b>{label}</b></label>
                </If>
                <Field id={name} disabled={disabled} component={this.fieldRender} type={type} name={name} className="form-control"
                       placeholder={placeholder} rows={rows} />
                <span className="help-block">{helpText}</span>
            </div>
        );
    }
}

Text.propTypes = {
    only: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    name: PropTypes.string.isRequired,
}

Text.defaulProps = {
    disabled: false,
    type: 'text',
}

export default TextArea;