import React, { useEffect, useState } from "react";
import $ from "jquery";
import socketIOClient from "socket.io-client";
import {socketEndPoint} from "./../../util/constants"
import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { logout,addMessage } from "../../store/actions";
import "./Home.css";
import ActiveChats from "./components/Chat/ActiveChats";
import Search from "./Search";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Chat from "./components/Chat/Chat";

const Home = (props) => {

    const dispatch = useDispatch();
    const [chat, setChat] = useState(false);
    const user = useSelector(state => state.auth.user);
    const activeChats = useSelector(state => state.auth.activeChats);
    const [profile, setProfile] = useState(false);
    const [showEditProfile, setShowEditProfile] = useState(false);

    useEffect(() => {
        console.log('New value', activeChats) 
        const active=activeChats.find(c => c.id===chat.id);
        if(active){
            setChat(active);
        }
        return () => {
           console.log('Prev value', activeChats) 
        }
   
      }, [activeChats])

    useEffect(() => {
        $("body").removeClass("form-membership");
    }, []);

    useEffect(() => {
        const socket = socketIOClient(socketEndPoint);
        socket.on(user._id,data => {
            if(data.type==="NEW_MESSAGE"){
                console.log(data);
                dispatch(addMessage(data.message));
            }
        })
    },[]);

    const handleLogout = () => {
        dispatch(logout());
        window.location = "/login";
    };

    const handleOpenChatWith = (u) => {
        if(u._id===chat.id) return false;
        const chats=activeChats.find(c => c.id===u._id);
        if(chats===undefined){
            setChat({
                id:u._id,
                updatedAt: Date.now(),
                messages:[],
                user:u,
                _id:user._id+" and "+u._id
            })
        }else{
            setChat(chats);
        }
    }

    const handleOpenProfile = (userData) => {
        setProfile(userData);
    }

    const handleCloseProfile = () => {
        setProfile(false);
    }

    const handleToggleEditProfile = () => {
        setShowEditProfile(status => !status);
    }

    return (
        <div>
            <div className="body-plate" onClick={() => {
                handleCloseProfile();
            }}></div>
            {showEditProfile && <EditProfile user={user} toggleEditProfile={handleToggleEditProfile}/>}
            <Header user={user} handlelogout={handleLogout} handleOpenProfile={handleOpenProfile} />
            <div className="layout">
                <div className="content">
                    <Search handleOpenChatWith={handleOpenChatWith} user={user}/>
                    <ActiveChats activeChats={activeChats} handleOpenChatWith={handleOpenChatWith}/>
                    {profile && <Profile profileData={profile} auth={profile._id===user._id} closeProfile={handleCloseProfile} toggleEditProfile={handleToggleEditProfile}/>}
                        <Chat 
                        chat={chat}  
                        user={user}
                        handleOpenProfile={handleOpenProfile}
                        />
                </div>
            </div>
        </div>
    );
};

export default Home;
