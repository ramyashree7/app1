import Navbar from "../component/Navbar";
import TableComponent from "./Phome";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";
function Demo() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
  });
  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <div className={`app ${toggled ? "toggled" : ""}`}>
        <Navbar
          collapsed={collapsed}
          toggled={toggled}
          handleCollapsedChange={handleCollapsedChange}
          handleToggleSidebar={handleToggleSidebar}
        />
        <main>
          <div className=" btnn">
            <div
              className="btn-toggle"
              onClick={() => handleToggleSidebar(true)}
            >
              <FaBars />
            </div>
            <header style={{ border: "none" }}>
              <div className="">
                <button
                  className="mx-2 py-2 px-5"
                  size="lg"
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    borderRadius: "2rem",
                    backgroundColor: "#35ca7d",
                    border: "1px solid black",
                  }}
                >
                  LOGOUT
                </button>
              </div>
            </header>
          </div>
          <TableComponent />
        </main>
      </div>
    </div>
  );
}
export default Demo;
