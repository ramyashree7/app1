import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    id: id,
    name: "",
    salary: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/employees/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put("http://localhost:3000/employees/" + id, inputData)
    .then((res) => {
        alert("Data updated Successfully!");
        navigate('/')
      });
      
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="id">ID:</label>
            <input
              type="number"
              disabled
              name="name"
              className="form-control"
              value={inputData.id}
              onChange={(e) =>
                setInputData({ ...inputData, id: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={inputData.name}
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="name">Salary:</label>
            <input
              type="text"
              name="salary"
              className="form-control"
              value={inputData.salary}
              onChange={(e) =>
                setInputData({ ...inputData, salary: e.target.value })
              }
            />
          </div>
          <br />
          <button className="btn btn-info">Update</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;
