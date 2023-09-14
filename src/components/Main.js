import React from 'react';
import { useIntl } from 'react-intl';
import Switch from 'react-switch';
import { FaHeart, FaBars } from 'react-icons/fa';
import Part1 from '../pages/Part1';

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
}) => {
  const intl = useIntl();
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>
   <header>
      <div className="block ">
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleCollapsedChange}
          checked={collapsed}
          onColor="#219de9"
          offColor="#bbbbbb"
         
        />
        <span> {intl.formatMessage({ id: 'collapsed' })}</span>
      {/* </div> */}
      {/* <div className="block"> */}
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleRtlChange}
          checked={rtl}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span> {intl.formatMessage({ id: 'rtl' })}</span>
      {/* </div> */}
      {/* <div className="block"> */}
        <Switch
          height={16}
          width={30}
          checkedIcon={false}
          uncheckedIcon={false}
          onChange={handleImageChange}
          checked={image}
          onColor="#219de9"
          offColor="#bbbbbb"
        />
        <span> {intl.formatMessage({ id: 'image' })}</span>
      </div>
      <div className='buttons' style={{display:"flex",flexDirection:"row",
      justifyContent:"end",alignItems:"end",marginBottom:"20px",borderRadius:'30px',
      marginTop:"-30px",}}>
      <button>logout</button></div>
      </header>
      {/* <div>
      <Part1/>
      </div> */}
      <footer>
        <small>
          © {new Date().getFullYear()} made with <FaHeart style={{ color: 'red' }} /> by {' '}
          <a target="_blank" rel="noopener noreferrer" >
       
          </a>
        </small>
        <br />
      </footer>
    </main>
  );
};

export default Main;
