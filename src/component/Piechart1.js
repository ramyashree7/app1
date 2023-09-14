import React from "react";
import PieChart from "./PieChart";
import { Box } from "@mui/material";
import Header from "./Header";
import { useColorMode } from "../ColorModeContext";
import { useState } from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import { FaBars } from "react-icons/fa";
import "./Piechart.css";
const Piechart1 = () => {
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
      <div className="btnn2">
        <div className="btn-toggle2" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <div className="content">
          <Box className="piechart">
            <Header title="PIE CHART" subtitle="simple pie chart" />
            <PieChart />
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
export default Piechart1;
