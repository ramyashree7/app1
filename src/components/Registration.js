import React, { useState } from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import "./Registration.css";

function Registration() {

  const [data, setData] = useState({ email: "", password: "",address:"",address2:"",city:"",state:"", zip:"" });

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`the email you enterd was `);
    console.log(data);
  };

  return (
    <div>
      <div className="container">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="abc@gmail.com"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({...data, email: e.target.value})}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="*******"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({...data,password: e.target.value}) }
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Address</Label>
            <Input
              id="exampleAddress"
              name="address"
              placeholder="1234 Main St"
              value={data.address}
                  onChange={(e) => setData({...data, address: e.target.value})}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address 2</Label>
            <Input
              id="exampleAddress2"
              name="address2"
              placeholder="Apartment, studio, or floor"
              value={data.address2}
                  onChange={(e) => setData({...data, address2: e.target.value})}
            />
          </FormGroup>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleCity">City</Label>
                <Input
                  id="exampleCity"
                  name="city"
                  value={data.city}
                  onChange={(e) => setData({...data, city: e.target.value})}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleState">State</Label>
                <Input
                  id="exampleState"
                  name="state"
                  value={data.state}
                  onChange={(e) => setData({...data, state: e.target.value})}
                  
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="exampleZip">Zip</Label>
                <Input
                  id="exampleZip"
                  name="zip"
                  value={data.zip}
                  onChange={(e) => setData({...data, zip: e.target.value})}
                />
              </FormGroup>
            </Col>
          </Row>

          <FormGroup check>
            <Input id="exampleCheck" name="check" type="checkbox" />
            <Label className="check" check for="exampleCheck">
              Check me out
            </Label>
          </FormGroup>

          <div className="btn-btn">
            <Button type="submit" className="btn">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Registration;
