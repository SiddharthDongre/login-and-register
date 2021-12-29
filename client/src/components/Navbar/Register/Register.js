import React from 'react';
import "./Register.css";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [registerUser, setRegisterUser] = useState({
        name : "",
        email : "",
        password : "",
        reEnterPassword : ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setRegisterUser({
            ...registerUser,
            [name] : value
        })
    }

    const register = (e) => {
        e.preventDefault();

        const { name, email, password, reEnterPassword } = registerUser;

        if(name && email && password && password === reEnterPassword){
            axios.post("http://127.0.0.1:9002/register", registerUser)
            .then((res) => {
                alert(res.data.message);
                navigate("/login");
            });
        }
        else if (password !== reEnterPassword){
            alert("Password did not matched");
        }
        else {
            alert("Invalid Input");
        }
    }

    return (
        <>
            <section id="register">
                <h1 className='r-h'>Register</h1>
                <form id='r-form' method="post">
                    <input type="text" name='name' id='name' value={registerUser.name} onChange={handleChange} placeholder='Enter your name' />
                    <input type="email" name='email' id='email' value={registerUser.email} onChange={handleChange} placeholder='Enter your email id' />
                    <input type="password" name="password" id="password" value={registerUser.password} onChange={handleChange} autoComplete='off' placeholder='Enter your password' />
                    <input type="password" name="reEnterPassword" id="reEnterPassword" value={registerUser.reEnterPassword} onChange={handleChange} autoComplete='off' placeholder='Re-enter your password ' />

                    <button className='r-btn' onClick={register}>Register</button>
                    <h1>OR</h1>
                    <button className='l-btn' onClick={() => navigate("/login")}>Login</button>
                </form>
            </section>
        </>
    )
}

export default Register;
