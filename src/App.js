import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardBody } from "reactstrap";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/comments";
    fetch(url, {
      companyId: "4677474747447477",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("jsonnnn", json);
        setData(json);
      })
      .catch((e) => {
        console.log("e", e);
      });
  }, []);
  const postPutEvent = () => {
    const data = {
      id:'def234',
      name: "Ramya",
      mobile: "8296385775",
      designation: "developer",
      pin: "45678",
    };
    const url = data.id ? "https://jsonplaceholder.typicode.com/comments"+data.id:"https://jsonplaceholder.typicode.com/comments";
    fetch(url, {
      method: data.id ?"PUT": "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("response", response);
        if(response.state==200){
          alert("success")
        }
      })
      .catch((e) => {
        console.log("e", e);
      });
  };
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Card
        body
        color="danger"
        justifyContent="start"
        textAlign="center"
        width="8rem"
        outline
        style={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
          marginLeft: "20px",
          marginRight: "20px",
          margin: "50px",
        }}
      >
        <CardBody>
          <h1>Get method</h1>
          {data.map((item) => {
            return (
              <div>
                <p>
                  <li>{item.name}</li>
                </p>
                <p>
                  <li>{item.id}</li>
                </p>
                <p>
                  <li>{item.email}</li>
                </p>
              </div>
            );
          })}
          <button onClick={postPutEvent}>Submit</button>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
