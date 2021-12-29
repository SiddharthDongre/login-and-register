import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar.js';
import Home from './components/Home/Home.js';
import Login from './components/Navbar/Login/Login.js';
import Register from './components/Navbar/Register/Register.js';
import Footer from './components/Footer/Footer.js';

function App() {

  const [user, setUser] = useState({});

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={user && user._id ? <Home user={user} setUser={setUser} />  : <Login setUser={setUser} />}> </Route>
          <Route path="/login" element={<Login setUser={setUser} />}> </Route>
          <Route path="/register" element={<Register />}> </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
