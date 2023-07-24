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
import config from "../config.json";
import "../App2.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Loginpage() {
  const [isShown, setIsSHown] = useState(false);
  const [valid, setValid] = useState({});
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const url = config.url;

  const togglePassword = () => {
    setIsSHown((isShown) => !isShown);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${url}/user/sign_in`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
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
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          e.target.value
        )
      ) {
        setValid({ ...valid, email: true });
      } else {
        setValid({ ...valid, email: false });
      }
    }
    if (e.target.name === "password") {
      if (
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          e.target.value
        )
      ) {
        setValid({ ...valid, password: true });
      } else {
        setValid({ ...valid, password: false });
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="">
      <MDBContainer
        fluid
        className=" d-flex  justify-content-center align-item-center py-5 my-5"
      >
        <MDBCard
          className=" d-flex flex-row justify-content-center align-item-center"
          style={{ borderRadius: "2rem" }}
        >
          <MDBRow className="g-0">
            <MDBCol md="7 ">
              <MDBCardBody className="d-flex flex-column">
                <h1
                  className="fw-normal my-2  "
                  style={{
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

                  <p className="text-black-50 py-2">
                    or use your email account
                  </p>
                </div>
                <div className="d-flex flex-column  mx-5  justify-content-center  my-2 ">
                  <form onSubmit={handleLogin}>
                    <div className="d-flex flex-column  justify-content-center ">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Email address"
                        id="formControlLg"
                        type="email"
                        size="lg"
                        name="email"
                        value={input.email}
                        onChange={handleChange}
                      />
                      {input.email && !valid.email && (
                        <p className="error">Email is required</p>
                      )}
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Password"
                        id="formControlL"
                        type={isShown ? "text" : "password"}
                        name="password"
                        size="lg"
                        value={input.password}
                        onChange={handleChange}
                      />{" "}
                      {input.password && !valid.password && (
                        <p className="error">Password is required</p>
                      )}
                    </div>

                    <div className="d-flex justify-content-around  mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Show Password"
                        checked={isShown}
                        onChange={togglePassword}
                      />
                      <a
                        href="!#"
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div
                      className="d-flex justify-content-center  py-2 mb-4"
                      color="#35ca7d"
                    >
                      <button
                        type="submit"
                        onSubmit={handleLogin}
                        className="mx-2 px-5 py-2 "
                        size="lg"
                        style={{
                          color: "white",
                          borderRadius: "2rem",
                          backgroundColor: "#35ca7d",
                          border: " 1px solid #35ca7d",
                        }}
                      >
                        LOGIN
                      </button>
                    </div>
                    <div className="show-mobilee">
                      <small>
                        {" "}
                        <p className=" par d-flex justify-content-center">
                          Don't have an Account?
                          <Link to="/register">Register</Link>
                        </p>
                      </small>
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
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
            <MDBCol sm="5" className="d-none d-sm-block px-0">
              <MDBCardBody
                className="gradient-custom-2 h-100"
                style={{
                  borderBottomRightRadius: "2rem",
                  borderTopRightRadius: "2rem",
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
                        Fill up personal information and
                        <br />
                        start journey with us.
                      </p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-4">
                    <Link
                      to="/register"
                      style={{ color: "white", textDecoration: "none" }}
                    >
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
