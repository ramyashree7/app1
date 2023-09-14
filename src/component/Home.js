import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { Alert } from "reactstrap";
import { useColorMode } from "../ColorModeContext";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import "./Home.css";
function Home() {
  const { mode } = useColorMode();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <Navbar
        collapsed={collapsed}
        toggled={toggled}
        handleCollapsedChange={handleCollapsedChange}
        handleToggleSidebar={handleToggleSidebar}
      />
      <main>
        <Topbar handleToggleSidebar={handleToggleSidebar} />
        <div className="btnn">
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <div className="content">
          {/* <Alert color="primary">This is a primary alert—check it out!</Alert>
        <Alert color="info">This is a info alert—check it out!</Alert>
        <Alert color="success">This is a success alert—check it out!</Alert>
        <Alert color="danger">This is a danger alert—check it out!</Alert>
        <Alert color="warning">This is a warning alert—check it out!</Alert>
        <Alert color="default">This is a default alert—check it out!</Alert> */}
            <Dashboard />
          </div>
        </div>
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
export default Home;

