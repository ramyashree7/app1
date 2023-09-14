import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

function SignInForm() {
 
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

 
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, [name]: "Invalid email format" });
    } else if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        [name]: " at least 6 characters",
      });
    } else {
      setErrors({ ...errors, [name]: "" }); 
    }

    setState({
      ...state,
      [name]: value,
    });
  };

 
  const handleOnSubmit = (evt) => {
    evt.preventDefault();

   
    const formErrors = {};
    for (const name in state) {
      if (state[name].trim() === "") {
        formErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required`;
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return; 
    }

    const { email, password } = state;
    alert(`You are logged in with email: ${email} and password: ${password}`);


    setState({
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={fab.faFacebookF} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={fab.faGoogle} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={fab.faLinkedinIn} />
          </a>
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          style={{ borderRadius: "20px" }}
        />
        {errors.email && (
          <span
            className="error"
            style={{
              color: "red",
              marginLeft:"-140px",
              fontSize:"16px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              textAlign: "start",
            }}
          >
            {errors.email}
          </span>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          style={{ borderRadius: "20px" }}
        />
        {errors.password && (
          <span
            className="error"
            style={{
              color: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              textAlign: "start",
              marginLeft:"-110px",
              fontSize:"16px",
            }}
          >
            {errors.password}
          </span>
        )}
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
