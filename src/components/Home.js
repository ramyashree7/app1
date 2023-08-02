import React from 'react'
import {Link, useNavigate} from "react-router-dom"

function Home() {
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("loggedin");
    navigate("/login");
  }
  return (
    <div>
        <h1>Home page</h1>
        <p>
            <Link to="/login">Login</Link>
        </p>
        <p>
            <Link to="/register">Register</Link>
        </p>
        <button onClick={handleLogout}
        type='button'>Logout</button>
    </div>
  )
}

export default Home