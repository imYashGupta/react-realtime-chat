import React from "react";

const Header = (props) => {
    const {user} = props;
    return (
        <header className="main-header">
            <div id="logo">
                <a href="#">
                    <img src="dist/media/img/logo.png" alt="logo" />
                </a>
            </div>
            <div className="header-nav">
                <ul className="nav">
                    <li>
                        <a
                            href="#"
                            onClick={() => props.handleOpenProfile(user,true)}
                            data-navigation-target="contact-information"
                        >
                            Profile
                        </a>
                    </li>
                    <li>
                        <a href="#" data-navigation-target="friends">
                            Friends
                        </a>
                    </li>
                    <li>
                        <a href="#" data-navigation-target="favorites">
                            Favorites
                        </a>
                    </li>
                    <li>
                        <a href="#" data-navigation-target="archived">
                            Archived
                        </a>
                    </li>
                </ul>
            </div>
            <div className="header-right">
                <div className="navbar-toggler">
                    <a href="#">
                        <i data-feather="menu"></i>
                    </a>
                </div>
                <div className="dropdown">
                    <a href="#" data-toggle="dropdown">
                        <span className="mr-2 d-none d-sm-inline-block">
                            {user.name}
                        </span>
                        <figure className="avatar">
                            {user?.displayPicture ? (
                                <img
                                    src={user.displayPicture}
                                    className="rounded-circle"
                                    alt="display_picture"
                                />
                            ) : (
                                <span
                                    className={"avatar-title bg-success rounded-circle "+user.meta.color[0]}
                                >
                                    {user.name[0]}
                                </span>
                            )}
                        </figure>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a
                            href="#"
                            className="dropdown-item"
                            data-navigation-target="contact-information"
                            onClick={() => props.handleOpenProfile(user,true)}
                        >
                            Profile
                        </a>
                        <a
                            href="#"
                            className="dropdown-item"
                            data-toggle="modal"
                            data-target="#settingModal"
                        >
                            Settings
                        </a>
                        <div className="dropdown-divider"></div>
                        <a
                            href="#"
                            className="dropdown-item text-danger"
                           onClick={() => props.handlelogout()}
                        >
                            Logout
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
