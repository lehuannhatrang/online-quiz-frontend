import React, {Component} from 'react';

class Error extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const error = this.props.error;
        if (error.status === 401 || ['ACCOUNT_DISABLED'].includes(error.code) ) {
            localStorage.removeItem('userToken');
            localStorage.removeItem('userId');
        }
    }

    render() {
        const error = this.props.error;
        return (
            <div className="center-screen">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="clearfix">
                                <h1 className="float-left display-3 mr-4">{error.status}</h1>
                                <h4 className="pt-3">Oops! You're lost.</h4>
                                <p className="text-muted">{error.message}</p>
                            </div>
                            <div className="input-prepend input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                                </div>
                                <input id="prependedInput" className="form-control" size="16" type="text"
                                       placeholder="What are you looking for?" />
                                <span className="input-group-append">
                            <button className="btn btn-info" type="button">Search</button>
                          </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Error;