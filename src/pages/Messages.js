
import Navbar from "../component/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState ,useEffect} from "react";
function  Messages() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
    }
  });
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
          handleToggleSidebar={handleToggleSidebar} />
          <main >
         <div className=" btnn">
          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>
            <div>
                <button
                  className="mx-2 py-2 px-5"
                  size="lg"
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    borderRadius: "2rem",
                    backgroundColor: "#35ca7d",
                    border: "1px solid #35ca7d",}} >
                  LOGOUT
                </button>
              </div>
             </div>
        </main> 
    </div>
  )
}
export default Messages