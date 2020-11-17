import React from "react";
import moment from 'moment'
const Message = ({message,outgoing}) => {
    return (
        <div className={outgoing ? "message-item outgoing-message" : 'message-item'}>
            <div className="message-avatar">
                <figure className="avatar" title="Mirabelle Tow">
                    <img
                        src="./dist/media/img/avatar3.png"
                        className="rounded-circle"
                        alt="user"
                    />
                </figure>
            </div>
            <div>
                <div className="message-content">{message.text}</div>
                <div className="time">
                    {moment(message.createdAt).format("hh:mm A")} <i className="ti-double-check text-info" />
                </div>
            </div>
        </div>
    );
};

export default Message;
