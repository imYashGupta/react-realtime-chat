import React from "react";
import moment from 'moment'
import Avatar from "../Avatar";

const ActiveChats = (props) => {
    return (
        <div id="chats" className="sidebar chat-list active">
            <header>
                <span>Chats</span>
            </header>
            <form>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                />
            </form>
            <div className="sidebar-body">
                <ul className="list-group list-group-flush">
                    {props.activeChats.map((chat) => {
                        return (
                            <li className="list-group-item" onClick={() => props.handleOpenChatWith(chat.user)} key={chat.id}>
                                {/* active-chat */}
                                <div>
                                    <Avatar user={chat.user} />
                                </div>
                                <div className="users-list-body">
                                    <div>
                                        <h5>{chat.user.name}</h5>
                                        <p>
                                            {chat.messages[chat.messages.length-1].text}
                                        </p>
                                    </div>
                                    <div className="users-list-action">
                                        <small className="text-muted">
                                        {moment(chat.messages[chat.messages.length-1].createdAt,"YYYYMMDD").fromNow()}
                                        </small>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="p-3">
                <button
                    data-navigation-target="new-chat"
                    className="btn btn-primary btn-block btn-lg"
                >
                    New Chat
                </button>
            </div>
        </div>
    );
};

export default ActiveChats;
