import { useState } from "react";
import { FaUser } from "react-icons/fa";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FiHome } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { SiApacheairflow } from "react-icons/si";
import { GiAbstract050 } from "react-icons/gi";
import "react-pro-sidebar/dist/css/styles.css";
import "../styles1.scss";
import { NavLink, Link } from "react-router-dom";
import example from "../assets/background.jpg";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import theme from "../theme";
// import "./Navbar.css";
import { tokens } from "../theme";
import { useTheme, Box, Typography, IconButton } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Navbar = ({
  collapsed,
  toggled,
  handleCollapsedChange,
  handleToggleSidebar,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sidebarTheme = theme.sidebar;
  const [selected, setSelected] = useState("Dashboard");
  return (
    <div className="navbar">
      <Box
        sx={{
          position: "sticky",
          display: "flex",
          height: "100vh",
          top: 0,
          bottom: 0,
          zIndex: 10000,
          "& .sidebar": {
            border: "none",
          },
          "& .menu-icon": {
            backgroundColor: "transparent !important",
          },
          "& .menu-item": {
            // padding: "5px 35px 5px 20px !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-anchor": {
            color: "inherit !important",
            backgroundColor: "transparent !important",
          },
          "& .menu-item:hover": {
            color: `${colors.blueAccent[500]} !important`,
            backgroundColor: "transparent !important",
          },
          "& .menu-item.active": {
            color: `${colors.greenAccent[500]} !important`,
            backgroundColor: "transparent !important",
          },
        }}
      >
        <ProSidebar
          image={example}
          collapsed={collapsed}
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint="md"
          style={{
            flex: "0 0 auto",
            height: "100vh",

            zIndex: 1,
          }}
        >
          <SidebarHeader>
            <Menu iconShape="square">
              {collapsed ? (
                <MenuItem
                  icon={<GiAbstract050 />}
                  onClick={handleCollapsedChange}
                ></MenuItem>
              ) : (
                <MenuItem
                  suffix={<SiApacheairflow />}
                  onClick={handleCollapsedChange}
                >
                  <div
                    style={{
                      padding: "9px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      fontSize: 15,
                      letterSpacing: "1px",
                    }}
                  >
                    Dashboard
                  </div>
                </MenuItem>
              )}
            </Menu>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle">
              <MenuItem active={true} icon={<FiHome />}>
                Home
                <NavLink to="/" />
              </MenuItem>
              <Box paddingLeft={collapsed ? undefined : "10%"}>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 20px 5px 20px" }}
                >
                  Charts
                </Typography>

                <MenuItem active={true} icon={<BarChartOutlinedIcon />}>
                  Barchart
                  <NavLink to="/bar" />
                </MenuItem>
                <MenuItem
                  active={true}
                  icon={<PieChartOutlineOutlinedIcon />}
                  title="Pie Chart"
                >
                  PieChart
                  <NavLink to="/pie" />
                </MenuItem>
                <MenuItem icon={<TimelineOutlinedIcon />} active={true}>
                  LineChart
                  <NavLink to="/line" />
                </MenuItem>
                <MenuItem   icon={<MapOutlinedIcon />} active={true}>
                Geography Chart
                  <NavLink to="/graph" />
                </MenuItem>
              </Box>
              <Box paddingLeft={collapsed ? undefined : "10%"}>
                <Typography
                  variant="h6"
                  // color={colors.grey[300]}
                  sx={{ m: "15px 20px 5px 20px" }}
                >
                   Pages
                </Typography>

                <MenuItem active={true} icon={<PersonOutlinedIcon />}>
                Profile Form
                  <NavLink to="/profileform" />
                </MenuItem>
                <MenuItem
                  active={true}
                  icon={<CalendarTodayOutlinedIcon />}
                  title="Pie Chart"
                >
                 Calendar
                  <NavLink to="/calendar" />
                </MenuItem>
                <MenuItem icon={<HelpOutlineOutlinedIcon />} active={true}>
                Data
                  <NavLink to="/faq" />
                </MenuItem>
              </Box>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter style={{ textAlign: "center" }}>
            <div className="sidebar-btn-wrapper" style={{ padding: "15px" }}>
              <Link
                className="sidebar-btn"
                style={{ cursor: "pointer" }}
                to="/profile"
              >
                <FaUser />
                <span>My Account</span>
              </Link>
            </div>
          </SidebarFooter>
        </ProSidebar>
      </Box>
    </div>
  );
};

export default Navbar;
