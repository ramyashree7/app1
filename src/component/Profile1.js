import React from "react";
import { useColorMode } from "../ColorModeContext";
import { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { FaBars } from "react-icons/fa";
import "./Linechart.css"
import Form from "./Profile"
import "./Profile.css"
const Profile1 = () => {
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
        <div className="btnn4">
          <div className="btn-toggle4" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <div className="content">
            <Box className="profile">
              <Form />
            </Box>
          </div>
        </div>
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
};
export default Profile1;
