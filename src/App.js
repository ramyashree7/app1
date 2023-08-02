import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import  Login  from "./components/Login";
import  Register  from "./components/Register";
import Home from "./components/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  // const [currentForm, setCurrentForm] = useState("login");

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };

  return (
    <div className="App">
      {/* {currentForm === "login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )} */}
      <BrowserRouter>
<Routes>
  <Route path="/" element={<PrivateRoutes/>}>
  <Route path="/"element={<Home/>} />
  
  </Route>
  <Route path="/register" element={<Register/>}/>
  <Route path="/login" element={<Login/>}/>
</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
