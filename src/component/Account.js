import React, { useState } from "react";
import "../assets/css/styles.css";
import Example from "../assets/img/img-login.png";

function Account() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };
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
 
    <div className="login">
      <div className="login__content">
        <div className="login__img">
        
          <img src={Example} alt="" />
        </div>

        <div className="login__forms">
          <form  onSubmit={handleOnSubmit}
            action=""
            className={`login__registre ${isSignIn ? "" : "none"}`}
            id="login-in"
          >
            <h1 className="login__title" style={{ color: " #9d48fa" }}>
              Sign In
            </h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
               type="email"
               placeholder="Email"
               name="email"
               value={state.email}
               onChange={handleChange}
               style={{ borderRadius: "30px" }}
               className="login__input" 
               /> {errors.email && (
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
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                onChange={handleChange}
                style={{ borderRadius: "20px" }}
                className="login__input"
              />   {errors.password && (
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
            </div>

            <a href="#" className="login__forgot">
              Forgot password?
            </a>

            <a href="#" className="login__button">
              Sign In
            </a>

            <div>
              <span className="login__account">Don't have an Account ?</span>
              <span className="login__signin" onClick={toggleForm}>
                Sign Up
              </span>
            </div>
          </form>

          <form
            action=""
            className={`login__create ${isSignIn ? "none" : ""}`}
            id="login-up"
          >
            <h1 className="login__title" style={{ color: " #9d48fa" }}>
              Create Account
            </h1>

            <div className="login__box">
              <i className="bx bx-user login__icon"></i>
              <input
                type="text"
                placeholder="Username"
                className="login__input"
              />
            </div>

            <div className="login__box">
              <i className="bx bx-at login__icon"></i>
              <input type="text" placeholder="Email" className="login__input" />
            </div>

            <div className="login__box">
              <i className="bx bx-lock-alt login__icon"></i>
              <input
                type="password"
                placeholder="Password"
                className="login__input"
              />
            </div>

            <a href="#" className="login__button">
              Sign Up
            </a>

            <div>
              <span className="login__account">Already have an Account ?</span>
              <span className="login__signup" onClick={toggleForm}>
                Sign In
              </span>
            </div>

            <div className="login__social">
              <a href="#" className="login__social-icon">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#" className="login__social-icon">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#" className="login__social-icon">
                <i className="bx bxl-google"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
