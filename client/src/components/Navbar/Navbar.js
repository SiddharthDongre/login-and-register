import React from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <>
            <section id="navbar">
                <div className="logo" onClick={() => navigate("/")}>Home</div>
                <div className="login" onClick={() => navigate("/login")}>Login</div>
                <div className="register" onClick={() => navigate("/register")}>Register</div>
            </section>
        </>
    )
}

export default Navbar;
