import React,{useEffect} from 'react';
import socketIOClient from "socket.io-client";
import {socketEndPoint} from "../util/constants"
const EmailVerification  = (props) => {
    useEffect(() => {
        const email = atob(localStorage.getItem("status"));
        const socket = socketIOClient(socketEndPoint);
        socket.on(email,data => {
            if(data.type==="EMAIL_VERIFIED" && data.data===true){
                props.history.push("/");
            }
        })
    })

    return (
        <div className="body-form-membership">
            <div className="form-wrapper">
                <div className="logo">
                    <img src="dist/media/img/small-logo.png" alt="logo" />
                </div>
                <h5>Please verify your email</h5>
                <p className="text-muted">
                    We've emailed you a link to verify your account,by clicking
                    the link you will be logged in automatically.
                </p>
                <div className="spinner-grow" role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                <hr />
                <p className="text-muted">Did'nt recived the email?</p>
                <a href="register" className="btn btn-sm btn-outline-light mr-1">
                    Resend email
                </a>
            </div>
        </div>
    );
}
export default EmailVerification;