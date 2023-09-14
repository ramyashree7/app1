import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody,  MDBCardImage } from 'mdb-react-ui-kit';
import '../Login.css';
// import "./CreditCard.css"
import axios from 'axios';
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import config from "../config.json";
import exampleImage from '../assets/50 Beautiful Nature Wallpapers for your desktop - 2018.jpg'

function LoginForm() {
  const url=config.url;
  const navigate = useNavigate();
  const [valid, setValid] = useState({ email: true, password: true });
  const [errors, setErrors] = useState({ email: "", password: "" });  
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isShown, setIsSHown] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response =  await axios.post(`${url}/user/login`,input);
      const data = response.data;

      console.log(response)

      if (response.status=== 200) {
    
        localStorage.setItem("access_token", data.access_token);
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        navigate("/");
      } else {
        toast.error(response.data,{
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }catch (error) {
      toast.error("Login failed: " + error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


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
      !/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*[A-Z]).{8,}$/.test(
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
        /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\\/])(?!.*[A-Z]).{8,}$/.test(
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
    <div className='login-page'>
    <MDBContainer className="d-flex justify-content-center
     align-items-center vh-100 ">
    <MDBCard className="card-container " >
    <div className="card-image-container">
          <img src={exampleImage} alt="Background" className="card-image"  style={{ height: '50%' }}  />
          <div className="card-overlay">
            <div className='heading'>
            <h6 >Don't you have an account?</h6>
            </div>
           <button className='px-4 py-2' style={{color:'black'}}>
              <Link to="/register"  style={{textDecoration:"none"}}>Sign up</Link>
            </button>
            <h4 style={{ color: 'white' }}>WELCOME</h4>
          </div>
        </div>
          <MDBCardBody >
          <MDBRow className="first-row" style={{  marginBottom: '20px' }}>
            <MDBCol md="12">

                    <form onSubmit={handleSubmit}>
                    <div className="input2">
                    <FormControl
                        sx={{ m: 3, width: "33ch" }}
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
                          style={{borderRadius:"50px"}}
                          endAdornment={
                            <InputAdornment position="end">
                              {" "}
                              <EmailIcon />
                            </InputAdornment> } />
                            {!valid.email && (
                          <span style={{ color: "red" }}>
                            {errors.email}
                          </span>
                        )}
                      </FormControl>
                      <FormControl
                        sx={{ mx: 3, width: "33ch" }}
                        variant="outlined"
                       
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
                          style={{borderRadius:"50px"}}
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
                        className="d-flex justify-content-center  py-1 "
                        color="#35ca7d"
                      >
                        <button
                          type="submit"
                          className="mx-2 px-5 py-1 my-1"
                          size="lg"
                          style={{
                            color: "white",
                            borderRadius: "2rem",
                            backgroundColor: " #2079df",
                            border: "1px solid  #2079df",
                          }}
                        > LOGIN
                        </button>
                      </div>
                      <div
                        className="d-flex justify-content-center  py-2 "
                        color="black"
                      ><p style={{color:"black"}}>Forgot your password?</p>
                      </div>
                    </div>
                  </form>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </div>
  );
}
export default LoginForm;


