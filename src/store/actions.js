import Message from "../pages/Home/components/Chat/Message";
import Axios from "./../axios";

export const INIT = "INIT";
export const REGISTER = "SIGNUP";
export const LOGIN  = "LOGIN";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const ADD_MESSAGE = 'SEND_MESSAGE';
export const UPDATE_USER = "UPDATE_USER";
export const ADD_MEDIA = "ADD_MEDIA";

export const changeName = (name) => {
    return {type:INIT,name:name}
}



export const registerUser = (data) => {
    // console.log(data);
    return async dispatch => {
        return new Promise((resolve,reject) => {
            Axios.put("auth/register",data).then(response => {
                dispatch({type:REGISTER,data:true});
                resolve(response)
            }).catch(error => {
               reject(error)
            })
        })
    }
}

export const loginUser = (data) => {
    
    return async dispatch => {
        return new Promise((resolve,reject) => {
            Axios.post("auth/login",data).then(response => {
                dispatch({type:LOGIN,data:response.data});
                resolve(response)
            }).catch(error => {
               reject(error)
            })
        })
    }
}

export const authUser = (token) => {
    return async dispatch => {
        return new Promise((resolve,reject) => {
            Axios.post("auth/authenticate",{},{
                headers:{
                    "Authorization":"Bearer "+token
                }
            }).then(response => {
                resolve(response)
                dispatch({type:AUTH,data:response.data});
            }).catch(error => {
                reject(error);
            })
        })
    }
}

export const addMessage = (message) => dispatch =>{
    dispatch({type:ADD_MESSAGE,data:message})
    return Promise.resolve();
}

export const updateUser = (user) => {
    return {type:UPDATE_USER,data:user}
}

export const addFilesInChat = (userId,files) => {
    return {type:ADD_MEDIA,userId:userId,files:files};
}

export const logout = () => {
    localStorage.removeItem("token");
    return {type:LOGOUT,data:true}
}