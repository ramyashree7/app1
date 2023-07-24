import React from "react";
import { Outlet,Navigate } from "react-router-dom";
const PrivateRoutes =()=>{
    const auth=localStorage.getItem("access_token");
    return(
        auth ?<Outlet/>:<Navigate to={'/login'}/>
    )
}
export default PrivateRoutes