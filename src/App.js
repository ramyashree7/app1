import { useState } from 'react';
import { BrowserRouter as Router,  Route, Routes } from "react-router-dom";
// import '~react-pro-sidebar/dist/scss/styles.scss';
import { FaBars } from 'react-icons/fa';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Components from './pages/Components';
import Profile from './pages/Profile';
import './styles.scss';

function App() {
  const [collapsed,setCollapsed]=useState(false);
  const [toggled,setToggled]=useState(false);

  const handleCollapsedChange=()=>{
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar=(value)=>{
    setToggled(value);
  };
  return (
    <Router>
   <div className={`app ${toggled?'toggled':''}`}>
    <Sidebar
  
    collapsed={collapsed}
    toggled={toggled}
    handleCollapsedChange={handleCollapsedChange}
    handleToggleSidebar={handleToggleSidebar}/>
    <main>
      <div className='btn-toggle' onClick={()=>handleToggleSidebar(true)}>
        <FaBars/>
      </div>
      <Routes>
        <Route path='/components' element={<Components/>}/>
        <Route path="/profile" element={<Profile/>} />
          <Route path="/not-found" element={<NotFound/>} />
          <Route path="/" element={<Home/>}/>
            
          <Route path="/not-found" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </main>
   </div>
   </Router>
  );
}

export default App;
