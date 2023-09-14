import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Piechart1 from "./component/Piechart1";
import Barchart1  from "./component/Barchart1";
import Linechart1 from "./component/Linechart1";
import Profile1 from "./component/Profile1"
import Calendar1 from "./component/Calender1";
import NotificationBell from "./component/Notification"
import Account from "./component/Account"
import GeographyChart1 from "./component/GeographyChart1";
import Faq1 from "./component/Faq1";
function App() {
  const [theme, colorMode] = useMode();
  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
             <Route path="/pie" element={<Piechart1/>}/>
             <Route path="/bar" element={< Barchart1/>}/>
             <Route path="/line" element={<Linechart1/>}/>
             <Route path="/graph" element={<GeographyChart1/>}/>
             <Route path="/profileform" element={<Profile1/>}/>
             <Route path="/calendar" element={<Calendar1/>}/>
             < Route path="/notification" element={<NotificationBell/>}/>
             <Route path="/profile" element={<Account/>}/>
             <Route path="/faq" element={<Faq1/>}/>
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}
export default App;
