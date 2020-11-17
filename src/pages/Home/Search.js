/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Axios from "../../axios";
import Avatar from "./components/Avatar";
import $ from 'jquery';
const Search = (props) => {
    const [users, setUsers] = useState([]);

    const handleSearch = (text) => {
        Axios.get("/chat/users?name=" + text)
        .then((response) => {              
            setUsers(response.data.users);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    return (
        <div id="friends" className={"sidebar"}>
            <header>
                <span>Search</span>
                <ul className="list-inline">
                    <li
                        className="list-inline-item"
                        data-toggle="tooltip"
                        data-original-title="Add friends"
                    >
                        <a
                            className="btn btn-outline-light"
                            href="#"
                            data-toggle="modal"
                            data-target="#addFriends"
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
                                className="feather feather-user-plus"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                <circle cx="8.5" cy={7} r={4} />
                                <line x1={20} y1={8} x2={20} y2={14} />
                                <line x1={23} y1={11} x2={17} y2={11} />
                            </svg>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="#" className="btn btn-danger sidebar-close">
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
                                className="feather feather-x"
                            >
                                <line x1={18} y1={6} x2={6} y2={18} />
                                <line x1={6} y1={6} x2={18} y2={18} />
                            </svg>
                        </a>
                    </li>
                </ul>
            </header>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)} 
                />
            </form>
            <div
                className="sidebar-body"
                tabIndex={3}
            >
                <p>Found {users.length} People</p>
                <div>
                    <ul className="list-group list-group-flush">
                        {
                            users.map(user => {
                             
                                return (
                                    <li className="list-group-item" key={user._id}>
                                        <div>
                                            <Avatar user={user}/>
                                        </div>
                                        <div className="users-list-body">
                                            <div className={user?.about===undefined && "justify-content-center"}>
                                                <h5>{user.name}</h5>
                                                <p>{user?.about}</p>
                                            </div>
                                            <div className="users-list-action">
                                                <div className="action-toggle">
                                                    <div className="dropdown">
                                                        <a data-toggle="dropdown" href="#">
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
                                                                className="feather feather-more-horizontal"
                                                            >
                                                                <circle
                                                                    cx={12}
                                                                    cy={12}
                                                                    r={1}
                                                                />
                                                                <circle
                                                                    cx={19}
                                                                    cy={12}
                                                                    r={1}
                                                                />
                                                                <circle
                                                                    cx={5}
                                                                    cy={12}
                                                                    r={1}
                                                                />
                                                            </svg>
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-right">
                                                            <a
                                                                href="#"
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    $(".body-plate").hide();
                                                                    $("#friends").removeClass("show");
                                                                    props.handleOpenChatWith(user)
                                                                }}
                                                                className="dropdown-item"
                                                            >
                                                                New chat
                                                            </a>
                                                            <a
                                                                href="#"
                                                                data-navigation-target="contact-information"
                                                                className="dropdown-item"
                                                            >
                                                                Profile
                                                            </a>
                                                            <div className="dropdown-divider" />
                                                            <a
                                                                href="#"
                                                                className="dropdown-item text-danger"
                                                            >
                                                                Block
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                )
                            })
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search;
