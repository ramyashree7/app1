import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Analytics from "./pages/Analytics";
import Comment from "./pages/Comment";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
