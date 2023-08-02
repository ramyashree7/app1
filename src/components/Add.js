import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Add() {
  const [inputData, setInputData] = useState({ ID:"",name: "", email: "" });
 const navigate=useNavigate();
 
  function handleSubmit(event) {
    event.preventDefault()
    axios.post("http://localhost:3000/posts",inputData)
    .then(res=>{
        alert("data Added Successfully");
        navigate('/')
    }).catch(err=>console.log(err));
  }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">ID</label>
            <input
              type="text"
              name="name"
              className="form-control"
              
              onChange={e=>setInputData({...inputData,ID:e.target})}
              
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Add;
