import React from "react";
import { Outlet,Navigate } from "react-router-dom";
const PrivateRoutes =()=>{
    const autherization=localStorage.getItem("access_token");
    return(
        autherization ?<Outlet/>:<Navigate to='/login'/>
    )
}
export default PrivateRoutes