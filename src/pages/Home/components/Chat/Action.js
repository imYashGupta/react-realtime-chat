import React, { useState } from "react";

const Action = (props) => {
    const [text, setText] = useState("");

    return (
        <div className="chat-footer">
            <form>
                <div>
                    <button
                        className="btn btn-light mr-3 d-none d-sm-inline-block"
                        data-toggle="tooltip"
                        type="button"
                        data-original-title="Emoji"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-smile"
                        >
                            <circle cx={12} cy={12} r={10} />
                            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                            <line x1={9} y1={9} x2="9.01" y2={9} />
                            <line x1={15} y1={9} x2="15.01" y2={9} />
                        </svg>
                    </button>
                    <button
                        className="btn btn-danger mr-3 d-inline d-sm-none btn-close-chat "
                        data-toggle="tooltip"
                        type="button"
                        data-original-title="Emoji"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-arrow-left"
                        >
                            <line x1={19} y1={12} x2={5} y2={12} />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                </div>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write a message."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    emoji={true ? 1 : 0}
                />
                <div className="form-buttons">
                    <div className="dropdown">
                        <button
                            className="btn btn-light d-none d-sm-inline-block"
                            data-toggle="dropdown"
                            type="button"
                            data-original-title="Add files"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-paperclip"
                            >
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                            </svg>
                        </button>
                        <div className="dropdown-menu dropdown-menu-left mb-4 mr-3">
                            <div className="dropdown-item cursur-pointer" onClick={() => props.openFilePicker('image/*','image')}>
                                <i className="mdi mdi-image" /> Image
                            </div>
                            <div
                                className="dropdown-item cursur-pointer"
                                data-toggle="modal"
                                onClick={() => props.openFilePicker('video/*','video')}
                            >
                                <i className="mdi mdi-video" /> Video
                            </div>
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={(e) => {
                            e.preventDefault();
                            props.handleSendMessage(text);
                            setText("");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-send"
                        >
                            <line x1={22} y1={2} x2={11} y2={13} />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                    <input ref={props.fileInputRef} onChange={(e) => props.handleMediaFiles(e)} type="file" id="media" className="d-none"   multiple />
                </div>
            </form>
        </div>
    );
};

export default Action;
