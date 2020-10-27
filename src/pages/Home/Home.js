import React from 'react'
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import { changeName } from "../../store/actions";
const Home = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    console.log(user)
    const changeNameHandler = () => {
        console.log("clicked")
        dispatch(changeName("Yash garg"));
    }
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Init</Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
            </ul>
            <h1>Home: Hello { user }</h1>
            <button onClick={changeNameHandler}>Change name</button>
        </div>
    );
}

export default Home;