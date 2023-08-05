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
import "../App1.css";

function Registerpage() {
  const [input, setInput] = useState({
    uname: "",
    email: "",
    password: "",
  });
  const [valid, setValid] = useState({ });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "uname") {
      if (/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(e.target.value)) {
        setValid({ ...valid, uname: true });
      } else {
        setValid({ ...valid, uname: false });
      }
    }
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
        setValid({ ...valid, password:true });
      } else {
        setValid({ ...valid, password:  false});
      }
    }
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <MDBContainer fluid className=" d-flex flex-row  py-5 my-5">
      <MDBCard style={{ borderRadius: "2rem" }}>
        <MDBRow className="g-0">
          <MDBCol sm="5" className="d-none d-sm-block px-0">
            <MDBCardBody
              className="gradient-custom-2 h-100"
              style={{
                borderBottomLeftRadius: "2rem",
                borderTopLeftRadius: "2rem",
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
                    <p class="small mb-0">
                      Alredy Have an Account?
                      <br />
                      Please sign in
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center mx-4 mb-4">
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
                <b>Sign up to Account</b>
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
              <div className="d-flex flex-column align-items-center mx-4 px-4 my-2 ">
                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Name"
                    // id="formControlLg"
                    type="text"
                    size="lg"
                    name="uname"
                    value={input.uname}
                    
                    onChange={handleChange}
                  />
                  {input.uname && !valid.uname && <p className="error">Name should be Entered</p>}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email address"
                    // id="formControlLg"
                    type="email"
                    size="lg"
                    name="email"
                    value={input.email}
                    onChange={handleChange}
                  />
                  {input.email && !valid.email && (
                    <p className="error">email should be Entered</p>
                  )}
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    id="formControlLg"
                   type="password"
                    name="password"
                    size="lg"
                    value={input.password}
                    onChange={handleChange}
                  />
                  {input.password && !valid.password && (
                    <p className="error">password should be Entered</p>
                  )}

                  <div className="d-flex justify-content-center mx-1 px-1 mb-4">
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      id="flexCheckDefault"
                      label="Show password"
                    
                    />
                  </div>

                  <div
                    className="d-flex justify-content-center  py-2 mb-4"
                    color="#35ca7d"
                  >
                    <button
                      type="submit"
                      // onSubmit={handleSubmit}
                      value="Submit"
                      className="mx-2 px-5 py-2 "
                      size="lg"
                      style={{
                        color: "white",
                        borderRadius: "2rem",
                        backgroundColor: "#35ca7d",
                        border: "1px solid #35ca7d",
                      }}
                     onSubmit={handleSubmit}
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div class="show-mobile ">
                    <small>
                      {" "}
                      <p className="d-flex justify-content-center">
                        Have an Account?<Link to="/login">Login</Link>
                      </p>
                    </small>{" "}
                  </div>
                </form>
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
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Registerpage;
