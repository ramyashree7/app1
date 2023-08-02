import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from 'react'
import {useEffect} from 'react'

import {useNavigate, useParams} from "react-router-dom"
function Edit() {
    const {id}=useParams();
    const [data,setData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3000/posts'+id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    function handleSubmit(event){
        event.preventDefault()
        axios.put('http://localhost:3000/posts'+id,data)
        .then(res=>{
            alert("data update successfully");
            navigate('/')
        })
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
              value={data.id}
              onChange={e=>setData({...data,ID:e.target})}
              
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data.name}
              onChange={e=>setData({...data,name:e.target})}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={data.email}
              onChange={e=>setData({...data,Email:e.target})}
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Edit