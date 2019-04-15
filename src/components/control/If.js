import React, {Component} from 'react';
import PropTypes from 'prop-types';

class If extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { condition } = this.props;
        if (condition) {
            return this.props.children;
        } else {
            return '';
        }
    }
}

If.propTypes = {
    condition: PropTypes.bool
}

export default If;