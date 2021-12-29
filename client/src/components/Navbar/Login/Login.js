import React from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {

    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState({
        email : "",
        password : ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setLoginUser({
            ...loginUser,
            [name] : value
        })
    }

    const login = (e) => {
        e.preventDefault();

        const { email, password } = loginUser;

        if(email && password){
            axios.post("http://127.0.0.1:9002/login", loginUser)
            .then((res) => {
                window.alert(res.data.message);
                setUser(res.data.user);
                if(res.data.message === "User not registered"){
                    navigate("/register");
                }
                else{
                    navigate("/");
                }
            })
        }
        else{
            window.alert("invalid input");
        }

    }

    return (
        <>
            <section id="login">
                <h1 className='l-h'>Login</h1>
                <form id='l-form' method='post'>
                    <input type="email" name="email" id="email" value={loginUser.email} onChange={handleChange} placeholder="Enter your email id" />
                    <input type="password" name="password" id="password" value={loginUser.password} onChange={handleChange} placeholder="Enter your password" autoComplete='off' />

                    <button className='l-btn' onClick={login}>Login</button>
                    <h1>OR</h1>
                    <button className='r-btn' onClick={() => navigate("/register")}>Register</button>
                </form>
            </section>
        </>
    )
}

export default Login;
