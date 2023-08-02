import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
// import { ToastContainer, toast } from 'react-toastify';
//   import 'react-toastify/dist/ReactToastify.css';

import FormInput from './components/FormInput';
import '@coreui/coreui/dist/css/coreui.min.css';

function App() {
  return (
    <div className="App">
      <FormInput/>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
