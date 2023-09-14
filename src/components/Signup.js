import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";

import "@fortawesome/fontawesome-svg-core/styles.css";

function SignUpForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (evt) => {
    const { name, value } = evt.target;

    if (name === "name" && value.trim() === "") {
      setErrors({ ...errors, [name]: "Name is required" });
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, [name]: "Invalid email format" });
    } else if (name === "password" && value.length < 6) {
      setErrors({
        ...errors,
        [name]: "Password must be at least 6 characters",
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
        formErrors[name] = `${name} is required`;
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const { name, email, password } = state;
    // alert(
    //   `You are signed up with name: ${name}, email: ${email}, and password: ${password}`
    // );

    setState({
      name: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
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
        <span>or use your email for registration</span>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
          style={{ borderRadius: "20px" }}
        />
        {errors.name && (
          <span
            className="error"
            style={{
              color: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              textAlign: "start",
              marginLeft: "-135px",
              fontSize: "16px",
            }}
          >
            {errors.name}
          </span>
        )}
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          style={{ borderRadius: "20px" }}
        />{" "}
        {errors.email && (
          <span
            className="error"
            style={{
              color: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              textAlign: "start",
              marginLeft: "-140px",
              fontSize: "16px",
            }}
          >
            {errors.email}
          </span>
        )}
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          style={{ borderRadius: "20px" }}
        />{" "}
        {errors.password && (
          <span
            className="error"
            style={{
              color: "red",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "start",
              textAlign: "start",
              marginLeft: "-110px",
              fontSize: "16px",
            }}
          >
            {errors.password}
          </span>
        )}
        <button style={{marginTop:"20px"}}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
