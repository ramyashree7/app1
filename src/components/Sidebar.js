import { FaUser, FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { AiFillHome, AiOutlineTeam, AiOutlineMessage } from "react-icons/ai";
import { BiSolidReport, BiSupport } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import React from "react";

import { NavLink, Link } from "react-router-dom";

const Sidebar = ({
  collapsed,
  toggled,
  handleCollapsedChange,
  handleToggleSidebar,
}) => {
  return (
    <div>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToggleSidebar}
        breakPoint="md"
      >
        <SidebarHeader>
          <Menu iconShape="circle">
            {collapsed ? (
              <MenuItem
                icon={<FaAngleDoubleRight />}
                onClick={handleCollapsedChange}
              ></MenuItem>
            ) : (
              <MenuItem
                suffix={<FaAngleDoubleLeft />}
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
                  Pro Sidebar
                </div>
              </MenuItem>
            )}
          </Menu>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<AiFillHome />}>
              Home
              <NavLink to="/" />
            </MenuItem>
            <MenuItem icon={<BiSolidReport />}>
              Reports
              <Link to="/components" />
            </MenuItem>
            <MenuItem icon={<MdProductionQuantityLimits />}>
              Products
              {/* <MenuItem>SubMenu1</MenuItem>
              <MenuItem>SubMenu1</MenuItem>
              <MenuItem>SubMenu1</MenuItem> */}
            </MenuItem>
            <MenuItem icon={<AiOutlineTeam />}>
              Team
              <Link to="/components" />
            </MenuItem>
            <MenuItem icon={<AiOutlineMessage />}>
              Messages
              <Link to="/components" />
            </MenuItem>
            <MenuItem icon={<BiSupport />}>
              Support
              <Link to="/components" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
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
    </div>
  );
};

export default Sidebar;
