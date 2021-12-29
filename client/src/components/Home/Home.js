import React from 'react';
import "./Home.css";

const Home = ({ user, setUser }) => {

    const { name } = user

    return (
        <>
            <section id="home">
                <h1>Welcome {name}</h1>
                <button onClick={() => setUser({})}>Log out</button>
            </section>
        </>
    )
}

export default Home;
