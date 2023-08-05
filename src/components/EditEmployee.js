import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from "react-bootstrap";

const EmployeeForm = () => {
  const editURL = "http://localhost:3000/employee/";
  const navigate = useNavigate();
  const param = useParams();
  const [empId, setEmpId] = useState("");
  const [empName, setName] = useState("");
  const [empRole, setRole] = useState("");

  useEffect(() => {
    axios
      .get(editURL + param.id)
      .then((response) => {
        const empData = response.data;
        setEmpId(empData.id);
        setName(empData.name);
        setRole(empData.role);
      })
      .catch((error) => {
        alert("Error Ocurred getting employee detail:" + error);
      });
  }, []);
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const roleChangeHandler = (event) => {
    setRole(event.target.value);
  };

  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .put(editURL + param.id, {
        id: empId,
        name: empName,
        role: empRole,
      })
      .then((response) => {
        alert("Employee " + empId + " updated!");
        navigate("/read");
      })
      .catch((error) => {
        alert("Error Ocurred updating employee:" + error);
      });
  };
  return (
    <Alert variant="primary">
      <h1></h1>
      <Container>
        <Form onSubmit={submitActionHandler} id="data">
          <Form.Group controlId="form.id">
            <Form.Label>Id</Form.Label>
            <Form.Control value={empId} readonly="readonly" />
          </Form.Group>
          <Form.Group controlId="form.Name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              value={empName}
              onChange={nameChangeHandler}
              placeholder="Enter User Name"
              required
            />
          </Form.Group>
          <Form.Group controlId="form.Role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={empRole}
              onChange={roleChangeHandler}
              placeholder="Enter Role"
              required
            />
          </Form.Group>
          <br></br>
          <Button type="submit">Update Employee</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="submit" onClick={() => navigate("/read")}>
            Cancel
          </Button>
        </Form>
      </Container>
    </Alert>
  );
};
export default EmployeeForm;
