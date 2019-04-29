import React, {Component} from 'react';
import If from "../../control/If";
import {Field} from "redux-form/immutable";
import Select from 'react-select';
import {isImmutable} from "immutable";

class Selection extends Component {
    constructor(props) {
        super(props);
    }

    transformValue(value) {
        return isImmutable(value) ? value.toJS() : value;
    }

    fieldRender = ({ input, options, meta, isMulti }) => {
        const customStyles = {
            control: (base, state) => ({
                ...base,
                borderColor: meta.error && meta.touched ? 'red' : base.borderColor,
                '&:hover': {
                    borderColor: meta.error && meta.touched ? 'red' : base.borderColor
                }
            })
        }
        return (
        <div>
            <Select isMulti={isMulti} styles={customStyles} {...input} onBlur={(value) => {input.onBlur(input.value)}} options={options} value={this.transformValue(input.value)} />
            <If condition={meta.error && meta.touched}>
                <em className='error invalid-message'>{meta.error}</em>
            </If>
        </div>
    )};

    render() {
        const {label, name, id, options, isMulti, required} = this.props;
        return (
            <div className="form-group">
                <If condition={this.props.only !== 'value'}>
                    <label className="col-form-label" htmlFor={id}><b>{label} {required ? '(*)' : ''}</b></label>
                </If>
                <Field isMulti={isMulti} name={name} component={this.fieldRender} options={options} />
            </div>
        );
    }

}

export default Selection;