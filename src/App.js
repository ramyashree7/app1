import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Crud App//Home";
import Create from "./Crud App/Create";
import Update from "./Crud App/Update";
import Read from "./Crud App/Read";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/read/:id" element={<Read />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
