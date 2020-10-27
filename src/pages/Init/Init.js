import React from 'react'
import { Link } from "react-router-dom";

const init = () => {
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
            <h1>Init</h1>
            
        </div>
    )
}

export default init;