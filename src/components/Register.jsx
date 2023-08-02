import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
 
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  //to store value in localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));
    navigate("/login");
   
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          name="name"
          value={input.name}
          onChange={(e) =>
            setInput({ ...input, [e.target.name]: e.target.value })
          }
          id="name"
          placeholder="Full Name"
        />
        <label htmlFor="email">Email</label>
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
        <button type="submit" onSubmit={handleSubmit}>
          Sign Up
        </button>
      </form>
      <p className="link-btn">Already have an account?
      <Link to="/login"> Login here.</Link></p>
    </div>
  );
}
export default Register;
