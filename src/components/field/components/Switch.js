import React, {Component} from 'react';
import {Field} from 'redux-form/immutable';
import If from "../../control/If";

class Switch extends Component {
    constructor(props) {
        super(props);
    }

    fieldRender = field => (
        <div>
            <label className="switch switch-sm switch-text switch-info mb-0">
                <input id={field.id} {...field}
                       type="checkbox"
                       checked={field.input.value}
                       className={`switch-input ${field.className}`}
                       {...field.input} />
                <span className="switch-label" data-on="On" data-off="Off" />
                <span className="switch-handle" />
            </label>
        </div>
    );

    render() {
        const { disabled, placeholder, className, label, helpText, name, type } = this.props;
        return (
            <div className={`form-group ${className}`}>
                <If condition={this.props.only !== 'value'}>
                    <label className={`col-form-label`} htmlFor={name}><b>{label}</b></label>
                </If>
                <Field id={name} type={type} disabled={disabled} component={this.fieldRender} name={name} className="form-control"
                       placeholder={placeholder} />
                <span className="help-block">{helpText}</span>
            </div>
        );
    }

}

export default Switch;
