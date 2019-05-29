import React, {Component} from 'react';
import PropTypes from 'prop-types';
import "./style.css";
import "./chat.js"

class ChatBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="chat-area">
                <div className="onlineUsersContainer">
                <div className="chatbox-title">
                    Online User
                </div>
                <div className="onlineUserContainer">
                    <ul id="onlineUsers">

                    <li id="123" className="active"><a href="javascript:void(0)">Duong Van Truong</a><label className="chatNotificationCount"></label></li>
                    <li id="123" className=""><a href="javascript:void(0)">Tran Van A</a><label className="chatNotificationCount"></label></li>
                    <li id="123" className=""><a href="javascript:void(0)">Tran Van B</a><label className="chatNotificationCount">1</label></li>

                    </ul>
                </div>
                </div>

                <div className="chatContainer" style={{display: "none"}}>
                <div id="chat-username">Chat message</div>

                <ul id="messages">
                    <li className="chatMessageLeft">Chao anh di ne</li>
                    <li className="chatMessageLeft">hi anh di ne</li>
                    <li className="chatMessageRight">Xin chao các bạn</li>
                    <li className="chatMessageLeft">Heehe haha</li>
                    <li className="chatMessageRight">Duong Van Truong</li>
                    <li className="chatMessageRight">Duong Van Truong
                    </li>
                </ul>

                <span id="notifyTyping">user is typing</span>

                <div id="box">
                    <input id="m" autoComplete="off" onKeyUp={() => this.notifyTyping()} placeholder="Type a message ..." />
                    
                    <div id="btnSend" onClick={() => this.submitfunction()}>
                    <i classNameName="ion-paper-airplane"></i>
                    </div>
                </div>

                </div>
            </div>
        )
    }
}

export default ChatBox;