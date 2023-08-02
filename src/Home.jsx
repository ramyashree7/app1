import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    axios
      .get(" http://localhost:3000/employees")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [data]);

  const handleDelete=(id)=>{
    const confirm= window.confirm("Do you like to delete?");
    if(confirm){
        axios.delete('http://localhost:3000/employees/'+id)
        .then(res=>{
            // alert("Record Deleted")
            navigate('/')
        }).catch(err=>console.log(err));

    }
   
  }

  return (
    <div className="d-flex flex-column  vh-100 justify-content-center align-items-center bg-light">
      <h1>List of users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add
          </Link>
        </div>
        <table className="table table-stripend">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>
                  <Link
                    to={`/read/${d.id}`}
                    className="btn btn-sm btn-info me-4"
                  >
                    Read
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="btn btn-sm btn-primary me-4"
                  >
                    Edit
                  </Link>
                  <button  onClick={e=>handleDelete(d.id)} className="btn btn-sm btn-danger ">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}

export default Home;
