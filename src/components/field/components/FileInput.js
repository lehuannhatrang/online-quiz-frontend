import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'redux-form/immutable';
import If from "../../control/If";
import FileUtils from "../../../../../server/utils/file.util";
import {isImmutable} from "immutable";

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: null,
        }
    }

    transformValue = delegate => e => {
        delegate(e.target.files[0]);
        if (e.target.files[0] && FileUtils.isImageSupported(e.target.files[0])) {
            this.setState({img: URL.createObjectURL(e.target.files[0])})
        } else {
            this.setState({img: null})
        }
    }

    componentWillReceiveProps(next) {
        this.setState({img: null})
    }

    fieldRender = ({input: {value: omitValue, onChange, onBlur, ...inputProps}, ...field }) => {
        let imageData = null;
        if (isImmutable(omitValue)) {
            imageData = omitValue.get('data');
        }
        return (
            <div>
                <div className="input-group-append">
                    <input type='file' id={field.id}
                           className={`form-control ${field.className} ${field.meta.error && field.meta.touched ? 'is-invalid':''}`}
                           {...field.input}
                           {...field}
                           onChange={this.transformValue(onChange)}
                           onBlur={this.transformValue(onBlur)}
                    />
                    <span className="input-group-text"><i className="fa fa-file-o" /></span>
                </div>
                <If condition={field.meta.error && field.meta.touched}>
                    <em className='error invalid-message'>{field.meta.error}</em>
                </If>
                <If condition={!!imageData}>
                    <div className={'mt-3 img-thumbnail'}>
                        <img src={imageData} width='100%'/>
                    </div>
                </If>
                <If condition={!imageData && !!this.state.img}>
                    <div className='mt-3 img-thumbnail'>
                        <img src={this.state.img} width='100%'/>
                    </div>
                </If>
            </div>
        );
    }

    render() {
        const { disabled, placeholder, className, label, helpText, name, type } = this.props;
        return (
            <div className={`form-group ${className}`}>
                <If condition={this.props.only !== 'value'}>
                    <label className={`col-form-label`} htmlFor={name}><b>{label}</b></label>
                </If>
                <Field id={name} disabled={disabled}
                       component={this.fieldRender}
                       name={name}
                       value={null}
                       className="form-control"
                       placeholder={placeholder} />
                <span className="help-block">{helpText}</span>
            </div>
        );
    }
}

FileInput.propTypes = {
    only: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    helpText: PropTypes.string,
    name: PropTypes.string.isRequired,
}

FileInput.defaultProps = {
    disabled: false,
}

export default FileInput;
