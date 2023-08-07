import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./component/PrivateRoutes";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
import Loginpage from "./pages/Login";
import Registerpage from "./pages/Register";
import NotFound from "./pages/NotFound";
import Team from "./pages/Team";
import Messages from "./pages/Messages";
import Support from "./pages/Support";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Registerpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/team" element={<Team />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}
