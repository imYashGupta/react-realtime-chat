import "./App.css";
import React,{useEffect,useState} from 'react';
import { Route, Switch ,Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import Init from "./pages/Init";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AnimatedSwitch } from "react-router-transition";
import EmailVerification from "./pages/EmailVerification";

import { useDispatch } from 'react-redux';
import { authUser} from "./store/actions";

function App(props) {
    const dispatch = useDispatch();
    const [authToken, setAuthToken] = useState(false);   
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            dispatch(authUser(token)).then(response => {
                setAuthToken(token);
                setLoading(true);
            });
        }else{
            setAuthToken(false);
            setLoading(true);
        }
    }, []);

    

    
    const Routes = () => {
        if(authToken){
            console.log("Landed in Auth")
            return (
                <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
                >
                    <Route path="/"   component={Home} />
                       
                    <Redirect to="/" />
                </AnimatedSwitch>
            )
        }else{
            console.log("Landed in Un-Auth")
            return (
                <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
                >
                    <Route path="/register" component={Register} />
                    <Route path="/email-verification" component={EmailVerification} />
                    <Route path="/login" component={Login} />
                    <Redirect to="/login" />
                </AnimatedSwitch>
            )
        }
    }
    

    return (
        <div>
            {loading && Routes()}
        </div>
    );
}

export default App;
