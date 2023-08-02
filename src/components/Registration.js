import React, {useState,setState} from 'react'
import {Form,FormGroup,Label,Input,Col} from 'reactstrap';

import './Registration.css';



function Registration() {
const [firstName,setFirstName]=useState(null);
const [lastName,setLastName]=useState(null);
const [email,setEmail]=useState(null);
const [password,setPassword]=useState(null);
const [confirmPassword,setConfirmPassword]=useState(null);

const handleInputChange=(e)=>{
  const{id,value}=e.target;
  if(id==='firstName'){
    setFirstName(value);
  }
  if(id==='lastName'){
    setLastName(value);
  }
  if(id==='email'){
    setEmail(value);
  }
  if(id==='password'){
    setPassword(value);
  }
  if(id==='confirmPassword'){
    setConfirmPassword(value);
  }
}

const handleSubmit =()=>{
  console.log(firstName,lastName,email,password,confirmPassword)
}











  return (
  
      <div className="form">
      <div className="form-body">
     <Form >
  <FormGroup row>
  <Label className="form__label" for="firstName"sm={2}>FirstName </Label>
    <Col sm={10}>
    <input className="form__input" id="firstName"value={firstName} name="name"placeholder="First Name"type="text" onChange = {(e) => handleInputChange(e)}/>
    </Col>
  </FormGroup>
  <FormGroup row>
  <Label className="form__label" for="lastName"sm={2} >LastName</Label>
    <Col sm={10}>
    <input className="form__input" id="lastName" name="name"placeholder="Lastname"type="text"value={lastName} onChange = {(e) => handleInputChange(e)}/>
    </Col>
  </FormGroup>
  <FormGroup row>
  <Label className="form__label" for="email"sm={2}>Email</Label>
    <Col sm={10}>
    <input className="form__input" id="email" name="email"placeholder="Email"type="email" value={email} onChange = {(e) => handleInputChange(e)} />
    </Col>
  </FormGroup>
  <FormGroup row>
  <Label className="form__label"for="Password"sm={2}>Password</Label>
    <Col sm={10}>
    <input className="form__input"id="Password" name="password"placeholder="Password "type="password" value={password} onChange = {(e) => handleInputChange(e)}/>
    </Col>
  </FormGroup>
  <FormGroup row>
  <Label className="form__label"for="confirmPassword"sm={2}> Confirm
    Password</Label>
    <Col sm={10}>
    <input className="form__input" id="confirmPassword" name="password"placeholder="Confirm Password"type="password" value={confirmPassword} onChange = {(e) => handleInputChange(e)}/>
    </Col>
  </FormGroup>
</Form>

<div className='footer'>
  <button onClick={()=>handleSubmit()}type='submit' className='btn'>Registration</button>
</div>
</div>
    </div>
  )
}
export default Registration