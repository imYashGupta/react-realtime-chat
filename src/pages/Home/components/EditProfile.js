import React, { useState,useEffect } from "react";
// import { useInput } from "./../../../input-hook";
import {set,get} from 'lodash';
import Axios from '../../../axios'
import { updateUser } from "../../../store/actions";
import { useDispatch } from "react-redux";

const EditProfile = (props) => {
    const {user:data,toggleEditProfile} = props;
    const dispatch = useDispatch();
    
    
    const requiredFiller = ["name","phone","meta.city","meta.website","meta.about","socialMediaHandles.facebook","socialMediaHandles.twitter","socialMediaHandles.instagram","socialMediaHandles.linkedin","socialMediaHandles.youtube"];
    for(let i = 0; i < requiredFiller.length; i++){
        if(get(data,requiredFiller[i])===undefined){
            set(data,requiredFiller[i],"");
        }
    }
    const [user, setUser] = useState(data); 
    const [tab, setTab] = useState(1); //1=basicDeatils,2=about,3=socialhandles
    const [loading, setLoading] = useState(false);
    const [displayPicture, setDisplayPicture] = useState(false);

    const handleUpdateFields = (name,value) => {
        const userObj = {...user};
        // userObj[name] = value;s
        set(userObj,name,value);
        setUser(userObj);
    }

    const handlePreviewImage = (file) => {
        setDisplayPicture(file);
    }

    const saveBasicDetails = () => {
        setLoading(true);
        let formData = new FormData();
        formData.append("name",user.name);
        formData.append("phone",user.phone);
        formData.append("city",user.meta.city);
        formData.append("website",user.meta.website);
        if(displayPicture!==false){
            formData.append("avatar",displayPicture);
        }
        Axios.post("user/update",formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            setLoading(false);
            dispatch(updateUser(response.data));
            console.log(response)
        }).catch(err =>{ 
            setLoading(false);
            //TODO add a better error feedback
            console.log(err);
        })    
    }

    const saveAbout = () => {
        setLoading(true);
        Axios.post("/user/about",{
            about:user?.meta?.about 
        }).then(response => {
            setLoading(false);
            dispatch(updateUser(response.data));
            console.log(response);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    }

    const saveSocials = () => {
        setLoading(true);
        Axios.post("/user/socials",{
            facebook:user.socialMediaHandles.facebook,
            twitter:user.socialMediaHandles.twitter,
            instagram:user.socialMediaHandles.instagram,
            linkedin:user.socialMediaHandles.linkedin,
            youtube:user.socialMediaHandles.youtube,
        }).then(response => {
            setLoading(false);
            dispatch(updateUser(response.data));
            console.log(response);
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    const handleSave = () => {
        console.log(tab)
        switch (tab) {
            case 1:
                saveBasicDetails();
                break;
            case 2:
                saveAbout();
                break;
            case 3:
                saveSocials();
                break;
            default:
                return false;
                break;
        }
    }
    
    return (
        <div
            className="modal fade"
            id="editProfileModal"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
        >
            <div
                className="modal-dialog modal-dialog-centered modal-dialog-zoom"
                role="document"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2 mr-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg> Edit
                            Profile
                        </h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={() => toggleEditProfile()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    data-toggle="tab"
                                    href="#personal"
                                    role="tab"
                                    aria-controls="personal"
                                    aria-selected="true"
                                    onClick={() => setTab(1)}
                                >
                                    Personal
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#about"
                                    role="tab"
                                    aria-controls="about"
                                    aria-selected="false"
                                    onClick={() => setTab(2)}

                                >
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    data-toggle="tab"
                                    href="#social-links"
                                    role="tab"
                                    aria-controls="social-links"
                                    aria-selected="false"
                                    onClick={() => setTab(3)}
                                >
                                    Social Links
                                </a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div
                                className="tab-pane show active"
                                id="personal"
                                role="tabpanel"
                            >
                                <form>
                                    <div className="form-group">
                                        <label
                                            htmlFor="fullname"
                                            className="col-form-label"
                                        >
                                            Fullname
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullname"
                                                value={user.name}
                                                onChange={(e) => handleUpdateFields('name',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-form-label">
                                            Avatar
                                        </label>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <figure className="avatar mr-3 item-rtl">
                                                    <img
                                                        src={displayPicture===false ? user.displayPicture : URL.createObjectURL(displayPicture)}
                                                        className="rounded-circle"
                                                        alt="user-current"
                                                    />
                                                </figure>
                                            </div>
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    className="custom-file-input"
                                                    id="customFile"
                                                    onChange={(e) => {
                                                        if(e.target.files.length > 0) {
                                                            handlePreviewImage(e.target.files[0])
                                                        }
                                                        else{
                                                            setDisplayPicture(false);
                                                        }
                                                    }}
                                                />
                                                <label
                                                    className="custom-file-label"
                                                    htmlFor="customFile"
                                                >
                                                    Choose file
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="city"
                                            className="col-form-label"
                                        >
                                            City
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="city"
                                                placeholder="Ex: Columbia"
                                                value={user?.meta?.city}
                                                onChange={(e) => handleUpdateFields('meta.city',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="phone"
                                            className="col-form-label"
                                        >
                                            Phone
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="(555) 555 55 55"
                                                value={user.phone}
                                                onChange={(e) => handleUpdateFields('phone',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label
                                            htmlFor="website"
                                            className="col-form-label"
                                        >
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="website"
                                            placeholder="https://"
                                            value={user?.meta?.website}
                                            onChange={(e) => handleUpdateFields('meta.website',e.target.value)}

                                        />
                                    </div>
                                    
                                </form>
                            </div>
                            <div
                                className="tab-pane"
                                id="about"
                                role="tabpanel"
                            >
                                <form>
                                    <div className="form-group">
                                        <label
                                            htmlFor="about-text"
                                            className="col-form-label"
                                        >
                                            Write a few words that describe you
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="about-text"
                                            value={user?.meta.about}
                                            onChange={(e) => handleUpdateFields('meta.about',e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div
                                className="tab-pane"
                                id="social-links"
                                role="tabpanel"
                            >
                                <form>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                value={user?.socialMediaHandles?.facebook}
                                                onChange={(e) => handleUpdateFields('socialMediaHandles.facebook',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-facebook">
                                                    <i className="mdi mdi-facebook" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                value={user?.socialMediaHandles?.twitter}
                                                onChange={(e) => handleUpdateFields('socialMediaHandles.twitter',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-twitter">
                                                    <i className="mdi mdi-twitter" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                value={user?.socialMediaHandles?.instagram}
                                                onChange={(e) => handleUpdateFields('socialMediaHandles.instagram',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-instagram">
                                                    <i className="mdi mdi-instagram" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                value={user?.socialMediaHandles?.linkedin}
                                                onChange={(e) => handleUpdateFields('socialMediaHandles.linkedin',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-linkedin">
                                                    <i className="mdi mdi-linkedin" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Username"
                                                value={user?.socialMediaHandles?.youtube}
                                                onChange={(e) => handleUpdateFields('socialMediaHandles.youtube',e.target.value)}
                                            />
                                            <div className="input-group-append">
                                                <span className="input-group-text bg-youtube">
                                                    <i className="mdi mdi-youtube" />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                   
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={() => handleSave()} type="button" className="btn btn-primary">
                            Save   {loading && <span className="spinner-grow spinner-grow-sm ml-1" role="status" aria-hidden="true"></span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
