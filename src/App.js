import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import {BrowserRouter,Link, useNavigate} from "react-router-dom";
import React,{ useEffect, useState } from "react";


function App() {
  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/posts")
    .then((res) => {
      setColumns(Object.keys(res.data[0]))
      setRecords(res.data);
    });
  },[]);
  return (
    <div className="container mt-5">
      <div className="text-end"><Link to="/create" className="btn btn-primary">Add +</Link></div>
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={i}>{c}</th>
              
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {records.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.email}</td>
              <td>
                
                <Link to={`/update/${d.id}`}className="btn btn-sm btn-success">update</Link>
              <button onClick={e=>handleSubmit(d.id)}className="btn btn-sm ms-1 btn-dark">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  function handleSubmit(id){
    const conf=window.confirm("Do you want to delete");
    if(conf){
      axios.delete('http://localhost:3000/posts/'+id)
      .then(res=>{
        alert('record has deleted');
        navigate('/')
      }).catch(err=>console.log(err))

    }
  }
}

export default App;
