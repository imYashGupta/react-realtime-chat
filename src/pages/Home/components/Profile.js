/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import moment from 'moment';
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
const Profile = (props) => {
    let {profileData,auth} = props;
    const user = useSelector(state => {
        if(auth){
            return state.auth.user;
        }else{
            return profileData;
        }
    });
    return (
        <div id="contact-information" className="sidebar show">
            <header>
                <span>Profile</span>
                <ul className="list-inline">
                    {
                        auth &&
                        <li className="list-inline-item"  >
                            <a
                                href="#"
                                className="btn btn-outline-light"
                                data-toggle="modal"
                                data-target="#editProfileModal"
                                title="Edit profile"
                                onClick={() => props.toggleEditProfile()}
                            >
                                <i className="mdi mdi-pencil" />
                            </a>
                        </li>
                    }
                    <li className="list-inline-item">
                        <a href="#" 
                         className="btn btn-danger sidebar-close"
                            onClick={() => props.closeProfile()}
                         >
                            <i className="mdi mdi-close" />
                        </a>
                    </li>
                </ul>
            </header>
            <div className="sidebar-body">
                <div className="text-center">
                    <Avatar user={user} size="avatar-xl mb-4"/>
                    <h5 className="mb-1">{user.name}</h5>
                        <small className="text-muted font-italic">Joined On: {moment(user.createdAt).format("DD MMM,YYYY")}</small>
                    <ul
                        className="nav nav-tabs justify-content-center mt-5"
                        id="myTab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                id="home-tab"
                                data-toggle="tab"
                                href="#home"
                                role="tab"
                                aria-controls="home"
                                aria-selected="true"
                            >
                                About
                            </a>
                        </li>
                        {/* <li className="nav-item">
                            <a
                                className="nav-link"
                                id="profile-tab"
                                data-toggle="tab"
                                href="#profile"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                Media
                            </a>
                        </li> */}
                    </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                    <div
                        className="tab-pane fade show active"
                        id="home"
                        role="tabpanel"
                        aria-labelledby="home-tab"
                    >
                        {user?.meta?.about && <p
                            className="text-muted text-center"
                        >
                            {user.meta.about}
                        </p>}
                        <div className="mt-4 mb-4">
                            <h6>Email</h6>
                            <p className="text-primary text-isemail">
                                <a href={'mailto:'+user.email}>{user.email}</a>
                            </p>
                        </div>
                        <div className="mt-4 mb-4">
                            <h6>Phone</h6>
                            <p className="text-muted">+91 {user.phone}</p>
                        </div>
                        {
                            user?.meta?.city &&
                            <div className="mt-4 mb-4">
                                <h6>City</h6>
                                <p className="text-muted">{user.meta.city}</p>
                            </div>
                        }
                        {   
                            user?.meta?.website &&
                            <div className="mt-4 mb-4">
                                <h6>Website</h6>
                                <p>
                                    <a className="can-select" target="_blank" href={'https://'+user.meta.website}>
                                        {user.meta.website}
                                    </a>
                                </p>
                            </div>
                        }
                        {user?.socialMediaHandles && <div
                            className="mt-4 mb-4"
                        >
                            <h6 className="mb-3">Social media accounts</h6>
                            <ul className="list-inline social-links">
                                {user?.socialMediaHandles?.facebook && 
                                <li
                                    className="list-inline-item"
                                >
                                    <a
                                        href={"https://facebook.com/"+user.socialMediaHandles.facebook}
                                        className="btn btn-sm btn-floating btn-facebook"
                                        data-toggle="tooltip"
                                        title="Facebook"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="mdi mdi-facebook" />
                                    </a>
                                </li>}
                                {user?.socialMediaHandles?.twitter && <li
                                    className="list-inline-item"
                                >
                                    <a
                                        href={"https://twitter.com/"+user.socialMediaHandles.twitter}
                                        className="btn btn-sm btn-floating btn-twitter"
                                        data-toggle="tooltip"
                                        title="Twitter"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="mdi mdi-twitter" />
                                    </a>
                                </li>}
                                {user?.socialMediaHandles?.instagram  && <li
                                    className="list-inline-item"
                                >
                                    <a
                                        href={"https://instagram.com/"+user.socialMediaHandles.instagram}
                                        className="btn btn-sm btn-floating btn-instagram"
                                        data-toggle="tooltip"
                                        title="Instagram"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="mdi mdi-instagram" />
                                    </a>
                                </li>}
                                {user?.socialMediaHandles?.linkedin && <li
                                    className="list-inline-item"
                                >
                                    <a
                                        href={"https://linkedin.com/"+user.socialMediaHandles.linkedin}
                                        className="btn btn-sm btn-floating btn-linkedin"
                                        data-toggle="tooltip"
                                        title="Linkedin"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="mdi mdi-linkedin" />
                                    </a>
                                </li>}
                                { user?.socialMediaHandles?.youtube && <li
                                    className="list-inline-item"
                                >
                                    <a
                                        href={"https://youtube.com/"+user.socialMediaHandles.youtube}
                                        className="btn btn-sm btn-floating btn-youtube"
                                        data-toggle="tooltip"
                                        title="Google"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <i className="mdi mdi-youtube" />
                                    </a>
                                </li>}
                            </ul>
                        </div>}
                       
                    </div>
             
                </div>
                <div   className="text-center mt-5"></div>
            </div>
        </div>
    );
};

export default Profile;
