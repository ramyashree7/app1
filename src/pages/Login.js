import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import "./Login.css";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import config from "../config.json";
import "../App2.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Loginpage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isShown, setIsSHown] = useState(false);
  const [valid, setValid] = useState({ email: true, password: true });
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const url = config.url;
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(
        input.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and contain a letter, a number, and a special character";
      isValid = false;
    } else {
      newErrors.password = ""; 
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/user/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        localStorage.setItem("access_token", data.responseData.access_token);
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      } else {
        toast.error(data.responseMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Login failed:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.name === "email") {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(e.target.value)) {
        setValid({ ...valid, email: true });
        setErrors({ ...errors, email: "" });
      } else {
        setValid({ ...valid, email: false });
        setErrors({ ...errors, email: "Email is invalid" });
      }
    }
    if (e.target.name === "password") {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(
          e.target.value
        )
      ) {
        setValid({ ...valid, password: true });
        setErrors({ ...errors, password: "" });
      } else {
        setValid({ ...valid, password: false });
        setErrors({ ...errors, password: "Password is invalid" });
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <MDBContainer className="d-flex justify-content-center">
        <MDBCard style={{ borderRadius: "0.5rem" }}>
          <MDBRow>
            <MDBCol md="7 ">
              <MDBCardBody className="d-flex flex-column">
                <h3
                  className="fw-normal  "
                  style={{
                    textAlign: "center",
                    color: "#35ca7d",
                  }}>
                  <b>Sign in to Account</b>
                </h3>
                <div className="text-center">
                  <IconButton
                    style={{
                      gap: "3",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }}>
                    <FacebookRoundedIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      gap: "3",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }} >
                    <GoogleIcon />
                  </IconButton>
                  <IconButton
                    style={{
                      gap: "3",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }} >
                    <GitHubIcon />
                  </IconButton>
                  <p className="text-black-50 ">or use your email account</p>
                </div>
                <div className="d-flex flex-column  mx-5  justify-content-center  my-0 ">
                  <form onSubmit={handleLogin}>
                    <div className="input1 ">
                      <FormControl
                        sx={{ m: 1, width: "35ch" }}
                        variant="outlined" >
                        <TextField
                          id="outlined-multiline-flexible"
                          label="Email"
                          multiline
                          maxRows={4}
                          value={input.email}
                          type="email"
                          onChange={handleChange}
                          name="email" />
                         {!valid.email && (
                          <span style={{ color: "red" }}>
                            {errors.email}
                          </span>
                        )}
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "35ch" }}
                        variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                          Password
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          value={input.password}
                          onChange={handleChange}
                          name="password"
                          label="Password"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end">
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment> } />
                        {!valid.password && (
                          <span style={{ color: "red" }}>
                            {errors.password}
                          </span>
                        )}
                      </FormControl>
                    </div>
                    <div
                      className="d-flex justify-content-center  py-4 mb-4"
                      color="#35ca7d" >
                      <button
                        type="submit"
                        onSubmit={handleLogin}
                        className="mx-2 px-5 py-2 "
                        size="lg"
                        style={{
                          color: "white",
                          borderRadius: "2rem",
                          backgroundColor: "#35ca7d",
                          border: " 1px solid #35ca7d", }} >
                        LOGIN
                      </button>
                    </div>
                    <div className="show-mobilee">
                      <small>
                        {" "}
                        <p className=" par d-flex justify-content-center  gap-1">
                          Don't have an Account?
                          <Link
                            to="/register"
                            style={{ textDecoration: "none" }} >
                            Register
                          </Link>
                        </p>
                      </small>
                    </div>
                  </form>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <a
                    href="#!"
                    className="small text-muted me-1 "
                    style={{ textDecoration: "none" }} >
                    Terms of use.
                  </a>
                  <a
                    href="#!"
                    className="small text-muted "
                    style={{ textDecoration: "none" }} >
                    &nbsp; Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
            <MDBCol sm="5" className="d-none d-sm-block px-0">
              <MDBCardBody
                className="gradient-custom-2 h-100"
                style={{
                  borderBottomRightRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem", }}>
                <div className="d-flex flex-column  justify-content-center  h-100 mb-4">
                  <div className="text-white px-4 py-4 p-md-5 mx-md-4 ">
                    <h4 className="mb-4">
                      <div className="text-center">
                        <b>Hello, Friend!</b>
                      </div>
                    </h4>
                    <div className="text-center">
                      <p className="small mb-0">
                        Fill up personal information and
                        <br />
                        start journey with us.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-4">
                    <Link
                      to="/register"
                      style={{ color: "white", textDecoration: "none" }} >
                      {" "}
                      <button
                        className="mx-2 py-2 px-5"
                        size="lg"
                        style={{
                          color: "white",
                          borderRadius: "2rem",
                          backgroundColor: "transparent",
                          border: "1px solid white",
                        }}  >
                        SIGN UP
                      </button>
                    </Link>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}
export default Loginpage;
