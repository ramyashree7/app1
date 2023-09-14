import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MainScreen from "./Main";
import "./Home.css"
function Home(){
    const navigate = useNavigate();
    useEffect(() => {
    
      if (!localStorage.getItem("access_token")) {
        navigate("/login");
      }
      
      // document.body.style.overflow = "hidden";
  
      // return () => {
      //   document.body.style.overflow = "auto";
      // };
    }, []);
    const handleLogout = () => {
      localStorage.removeItem("access_token");
      navigate("/login");
    };
    return(
        <div>
          <div className="btnn">
          <header style={{border:'none'}}>
            <div>
                <button
                  className="mx-2 my-2 px-4 py-2"
                  size="lg"
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    borderRadius: "2rem",
                    backgroundColor: " #2079df",
                    border: "1px solid  #2079df",
                  }}
                >
                  LOGOUT
                </button>
              </div>
              </header>
            
              </div>
              <MainScreen/>

        </div>
    )
}
export default Home