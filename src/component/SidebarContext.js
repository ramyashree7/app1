import React, { useState, createContext, useContext } from "react";
const SidebarContext = createContext({});
export const MyProSidebarProvider = ({ children }) => {
  const [sidebarRTL, setSidebarRTL] = useState(false);
  const [sidebarBackgroundColor, setSidebarBackgroundColor] =
    useState(undefined);
  const [sidebarImage, setSidebarImage] = useState(undefined);
  return (
    <SidebarContext.Provider
      value={{
        sidebarBackgroundColor,
        setSidebarBackgroundColor,
        sidebarImage,
        setSidebarImage,
        sidebarRTL,
        setSidebarRTL,
      }}
    ><div
        style={{
          display: "flex",
          flexDirection: sidebarRTL ? "row-reverse" : "row",
        }}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};
export const useSidebarContext = () => useContext(SidebarContext);
