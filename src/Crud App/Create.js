import axios from "axios";
import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


function Create() {
  const [inputData,setInputData]=useState({
    name:'',
    salary:''
  })
  const navigate=useNavigate();
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:3000/employees',inputData)
    .then(res=>{
      alert("Data posted Successfully!")
      navigate('/')
    })
  }
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" >Name:</label>
            <input type="text" name="name" className="form-control"
            onChange={e=>setInputData({...inputData, name:e.target.value})} />
          </div>
          <div>
            <label htmlFor="name">Salary:</label>
            <input type="text" name="salary" className="form-control" 
            onChange={e=>setInputData({...inputData, salary:e.target.value})}/>
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
