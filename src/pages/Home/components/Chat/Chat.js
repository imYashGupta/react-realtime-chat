import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Auxiliary from "../../../../Auxiliary";
import instance from "../../../../axios";
import { addFilesInChat, addMessage } from "../../../../store/actions";
import Action from "./Action";
import ChatBody from "./ChatBody";
import NoChat from "./NoChat";
import TopHeader from "./TopHeader";

const Chat = (props) => {
    const { chat, handleOpenProfile, user } = props;
    const [files, setFiles] = useState(false);
    
    const fileInputRef = useRef();
    const dispatch = useDispatch();


    const handleSendMessage = (text,file) => {
        
        let formData = new FormData();
        if(text!==undefined){
            formData.append("text",text);
        }
        formData.append("to",chat.id);
        if(file){
            formData.append("attachment",file);
        }
        instance.post("chat/send",formData,{
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        }).then(response => {
            dispatch(addMessage(response.data))
        }).catch(error => {
            console.log(error);
        });
    
    }

    const openFilePicker = (type) => {
        fileInputRef.current.setAttribute("accept",type);
        fileInputRef.current.click();
    }   

    const handleMediaFiles = (event) => {
        setFiles(event.target.files);
        dispatch(addFilesInChat(chat.id,event.target.files));
    }

    return (
        <div className="chat">
            {chat ? (
                <Auxiliary>
                    <TopHeader
                        user={chat?.user}
                        handleOpenProfile={handleOpenProfile}
                    />
                    <ChatBody 
                        chat={chat} 
                        user={user} 
                    />
                    {!chat?.media && <Action 
                        handleSendMessage={handleSendMessage} 
                        handleMediaFiles={handleMediaFiles}
                        openFilePicker={openFilePicker}
                        fileInputRef={fileInputRef}
                    />}
                </Auxiliary>
            ) : (
                <NoChat />
            )}
        </div>
    );
};

export default Chat;
