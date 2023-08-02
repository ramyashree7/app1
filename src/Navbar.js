import React, { useEffect, useState } from "react";
import {
  MenuItem,Menu,
  ProSidebar,SidebarContent,SidebarHeader
} from "react-pro-sidebar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

// import { IconContext } from "react-icons";
 function Navbar(){
  const [width, setWidth] =useState("");
  const[collapse,setCollapse]=useState(false)
  const [display,setDisplay]=useState("")
const [breakPoint,setBreakpoint]=useState(false)

  function getSize(){
    setWidth(window.innerWidth)
  }
  useEffect(()=>{
    window.addEventListener('resize',getSize);
    if(width<400){
      setCollapse(true)
      setDisplay("")
      setBreakpoint(true)

    }
    else{
      setCollapse(false)
      setDisplay("display")
      setBreakpoint(false)
    }
    return()=>{
      window.removeEventListener('resize',getSize)
    }
  },[window.innerWidth])
  function BreakPoint(){
    setBreakpoint(!breakPoint)
  }

  return (
   
    <div  className="d-flex wrapper">
      <ProSidebar collapsed={collapse} breakPoint={breakPoint?"sm":""}>
     
        <SidebarContent>
          <Menu>
            <MenuItem icon={ <AiIcons.AiFillHome />}>Home</MenuItem>
            <MenuItem icon={ <IoIcons.IoIosPaper />}>Reports</MenuItem>
            <MenuItem icon={ <FaIcons.FaCartPlus />}>Product</MenuItem>
            <MenuItem icon={ <IoIcons.IoMdPeople />}>Team</MenuItem>
            <MenuItem icon={ <FaIcons.FaEnvelopeOpenText />}>Message</MenuItem>
            <MenuItem icon={  <IoIcons.IoMdHelpCircle />}>Support</MenuItem>
          </Menu>
        </SidebarContent>
    
      </ProSidebar>
      <div className={display} onClick={BreakPoint}>
      <FaIcons.FaBars  />
      </div>
    </div>

    
  );
}
export default Navbar;