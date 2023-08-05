import React from "react";
import Loginpage from "./components/Loginpage";
import "./App.css";
import "./App1.css";

import Registerpage from "./components/SignupForm";
import Home from "./components/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App1">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
