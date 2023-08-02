import React, { useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
} from "reactstrap";
function Example(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
      <a className="navbar-brand" href='#'>Navbar</a>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" aria-expanded="false"
      aria-label="Toggle navigation"></button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a className="nav-link-active" href="#" aria-current="page">Home <span className=""></span></a>
          </li>
        </ul>
      </div>
    </nav>
  
  );
}

export default Example;
