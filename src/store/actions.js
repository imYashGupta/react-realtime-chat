export const INIT = "INIT";
export const SIGNUP = "SIGNUP";
export const LOGIN  = "LOGIN";
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";

export const changeName = (name) => {
    return {type:INIT,name:name}
}