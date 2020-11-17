import React from "react";
const NoChat = () => {
    return (
         
                <div className="no-message-container">
                    <div className="row mb-5">
                        <div className="col-md-4 offset-md-4">
                            <img
                                src="/dist/media/svg/undraw_empty_xct9.svg"
                                className="img-fluid no-drag"
                                alt="no-chat"
                            />
                        </div>
                    </div>
                    <p className="lead">Select a chat to read messages</p>
                </div>
        
    );
};

export default NoChat;
