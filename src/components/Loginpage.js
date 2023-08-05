import React, { useState } from "react";
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
import "../App1.css";
function Loginpage() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if (
      input.email === loggeduser.email &&
      input.password === loggeduser.password
    ) {
      localStorage.setItem("loggedin", true);
      navigate("/");
    } else {
      alert("wrong email or passwor");
    }
  };

  return (
    <MDBContainer className="my-5 py-5">
      <MDBCard style={{ borderRadius: "2rem" }}>
        <MDBRow className="g-0">
          <MDBCol md="7">
            <MDBCardBody className="d-flex flex-column">
              <h1
                className="fw-normal my-2 pt-2 "
                style={{
                  // letterSpacing: "0.1px",
                  textAlign: "center",
                  color: "#35ca7d",
                }}
              >
                <b>Sign in to Account</b>
              </h1>
              <div className="text-center">
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "black" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "black" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>

                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "black", borderColor: "black" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>

                <p className="text-black-50 my-3 py-2">
                  or use your email account
                </p>
              </div>
              <div className="d-flex flex-column w-90 mx-5 justify-content-center px-5 my-2 ">
                <form onSubmit={handleLogin}>
                  <div className="d-flex flex-column w-100 justify-content-center ">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    id="formControlLg"
                    type="email"
                    size="lg"
                    value={input.email}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={input.password}
                    onChange={(e) =>
                      setInput({ ...input, [e.target.name]: e.target.value })
                    }
                    // style={{ width: "42vh" }}
                  />
              </div>

                <div className="d-flex justify-content-between  mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Remember me"
                  />

                  <a href="!#">Forgot password?</a>
                </div>
                </form>
              </div>
              <div
                className="d-flex justify-content-center  py-2 mb-4"
                color="#35ca7d"
              >
                <MDBBtn
                  className="mx-2 px-5 py-2 "
                  size="lg"
                  onSubmit={handleLogin}
                  style={{ borderRadius: "2rem", color: "white" }}
                >
                  <Link to="/home" style={{ color: "white" }}>
                    {" "}
                    Login
                  </Link>
                </MDBBtn>
              </div>
              {/* <a className="small text-muted" href="#!">
                Forgot password?
              </a>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                Don't have an account?{" "}
                <a href="#!" style={{ color: "#393f81" }}>
                  Register here
                </a>
              </p> */}

              <div className="d-flex flex-row justify-content-center">
                <a href="#!" className="small text-muted me-1">
                  Terms of use.
                </a>
                <a href="#!" className="small text-muted">
                  Privacy policy
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>

          <MDBCol md="5">
            <MDBCardBody
              className="gradient-custom-2 h-100"
              style={{
                borderBottomRightRadius: "2rem",
                borderTopRightRadius: "2rem",
              }}
            >
              <div className="d-flex flex-column  justify-content-center  h-100 mb-4">
                <div className="text-white px-4 py-4 p-md-5 mx-md-4 ">
                  <h4 class="mb-4">
                    <div className="text-center">
                      <b>Hello, Friend!</b>
                    </div>
                  </h4>
                  <div className="text-center">
                    <p class="small mb-0">
                      Fill up personal information and
                      <br />
                      start journey with us.
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-4 mb-4">
                  <MDBBtn
                    outline
                    className="mx-2 px-5"
                    color="white"
                    size="lg"
                    style={{ borderRadius: "2rem", color: "white" }}
                  >
                    <Link to="/register">sign up</Link>
                  </MDBBtn>
                </div>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Loginpage;
