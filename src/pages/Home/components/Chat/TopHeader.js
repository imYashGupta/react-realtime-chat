/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Avatar from "../Avatar";
import "./TopHeader.css"
const TopHeader = (props) => {
    const { user } = props;
    return (
        <div className="chat-header">
            <div className="chat-header-user">
                    <Avatar user={user} size="avatar-lg"/>
                <div>
                    <h5>{user.name}</h5>
                    <small className="text-muted">
                        <i>Online</i>
                    </small>
                </div>
            </div>
            <div className="chat-header-action mt-2">
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a
                            href="#"
                            className="btn btn-light"
                            data-toggle="dropdown"
                        >
                            <i className="mdi mdi-dots-vertical" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a
                                href="#"
                                data-navigation-target="contact-information"
                                className="dropdown-item"
                                onClick={() => props.handleOpenProfile(user)}
                            >
                                Profile
                            </a>
                            <a href="#" className="dropdown-item">
                                Add to archive
                            </a>
                            <a href="#" className="dropdown-item">
                                Delete
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item">
                                Block
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TopHeader;
