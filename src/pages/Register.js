import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./Login.css"
import EmailIcon from "@mui/icons-material/Email";
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

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Registerpage() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isShown, setIsSHown] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState({ email: true, password: true });
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };

  // const isValidEmail = (email) => {
  //   // Regular expression to validate email format
  //   const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //   return emailPattern.test(email);
  // };
  const navigate = useNavigate();
  const url = config.url;
  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Validate email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Validate password
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/.test(
        input.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters long and contain a letter, a number, and a special character";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
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
      } else {
        setValid({ ...valid, password: false });
        setErrors({ ...errors, password: "Password is invalid" });
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${url}/user/sign_up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (data.responseCode === 200) {
        toast.success("Register successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/login");
      } else {
        toast.error(data.responseMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      toast.error("Registration failed:", error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <MDBContainer className="d-flex justify-content-center">
 
        <MDBCard style={{ borderRadius: "0.5rem" }}>
          <MDBRow className="g-0">
            <MDBCol sm="6" className="d-none d-sm-block px-0">
              <MDBCardBody
                className="gradient-custom-2 h-100"
                style={{
                  borderBottomLeftRadius: "0.5rem",
                  borderTopLeftRadius: "0.5rem",
                }}
              >
                <div className="d-flex flex-column  justify-content-center  h-100 mb-4">
                  <div className="text-white px-4 py-4 p-md-5 mx-md-4 ">
                    <h4 className="mb-4">
                      <div className="text-center">
                        <b>Hello, Friend!</b>
                      </div>
                    </h4>
                    <div className="text-center">
                      <p className="small mb-0">
                        Alredy Have an Account?
                        <br />
                        Please sign in
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-4 ">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      {" "}
                      <button
                        className="mx-2 py-2 px-5"
                        size="lg"
                        style={{
                          color: "white",
                          borderRadius: "2rem",
                          backgroundColor: "transparent",
                          border: "1px solid white",
                        }}
                      >
                        SIGN IN
                      </button>
                    </Link>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <h3
                  className="fw-normal "
                  style={{
                    textAlign: "center",
                    color: "#35ca7d",
                  }}
                >
                  <b>Sign up to Account</b>
                </h3>
                <div className="text-center">
                  <IconButton
                    style={{
                      gap: "5",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }}
                  >
                    <FacebookRoundedIcon />
                  </IconButton>

                  <IconButton
                    style={{
                      gap: "5",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }}
                  >
                    <GoogleIcon />
                  </IconButton>

                  <IconButton
                    style={{
                      gap: "5",
                      backgroundColor: "#eeeeee",
                      margin: "10px",
                    }}
                  >
                    <GitHubIcon />
                  </IconButton>

                  <p className="text-black-50">or use your email account</p>
                </div>
                <div className="d-flex flex-column  mx-5  justify-content-center  my-0  ">
                  <form onSubmit={handleSubmit}>
                    <div className="input1">
                    <FormControl
                        sx={{ m: 1, width: "35ch" }}
                        variant="outlined" >
                        <InputLabel htmlFor="outlined-adornment-password">
                          Email
                        </InputLabel>
                        <OutlinedInput
                          id="outlined-multiline-flexible"
                          label="Email"
                          value={input.email}
                          type="email"
                          onChange={handleChange}
                          name="email"
                          endAdornment={
                            <InputAdornment position="end">
                              {" "}
                              <EmailIcon />
                            </InputAdornment> } />
                        {!valid.email && (
                          <span style={{ color: "red" }}>{errors.email}</span>
                        )}
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "35ch" }}
                        variant="outlined"
                        maxRows={4}
                      >
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
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                         {!valid.password && (
                          <span style={{ color: "red" }}>
                            {errors.password}
                          </span>
                        )}
                      </FormControl>

                      <div
                        className="d-flex justify-content-center  py-4 "
                        color="#35ca7d"
                      >
                        <button
                          type="submit"
                          disabled={!valid.email ? true : false}
                          className="mx-2 px-5 py-2"
                          size="lg"
                          style={{
                            color: "white",
                            borderRadius: "2rem",
                            backgroundColor: "#35ca7d",
                            border: "1px solid #35ca7d",
                          }}
                        >
                          SIGN UP
                        </button>
                      </div>
                      <div className="show-mobile ">
                        <small>
                          {" "}
                          <p className="d-flex justify-content-center gap-1">
                            Have an Account?
                            <Link
                              to="/login"
                              style={{ textDecoration: "none" }}
                            >
                              Login
                            </Link>
                          </p>
                        </small>{" "}
                      </div>
                    </div>
                  </form>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <a
                    href="#!"
                    className="small text-muted me-1"
                    style={{ textDecoration: "none" }}
                  >
                    Terms of use.
                  </a>
                  <a
                    href="#!"
                    className="small text-muted"
                    style={{ textDecoration: "none" }}
                  >
                  &nbsp;  Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <ToastContainer autoClose={3000} />
    </div>
  );
}
export default Registerpage;
