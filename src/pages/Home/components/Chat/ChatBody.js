import React, { useEffect } from "react";
import Auxiliary from "../../../../Auxiliary";
import ActionMedia from "./ActionMedia";
import Message from "./Message";

const ChatBody = (props) => {
    const { chat, user } = props;
    const messages = [...chat.messages];
    messages.reverse();

    return (
        <Auxiliary>
            <div
                className="chat-body"
                tabIndex={1}
                style={{ overflow: "auto", outline: "none" }}
            >
                {chat?.media ? (
                    <ActionMedia files={chat.media} />
                ) : (
                    <div
                        className="messages"
                        style={{
                            overflow: "auto",
                            display: "flex",
                            flexDirection: " column-reverse",
                            height: "100%",
                        }}
                    >
                        {messages.map((message) => (
                            <Message
                                key={message._id}
                                message={message}
                                outgoing={user._id !== message.to}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Auxiliary>
    );
};

export default ChatBody;
