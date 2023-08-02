import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import "./FormInput.css";
import { CCard, CCardBody, CCardTitle, CButton } from "@coreui/react";

function FormInput() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    conpass: "",
  });
  const [valid, setValid] = useState({ fname: false });

  const handleChange = (e) => {
    if (e.target.name === "fname") {
      if (/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(e.target.value)) {
        setValid({ ...valid, fname: true });
      } else {
        setValid({ ...valid, fname: false });
      }
    }
    if (e.target.name === "lname") {
      if (/^[A-Za-z][A-Za-z0-9_]{3,}$/.test(e.target.value)) {
        setValid({ ...valid, lname: true });
      } else {
        setValid({ ...valid, lname: false });
      }
    }
    if (e.target.name === "email") {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value)) {
        setValid({ ...valid, email: true });
      } else {
        setValid({ ...valid, email: false });
      }
    }
    if (e.target.name === "password") {
      if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(e.target.value)) {
        setValid({ ...valid, password: true });
      } else {
        setValid({ ...valid, password: false });
      }
    }
    if (e.target.name === "conpass") {
      if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(e.target.value)) {
        setValid({ ...valid, conpass: true });
      } else {
        setValid({ ...valid, conpass: false });
      }
    }

    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(data);
    // setErrors(validateValues(data));
    // setSubmitting(true);
    // console.log(data);
  };
  // const finishSubmit = () => {
  //   console.log(data);
  // };

  return (
    <div>
      <div className="container">
        <CCard color="light" 
          style={{
            width: "28rem",
            backgroundColor:'danger',
          
            borderRadius: "20px",
            borderColor: "black",
          }}
        >
          <CCardBody>
            <CCardTitle style={{ height: "3rem" }}>Registration</CCardTitle>

            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label sm={5}>First Name:</Label>
                <Col sm={7}>
                  <Input
                    style={{ borderRadius: "20px" }}
                    id="exampleName"
                    name="fname"
                    type="text"
                    value={data.fname}
                    onChange={handleChange}
                  />
                  {data.fname && !valid.fname && <p>Name should be Entered</p>}
                  {/* {errors.fname ? (
                     <p className="error">Name should be at Entered</p>
                  ) : null}  */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>Last Name:</Label>
                <Col sm={7}>
                  <Input
                    style={{ borderRadius: "20px" }}
                    id="exampleLname"
                    name="lname"
                    type="text"
                    value={data.lname}
                    onChange={handleChange}
                  />
                  {data.lname && !valid.lname && <p>Name should be Entered</p>}
                  {/* {errors.lname ? (
                    <p className="error">LName should be Entered</p>
                  ) : null} */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>Email:</Label>
                <Col sm={7}>
                  <Input
                    style={{ borderRadius: "20px" }}
                    id="exampleEmail"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                   {data.email && !valid.email && <p>email should be Entered</p>}
                  {/* {errors.email ? (
                    <p className="error">
                      Email should be at least 15 characters long
                    </p>
                  ) : null} */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>Password:</Label>
                <Col sm={7}>
                  <Input
                    style={{ borderRadius: "20px" }}
                    id="examplePassword"
                    name="password"
                    type="pasword"
                    value={data.password}
                    onChange={handleChange}
                  /> {data.password && !valid.password && <p>password should be Entered</p>}
                  {/* {errors.password ? (
                    <p className="error">
                      Password should be at least 5 characters long
                    </p>
                  ) : null} */}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={5}>Confirm Password:</Label>
                <Col sm={7}>
                  <Input
                    style={{ borderRadius: "20px" }}
                    id="exampleConpass"
                    name="conpass"
                    type="password"
                    value={data.conpass}
                    onChange={handleChange}
                  />{data.conpasspass && !valid.conpass && <p>password should be Entered</p>}
                  {/* {errors.conpass ? (
                    <p className="error">
                      Confirm Password should be matched with password.
                    </p>
                  ) : null} */}
                </Col>
              </FormGroup>
              <CButton
                component="input"
                type="submit"
                color="info"
                value="Submit"
                disabled={!valid.fname ? true : false}
              />
      
            </Form>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
}

export default FormInput;
