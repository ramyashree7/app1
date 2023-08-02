import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import login from "./assests/istockphoto-1322277517-612x612.jpg";

function CardForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [valid, setValid] = useState({ email: false });
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
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(
          e.target.value
        )
      ) {
        setValid({ ...valid, password: true });
      } else {
        setValid({ ...valid, password: false });
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data);
};
  return (
    <div>
      <MDBContainer className="my-5">
        <MDBCard >
          <MDBRow className="g-0">
            <MDBCol md="8">
              <MDBCardImage
                src={login}
                alt="loginn"
                className="img-fluid h-100"
                style={{ objectFit: "cover" }}
              ></MDBCardImage>
            </MDBCol>
            <MDBCol md="4"onSubmit={handleSubmit}>
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#fg4354 " }}
                  />
                  <span className="h1 fw-bold mb-0">Logo</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>

                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="formControlLg"
                  type="email"
                  size="lg"
                />
                 {data.email && !valid.email && <p>email should be Entered</p>}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                />{data.password && !valid.password && <p>password should be Entered</p>}

                <MDBBtn className="mb-4 px-5" color="dark" size="lg">
                  Login
                </MDBBtn>
                
                <a className="small text-muted" href="#!">
                  Forgot password?
                </a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>

               
                <div className="d-flex flex-row justify-content-start"></div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default CardForm;
