
import React from "react";
import Topbar from "./Topbar";
import Navbar from "../component/Navbar";
import { useColorMode } from "../ColorModeContext";
import { useState } from "react";
import Footer from "./Footer";
import Dashboard from "./Dashboard";
function Favourite() {
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
    <div>
      <div
        className={`app ${toggled ? "toggled" : ""} ${
          mode === "dark" ? "dark-mode" : ""
        }`}
      >
        <main>
          <Navbar
            collapsed={collapsed}
            toggled={toggled}
            handleCollapsedChange={handleCollapsedChange}
            handleToggleSidebar={handleToggleSidebar}
          >
            {" "}
          </Navbar>
        </main>
        <div>
          <Topbar />

          <Dashboard />
        </div>

        <div className="footer-container">
          {" "}
          <Footer />
        </div>
      </div>
    </div>
  );
}
export default Favourite;
