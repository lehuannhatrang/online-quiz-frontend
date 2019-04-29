import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form/immutable';
import If from "../../control/If";

class Text extends Component {
    constructor(props) {
        super(props);
    }

    fieldRender = field => (
        <div>
            <div className="input-group-append">
                <input id={field.id} {...field}
                       className={`form-control ${field.className} ${field.meta.error && field.meta.touched ? 'is-invalid':''}`}
                       {...field.input}/>
                <span className="input-group-text"><i className="fa fa-edit" /></span>
            </div>
            <If condition={field.meta.error && field.meta.touched}>
                <em className='error invalid-message'>{field.meta.error}</em>
            </If>
        </div>
    );

    render() {
        const { disabled, placeholder, className, label, helpText, name, type, required } = this.props;
        return (
            <div className={`form-group ${className}`}>
                <If condition={this.props.only !== 'value'}>
                    <label className={`col-form-label`} htmlFor={name}><b>{label} {required ? '(*)' : ''}</b></label>
                </If>
                <Field id={name} type={type} disabled={disabled} component={this.fieldRender} name={name} className="form-control"
                       placeholder={placeholder} />
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
    labelCols: PropTypes.number,
    fieldCols: PropTypes.number
}

Text.defaultProps = {
    disabled: false,
    type: 'text',
    labelCols: 2,
    fieldCols: 10,
}

export default Text;
