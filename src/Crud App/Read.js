import axios from "axios";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";

function Read() {
 
  const [Data, setdata] = useState([]);
  const { id } = useParams();
  
  // const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/employees/" + id)
      .then(res => setdata(res.data))
      .catch(err => console.log(err));
      // navigate('/')
  }, []);
 
  return (
    <div className="container">
    
        <div className="container p-5">
          <p>{Data.id}</p>
          <p>{Data.name}</p>
          <p>{Data.salary}</p>
          <Link to="/">Back</Link>
        </div>
    
    </div>
  );
}
export default Read;
