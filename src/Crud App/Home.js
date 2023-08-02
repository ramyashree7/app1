
import axios from 'axios'
import React from 'react'
import {useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from 'react-router-dom'


function Home() {
    const [data,setData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get('http://localhost:3000/employees/')
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <div className='container mt-5'>
       
          <Link to='/create' className='btn btn-info my-3'>
                Create
            </Link>
      
        <table className='table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>SALARY</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d,i)=>(
                    <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.name}</td>
                        <td>{d.salary}</td>
                        <td>
                            <Link className='text-decoration-none btn btn-sm 
                            btn-success' to={`/update/${d.id}`}>Update</Link>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <button className='text-decoration-none btn btn-sm btn-danger'
                             onClick={e=>handleDelete(d.id)}>Delete</button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <Link className='text-decoration-none btn btn-sm 
                            btn-primary' to={`/read/${d.id}`}>Read</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
  function handleDelete(id){
    const confirm= window.confirm("Do you like to delete?");
    if(confirm){
        axios.delete('http://localhost:3000/employees/'+id)
        .then(res=>{
            alert("Record Deleted")
            navigate('/')
        })

    }
   
  }
}

export default Home