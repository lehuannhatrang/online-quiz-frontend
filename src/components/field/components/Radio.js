import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import If from "../../control/If";

class Radio extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { name, label, options, emptyLabel, noEmptySelect, disabled, helpText, inline, required, onChange } = this.props;
        return (
            <div className="form-group">
                <If condition={this.props.only !== 'value'}>
                    <label className={`col-form-label`} htmlFor={name}><b>{label} {required ? '(*)' : ''}</b></label>
                </If>
                <div className="form-control col-form-label">
                    <fieldset disabled={disabled}>
                        <If condition={!noEmptySelect}>
                            <div className={`form-check checkbox ${inline ? 'form-check-inline mr-lg-3' : ''}`}>
                                <Field className="form-check-input" component='input' type="radio" value='' id={`${name}-none`}
                                       name={name} />
                                <label className="form-check-label" htmlFor={`${name}-none`}>
                                    {emptyLabel}
                                </label>
                            </div>
                        </If>
                        {options.map((option, index) => (
                            <div key={index} className={`form-check checkbox mt-2 ${inline ? 'form-check-inline mr-lg-3' : ''}`}>
                                <Field className="form-check-input" component='input' type="radio" value={option.value} id={`${name}-${index}`}
                                       name={name} onChange={onChange}/>
                                <label className="form-check-label" htmlFor={`${name}-${index}`}>
                                    {option.label}
                                </label>
                            </div>
                        ))}
                    </fieldset>
                    <span className="help-block">{helpText}</span>
                </div>
            </div>
        );
    }
}

Radio.propTypes = {
    options: PropTypes.array.isRequired,
    emptyLabel: PropTypes.string,
    noEmptySelect: PropTypes.bool,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    only: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    inline: PropTypes.bool,
}

Radio.defaultProps = {
    disabled: false,
    noEmptySelect: false,
    inline:false,
}

export default Radio;