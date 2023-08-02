import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const EmployeeDataTable = () => {
  const navigate = useNavigate();
  const baseURL = "http://localhost:3000/";
  const [employees, setEmployees] = useState([]);

  const setEmployeeData = () => {
    axios
      .get(baseURL + "/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        alert("Error Ocurred while loading data:" + error);
      });
  };

  useEffect(() => {
    setEmployeeData();
  }, []);

  const removeEmployee = (id) => {
    axios
      .delete(baseURL + "/employee/" + id)
      .then((response) => {
        alert("Employee record " + id + " deleted!");
        setEmployeeData();
        navigate("/read");
      })
      .catch((error) => {
        alert("Error Ocurred in removeEmployee:" + error);
      });
  };
  const removeAllEmployee = (id) => {
    axios
      .delete(baseURL + "/employees")
      .then((response) => {
        alert("All Employees deleted!");
        setEmployeeData();
        navigate("/read");
      })
      .catch((error) => {
        alert("Error Ocurred in removeEmployee:" + error);
      });
  };

  return (
    <div class="card-body">
      <br></br>
      <nav>
        <button
          className="btn btn-primary nav-item active"
          onClick={() => navigate("/create")}
        >
          Create 
        </button>
      </nav>

      <br></br>
      <div className="col-md-6">
        <h4>Employees List</h4>

        <div class="container">
          <div class="row">
            <div class="col-12">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {employees &&
                    employees.map((employee, index) => (
                      <tr>
                        <th scope="row">{employee.id}</th>
                        <td>{employee.name}</td>
                        <td>{employee.role}</td>

                        <td>
                          <Link to={`/edit/` + employee.id}>
                            
                          </Link>
                          <button
                            onClick={() => removeEmployee(employee.id)}
                            className="button"
                          >
                            
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => removeAllEmployee()}
        >
          Remove All
        </button>
      </div>
    </div>
  );
};
export default EmployeeDataTable;
