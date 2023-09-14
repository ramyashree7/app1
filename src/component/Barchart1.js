import React from "react";
import Topbar from "./Topbar";
import Navbar from "../component/Navbar";
import { useColorMode } from "../ColorModeContext";
import { useState } from "react";
import Footer from "./Footer";
import BarChart from "./BarChart";
import { Box } from "@mui/material";
import Header from "./Header";
import { FaBars } from "react-icons/fa";
import "./Home.css";
import "./Barchart.css";
function Barchart1() {
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
        <div className="btnn1">
          <div className="btn-toggle1" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
          <div className="content">
            <Box className="barchart">
              <Header title="BAR CHART" subtitle="simple bar chart" />
              <BarChart />
            </Box>
          </div>
        </div>
      </main>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
export default Barchart1;
