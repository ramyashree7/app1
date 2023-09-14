import React from 'react';
import PaymentForm from './components/PaymentForm';
import './index.css'
const App = () => {
  return (
    <div className="App">
      <h2 className='heading'>Stripe Payment Integration</h2>
      <PaymentForm />
    </div>
  );
};

export default App;