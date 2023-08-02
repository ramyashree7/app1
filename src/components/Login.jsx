import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
function Login() {
  const navigate  = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin=(e)=>{
  e.preventDefault();
  const loggeduser=JSON.parse(localStorage.getItem("user"));
  if(
    input.email===loggeduser.email&& input.password===loggeduser.password)
    {
        localStorage.setItem("loggedin",true);
        navigate("/");
    }
    else{
        alert("wrong email or passwor");
    }
  
  }
 

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">email</label>
        <input
          name="email"
          value={input.email}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          value={input.password}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          type="password"
          placeholder="********"
          id="password"
        />
        <button type="submit" onSubmit={handleLogin}>
          Log In
        </button>
      </form>
      <p className="link-btn">Don't have an account?
      <Link to="/register"> Register here.</Link></p>
    </div>
  );
}
export default Login;
