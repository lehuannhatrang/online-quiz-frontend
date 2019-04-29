import React, {Component} from 'react';
import {login} from "../app/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from 'reselect';
import {selectUserToken} from "../app/selectors";
import SignUpnForm from "./Form";
import HttpUtil from "../../utils/http.util"

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    async onSubmitForm(fields) {
        await delete fields.retypePassword;
        const data = await fields.toJS();
        return HttpUtil.postJson("/signup", data);
    }

    render() {
        return (
            <div className="center-screen">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card-group">
                                <div className="card p-4">
                                    <div className="card-body">
                                        <SignUpnForm onSubmit={(fields) => this.onSubmitForm(fields) } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

const mapStateToProps = createStructuredSelector({
    token: selectUserToken(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);