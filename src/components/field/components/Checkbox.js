import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import If from "../../control/If";

class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, label, disabled, helpText, inline, required } = this.props;
        let options = this.props.options || [];
        return (
            <div className="form-group">
                <If condition={this.props.only !== 'value'}>
                    <label className={`col-form-label`} htmlFor={name}><b>{label} {required ? '(*)' : ''}</b></label>
                </If>
                <div className="col-md-9">
                    <fieldset disabled={disabled}>
                        <If condition={!!options}>
                            { options.map((option, index) => (
                                <div key={index} className={`form-check checkbox mt-2 ${inline ? 'form-check-inline mr-lg-3' : ''}`}>
                                    <Field name={`${name}[${option.value}]`} className="form-check-input" component='input' type="checkbox" id={`${name}[${option.value}]${index}`} />
                                    <label className="form-check-label" htmlFor={`${name}[${option.value}]${index}`}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </If>
                        <If condition={!options}>
                            <div className="form-check checkbox">
                                <Field key="0" name={name} className="form-check-input" component='input' type="checkbox" id={name} />
                                <label className="form-check-label" htmlFor={name}>
                                    {label}
                                </label>
                            </div>
                        </If>
                    </fieldset>
                </div>
                <span className="help-block">{helpText}</span>
            </div>
        );
    }
}

Checkbox.propTypes = {
    emptyLabel: PropTypes.string,
    noEmptySelect: PropTypes.bool,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    only: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    inline: PropTypes.bool,
}

Checkbox.defaultProps = {
    disabled: false,
    noEmptySelect: false,
    inline:false,
}

export default Checkbox;